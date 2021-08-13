<template>
  <v-card class="mx-auto my-12" max-width="500">
    <v-card-title>Transfer Ownership</v-card-title>
    <form>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newOwner"
                label="New Owner"
                required
              ></v-text-field>
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
          Transfer Token
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
export default {
  data() {
    return {
      loading: false,
      newOwner: "",
    };
  },
  methods: {
    ...mapActions("contractModule", ["transferToken"]),
    async attachDocument() {
      try {
        this.loading = true;
        console.info("Transfering token to: ", this.newOwner);
        this.transferToken({
          tokenId: this.$route.params.id,
          to: this.newOwner,
        });
        this.newOwner = "";
      } catch (e) {
        console.error("Transfer failed with exception: ", e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
