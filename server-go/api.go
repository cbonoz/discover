package main

import "fmt"

const BASE_API = "https://api.discover.com";
const AUTH_API = "https://api.discover.com/auth/oauth/v2/token"
const FRAUD_API = BASE_API + "/pci/network/fraudalerts/v1/alerts/healthcheck/orgid/"
const ORG_ID_EXAMPLE = 100225564
const AUTH_TOKEN = "21660c4d-1be2-45fa-a2ab-a62a0a0cb956"
const API_PLAN = "FraudAlerts-Sandbox"
const C_APP_CERT = "dfsexxkJG4R0l4XUcdO0qN1uQxTNDNzdbNyG9L4XYJAh5P2pk"
const MERCHANT_GET_EXAMPLE = `https://api.discover.com/geo/remote/rest/location?requestHeader.version=3.2&requestHeader.format=json&requestHeader.applicationKey=l7xx7741684d36644a3fb8b25e1998792176&listControl.startIndex=0&listControl.segmentSize=10&listControl.segmentWindow=3&searchCriteria.filterField=name&searchCriteria.filterValue=target`

func getFraudAlerts(orgid int) string {
	return fmt.Sprintf("%s/pci/network/fraudalerts/v1/alerts/healthcheck/orgid/%s", BASE_API, orgid)
}

func getAuthApi() string {
	return fmt.Sprintf("%s/auth/oauth/v2/token", BASE_API)
}

func getMerchantApi() string {
	return "https://api.discover.com/geo/remote/rest/location?requestHeader.version=3.2&requestHeader.format=json&requestHeader.applicationKey=l7xx7741684d36644a3fb8b25e1998792176&listControl.startIndex=0&listControl.segmentSize=10&listControl.segmentWindow=3&searchCriteria.filterField=name&searchCriteria.filterValue=target"
}