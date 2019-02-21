import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/:user1/:user2",
      name: "compare",
      component: Home
    },
    {
      path: "/:user1/:user2/:user3",
      name: "compare",
      component: Home
    },
    {
      path: "/:user1/:user2/:user3/:user4",
      name: "compare",
      component: Home
    },
    {
      path: "/",
      name: "home",
      component: Home
    }
  ]
});
