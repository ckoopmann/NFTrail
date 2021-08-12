//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "@chainlink/contracts/src/v0.7/ChainlinkClient.sol";
import "./NFTrail.sol";
import "./VINApiConsumer.sol";

contract CarToken is NFTrail, VINApiConsumer {
   constructor(string memory tokenName, string memory symbol) NFTrail(tokenName, symbol) VINApiConsumer(){
   }

    function mintToken(address owner, string memory pictureCID, string memory vin)
    public override
    returns (uint256)
    {
        super.mintToken(owner, pictureCID, vin);
        requestVehicleData(vin, "Manufacturer");
        requestVehicleData(vin, "Make");
        requestVehicleData(vin, "Model");
        requestVehicleData(vin, "ModelYear");
    }


}
