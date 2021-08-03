<template>
  <v-btn large rounded color="#36adb5" @click="connectAndRegisterListeners">
    <v-icon class="me-2" :size="20">mdi-link</v-icon>
    <span v-if="!icon">Connect Wallet</span>
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    transition: {
      default: "slide-y-transition", // 'slide-y-transition'
    },
  },
  methods: {
    ...mapActions("web3Module", ["connectWallet", "registerUpdateListener"]),
    async connectAndRegisterListeners() {
      await this.connectWallet();
      await this.registerUpdateListener();
    },
  },
};
</script>

<style lang="scss" scoped></style>
