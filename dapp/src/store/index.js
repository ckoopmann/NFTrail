import Vue from "vue";
import Vuex from "vuex";
import web3Module from "./modules/web3.module";
import web3 from "./modules/web3.module";
import contractModule from "./modules/contract.module";

Vue.use(Vuex);
export default new Vuex.Store({
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
    web3,
    contractModule,
  },
});
