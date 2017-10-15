pragma solidity ^0.4.15;

contract Migrations {
  address public owner;
  uint public lastMigration;

  modifier restricted() {
    if (msg.sender == owner) {
      _;
    }
  }

  function Migrations() {
    owner = msg.sender;
  }

  function setCompleted(uint completed) restricted {
    lastMigration = completed;
  }

  function upgrade(address newAddress) restricted {
    Migrations upgraded = Migrations(newAddress);
    upgraded.setCompleted(lastMigration);
  }
}
