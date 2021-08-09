<template>
  <div>
    <TokenSummaryCard />
    <DocumentListCard />
    <UploadDocumentCard />
  </div>
</template>

<script>
import TokenSummaryCard from "../components/TokenSummaryCard.vue";
import UploadDocumentCard from "../components/UploadDocumentCard.vue";
import DocumentListCard from "../components/DocumentListCard.vue";
import { mapActions } from "vuex";
export default {
  components: { TokenSummaryCard, UploadDocumentCard, DocumentListCard },
  methods: mapActions("contractModule", ["loadTokenDetails"]),
  mounted() {
    this.loadTokenDetails(this.$route.params.id);
  },
};
</script>
