<template>
  <v-card class="mx-auto my-12" max-width="500">
    <v-card-title>Ownership History</v-card-title>
    <v-card-text>
      <v-list three-line>
        <template v-for="(element, index) in ownershipHistory">
          <v-list-item :key="index">
            <v-list-item-content>
              <v-list-item-title
                v-html="element.to"
              ></v-list-item-title>
              <v-list-item-subtitle>Time of Transfer: {{
                new Date(element.timestamp).toLocaleString("en-GB")
              }}</v-list-item-subtitle>
              <v-list-item-subtitle
                  >Previous Owner: {{ element.from}}</v-list-item-subtitle>
            </v-list-item-content>
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
    ownershipHistory() {
      return this.currentTokenDetails?.ownershipHistory ?? [];
    },
  },
};
</script>
