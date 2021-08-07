<template>
  <v-card class="mx-auto my-12" max-width="500">
    <v-img max-width="500" :src="tokenData.pictureURI"></v-img>
    <v-card-title>{{ tokenData.assetIdentifier }}</v-card-title>
    <v-card-text>
      <v-list-item>
        <v-list-item-title>Token Id</v-list-item-title>
        <v-list-item-subtitle>{{ tokenId }}</v-list-item-subtitle>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("contractModule", ["ownedIds"]),
    tokenId() {
      return this.$route.params.id;
    },
    tokenData() {
      return this.ownedIds[this.tokenId];
    },
  },
};
</script>
