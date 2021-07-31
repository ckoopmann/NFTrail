<template>
  <div class="about">
    <h1 class="mt-4 mb-4 white--text">NFTrail</h1>
    <h4 class="mb-4 white--text">Track your real world assets on chain</h4>
    <AboutElement title="What is NFTrail ?" class="mb-4">
      NFTrail allows you to tokenize your real word assets and manage
      documentation etc. throughout its life cycle. Assets you could tokenize
      include:
      <ol>
        <li>Vehicles (Cars, Bikes etc.)</li>
        <li>Real Estate</li>
        <li>Industrial Machinery</li>
        <li>Consumer Devices</li>
      </ol>
      Processes you could document / manage using NFTrail could be:
      <ol>
        <li>Change of Ownership</li>
        <li>Technical Maintenance</li>
        <li>Appraisals and other Certifications</li>
      </ol>
    </AboutElement>
  </div>
</template>

<script>
import AboutElement from "../components/AboutElement";

export default {
  components: { AboutElement },
};
</script>

<style>
ul {
  list-style-position: inside;
}
ol li {
  padding: 5px;
  margin-left: 35px;
}
.about {
  background-image: url(/assets/ethereum.jpg);
  background-size: cover; /* <------ */
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  display: inline-table;
}
</style>
