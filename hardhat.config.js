require("@nomiclabs/hardhat-waffle");
const fs = require("fs");

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim()
  } catch (e) {
    console.log("WARNING: No mnemonic file")
  }
  return ""
}


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
  },

  namedAccounts: {
    deployer: 0,
    tokenRecipient: 1,
  },
  solidity: "0.7.0",
};
