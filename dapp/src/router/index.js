import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../LandingPage.vue";
import Home from "../views/Home.vue"
import TheDapp from "../TheDapp.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingPage,
      children: [
        { path: "", name: "home", component: Home },
      ],
  },
  {
    path: "/dapp",
    name: "dapp",
    component: TheDapp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
