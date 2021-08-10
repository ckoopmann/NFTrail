<template>
  <v-card class="mx-auto my-12" max-width="500">
    <v-img max-width="500" max-height="500" :src="currentTokenDetails.pictureURI"></v-img>
    <v-card-title>{{ currentTokenDetails.assetIdentifier }}</v-card-title>
    <v-card-text>
      <v-list-item>
        <v-list-item-title>Token Id</v-list-item-title>
        <v-list-item-subtitle>{{ currentTokenId }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Attached Documents</v-list-item-title>
        <v-list-item-subtitle>{{
          currentTokenDetails.documents.length
        }}</v-list-item-subtitle>
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
