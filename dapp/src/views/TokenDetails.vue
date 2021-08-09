<template>
  <div>
    <TokenSummaryCard />
    <DocumentListCard />
    <UploadDocumentCard v-if="isOwner" />
  </div>
</template>

<script>
import { ethers } from "ethers";
import { mapActions, mapGetters } from "vuex";

import TokenSummaryCard from "../components/TokenSummaryCard.vue";
import UploadDocumentCard from "../components/UploadDocumentCard.vue";
import DocumentListCard from "../components/DocumentListCard.vue";
export default {
  components: { TokenSummaryCard, UploadDocumentCard, DocumentListCard },
  computed: {
    ...mapGetters("contractModule",["currentTokenDetails"]),
    ...mapGetters("web3Module",["selectedAccount"]),
    isOwner() {
      if (this.currentTokenDetails == null) return false;
      console.log(
        "Tokenowners",
        this.currentTokenDetails.owner,
        this.selectedAccount
      );
      return (
        ethers.utils.getAddress(this.currentTokenDetails.owner) ===
        ethers.utils.getAddress(this.selectedAccount)
      );
    },
  },
  methods: mapActions("contractModule", ["loadTokenDetails"]),
  mounted() {
    this.loadTokenDetails(this.$route.params.id);
  },
};
</script>
