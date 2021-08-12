<template>
  <v-card class="mx-auto my-12" max-width="500">
    <v-img max-width="500" max-height="500" :src="currentTokenDetails.pictureURI"></v-img>
    <v-card-title>{{ currentTokenDetails.assetIdentifier }}</v-card-title>
    <v-card-text>
      <v-list-item>
        <v-list-item-title>Owner</v-list-item-title>
        <v-list-item-subtitle>{{ currentTokenDetails.owner }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Manufacturer </v-list-item-title>
        <v-list-item-subtitle>{{ currentTokenDetails.manufacturer }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Make </v-list-item-title>
        <v-list-item-subtitle>{{ currentTokenDetails.make }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Model </v-list-item-title>
        <v-list-item-subtitle>{{ currentTokenDetails.model }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>ModelYear </v-list-item-title>
        <v-list-item-subtitle>{{ currentTokenDetails.modelYear }}</v-list-item-subtitle>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("contractModule", ["currentTokenDetails", "currentTokenId"]),
  },
};
</script>
