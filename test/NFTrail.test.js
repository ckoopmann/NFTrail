const { expect } = require("chai");

describe("NFTrail", function () {
  let nftrail;
  let owner;
  before(async function () {
    [owner] = await ethers.getSigners();
    const NFTrail = await ethers.getContractFactory("NFTrail");
    nftrail = await NFTrail.deploy("NFTrail", "TRL");
    await nftrail.deployed();

    // expect(await nftrail.greet()).to.equal("Hola, mundo!");
  });

  it("Should be able to mint new NFT", async function () {
    const tokenCID = "FOOBAR";
    const identifier = "MOON";

    const mintTx = await nftrail.mintToken(owner.address, tokenCID, identifier);
    await mintTx.wait();

    // expect(await nftrail.greet()).to.equal("Hola, mundo!");
  });

  it("Should be able to add documents", async function () {
    const tokenId = 1;
    const documentCID = "DOCUMENTCID";
    const description = "A test document";

    const addDocumentTx = await nftrail.addDocument(
      tokenId,
      documentCID,
      description
    );
    await addDocumentTx.wait();

    const numDocuments = await nftrail.getNumDocuments(tokenId);
    expect(numDocuments.toNumber()).to.equal(1);

    const [returnedDescription, returnedCID, author, creationTime] = await nftrail.getDocumentData(tokenId, 0);
    expect(returnedDescription).to.equal(description);
    expect(returnedCID).to.equal(documentCID);
    expect(author).to.equal(owner.address);
  });
});
