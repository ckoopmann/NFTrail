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
              <v-list-item-subtitle
                v-html="document.creationDate"
              ></v-list-item-subtitle>
              <v-list-item-subtitle
                v-html="document.author"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
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
  data() {
    return {
      attachedDocuments: [
        {
          cid: "asdf",
          creationDate: "2021-08-07 12:00:00",
          author: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          description: "Initial Sale Contract",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("contractModule", ["ownedIds"]),
    tokenData() {
      return this.ownedIds[this.tokenId];
    },
  },
};
</script>
