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


    event DocumentAdded(uint256 tokenId, uint256 documentIndex);

    constructor(string memory tokenName, string memory symbol) ERC721(tokenName, symbol) {
        _setBaseURI("https://ipfs.io/ipfs/");
    }

    function mintToken(address owner, string memory pictureCID, string memory assetIdentifier)
    public virtual
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

    function getTokenId(string memory assetIdentifier) public view returns(uint256) {
        return assetIdentifierIdMapping[assetIdentifier];
    }


    function getNumDocuments(uint256 id) public view returns(uint256) {
        return assetData[id].documents.length;
    }


    function getAssetData(uint256 id) public view returns(string memory assetIdentifier, string memory pictureURI, uint256 numDocuments, address owner) {
        assetIdentifier = getAssetIdentifier(id);
        pictureURI = tokenURI(id);
        numDocuments = getNumDocuments(id);
        owner = ownerOf(id);
    }

    function addDocument(uint256 tokenId, string memory documentCID, string memory description) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        uint256 documentIndex = assetData[tokenId].documents.length;
        assetData[tokenId].documents.push(Document(description, documentCID, _msgSender(), block.timestamp));
        emit DocumentAdded(tokenId, documentIndex);
    }

    function getDocumentData(uint256 tokenId, uint256 documentIndex) public view returns(string memory description, string memory cid, address author, uint256 creationTime){
        require(assetData[tokenId].documents.length > documentIndex, "Document Index out of range");
        description = assetData[tokenId].documents[documentIndex].description;
        cid = assetData[tokenId].documents[documentIndex].cid;
        author = assetData[tokenId].documents[documentIndex].author;
        creationTime = assetData[tokenId].documents[documentIndex].creationTime;
    }
}
