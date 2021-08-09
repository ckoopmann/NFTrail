<template>
  <v-card class="mx-auto my-12" max-width="500">
    <v-card-title>Search Token</v-card-title>
    <form>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="assetIdentifier"
              label="Asset identifier"
              required
            ></v-text-field>
          </v-col>
          <v-list three-line v-if="searched">
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
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="blue darken-1"
          type="button"
          @click.prevent="search"
          :loading="loading"
          :disabled="loading"
        >
          Search
          <template #loader>
            <span>Loading...</span>
          </template>
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      searched: false,
      assetIdentifier: "",
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
    async search() {
      try {
        this.loading = true;
        console.info("Searching for token", this.assetIdentifier);
        this.assetIdentifier = "";
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
