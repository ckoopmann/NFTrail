<template>
  <v-btn large rounded color="#36adb5" to="dapp">
    <v-icon class="me-2" :size="20">mdi-play-circle-outline</v-icon>
    Open App
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
