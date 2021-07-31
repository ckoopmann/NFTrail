const contractName = "NFTrail"
const abi = require(`../../contracts/abis/${contractName}.json`);
const addresses = require(`../../contracts/addresses/${contractName}.json`);

const contractModule = {
  namespaced: true,
  name: "contract",
  state: {
    contract: null,
    gameDataLoaded: false,
    gameIds: [],
    gameData: {},
    gameLoadingStates: {},
    contractDeployed: false,
  },
  mutations: {
    setContractInstance(state, contractInstance) {
      state.contract = contractInstance;
    },
    setGameIds(state, gameIds) {
      state.gameIds = gameIds;
    },
    setGameData(state, { gameId, gameData }) {
      console.log("Adding Game Data: ", gameId, gameData);
      if (!state.gameIds.includes(gameId)) {
        state.gameIds = [gameId, ...state.gameIds];
      }
      state.gameData[gameId] = gameData;
    },
    setGameDataLoaded(state, loadingFlag) {
      state.gameDataLoaded = loadingFlag;
    },
    setContractDeployed(state, contractDeployed) {
      state.contractDeployed = contractDeployed;
    },
  },
  actions: {
    initializeContract({ commit, rootGetters }) {
      commit("setContractDeployed", false);
      const web3 = rootGetters["web3Module/web3Instance"];
      const networkId = rootGetters["web3Module/networkId"];
      if(networkId in addresses){
        const address = addresses[networkId];
        console.log("using abi: ", abi);
        console.log("using address: ", address);
        const contract = new web3.eth.Contract(abi, address);
        console.log("setting contract to: ", contract);
        commit("setContractInstance", contract);
        commit("setContractDeployed", true);
      }
      else{
        console.log(`Contract is not deployed on network ${networkId}`);
      } 
    },
  },
  getters: {
    contractInstance(state) {
      return state.contract;
    },
    contractAddress(state){
      if(state.contract != null){
        return state.contract.options.address;
      }
      return null;
    },
    contractDeployed(state) {
      return state.contractDeployed;
    },
  },
};
export default contractModule;
