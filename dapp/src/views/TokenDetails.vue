<template>
  <div>
    <TokenSummaryCard />
    <UploadDocumentCard />
  </div>
</template>

<script>
import TokenSummaryCard from "../components/TokenSummaryCard.vue";
import UploadDocumentCard from "../components/UploadDocumentCard.vue";
export default {
  components: { TokenSummaryCard, UploadDocumentCard },
};
</script>
