import Vue from "vue";
import Router from "vue-router";

import Projetos from "@/pages/ProjetosView";
import Projeto from "@/pages/ProjetoView";
import Caixa from "@/pages/CaixaView";
import ItemView from "@/pages/ItemView";
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
      redirect: "/projetos"
    },
    {
      path: "/",
      redirect: "/projetos"
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
      path: "/projetos/:idProjeto",
      name: "Projeto",
      components: { default: Projeto, rightDrawer: FormItemProjeto },
      props: { default: true, rightDrawer: false },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/projetos/:idProjeto/:idItem",
      name: "Item",
      components: { default: ItemView, rightDrawer: null },
      props: { default: true, rightDrawer: false },
      meta: {
        requiresAuth: true
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
  else if (!requiresAuth && currentUser) next();
  else next();
});

export default router;
