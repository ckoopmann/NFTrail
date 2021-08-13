# NFTrail

Trace real-word assets through NFT Tokens.

## What is NFTrail ?

NFTrail is a decentralized application that allows its user to mint Non Fungible Tokens (NFT / ERC-721) representing physical assets.
These NFTs can be combined with verified Oracle Data and Documents stored on IPFS to verify various properties of the underlying asset such
as ownership and maintenance record.

For now the only asset type supported by the application are Motor Vehicles, but the potential use cases contain a variety of assets such as Real Estate, Physical Artwork etc.

## How does it work ?

In the current use case of minting a token to represent a Vehicle the workflow is as follows:

1. The user mints an NFT by providing his Vehicle Identification Number (VIN) and a picture of the vehicle.
2. The Picture will be saved on IPFS using the [web3.storage](https://web3.storage/) api and the CID is attached to the respective token
3. A [Chainlink](https://chainlinklabs.com/) oracle is used to query the [Vehicle API](https://vpic.nhtsa.dot.gov/api/) of the US Department of Transportation, decode the VIN and save some of the resulting metadata on chain. (Manufacturer, Model, Year)
4. The owner of a Token can attach documents to it, which will also be saved on IPFS
5. Any user can query the App using a VIN to view the Vehicles metadata as well as all the attached documents.
6. The ERC-721 compliant vehicle tokens could be used anywhere in the NFT ecosystem.

## Where does it run ?

While the WebUI is hosted at [NFTrail.org](https://www.nftrail.org/) the core logic described above is implemented in decentralized smart contracts
running on the [Polygon](https://polygon.technology/) Layer 2 (currently on Mumbai Testnet) network.
Users who wish to use the application will need to have Metamask installed and connected to the Mumbai Testnet as well as some Testnet MATIC to pay for transaction fees.
