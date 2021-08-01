<template>
  <v-btn large rounded color="#36adb5" v-bind="attrs" v-on="on" to="app">
    <v-icon class="me-2" :size="20">mdi-play-circle-outline</v-icon>
    <span v-if="!icon">Open App</span>
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
