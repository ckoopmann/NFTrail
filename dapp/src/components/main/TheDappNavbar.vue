<template
  ><div>
    <v-app-bar
      :light="light"
      :height="scrolled ? this.navbarHeight : pcOnly ? 130 : 100"
      class="navbar"
      :class="{
        blank: !scrolled & !light,
        'soft-shadow': light,
        'dark-gradient': scrolled && !light,
      }"
      :flat="!light"
      :color="light ? 'white' : 'dark'"
      :dark="!light"
    >
      <v-container class="d-flex align-center">
        <div>
          <!-- logo -->
          <logo :light="light" :width="pcOnly ? 140 : 125" />
        </div>
        <v-spacer />
        <v-slide-x-reverse-transition appear>
          <div class="d-flex">
            <div class="d-flex align-center ms-8">
              <connect-button :large="pcOnly" />
            </div>
          </div>
        </v-slide-x-reverse-transition>
      </v-container>
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
      You do not seem to have Metamask connected to this site. To use this
      application you will have to
      <a href="https://metamask.io/download">install Metamask</a> and reload the
      page.
    </v-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./logo";

import GlobalComputed from "@/helpers/global-computed";
import GlobalMethods from "@/helpers/global-methods";
import links from "@/helpers/links";
import ConnectButton from "../custom/ConnectButton.vue";

export default {
  name: "navbar",
  components: { Logo, ConnectButton },
  props: {
    lightTheme: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scrolled: false,

      links,
    };
  },
  computed: {
    ...mapGetters("contractModule", ["contractDeployed", "contractAddress"]),
    ...mapGetters("web3Module", ["networkType", "walletConnected"]),
    etherScanLink() {
      return `https://rinkeby.etherscan.io/address/${this.contractAddress}`;
    },
    light() {
      return this.lightTheme && this.scrolled;
    },
    activeSection() {
      return this.$store.state.activeSection;
    },
    ...GlobalComputed,
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },

    ...GlobalMethods,
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
};
</script>

<style lang="scss">
.v-application .navbar {
  &,
  .v-toolbar__content {
    transition: height 0.2s ease-out, background-color 0.1s linear !important;
  }
  &.soft-shadow {
    box-shadow: 0 0 transparent, 0 0 transparent,
      0 5px 5px -4px rgba(0, 0, 0, 0.1) !important;
  }
  &.dark-gradient {
    box-shadow: 0 1px 8px 0px rgba(0, 0, 0, 0.2) !important;
  }
  &.blank {
    &,
    .v-toolbar__content {
      background: none !important;
      border: none !important;
      box-shadow: none !important;
    }
  }
  .v-btn {
    font-weight: normal !important;
    text-transform: capitalize;
    letter-spacing: 1.1px;
  }
}
body {
  background-color: black;
}
</style>
