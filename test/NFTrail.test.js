const { expect } = require("chai");

describe("Greeter", function () {
  it("Should be able to mint new NFT", async function () {
    const NFTrail = await ethers.getContractFactory("NFTrail");
    const nftrail = await NFTrail.deploy("NFTrail", "TRL");
    await nftrail.deployed();

    // expect(await nftrail.greet()).to.equal("Hola, mundo!");
  });
});
