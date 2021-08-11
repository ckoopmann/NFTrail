//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "@chainlink/contracts/src/v0.7/ChainlinkClient.sol";
import "./NFTrail.sol";

contract CarToken is NFTrail {
   constructor(string memory tokenName, string memory symbol) NFTrail(tokenName, symbol) {
   }

}
