import { getCurrentProvider } from "./web3.module";
import { ethers } from "ethers";

const contractName = "NFTrail";
const abi = require(`../../contracts/abis/${contractName}.json`);
const addresses = require(`../../contracts/addresses/${contractName}.json`);


let nftContract;
const contractModule = {
  namespaced: true,
  name: "contract",
  state: {
    contractDeployed: false,
  },
  mutations: {
    setContractDeployed(state, contractDeployed) {
      state.contractDeployed = contractDeployed;
    },
  },
  actions: {
    async initializeContract({ commit, rootGetters }) {
      commit("setContractDeployed", false);
      const networkId = rootGetters["web3Module/networkId"];
      const provider = getCurrentProvider();
      if (provider === undefined) {
        throw new Error("Provider is undefined - Cannot initialize contract");
      } else {
        if (networkId in addresses) {
          nftContract = new ethers.Contract(
            addresses[networkId],
            abi,
            provider
          );
          // Will throw an error if contract is not deployed on current network
          await nftContract.deployed();
          console.log("Connected to contract at: ", addresses[networkId]);
        } else {
          console.error("Contract is not deployed on networkId ", networkId);
        }
      }
    },
  async mintNFT({rootGetters}, {genesisDocumentCID, assetIdentifier}) {
    const signer = rootGetters["web3Module/signer"]
    const owner = rootGetters["web3Module/selectedAccount"]
    console.log(`Mintin token with identifier ${assetIdentifier} and genesisCID ${genesisDocumentCID} for owner ${owner}`)
    console.log("Using signer: ", signer)
    if (signer !== undefined) {
      const signerContract = nftContract.connect(signer)
      const mintTx = await signerContract.mintToken(owner, genesisDocumentCID, assetIdentifier)
      const result = await mintTx.wait()
      console.log(`Token minted`, result)
    }
  }

  },
  getters: {
    contractInstance() {
      return nftContract;
    },
    contractAddress() {
      return nftContract?.address;
    },
    contractDeployed(state) {
      return state.contractDeployed;
    },
  },
};
export default contractModule;
