<template>
  <v-app id="app">
    <TheHeader />
    <router-view style="height:100%" />
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import TheHeader from "./components/TheHeader.vue";

export default {
  name: "app",
  components: { TheHeader },

  methods: {
    ...mapActions("web3Module", ["initializeWeb3", "registerUpdateListener"]),
  },
  async mounted() {
    await this.registerUpdateListener();
    await this.initializeWeb3();
    console.log("Active Account: ", this.activeAccount);
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100vh;
}
</style>
