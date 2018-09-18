import Vue from "vue";
import Vuex from "vuex";
import firebase from "@firebase/app";
import "@firebase/auth";
import { db } from "./main";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //USER
    user: null,
    //INTERFACE
    navItems: [
      { title: "Projetos", icon: "chrome_reader_mode", route: "/projetos" },
      { title: "Caixa", icon: "attach_money", route: "/caixa" },
      { title: "Notas", icon: "receipt", route: "/notas" },
      { title: "Horas", icon: "schedule", route: "/horas" }
    ],
    //PROJETOS
    projetos: []
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    //USER ACTIONS
    /* eslint-disable no-empty-pattern */
    signIn: function({}, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
    },
    logout() {
      firebase.auth().signOut();
    },
    //AÇÕES DE PROJETO
    listaProjetos({ state }) {
      db.collection("projetos")
        .get()
        .then(snap => {
          snap.forEach(doc => {
            let newProject = doc.data();
            newProject.codigo = doc.id;
            state.projetos.push(newProject);
          });
        });
    },
    novoProjeto({}, payload) {
      console.log(payload);
    }
  }
});
