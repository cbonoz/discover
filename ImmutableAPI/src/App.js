import React, { Component } from 'react'
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import ImmutableAPI from '../build/contracts/ImmutableAPI.json'
import getWeb3 from './utils/getWeb3'
import ReactTimeout from 'react-timeout'
import StackGrid from "react-stack-grid";

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
      myInterval: null 
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    const self = this;
    getWeb3.then(results => {
      self.setState({
        web3: results.web3,
        blocks: [{dafasdfasdf: 'asdfasfasdf'}]
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
            const res = JSON.stringify(result);
            console.log('recordAPI: ' + res);
            self.state.blocks.push(res)
        }).catch((err) => {
            console.log('error recording api: ' + err);
    });
  }

  apiRequest() {
    const self = this;
    self.state.web3.eth.getAccounts((error, accounts) => {
      self.state.immutableApi.deployed().then((instance) => {
        self.setState({immutableApiInstance: instance});
        self.recordTransaction("test api", "test data", accounts[0]);
      })
    });
  }

  instantiateContract() {
    const self = this;
    const contract = require('truffle-contract')
    self.state.immutableApi = contract(ImmutableAPI);
    self.state.immutableApi.setProvider(this.state.web3.currentProvider);
    this.applyCompat(self.state.immutableApi);

    this.setState({myInterval: setInterval(self.apiRequest.bind(self), 10000)});
  }

  render() {
    const self = this;
    console.log(self.state.blocks)
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Discover Immutable API</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              {/* <h1>A self-auditing API system</h1> */}

              <StackGrid columnWidth={150}>
               {self.state.blocks.map((block) => {
                <div key="1">{block}</div>
               })}
              </StackGrid>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
