import React, { Component } from 'react'
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import ImmutableAPI from '../build/contracts/ImmutableAPI.json'
import fetch from 'node-fetch';
import getWeb3 from './utils/getWeb3'
import StackGrid, { transitions, easings } from 'react-stack-grid';
import BlockStack from './components/BlockStack'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      immutableApi: null,
      immutableApiInstance: null,
      blocks: [],
      web3: null,
      myInterval: null ,
      lastBlockTime: null,
      rand: null,
      callInterval: 4000,
      companiesToValidate: ['target', 'sears', 'jcpenney', 'walmart', 'costco']
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    const self = this;
    getWeb3.then(results => {
      self.setState({
        web3: results.web3,
        blocks: []
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    }).catch(() => {
      console.log('Error finding web3.')
    })
  }

  componentWillUnmount() {
    // clear the interval state.
    const self = this;
    if (self.state.myInterval != null) {
      clearInterval(self.state.myInterval);
    }
  }

  getRandom(items) {
    return items[Math.floor(Math.random()*items.length)];
  }

  //dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
  applyCompat(contract) {
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function () {
          return contract.currentProvider.send.apply(contract.currentProvider, arguments);
        };
    }
  }

  getTimeMs() {
    const d = new Date();
    return d.getTime();
  }

  recordTransaction(event, data, account) {
    const self = this;
    // console.log(JSON.stringify(self.state.immutableApiInstance))
    self.state.immutableApiInstance.recordAPI(
      event, data, self.getTimeMs(), { from: account })
        .then((result) => {
            // const res = JSON.stringify(result);
            // console.log('recordAPI: ' + res);
            const d = new Date(result['logs'][0]['args']['timestamp']['c'] * 1)
            result['logs'][0]['args']['timestamp']['myDate'] = d.toDateString() + ' ' + d.toLocaleTimeString();
            result['position'] = self.state.blocks.length;
            self.setState({blocks: [result, ...self.state.blocks] })
            console.log('blocks: ' + self.state.blocks.length);
        }).catch((err) => {
            console.log('error recording api: ' + err);
    });
  }

  hashData(data) {
    var crypto = require('crypto');
    return crypto.createHash('md5').update(data).digest("hex");
  }

  apiRequest() {
    const self = this;
    // Insert fetch call to discover api here.
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // Validate the request/response of details for a 'random' company.
    const company = self.getRandom(self.state.companiesToValidate);
    const queryParams = '?' +  encodeURIComponent('requestHeader.version') + '=' + encodeURIComponent('3.2')+ '&' +  encodeURIComponent('requestHeader.format') + '=' + encodeURIComponent('json')+ '&' +  encodeURIComponent('requestHeader.applicationKey') + '=' + encodeURIComponent('l7xx7741684d36644a3fb8b25e1998792176')+ '&' +  encodeURIComponent('listControl.startIndex') + '=' + encodeURIComponent('0')+ '&' +  encodeURIComponent('listControl.segmentSize') + '=' + encodeURIComponent('10')+ '&' +  encodeURIComponent('listControl.segmentWindow') + '=' + encodeURIComponent('3')+ '&' +  encodeURIComponent('searchCriteria.filterField') + '=' + encodeURIComponent('name')+ '&' +  encodeURIComponent('searchCriteria.filterValue') + '=' + encodeURIComponent(company)+ '&' +  encodeURIComponent('apikey') + '=' + encodeURIComponent('l7xx7741684d36644a3fb8b25e1998792176');
    const baseUrl = 'https://api.discover.com';
    const path = '/geo/remote/rest/location' + queryParams;
    const url = baseUrl + path;
    const fullUrl = proxyurl + url;

    fetch(fullUrl)
      .then(res => res.json())
      .then(json => {
        const hashedPath = self.hashData(path);
        const hashedResponse = self.hashData(json.toString());
        console.log('response', json, 'hash', hashedResponse);

        self.state.web3.eth.getAccounts((error, accounts) => {
          self.state.immutableApi.deployed().then((instance) => {
            self.setState({immutableApiInstance: instance});
            self.recordTransaction(hashedPath, hashedResponse, accounts[0]);
          })
        });
      }).catch((err) => {
        console.log('error fetching ', fullUrl ,err);
      });
  }

  randomizeApiRequest() {
    const self = this;
    self.apiRequest()
    self.setState({lastBlockTime: self.state.rand});
    const rand = Math.round(Math.random()*(self.state.callInterval))+1000;
    // clear the existing interval and set the new one.
    console.log('randomizeApiRequest: ' + rand);
    clearInterval(self.state.myInterval);
    self.setState({rand: rand, myInterval: 
      setInterval(self.randomizeApiRequest.bind(self), rand)});
}

  instantiateContract() {
    const self = this;
    const contract = require('truffle-contract')
    self.state.immutableApi = contract(ImmutableAPI);
    self.state.immutableApi.setProvider(this.state.web3.currentProvider);
    this.applyCompat(self.state.immutableApi);

    const rand = 500;
    this.setState({myInterval: setInterval(self.randomizeApiRequest.bind(self), rand)});
    // this.setState({myInterval: setInterval(setInterval(, rand)))
  }

  // {self.state.lastBlockTime != null && <span> (last {self.state.lastBlockTime}ms ago)</span>}
  render() {
    const self = this;
    const items = self.state.blocks;
    const listItems = items.map((block, i) =>
      <div key={i}>{block}</div>
    );
    return (
      <div className="App">
        <nav className="navbar ztop pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Discover Immutable API</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              {/* <h1>A self-auditing API system</h1> */}

              <h1>Recent Transaction API Calls</h1>
              <p>Blocks:&nbsp;
              {self.state.blocks.length}
              </p>

                <BlockStack blockHtml={listItems} blocks={items}/>
              </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
