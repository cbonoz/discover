// core libraries.
const express = require('express')
const fetch = require('node-fetch');
const schedule = require('node-schedule');
const Web3 = require('web3');
const contract = require('truffle-contract')
const app = express()

// custom libraries.
const discover = require('./discover'); // library for assisting with interacting with the discover api.
const ImmutableAPI = require('./contracts/ImmutableAPI.json');
const SimpleStorage = require('./contracts/SimpleStorage.json');

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)

const INTERVAL = 1;
const PORT = 8007;

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// call scheduledJob.cancel() to cancel the recurring job.
var scheduledJob;

//dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
function applyCompat(contract) {
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function () {
            return contract.currentProvider.send.apply(contract.currentProvider, arguments);
        };
    }
}
const simpleStorage = contract(SimpleStorage)
simpleStorage.setProvider(web3.currentProvider)

const immutableApi = contract(ImmutableAPI);
immutableApi.setProvider(web3.currentProvider);

applyCompat(immutableApi);
applyCompat(simpleStorage);

// Declaring this for later so we can chain functions on SimpleStorage.
var simpleStorageInstance;

// Get accounts.
web3.eth.getAccounts((error, accounts) => {
    console.log('accounts: ' + accounts);
  simpleStorage.deployed().then((instance) => {
    simpleStorageInstance = instance

    // Stores a given value, 5 by default.
    return simpleStorageInstance.set(5, {from: accounts[0]})
  }).then((result) => {
    console.log('result: ' + JSON.stringify(result));
    // Get the value from the contract to prove it worked.
    return simpleStorageInstance.get.call(accounts[0])
  }).catch(err => console.log(err)).then((result) => {
    // Update state with the result.
    console.log('result: ' + result);
    return this.setState({ storageValue: result.c[0] })
  })
})

// Get the web3 context before starting the server.
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`)
    var rule = new schedule.RecurrenceRule();
    rule.minute = new schedule.Range(0, 59, INTERVAL);
    
    scheduledJob = schedule.scheduleJob(rule, function(){
        console.log('Running scheduled job');
        // Fetch data from the target api.
    });
    console.log(rule, `set rule to run scheduled job every ${INTERVAL} minutes`);
});
// .catch(err => {
//     console.log('error getting web3: ' + err);
// })