//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTrail is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(string => uint256) assetIdentifierIdMapping;

    constructor(string memory tokenName, string memory symbol) ERC721(tokenName, symbol) {
        _setBaseURI("ipfs://");
    }

    function mintToken(address owner, string memory genesisMetadataURI, string memory assetIdentifier)
    public
    returns (uint256)
    {
        require(assetIdentifierIdMapping[assetIdentifier] == 0, "NFT for this identifier already minted");
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        assetIdentifierIdMapping[assetIdentifier] = id;
        _safeMint(owner, id);
        _setTokenURI(id, genesisMetadataURI);

        return id;
    }
}
