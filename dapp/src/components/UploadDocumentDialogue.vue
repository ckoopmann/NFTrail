<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" color="primary" v-on="on">
        Upload Document</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Upload document</span>
      </v-card-title>
      <form>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  label="Click here to select a file"
                  outlined
                  v-model="chosenFile"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel</v-btn>
          <v-btn
            color="blue darken-1"
            type="button"
            @click.prevent="uploadPicture"
            :loading="loading"
            :disabled="loading || noFileSelected"
          >
            Upload
            <template #loader>
              <span>Loading...</span>
            </template>
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["value"],
  data() {
    return {
      dialog: false,
      loading: false,
      chosenFile: null,
    };
  },
  computed: {
    noFileSelected() {
      return this.chosenFile == null;
    },
  },
  methods: {
    ...mapActions("storageModule", ["uploadFiles"]),
    async uploadPicture() {
      try {
        this.loading = true;
        console.info("Uploading Picture: ", this.chosenFile);
        const cid = await this.uploadFiles([this.chosenFile]);
        console.info("Uploaded Picture with cid: ", cid);
        this.$emit("input", cid);
        this.dialog = false;
      } catch (e) {
        console.error("Upload failed with exception: ", e);
      } finally {
        this.loading = false;
      }
    },

    close() {
      this.dialog = false;
    },
  },
};
</script>
