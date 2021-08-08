//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTrail is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Document {
        string description;
        string cid;
        address author;
        uint256 creationTime;
    }
    
    struct Asset {
        string assetIdentifier;
        Document[] documents;
    }
    
    mapping(string => uint256) assetIdentifierIdMapping;
    mapping(uint256 => Asset) assetData;

    constructor(string memory tokenName, string memory symbol) ERC721(tokenName, symbol) {
        _setBaseURI("https://ipfs.io/ipfs/");
    }

    function mintToken(address owner, string memory pictureCID, string memory assetIdentifier)
    public
    returns (uint256)
    {
        require(assetIdentifierIdMapping[assetIdentifier] == 0, "NFT for this identifier already minted");
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        assetIdentifierIdMapping[assetIdentifier] = id;
        assetData[id].assetIdentifier = assetIdentifier;
        _safeMint(owner, id);
        _setTokenURI(id, pictureCID);

        return id;
    }

    function getAssetIdentifier(uint256 id) public view returns(string memory) {
        return assetData[id].assetIdentifier;
    }

    function getAssetData(uint256 id) public view returns(string memory assetIdentifier, string memory pictureURI) {
        assetIdentifier = getAssetIdentifier(id);
        pictureURI = tokenURI(id);
    }



}
