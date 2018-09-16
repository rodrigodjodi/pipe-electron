import Vue from "vue";
import Vuex from "vuex";
import firebase from "@firebase/app";
import "@firebase/auth";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //INTERFACE
    navItems: [
      { title: "Projetos", icon: "chrome_reader_mode", route: "/projetos" },
      { title: "Caixa", icon: "attach_money", route: "/caixa" },
      { title: "Notas", icon: "receipt", route: "/notas" },
      { title: "Horas", icon: "schedule", route: "/horas" }
    ]
  },
  mutations: {},
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
    }
  }
});
