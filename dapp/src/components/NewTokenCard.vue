<template>
  <v-card class="mx-auto my-12" max-width="500">
    <v-card-title>Mint New Token</v-card-title>
    <form>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="assetIdentifier"
                label="Asset identifier"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="pictureCID"
                label="CID of genesis documents"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <UploadPictureDialogue />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="blue darken-1"
          type="button"
          @click.prevent="mint"
          :loading="loading"
          :disabled="loading"
        >
          Mint
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
import UploadPictureDialogue from "./UploadPictureDialogue.vue";
export default {
  components: { UploadPictureDialogue },
  data() {
    return {
      loading: false,
      pictureCID: "",
      assetIdentifier: "",
    };
  },
  methods: {
    ...mapActions("contractModule", ["mintNFT", "loadOwnedIds"]),
    async mint() {
      try {
        this.loading = true;
        console.info("Minting amount of tokens: ", this.syntheticTokens);
        await this.mintNFT({
          pictureCID: this.pictureCID,
          assetIdentifier: this.assetIdentifier,
        });
        this.pictureCID = "";
        this.assetIdentifier = "";
      } catch (e) {
        console.error("Mint failed with exception: ", e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
