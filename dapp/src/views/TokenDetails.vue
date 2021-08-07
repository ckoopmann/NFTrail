<template>
  <v-card class="mx-auto my-12" max-width="500">
    <v-card-title>Token Details</v-card-title>
    <v-card-text>
      <v-list-item>
        <v-list-item-title>Token Id</v-list-item-title>
        <v-list-item-subtitle>{{ tokenId }}</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>Asset Identifier</v-list-item-title>
        <v-list-item-subtitle>{{
          tokenData.assetIdentifier
        }}</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-title> Metadata URI </v-list-item-title>
        <v-list-item-subtitle>{{
          tokenData.genesisMetadataURI
        }}</v-list-item-subtitle>
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
