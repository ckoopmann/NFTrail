//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "@chainlink/contracts/src/v0.7/ChainlinkClient.sol";

contract VINApiConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;
  
    string public baseURL;
    string public queryParams;
    
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    mapping(string => bytes32) vinToRequestId;
    mapping(bytes32 => string) oracleResults;

    
    /**
     * Network: Matic Mumbai Get > Bytes32 
     * Oracle: 0x0bDDCD124709aCBf9BB3F824EbC61C87019888bb
     * Job ID: c6a006e4f4844754a6524445acde84a0
     * Fee: 0.1 LINK
     */
    constructor() public {
        address chainLinkTokenAddress = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
        setChainlinkToken(chainLinkTokenAddress);
        oracle = 0x0bDDCD124709aCBf9BB3F824EbC61C87019888bb;
        jobId = "c6a006e4f4844754a6524445acde84a0";
        fee = 0.01 * 10 ** 18; // (Varies by network and job)
        baseURL="https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/";
        queryParams="?format=json";
    }
    
    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestManufacturerData(string memory vin) public 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        string memory fullURL = string(abi.encodePacked(baseURL, vin, queryParams));
        
        // Set the URL to perform the GET request on
        request.add("get", fullURL);
        
        request.add("path", "Results[0].Manufacturer");
        
        // Sends the request
        vinToRequestId[vin] = sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Receive the response in the form of bytes32
     */ 
    function fulfill(bytes32 _requestId, bytes32 _manufacturer) public recordChainlinkFulfillment(_requestId)
    {
        oracleResults[_requestId] = bytes32ToString(_manufacturer);
    }

    function getManufacturer(string memory vin) public view returns(string memory){
        return oracleResults[vinToRequestId[vin]];
    }

    function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
 
    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}
