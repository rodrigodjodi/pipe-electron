import Vue from "vue";
import Router from "vue-router";

import Projetos from "@/pages/ProjetosView";
import Projeto from "@/pages/ProjetoView";
import Caixa from "@/pages/CaixaView";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import FormProjeto from "@/components/FormProjeto";
import FormItemProjeto from "@/components/FormItemProjeto";
import firebase from "@firebase/app";

Vue.use(Router);

let router = new Router({
  mode: "history",
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
      path: "/projetos/",
      name: "Projetos",
      components: { default: Projetos, rightDrawer: FormProjeto },
      meta: {
        requiresAuth: true,
        title: "Projetos"
      }
    },
    {
      path: "/projetos/:id",
      name: "Projeto",
      components: { default: Projeto, rightDrawer: FormItemProjeto },
      meta: {
        requiresAuth: true,
        title: "Projeto"
      }
    },
    {
      path: "/caixa",
      name: "Caixa",
      component: Caixa,
      meta: {
        requiresAuth: true,
        title: "Caixa"
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
