<template>
  <div class="page page-sections">
    <section
      id="headerSection"
      data-section="home"
      class="header-section dark-gradient fullpage-section"
    >
      <animated-background />
      <v-container
        v-if="!loading"
        class="fill-height pt-12"
        :class="{ 'align-center': phoneOnly }"
      >
        <v-slide-y-transition appear>
          <h1 class="strong-text--text">
            <animate-text
              :duration="1500"
              :stop-after="0"
              :delay="500"
              :text="$t('sections.1.title')"
            />
            <!-- <span class="secondary--text font-weight-medium">NFTrail</span> -->
          </h1>
        </v-slide-y-transition>
        <v-slide-x-transition appear>
          <h2 class="text--text mt-5">
            <animate-text
              @done="showSection1Actions = true"
              :duration="2500"
              :delay="2000"
              :text="$t('sections.1.subtitle')"
            ></animate-text>
            <!-- <div>Information Technology & Electronic Business Company</div> -->
          </h2>
        </v-slide-x-transition>
        <div
          class="actions"
          :class="{
            'fade-up-off': !showSection1Actions,
            'fade-up-on': showSection1Actions,
          }"
        >
          <!-- <v-btn @click="navigateToLink('#productsSection')" color="strong-text" tile :large="pcOnly" depressed outlined class="me-6">{{$t('sections.actions.products')}}</v-btn> -->
          <v-btn
            @click="navigateToLink('#aboutSection')"
            color="strong-text"
            tile
            :large="pcOnly"
            depressed
            outlined
            class="me-6"
            >{{ $t("sections.actions.about") }}</v-btn
          >
        </div>
      </v-container>

      <div class="section-scroll-icon">
        <scroll-icon @click="scrollToSection(2)" />
      </div>
    </section>
    <home-section
      id="aboutSection"
      data-section="about"
      :headline="$t('sections.about.title')"
      :subtitle="$t('sections.about.subtitle')"
      divider
    >
      <v-row>
        <v-col
          :data-aos="pcOnly ? (isRtl ? 'fade-left' : 'fade-right') : 'fade-up'"
          data-aos-duration="800"
          :cols="pcOnly ? 5 : 12"
          class=""
        >
          <v-img
            src="/assets/eth-diamond-purple.png"
            contain
            width="100%"
            max-height="320"
          ></v-img>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          :data-aos="pcOnly ? (isRtl ? 'fade-right' : 'fade-left') : 'fade-up'"
          data-aos-duration="800"
          class="mt-6 mt-lg-0"
          :cols="pcOnly ? 6 : 12"
        >
          <h1 class="headline">{{ $t("sections.about.row1.title") }}</h1>
          <p
            class="medium-text text-light--text mt-6 mt-lg-8"
            :class="{ 'text-center': phoneOnly }"
          >
            {{ $t("sections.about.row1.content") }}
          </p>
          <div class="actions">
            <v-btn
              @click="navigateToLink('#industriesSection')"
              tile
              large
              depressed
              color="primary"
              href="https://ethereum.org/en/developers/docs/standards/tokens/erc-721/"
              >{{ $t("sections.about.row1.action") }}</v-btn
            >
          </div>
        </v-col>
      </v-row>

      <v-row style="margin-top: 3.5rem" class="flex-row-reverse">
        <v-col
          :data-aos="pcOnly ? (isRtl ? 'fade-right' : 'fade-left') : 'fade-up'"
          data-aos-duration="800"
          :cols="pcOnly ? 5 : 12"
          class=""
        >
          <v-img
            src="/assets/ipfs-logo-vector-ice.svg"
            contain
            width="100%"
            max-height="320"
          ></v-img>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          :data-aos="pcOnly ? (isRtl ? 'fade-left' : 'fade-right') : 'fade-up'"
          data-aos-duration="800"
          class="mt-6 mt-lg-0"
          :cols="pcOnly ? 6 : 12"
        >
          <h1 class="headline">{{ $t("sections.about.row2.title") }}</h1>
          <p
            class="medium-text text-light--text mt-6 mt-lg-8"
            :class="{ 'text-center': phoneOnly }"
          >
            {{ $t("sections.about.row2.content") }}
          </p>
          <div class="actions">
            <v-btn
              @click="navigateToLink('#industrySection')"
              tile
              large
              depressed
              color="primary"
              href="https://ipfs.io/"
              >{{ $t("sections.about.row2.action") }}</v-btn
            >
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          :data-aos="pcOnly ? (isRtl ? 'fade-left' : 'fade-right') : 'fade-up'"
          data-aos-duration="800"
          :cols="pcOnly ? 5 : 12"
          class=""
        >
          <v-img
            src="/assets/chainlink.png"
            contain
            width="100%"
            max-height="320"
          ></v-img>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          :data-aos="pcOnly ? (isRtl ? 'fade-right' : 'fade-left') : 'fade-up'"
          data-aos-duration="800"
          class="mt-6 mt-lg-0"
          :cols="pcOnly ? 6 : 12"
        >
          <h1 class="headline">{{ $t("sections.about.row3.title") }}</h1>
          <p
            class="medium-text text-light--text mt-6 mt-lg-8"
            :class="{ 'text-center': phoneOnly }"
          >
            {{ $t("sections.about.row3.content") }}
          </p>
          <div class="actions">
            <v-btn
              tile
              large
              depressed
              color="primary"
              href="https://chainlinklabs.com/"
              >{{ $t("sections.about.row3.action") }}</v-btn
            >
          </div>
        </v-col>
      </v-row>

      <v-row style="margin-top: 3.5rem" class="flex-row-reverse">
        <v-col
          :data-aos="pcOnly ? (isRtl ? 'fade-right' : 'fade-left') : 'fade-up'"
          data-aos-duration="800"
          :cols="pcOnly ? 5 : 14"
          class=""
        >
          <v-img
            src="/assets/polygon.png"
            contain
            width="100%"
            max-height="340"
          ></v-img>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          :data-aos="pcOnly ? (isRtl ? 'fade-left' : 'fade-right') : 'fade-up'"
          data-aos-duration="800"
          class="mt-6 mt-lg-0"
          :cols="pcOnly ? 6 : 14"
        >
          <h1 class="headline">{{ $t("sections.about.row4.title") }}</h1>
          <p
            class="medium-text text-light--text mt-6 mt-lg-8"
            :class="{ 'text-center': phoneOnly }"
          >
            {{ $t("sections.about.row4.content") }}
          </p>
          <div class="actions">
            <v-btn
              @click="navigateToLink('#industrySection')"
              tile
              large
              depressed
              color="primary"
              href="https://polygon.technology/"
              >{{ $t("sections.about.row4.action") }}</v-btn
            >
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          :data-aos="pcOnly ? (isRtl ? 'fade-left' : 'fade-right') : 'fade-up'"
          data-aos-duration="800"
          :cols="pcOnly ? 5 : 12"
          class=""
        >
          <v-img
            src="/assets/covalent.png"
            contain
            width="80%"
            max-height="400"
          ></v-img>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          :data-aos="pcOnly ? (isRtl ? 'fade-right' : 'fade-left') : 'fade-up'"
          data-aos-duration="800"
          class="mt-6 mt-lg-0"
          :cols="pcOnly ? 6 : 12"
        >
          <h1 class="headline">{{ $t("sections.about.row5.title") }}</h1>
          <p
            class="medium-text text-light--text mt-6 mt-lg-8"
            :class="{ 'text-center': phoneOnly }"
          >
            {{ $t("sections.about.row5.content") }}
          </p>
          <div class="actions">
            <v-btn
              tile
              large
              depressed
              color="primary"
              href="https://www.covalenthq.com/"
              >{{ $t("sections.about.row5.action") }}</v-btn
            >
          </div>
        </v-col>
      </v-row>



      <v-row style="margin-top: 3.5rem" class="flex-row-reverse">
        <v-col
          :data-aos="pcOnly ? (isRtl ? 'fade-right' : 'fade-left') : 'fade-up'"
          data-aos-duration="800"
          :cols="pcOnly ? 5 : 12"
          class=""
        >
          <v-img
            src="/assets/hiking.jpg"
            contain
            width="100%"
            max-height="320"
          ></v-img>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          :data-aos="pcOnly ? (isRtl ? 'fade-left' : 'fade-right') : 'fade-up'"
          data-aos-duration="800"
          class="mt-6 mt-lg-0"
          :cols="pcOnly ? 6 : 12"
        >
          <h1 class="headline">{{ $t("sections.about.row6.title") }}</h1>
          <p
            class="medium-text text-light--text mt-6 mt-lg-8"
            :class="{ 'text-center': phoneOnly }"
          >
            {{ $t("sections.about.row6.content") }}
          </p>
        </v-col>
      </v-row>

    </home-section>

    <cols-section
      id="useCasesSection"
      headline="Use cases"
      subtitle="NFTrail tokens can support a variety of use cases / transactions"
      data-section="useCases"
      :cols="useCasesCols"
    >
    </cols-section>

    <cols-section
      id="assetClassesSection"
      headline="Asset Classes"
      subtitle="Use NFTrail to tokenize various different type of assets"
      data-section="assetClasses"
      :cols="industriesCols"
    >
    </cols-section>

    <the-footer />

    <scroll-to-top />
  </div>
</template>

<script>
// @ is an alias to /src
import "particles.js";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

import ScrollToTop from "@/components/custom/scroll-to-top";
import AnimateText from "@/components/custom/animate-text";
import ScrollIcon from "@/components/custom/scroll-icon";
import AnimatedBackground from "@/components/custom/animated-background";
import ColsSection from "@/components/default/cols-section";
import HomeSection from "@/components/default/HomeSection";
import TheFooter from "@/components/main/TheFooter";

import GlobalComputed from "@/helpers/global-computed";
import GlobalMethods from "@/helpers/global-methods";

export default {
  name: "Home",
  components: {
    ScrollToTop,
    AnimateText,
    ColsSection,
    HomeSection,
    ScrollIcon,
    TheFooter,
    AnimatedBackground,
  },
  data() {
    return {
      showSection1Actions: false,
      currentScrollTop: 0,
    };
  },
  computed: {
    useCasesCols() {
      return [
        {
          color: "blue",
          icon: "mdi-cash-multiple",
          headline: "Sale",
          description:
            "Bring transparency to various markets by proving ownership, maintenance record, registration etc. of the asset on sale.",
        },
        {
          color: "deep-orange",
          icon: "mdi-calendar-clock",
          headline: "Lease",
          description:
            "Document lease agreements as well as the state of the asset at the beginning / end of the lease",
        },
        {
          color: "teal",
          icon: "mdi-shield-edit-outline",
          headline: "Insurance",
          description:
            "Support quoting / claims management by documenting damages on chain.",
        },
      ];
    },
    industriesCols() {
      return [
        {
          color: "blue",
          icon: "mdi-car-outline",
          headline: "Vehicles",
          description:
            "Document changes in ownership, registration, maintenance and inspection of you vehicle.",
        },
        {
          color: "deep-orange",
          icon: "mdi-home-outline",
          headline: "Real Estate",
          description:
            "Register your property on chain and keep track of appraisals, building permits and much more.",
        },
        {
          color: "teal",
          icon: "mdi-brush",
          headline: "Art",
          description:
            "Tokenize your real-word masterpieces and manage documents regarding authenticity, restoration etc.",
        },
      ];
    },
    ...GlobalComputed,
  },
  methods: {
    scrollToSection(n) {
      let i = n - 1,
        element = document.querySelectorAll(".page-sections section")[i];
      if (element) {
        this.scrollToElement(element);
      }
    },
    scrollObserver() {
      window.addEventListener("scroll", () => {
        this.currentScrollTop = document.documentElement.scrollTop;
      });
    },
    handleScrollChange(scrollTop) {
      const sections = document.querySelectorAll(".page-sections section");
      sections.forEach((section) => {
        let offsetTop = section.offsetTop - this.navbarHeight, // decrease navbarHeight
          offsetBottom = offsetTop + section.offsetHeight;

        if (scrollTop >= offsetTop && scrollTop < offsetBottom) {
          let sectionName = section.getAttribute("data-section");
          if (sectionName) {
            this.$store.commit("SET_ACTIVE_SECTION", sectionName);
          }
          // section is visible...
          if (section.getAttribute("data-theme") === "light") {
            if (!this.lightNavbar) {
              this.$store.commit("SET_LIGHT_NAVBAR", true);
            }
          } else {
            if (this.lightNavbar) {
              this.$store.commit("SET_LIGHT_NAVBAR", false);
            }
          }
        }
      });
    },

    ...GlobalMethods,
  },
  watch: {
    currentScrollTop(top) {
      this.handleScrollChange(top);
    },
  },

  mounted() {
    this.scrollObserver();
    AOS.init({
      container: document.documentElement,
      once: true,
      easing: "ease",
    });
  },
};
</script>
<style lang="scss" scoped>
section {
  .container {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;

    &,
    * {
      z-index: 1;
    }
  }
  &.header-section {
    color: white;
  }
  h1 {
    font-size: 4rem;
    font-weight: 300;

    @media (max-width: 960px) {
      text-align: center;
      font-size: 1.7rem;
      line-height: 2.4rem;
      font-weight: 400;
    }
  }
  h2 {
    font-size: 2.75rem;
    word-break: break-word !important;
    font-weight: 200;

    @media (max-width: 960px) {
      text-align: center;
      font-size: 1.3rem;
      font-weight: 300;
    }
  }
  .actions {
    margin-top: 3rem;
    @media (max-width: 960px) {
      margin: 2rem 0;
      width: 100%;
      text-align: center;
      justify-content: center;
    }
    .v-btn {
      @media (min-width: 960px) {
        min-width: 130px;
        min-height: 45px;
      }
    }
  }
  .section-scroll-icon {
    z-index: 2;
    position: absolute;
    bottom: 8%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

<i18n>
{
    "en": {
        "sections": {
            "1": {
                "title": "NFTrail",
                "subtitle": "Create an on-chain document trail for your off-chain assets."
            },
            "about": {
                "title": "About",
                "subtitle": "Combine NFTs and IPFS document storage to keep track of your assets.",
                "row1": {
                    "title": "Tokenize your physical assets",
                    "content": "Mint an ERC-721 Token representing the asset you wish to track.",
                    "action": "Learn more about NFTs"
                },
                "row2": {
                    "title": "Manage Documents on IPFS",
                    "content": "Upload documentation regarding your asset such as Contracts, Maintenance Record etc. to IPFS and link it to your NFT.",
                    "action": "Learn more about IPFS"
                },
                "row3": {
                    "title": "Off-Chain Verification of Asset Data",
                    "content": "NFTrail uses Chainlink Oracles to call Off-Chain APIs for verification of asset specific metadata.",
                    "action": "Learn more about Chainlink"
                },
                "row4": {
                    "title": "Layer 2 Scalability",
                    "content": "The smart contracts underlying NFTrail are deployed on Polygon Layer 2 (currently Mumbai Testnet) to ensure high transaction throughput and low gas fees.",
                    "action": "Learn more about Polygon"
                },
                "row5": {
                    "title": "Query Ownership History",
                    "content": "The NFTrail Dapp uses Covalents API to efficiently query the transaction history of the underlying asset tokens",
                    "action": "Learn more about Covalent"
                },
                "row6": {
                    "title": "Take your Token anywhere",
                    "content": "As a ERC-721 token you can use the NFTrail Token anywhere in the blockhain NFT-Ecosystem (OpenSea etc.)"
                }
            },
            "actions": {
                "contact": "Contact Us",
                "about": "More About NFTrail"
            }
        }
    }
}
</i18n>
