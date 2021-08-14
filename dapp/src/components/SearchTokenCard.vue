<template>
  <v-card class="mx-auto my-12" max-width="500">
    <v-card-title>Search Token</v-card-title>
    <v-form @submit.prevent="search">
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="assetIdentifier"
              label="Vehicle Identification Number"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <div v-if="searched">
          <v-row v-if="notFound"
            ><v-col cols="12"
              ><h2>{{ errorMessage }}</h2></v-col
            ></v-row
          >
          <v-list v-else three-line>
            <template v-for="(result, index) in searchResults">
              <v-list-item :key="index">
                <v-list-item-content>
                  <v-list-item-title
                    v-html="result.assetIdentifier"
                  ></v-list-item-title>
                  <v-list-item-subtitle>{{
                    result.owner
                  }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon :to="result.to" router exact>
                    <v-icon large color="blue lighten-1"
                      >mdi-information</v-icon
                    >
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="blue darken-1"
          type="button"
          :loading="loading"
          :disabled="loading"
          @click.prevent="search"
        >
          Search
          <template #loader>
            <span>Loading...</span>
          </template>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      searched: false,
      notFound: false,
      assetIdentifier: "",
      errorMessage: "",
      searchResults: [
        {
          assetIdentifier: "DummyAsset",
          owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          to: `/dapp/details/1`,
        },
      ],
    };
  },
  methods: {
    ...mapActions("contractModule", ["searchToken"]),
    async search() {
      try {
        this.searchResults = [];
        this.notFound = false;
        this.loading = true;
        console.info("Searching for token", this.assetIdentifier);
        const result = await this.searchToken(this.assetIdentifier);
        if (result == null) {
          this.notFound = true;
          this.errorMessage = `Asset ${this.assetIdentifier} not found`;
        } else {
          result.to = `/dapp/details/${result.tokenId}`;
          this.searchResults.push(result);
          this.assetIdentifier = "";
        }
      } catch (e) {
        console.error("Search failed with exception: ", e);
      } finally {
        this.loading = false;
        this.searched = true;
      }
    },
  },
};
</script>
