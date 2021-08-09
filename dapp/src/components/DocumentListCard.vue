<template>
  <v-card class="mx-auto my-12" max-width="500">
    <v-card-title>Attached Documents</v-card-title>
    <v-card-text>
      <v-list three-line>
        <template v-for="(document, index) in attachedDocuments">
          <v-list-item :key="index">
            <v-list-item-content>
              <v-list-item-title
                v-html="document.description"
              ></v-list-item-title>
              <v-list-item-subtitle>{{
                new Date(document.creationTime).toLocaleString("en-GB")
              }}</v-list-item-subtitle>
              <v-list-item-subtitle
                v-html="document.author"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                icon
                target="_blank"
                :href="`https://ipfs.io/ipfs/${document.cid}`"
              >
                <v-icon large color="blue lighten-1">mdi-download-box</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("contractModule", ["currentTokenDetails"]),
    attachedDocuments() {
      return this.currentTokenDetails?.documents ?? [];
    },
  },
};
</script>
