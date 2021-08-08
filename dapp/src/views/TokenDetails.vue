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
export default {
  components: { TokenSummaryCard, UploadDocumentCard, DocumentListCard },
};
</script>
