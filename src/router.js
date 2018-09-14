import Vue from "vue";
import Router from "vue-router";

import Projetos from "@/components/Projetos";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import firebase from "@firebase/app";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/projetos",
      name: "Projetos",
      component: Projetos,
      meta: {
        requiresAuth: true,
        title: "Projetos"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("login");
  else if (!requiresAuth && currentUser) next("projetos");
  else next();
});

export default router;
