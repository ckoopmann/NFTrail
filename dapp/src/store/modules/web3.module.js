const Web3 = require("web3");

const web3Module = {
  namespaced: true,
  state: {
    web3: null,
    activeAccount: null,
    networkId: null,
    networkType: "",
    walletConnected: false,
  },
  mutations: {
    setWeb3Instance(state, web3) {
      console.log("Setting web3 instance to: ", web3);
      state.web3 = web3;
    },
    setActiveAccount(state, activeAccount) {
      console.log("Setting active account to: ", activeAccount);
      state.activeAccount = activeAccount;
    },
    setNetworkId(state, networkId) {
      console.log("Setting network id to: ", networkId);
      state.networkId = networkId;
    },
    setNetworkType(state, networkType) {
      console.log("Setting network type to: ", networkType);
      state.networkType = networkType;
    },
    setWalletConnected(state, walletConnected) {
      console.log("Setting network type to: ", walletConnected);
      state.walletConnected = walletConnected;
    },
  },
  actions: {
    async initializeWeb3({ commit }) {
      if (window.ethereum) {
        await window.ethereum.enable();
        commit("setWalletConnected", true);
        let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        commit("setWeb3Instance", web3);

        let accounts = await web3.eth.getAccounts();
        console.log("Active Acount from inside vuex store: ", accounts[0]);
        commit("setActiveAccount", accounts[0]);

        let networkId = await web3.eth.net.getId();
        commit("setNetworkId", networkId);

        let networkType = await web3.eth.net.getNetworkType();
        commit("setNetworkType", networkType);
      } else {
        commit("setWalletConnected", false);
      }
    },
    async registerUpdateListener({ dispatch }) {
      console.log("Current Provider:", window.ethereum);
      window.ethereum.on("accountsChanged", async () => {
        console.log("Detected account update");
        await dispatch("initializeWeb3");
        await dispatch("contractModule/initializeContract", {}, { root: true });
      });
      window.ethereum.on("chainChanged", async () => {
        console.log("Detected network update");
        await dispatch("initializeWeb3");
        await dispatch("contractModule/initializeContract", {}, { root: true });
      });
    },
  },
  getters: {
    web3Instance(state) {
      return state.web3;
    },
    activeAccount(state) {
      return state.activeAccount;
    },
    networkId(state) {
      return state.networkId;
    },
    networkType(state) {
      return state.networkType;
    },
    walletConnected(state) {
      return state.walletConnected;
    },
  },
};
export default web3Module;
