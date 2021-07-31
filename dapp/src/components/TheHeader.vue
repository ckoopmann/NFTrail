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
    <div v-if="walletConnected">
      <v-alert v-if="contractDeployed" color="green" class="mb-0" dense>
        Succesfully connected to the contract (<a :href="etherScanLink"
          >etherscan</a
        >).
      </v-alert>
      <v-alert v-else color="red lighten-2" class="mb-0" dense>
        Contract is not deployed on {{ networkType }} network please switch your
        network to the Rinkeby Test-Network.
      </v-alert>
    </div>
    <v-alert v-else color="red lighten-2" class="mb-0" dense>
        You do not seem to have Metamask connected to this site. To use this application
        you will have to <a href="https://metamask.io/download">install Metamask</a> and reload the page.
    </v-alert>
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
