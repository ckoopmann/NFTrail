<template>
  <v-btn large rounded color="#36adb5" v-bind="attrs" v-on="on" to="dapp">
    <v-icon class="me-2" :size="20">mdi-link</v-icon>
    <span v-if="!icon">Connect Wallet</span>
  </v-btn>
</template>

<script>
export default {
  props: {
    transition: {
      default: "slide-y-transition", // 'slide-y-transition'
    },
  },
};
</script>

<style lang="scss" scoped></style>
