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
    projetos: [],
    projetoCorrente: null
  },

  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    //PROJETOS
    PROCESSA_SNAPSHOT(state, snap) {
      state.projetos = [];
      snap.forEach(doc => {
        let newProject = doc.data();
        newProject.codigo = doc.id;
        state.projetos.push(newProject);
      });
    },
    PROJETO_CORRENTE(state, projeto) {
      state.projetoCorrente = projeto;
    }
  },

  actions: {
    //USER ACTIONS
    /* eslint-disable no-empty-pattern */
    signIn: function({}, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
      //* não é feito o commit do user aqui porque isso será feito no listener em main.js
    },
    logout() {
      firebase.auth().signOut();
    },
    //AÇÕES DE PROJETO
    listaProjetos({ commit }) {
      db.collection("projetos").onSnapshot(snap => {
        commit("PROCESSA_SNAPSHOT", snap);
      });
    },
    getProjeto({ commit }, projeto) {
      db.collection("projetos")
        .doc(projeto)
        .get()
        .then(doc => {
          if (doc.exists) {
            let projetoCorrente = doc.data();
            projetoCorrente.codigo = projeto;
            commit("PROJETO_CORRENTE", projetoCorrente);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },
    novoProjeto({}, payload) {
      return db
        .collection("projetos")
        .doc(payload.codigo)
        .set({
          nome: payload.projeto,
          cliente: payload.cliente,
          status: "Ativo",
          valor: payload.valor.replace(/([^0-9]+)/g, "") * 1,
          criado: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
  }
});
