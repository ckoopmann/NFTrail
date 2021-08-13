<template>
  <div v-if="currentTokenDetails != null">
    <TokenSummaryCard />
    <OwnershipHistoryCard />
    <TransferCard v-if="isOwner" />
    <DocumentListCard />
    <UploadDocumentCard v-if="isOwner" />
  </div>
</template>

<script>
import { ethers } from "ethers";
import { mapGetters } from "vuex";

import TokenSummaryCard from "../components/TokenSummaryCard.vue";
import UploadDocumentCard from "../components/UploadDocumentCard.vue";
import DocumentListCard from "../components/DocumentListCard.vue";
import OwnershipHistoryCard from "../components/OwnershipHistoryCard.vue";
import TransferCard from "../components/TransferCard.vue";

export default {
  components: {
    TokenSummaryCard,
    UploadDocumentCard,
    DocumentListCard,
    OwnershipHistoryCard,
    TransferCard,
  },
  computed: {
    ...mapGetters("contractModule", ["currentTokenDetails"]),
    ...mapGetters("web3Module", ["selectedAccount"]),
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
};
</script>
