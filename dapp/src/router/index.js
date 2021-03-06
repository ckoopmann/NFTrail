import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../LandingPage.vue";
import Home from "../views/Home.vue";
import TheDapp from "../TheDapp.vue";
import NewToken from "../views/NewToken.vue";
import SearchToken from "../views/SearchToken.vue";
import TokenDetails from "../views/TokenDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingPage,
    children: [{ path: "", name: "home", component: Home }],
  },
  {
    path: "/dapp",
    name: "dapp",
    component: TheDapp,
    children: [
      { path: "new", name: "newToken", component: NewToken },
      { path: "search", name: "searchToken", component: SearchToken },
      { path: "details/:id", component: TokenDetails },
    ],
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
