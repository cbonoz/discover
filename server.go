package main

import (
	"fmt"
	"os"
	"github.com/jasonlvhit/gocron"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/op/go-logging"
	"net/http"
	"strconv"
	"strings"
	"net/url"
	"io/ioutil"
	"bytes"
)

var DISCOVER_KEY string = os.Getenv("discoverkey")
var DISCOVER_SECRET string = os.Getenv("discoversecret")

var log = logging.MustGetLogger("immutable")

//const AUTH_API = "https://apis.discover.com/auth/oauth/v2/token"

var immutableContract ImmutableAPI
var authToken string
var requestInterval uint64

const DEFAULT_INTERVAL = 30
const DISCOVER_API = "https://api.discover.com/pci/network"

// Example format string. Everything except the message has a custom color
// which is dependent on the log level. Many fields have a custom output
// formatting too, eg. the time returns the hour down to the milli second.
var format = logging.MustStringFormatter(
	//`%{color}%{time:15:04:05.000} %{shortfunc} ▶ %{level:.4s} %{id:03x}%{color:reset} %{message}`,
	`%{color}%{time:15:04:05.000} %{shortfunc} ▶ %{level:.3s} %{color:reset} %{message}`,
)

func configureLogging() {
	errorBackend := logging.NewLogBackend(os.Stderr, "", 0)
	debugBackend := logging.NewLogBackend(os.Stdout, "", 0)

	// For messages written to backend2 we want to add some additional
	// information to the output, including the used log level and the name of
	// the function.
	debugBackendFormatter := logging.NewBackendFormatter(debugBackend, format)

	// Only errors and more severe messages should be sent to backend1
	errorBackendLeveled := logging.AddModuleLevel(errorBackend)
	errorBackendLeveled.SetLevel(logging.ERROR, "")

	// Set the backends to be used.
	logging.SetBackend(errorBackendLeveled, debugBackendFormatter)
	log.Debugf("configured logging successfully")
}


func makePostRequest(postUrl string, reqBody string) (string, error) {
	var jsonStr = []byte(reqBody)
	req, err := http.NewRequest("POST", postUrl, bytes.NewBuffer(jsonStr))
	req.Header.Set("X-Custom-Header", "myvalue")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("response Status:", resp.Status)
	fmt.Println("response Headers:", resp.Header)

	body, err := ioutil.ReadAll(resp.Body)
	fmt.Println("response Body:", string(body))

	return body, err
}

func saveResultsToLedger() {

}

func runApiTask() bool {
	log.Debugf("runApiTask: Fetching API calls in the last %f minutes", requestInterval)

	log.Debugf("Saving results to ledger...")
	saveResultsToLedger()
	log.Debugf("Saving complete")
	return true
}

// Create the immmutable contract from the deployed address.
func setupImmutableApi() {
	//immutableContract = NewImmutableAPI()

	log.Debugf("created immutable api contract")
}

func main() {
	configureLogging()
	log.Debugf("Discover key: %s", DISCOVER_KEY)

	reqBody := `{"title":"Buy cheese and bread for breakfast."}`
	authToken, err := makePostRequest(getAuthApi(), reqBody)
	if (err != nil) {
		log.Fatalf("Error getting auth token %s", err)
	}
	log.Debugf("Retrieved token: %s", authToken)

	setupImmutableApi()

	//realMain()
}


/* to add later */
func realMain() {
	var err error
	log.Debugf("Discover key: %s", DISCOVER_KEY)

	// first argument is the executed program name
	argsWithProg := os.Args

	if (len(argsWithProg) < 2) {
		// executed without the program name
		requestInterval = DEFAULT_INTERVAL
	} else {
		requestInterval, err = strconv.ParseUint(argsWithProg[1], 10, 0)
		if err != nil {
			log.Warningf("API scan interval parse error: %s - using default value of %d", err, DEFAULT_INTERVAL)
			requestInterval = DEFAULT_INTERVAL
		}
	}

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// CORS default
	// Allows requests from any origin wth GET, HEAD, PUT, POST or DELETE method.
	// TODO: Don't use this in production.
	e.Use(middleware.CORS())

	// Sample hello world routes (for testing).
	e.GET("/api/hello", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "Hello, World!")
	})
	e.GET("/api/hello/:name", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "Hello, " + c.Param("name"))
	})

	scheduling := true

	if (scheduling) {
		s := gocron.NewScheduler()
		s.Every(requestInterval).Minutes().Do(runApiTask)
		log.Debugf("scheduled runApiTask for every %d minutes", requestInterval)
		s.Start()
	}

	// Start the web server.
	port := ":9007"
	fmt.Println("Started server on port $1", port)
	e.Logger.Error(e.Start(port))
}

