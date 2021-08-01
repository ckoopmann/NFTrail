<i18n>
{
    "en": {
        "description": "Software Development and Information Technology Company that provides software solutions, products and platforms to e-commerce, and other e-business industries in the middle east.",
        "links": "Navigation:",
        
        "resources": {
            "subheader": "Checkout our resources",
            "github": "Github"
        }
    }
}
</i18n>
<template>
  <footer
    class="e-footer footer-bg strong-text--text"
    :class="{ phone: phoneOnly }"
  >
    <v-container
      data-aos="fade-up"
      data-aos-duration="600"
      class="row-container text--text py-10"
    >
      <v-row>
        <v-col
          :cols="pcOnly ? 4 : 12"
          class="pe-lg-12"
          :class="{
            'd-flex text-center justify-center align-center flex-column': phoneOnly,
          }"
        >
          <logo width="160" />
        </v-col>
        <template v-if="pcOnly">
          <v-col :cols="pcOnly ? 4 : 12" class="ps-lg-12">
            <v-subheader class="text--text">
              {{ $t("resources.subheader") }}
            </v-subheader>
            <v-list color="footer-bg" dark class="text--text" two-line>
              <v-list-item
                v-for="item in resourcesItems"
                :key="item.name"
                :target="item.href ? '_blank' : ''"
                :href="
                  item.href
                    ? item.href
                    : item.name === 'email'
                    ? `mailto:${item.value}`
                    : ''
                "
              >
                <v-list-item-icon>
                  <v-icon :color="item.color">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle class="mb-2">{{
                    $t("resources." + item.name)
                  }}</v-list-item-subtitle>
                  <v-list-item-title>{{ item.value }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </template>
      </v-row>
    </v-container>
    <v-spacer />
  </footer>
</template>

<script>
import GlobalComputed from "@/helpers/global-computed";
import GlobalMethods from "@/helpers/global-methods";
import Logo from "./logo";
import links from "@/helpers/links";

export default {
  name: "e-footer",
  props: {
    light: {
      type: Boolean,
      default: false,
    },
  },
  components: { Logo },

  data() {
    return {
      links,
      resourcesItems: [
        {
          name: "github",
          icon: "mdi-github",
          value: "ckoopmann/NFTrail",
          color: "text",
          href: "https://github.com/ckoopmann/NFTrail",
        },
      ],
    };
  },
  computed: {
    ...GlobalComputed,
  },
  methods: {
    ...GlobalMethods,
  },
};
</script>
<style lang="scss" scoped>
.e-footer {
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-content: stretch;
  flex-direction: column;

  &.phone {
    min-height: 400px;
  }

  .footer-watermark {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    line-height: 1.6rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 2rem 0;
  }
  .row-container {
    line-height: 1.9rem;
  }
}
</style>
