<template>
  <div>
    <v-app-bar app color="blue-grey darken-2" dark>
      <router-link to="/">
        <div class="d-flex align-center">
          <v-img
            class="shrink mr-2"
            contain
            src="assets/document.png"
            transition="scale-transition"
            width="40"
          />
        </div>
      </router-link>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("contractModule", ["contractDeployed", "contractAddress"]),
    ...mapGetters("web3Module", ["networkType", "walletConnected"]),
    etherScanLink() {
      return `https://rinkeby.etherscan.io/address/${this.contractAddress}`;
    },
  },
};
</script>
