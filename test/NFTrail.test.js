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
    const genesisURI = "FOOBAR";
    const identifier = "MOON";

    const mintTx = await nftrail.mintToken(
      owner.address,
      genesisURI,
      identifier
    );
    await mintTx.wait();

    // expect(await nftrail.greet()).to.equal("Hola, mundo!");
  });
});
