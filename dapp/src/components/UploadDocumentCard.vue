<template>
  <v-card class="mx-auto my-12" max-width="500">
    <v-card-title>Upload new document</v-card-title>
    <form>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="description"
                label="Document Description"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="documentCID"
                label="Document CID"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <UploadDocumentDialogue v-model="documentCID" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="blue darken-1"
          type="button"
          @click.prevent="attachDocument"
          :loading="loading"
          :disabled="loading"
        >
          Attach Document
          <template #loader>
            <span>Loading...</span>
          </template>
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import UploadDocumentDialogue from "./UploadDocumentDialogue.vue";
export default {
  components: { UploadDocumentDialogue },
  data() {
    return {
      loading: false,
      documentCID: "",
      description: "",
    };
  },
  methods: {
    ...mapActions("contractModule", ["addDocument"]),
    async attachDocument() {
      try {
        this.loading = true;
        console.info("Adding Document: ", this.documentCID);
        this.addDocument({
          tokenId: this.$route.params.id,
          documentCID: this.documentCID,
          description: this.description,
        });
        this.documentCID = "";
        this.description = "";
      } catch (e) {
        console.error("Upload failed with exception: ", e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
