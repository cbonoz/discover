Discover ImmutableAPI
---
<b>Immutable API is a api extension project designed specifically to be used by Discover's partners.
</b>

## Concept

Many banks are currently implementing their own in-house api's designed to either facilitate banking transactions or expedite and improve accuracy in record auditing.

Coming up with an interesting target market, instead of going after consumers or businesses that could use your API's, I decided to develop an extension specifically for Discovers' partners that want to make their API usage completely auditable.

With Discover Immutable API interactions with the discover api are tied directly to the public block chain (specifically this is built on ethereum).

In practice Immutable API will work as a middle man between the client and the server - intercepting web requests and adding them to the block chain for later consumption and validation.

Usages of the api's are 

Designed for consumers of the discover blockchain.

## Benefits:
* Automatically create an immutable ledger of api calls and history that cannot be modified by any third party - while simultaneously being completely transparent and indexable.
* Audit trail of responses - if you need to revisit a response


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
-->

