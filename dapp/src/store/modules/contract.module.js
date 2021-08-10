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
    currentTokenDetails: null,
    currentTokenId: null,
  },
  mutations: {
    setContractDeployed(state, contractDeployed) {
      state.contractDeployed = contractDeployed;
    },
    setCurrentTokenDetails(state, currentTokenDetails) {
      state.currentTokenDetails = currentTokenDetails;
    },
    setCurrentTokenId(state, currentTokenId) {
      state.currentTokenId = currentTokenId;
    },
    setOwnedId(state, { id, data }) {
      const newValues = {};
      newValues[id] = data;

      state.ownedIds = Object.assign({}, state.ownedIds, newValues);
    },
    resetOwnedIds(state, ownedIds) {
      state.ownedIds = ownedIds;
    },
  },
  actions: {
    async initializeContract({ commit, rootGetters, dispatch }) {
      commit("setContractDeployed", false);
      const networkId = rootGetters["web3Module/networkId"];
      const provider = getCurrentProvider();
      if (provider === undefined) {
        throw new Error("Provider is undefined - Cannot initialize contract");
      } else {
        if (networkId in addresses) {
          try {
            nftContract = new ethers.Contract(
              addresses[networkId],
              abi,
              provider
            );
            // Will throw an error if contract is not deployed on current network
            await nftContract.deployed();
            console.log("Connected to contract at: ", addresses[networkId]);
            commit("setContractDeployed", true);
            dispatch("setErrorType", null, {
              root: true,
            });
          } catch (e) {
            dispatch("setErrorType", "failedContractConnection", {
              root: true,
            });
          }
        } else {
          console.error("Contract is not deployed on networkId ", networkId);
          dispatch("setErrorType", "failedContractConnection", {
            root: true,
          });
        }
      }
    },
    async registerListeners({ getters, rootGetters, commit }) {
      console.log("Registering contract listeners");

      nftContract.on("Transfer", async (from, to, id) => {
        console.log("Detected transfer event", from, to, id);
        const activeAccount = rootGetters["web3Module/selectedAccount"];
        if (
          ethers.utils.getAddress(to) === ethers.utils.getAddress(activeAccount)
        ) {
          const [
            assetIdentifier,
            pictureURI,
            numDocuments,
          ] = await nftContract.callStatic.getAssetData(id);
          commit("setOwnedId", {
            id,
            data: {
              assetIdentifier,
              pictureURI,
              numDocuments: numDocuments.toNumber(),
            },
          });
        }
      });

      nftContract.on("DocumentAdded", async (tokenId, documentIndex) => {
        const currentTokenId = getters["currentTokenId"];
        console.log(
          "Detected add document event",
          tokenId,
          documentIndex,
          currentTokenId
        );
        if (tokenId.toNumber() == currentTokenId) {
          const currentTokenDetails = getters["currentTokenDetails"];
          const loadedDocuments = currentTokenDetails.documents.length;
          console.log("Adding  documents", loadedDocuments, documentIndex);
          for (let i = loadedDocuments; i <= documentIndex; i++) {
            const [
              description,
              cid,
              author,
              creationTime,
            ] = await nftContract.getDocumentData(tokenId, documentIndex);
            currentTokenDetails.documents.push({
              description,
              cid,
              author,
              creationTime: creationTime.toNumber() * 1000,
            });
          }
          commit("setCurrentTokenDetails", currentTokenDetails);
        }
      });
    },

    async searchToken(_, assetIdentifier) {
      const tokenId = (
        await nftContract.callStatic.getTokenId(assetIdentifier)
      ).toNumber();
      if (tokenId == 0) {
        return null;
      }
      const [
        assetIdentifierReturned,
        pictureURI,
        numDocumentsRaw,
        owner,
      ] = await nftContract.callStatic.getAssetData(tokenId);
      return {
        tokenId,
        assetIdentifier: assetIdentifierReturned,
        pictureURI,
        numDocuments: numDocumentsRaw.toNumber(),
        owner,
      };
    },

    async loadTokenDetails({ commit, getters }) {
      const tokenId = getters["currentTokenId"];
      if (tokenId == null) {
        console.error("No token ID set abort loading token details");
        return;
      }
      const [
        assetIdentifier,
        pictureURI,
        numDocumentsRaw,
        owner,
      ] = await nftContract.callStatic.getAssetData(tokenId);
      const numDocuments = numDocumentsRaw.toNumber();
      const documents = [];
      for (
        let documentIndex = 0;
        documentIndex < numDocuments;
        documentIndex++
      ) {
        const [
          description,
          cid,
          author,
          creationTime,
        ] = await nftContract.callStatic.getDocumentData(
          tokenId,
          documentIndex
        );
        documents.push({
          description,
          cid,
          author,
          creationTime: creationTime.toNumber() * 1000,
        });
      }
      commit("setCurrentTokenDetails", {
        assetIdentifier,
        pictureURI,
        owner,
        documents,
      });
    },

    async mintNFT({ rootGetters }, { pictureCID, assetIdentifier }) {
      const signer = rootGetters["web3Module/signer"];
      const owner = rootGetters["web3Module/selectedAccount"];
      console.log(
        `Mintin token with identifier ${assetIdentifier} and genesisCID ${pictureCID} for owner ${owner}`
      );
      console.log("Using signer: ", signer);
      if (signer !== undefined) {
        const signerContract = nftContract.connect(signer);
        const mintTx = await signerContract.mintToken(
          owner,
          pictureCID,
          assetIdentifier
        );
        const result = await mintTx.wait();
        console.log(`Token minted`, result);
      }
    },

    async addDocument({ rootGetters }, { tokenId, documentCID, description }) {
      const signer = rootGetters["web3Module/signer"];
      console.log(
        `Adding Document ${documentCID} to token ${tokenId} with description '${description}'`
      );
      console.log("Using signer: ", signer);
      if (signer !== undefined) {
        const signerContract = nftContract.connect(signer);
        const addDocumentTx = await signerContract.addDocument(
          tokenId,
          documentCID,
          description
        );
        const result = await addDocumentTx.wait();
        console.log(`Document added`, result);
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
          const [
            assetIdentifier,
            pictureURI,
            numDocuments,
          ] = await nftContract.callStatic.getAssetData(id);
          console.log("Owner and active account", owner, activeAccount);
          ownedIds[id] = {
            assetIdentifier,
            pictureURI,
            numDocuments: numDocuments.toNumber(),
          };
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
    currentTokenDetails(state) {
      return state.currentTokenDetails;
    },
    currentTokenId(_, _2, rootState) {
      if ("route" in rootState) {
        if ("id" in rootState.route.params) {
          return rootState.route.params.id;
        }
      } else {
        return null;
      }
    },
  },
};
export default contractModule;
