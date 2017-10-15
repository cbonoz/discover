Discover ImmutableAPI
<img src="http://emilytlam.com/ImmutableAPI.jpg"/>
---
<b>Immutable API is a api extension project designed specifically to be used by Discover's partners.
</b>

## Concept

Running an API query on transactional or historic data from 5 years ago should yield the same result whether you ran it two years ago or today. The problem currently is that there is no reliable way to effectively (and potentially automatically) audit such responses for correctness. This leaves a lot of data integrity questions unanswered, and the ability to confidently say that this response is correct or unmutated largely up to trust.

Immutable API is an extension designed to securely encrypt and save responses of historic api calls onto an immutable and verified ledger. When calls come in (that have previously occurred in the past), their response hashes are checked for consistency. This can be done automatically and adds another dimension of trust for partners of the API that the results are secure and accurate.

## Other Details 

Many banks are currently implementing their own in-house api's designed to either facilitate banking transactions or expedite and improve accuracy in record auditing.

In practice, the implementation of Immutable API is actually quite simple. All that needs to be added is a method call (of the hashed query and response) onto the blockchain before the response is returned. These hashed requests "transactions" will later be used for crosschecking responses that are performed in the future.

Usages of the api's are designed for consumers (partners) using the discover API.

## Benefits:
* Automatically create an immutable ledger of api calls and history that cannot be modified by any third party - while simultaneously being completely transparent and indexable.
* Auditable trail of responses - if you need to revisit a response
* No additional cost - users and auditors of data returned from API's can very easily check the results of each api call in the live stream of hashed responses.
* Stored on the blockchain. A distributed ledger offers both privacy and publicity at the same time.
* Security. No user can bypass the checksum without overcoming/breaking the underlying network of nodes itself. 


### Dev Notes:

* https://devconsole.discover.com/documentation


### Useful commands:
* abigen --abi ImmutableAPI.abi --pkg main --type ImmutableAPI --out ImmutableAPI.go
* abigen --abi token.abi --pkg main --type Token --out token.go


<!--
### Useful links
* https://ethereum.stackexchange.com/questions/6650/how-to-get-ether-on-public-testnet
* https://medium.com/taipei-ethereum-meetup/deploy-solidity-code-on-ropsten-test-net-a93ceb16dc4e
* https://ethereum.stackexchange.com/questions/11495/best-way-to-test-a-smart-contract
* https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts
* https://ethereum.stackexchange.com/questions/23388/execute-function-on-ropsten-tesnet-thru-geth-adapt-truffle-console-testrpc-comm
-->


    <!-- // "web3": "^1.0.0-beta.23" -->