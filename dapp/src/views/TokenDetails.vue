<template>
  <div>
    <TokenSummaryCard />
    <DocumentListCard />
    <UploadDocumentCard v-if="isOwner" />
  </div>
</template>

<script>
import TokenSummaryCard from "../components/TokenSummaryCard.vue";
import UploadDocumentCard from "../components/UploadDocumentCard.vue";
import DocumentListCard from "../components/DocumentListCard.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { TokenSummaryCard, UploadDocumentCard, DocumentListCard },
  computed: {
    ...mapGetters("contractModule", "currentTokenDetails"),
    ...mapGetters("web3Module", "selectedAccount"),
    isOwner() {
      if (this.currentTokenDetails == null) return false;
      return this.currentTokenDetails.owner === this.selectedAccount;
    },
  },
  methods: mapActions("contractModule", ["loadTokenDetails"]),
  mounted() {
    this.loadTokenDetails(this.$route.params.id);
  },
};
</script>
