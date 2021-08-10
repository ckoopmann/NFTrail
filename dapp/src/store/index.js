import Vue from "vue";
import Vuex from "vuex";
import web3Module from "./modules/web3.module";
import contractModule from "./modules/contract.module";
import storageModule from "./modules/storage.module";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    loading: true,
    lightNavbar: false,
    activeSection: "home",
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = !!loading;
    },
    SET_LIGHT_NAVBAR(state, light) {
      state.lightNavbar = !!light;
    },
    SET_ACTIVE_SECTION(state, section) {
      state.activeSection = section;
    },
  },
  modules: {
    web3Module,
    contractModule,
    storageModule,
  },
});

store.watch(
  (_, getters) => getters["contractModule/currentTokenId"],
  () => {
    console.log("Registered")
    store.dispatch("contractModule/loadTokenDetails");
  }
);

export default store;
