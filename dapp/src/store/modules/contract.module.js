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
    ownedIds: {},
  },
  mutations: {
    setContractDeployed(state, contractDeployed) {
      state.contractDeployed = contractDeployed;
    },
    setOwnedId(state, { id, assetIdentifier }) {
      const newValues = {};
      newValues[id] = { assetIdentifier };

      state.ownedIds = Object.assign({}, state.ownedIds, newValues);
    },
    resetOwnedIds(state, ownedIds) {
      state.ownedIds = ownedIds;
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
    async registerListeners({ rootGetters, commit }) {
      nftContract.on("Transfer", async (from, to, id) => {
        // Emitted whenever a DAI token transfer occurs
        console.log("Detected transfer event", from, to, id);
        const activeAccount = rootGetters["web3Module/selectedAccount"];
        if (
          ethers.utils.getAddress(to) === ethers.utils.getAddress(activeAccount)
        ) {
          const assetIdentifier = await nftContract.callStatic.getAssetIdentifier(
            id
          );
          commit("setOwnedId", { id, assetIdentifier });
        }
      });
    },
    async mintNFT({ rootGetters }, { genesisDocumentCID, assetIdentifier }) {
      const signer = rootGetters["web3Module/signer"];
      const owner = rootGetters["web3Module/selectedAccount"];
      console.log(
        `Mintin token with identifier ${assetIdentifier} and genesisCID ${genesisDocumentCID} for owner ${owner}`
      );
      console.log("Using signer: ", signer);
      if (signer !== undefined) {
        const signerContract = nftContract.connect(signer);
        const mintTx = await signerContract.mintToken(
          owner,
          genesisDocumentCID,
          assetIdentifier
        );
        const result = await mintTx.wait();
        console.log(`Token minted`, result);
      }
    },

    async loadOwnedIds({ commit, rootGetters }) {
      const activeAccount = rootGetters["web3Module/selectedAccount"];
      const totalSupply = await nftContract.callStatic.totalSupply();
      const ownedIds = {};
      console.log(
        `Total Supply: ${totalSupply}, ActieAccount: ${activeAccount}`
      );
      let owner;
      for (let id = 1; id < totalSupply.toNumber() + 1; id++) {
        console.log(`Checking Owner of asset ${id}`);
        owner = await nftContract.callStatic.ownerOf(id);
        console.log(`Owner of asset ${id}: `, owner);
        if (
          ethers.utils.getAddress(owner) ===
          ethers.utils.getAddress(activeAccount)
        ) {
          const assetIdentifier = await nftContract.callStatic.getAssetIdentifier(
            id
          );
          console.log("Owner and active account", owner, activeAccount);
          ownedIds[id] = { assetIdentifier };
        }
      }
      commit("resetOwnedIds", ownedIds);
    },
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
    ownedIds(state) {
      return state.ownedIds;
    },
  },
};
export default contractModule;
