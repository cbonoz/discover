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
      companiesToValidate: ['target', 'sears', 'jcpenney', 'walmart', 'costco'],
      proxyurl: "https://cors-anywhere.herokuapp.com/"
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

  apiRequestElligiblity() {
    const self = this;
    var request = require('request');
    const url = "https://api.discover.com";
    const path = '/nws/nwp/hce/v2/account/eligibility';
    const fullUrl = self.state.proxyurl + url + path;
    request({
        url: fullUrl,
        body: '{"requestHeader": {"requestId": "fbc6768759554d0d9ca8acd918c6ddb9","sessionId": "0bf3876b13144007b11347f6b08dbaaa","programId": "8010","userContext": {"walletId": "a576857","deviceId": "a5672583a","userId": "asgdhjagyuagsdyug"}},"accountEligibilityRequest": {"secureContext": {"encryptedContent": "eyJhbGciOiJSU0ExXzUiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2Iiwia2lkIjoiQ3Q2ck9aLXJkSEtkSFM1Ylg1Q3dUYW9rU2w1d0dfcXh2VHdwQ1dQYWhXQSJ9.DVwDsZElPwgCNDWRsodgAqDYqHmJY5rHSaGHacwvR5P8p2xJW9ARgx36-lELyiAXkNDrZk4eDsdjkZdLRrAeH5gIyscGIycYLcOwCMiRULOL_sO2_gzwLNTd9abMxCeng6CsirGe9_B92lfsru3Di10wsGHXAxsgBQv6C6n6MNoCBBXBpCbvcMuQwHnqpgJRxxF9pdtYkyl9_Q995GO4ZL2dnpoWJwRHcQT19WXBPifySUZLSvSS-v6HfnebSAd592GlLsKrJjIO3zePhJ_plnvYMPQHyxFYLBPXKV2M9A337Ul6kX7a-MUEZMhE-rlDs9OKFMfZ53lwdaKzIrEkzg.4C4OL72s_f1mLs7fpCnGZw.T2DJYDMEO5AUg6GQBw6XB7llhRjqiFCIGBa9DFAoApHrdPFmLA6inNOky5vZysjjzgQ6Itls-3dxJodIZm34bR95S4SdDTUm3wnokR1DmhZtBxetTkjqVSZF1VTwmX6VqdHzaHH6bjqC-9OjkLaMmrmBOmbwYVCOpWg3IaBmUK2WtXdB7SxNFfaWwXzwcJtlDwRmbjdJoctIVAXB9iqUd0uI3N_dokS-5dJqpfwfVp2zEKLFiqGzCCIWn9DxXrzG.FW1tk1vdirPZlKl0gP_dKA"},"deviceContext": {"deviceLanguage": "en-US","deviceType": "1"}}}',
        headers: { 'x-dfs-c-app-cert':'dfsexxkJG4R0l4XUcdO0qN1uQxTNDNzdbNyG9L4XYJAh5P2pk', 'Accept':'application/json', 'Content-Type':'application/json', 'Cache-Control':'no-store', 'x-dfs-api-plan':'NWS-HCE-Sandbox', 'Authorization':'Bearer aee60db8-0ab3-47ab-aac1-65020107b1ee', 'Content-Type':'application/json'  },
        method: 'POST'
    }, function (error, resp, body) {
        // console.log('Status', resp.statusCode);
        // console.log('Headers', JSON.stringify(response.headers));
        // console.log('Reponse received', body);

        const hashedPath = self.hashData(path);
        const response = JSON.stringify(body);
        const hashedResponse = self.hashData(JSON.stringify(response));

        self.state.web3.eth.getAccounts((error, accounts) => {
          self.state.immutableApi.deployed().then((instance) => {
            self.setState({immutableApiInstance: instance});
            self.recordTransaction(path.slice(0, Math.min(40, path.length)) + "...", hashedResponse, accounts[0]);
          })
        });
    });
  }

  apiRequestMerchant() {
    const self = this;
    // Insert fetch call to discover api here.
    // Validate the request/response of details for a 'random' company.
    const company = self.getRandom(self.state.companiesToValidate);
    const queryParams = '?' +  encodeURIComponent('requestHeader.version') + '=' + encodeURIComponent('3.2')+ '&' +  encodeURIComponent('requestHeader.format') + '=' + encodeURIComponent('json')+ '&' +  encodeURIComponent('requestHeader.applicationKey') + '=' + encodeURIComponent('l7xx7741684d36644a3fb8b25e1998792176')+ '&' +  encodeURIComponent('listControl.startIndex') + '=' + encodeURIComponent('0')+ '&' +  encodeURIComponent('listControl.segmentSize') + '=' + encodeURIComponent('10')+ '&' +  encodeURIComponent('listControl.segmentWindow') + '=' + encodeURIComponent('3')+ '&' +  encodeURIComponent('searchCriteria.filterField') + '=' + encodeURIComponent('name')+ '&' +  encodeURIComponent('searchCriteria.filterValue') + '=' + encodeURIComponent(company)+ '&' +  encodeURIComponent('apikey') + '=' + encodeURIComponent('l7xx7741684d36644a3fb8b25e1998792176');
    const baseUrl = 'https://api.discover.com';
    const path = '/geo/remote/rest/location' + queryParams;
    const url = baseUrl + path;
    const fullUrl = self.state.proxyurl + url;

    fetch(fullUrl)
      .then(res => res.json())
      .then(json => {
        const hashedPath = self.hashData(path);
        const response = JSON.stringify(json);
        const hashedResponse = self.hashData(JSON.stringify(response));
        // console.log('response', response, 'hash', hashedResponse);

        self.state.web3.eth.getAccounts((error, accounts) => {
          self.state.immutableApi.deployed().then((instance) => {
            self.setState({immutableApiInstance: instance});
            self.recordTransaction(path.slice(0, Math.min(40, path.length)) + "...", hashedResponse, accounts[0]);
          })
        });
      }).catch((err) => {
        console.log('error fetching ', fullUrl ,err);
      });
  }

  randomizeApiRequest() {
    const self = this;
    self.apiRequestElligiblity()
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

              <h1>Recent Merchant API Calls</h1>
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
