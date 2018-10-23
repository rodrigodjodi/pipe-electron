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
    projetoCorrente: null,
    //Itens
    itensProjetoCorrente: null
  },

  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    //PROJETOS
    PROCESSA_SNAPSHOT_PROJETOS(state, snap) {
      state.projetos = [];
      snap.forEach(doc => {
        let newProject = doc.data();
        newProject.codigo = doc.id;
        state.projetos.push(newProject);
      });
    },
    PROJETO_CORRENTE(state, projeto) {
      state.projetoCorrente = projeto;
    },
    //ITENS
    PROCESSA_SNAPSHOT_ITEMS(state, snap) {
      state.itensProjetoCorrente = [];
      snap.forEach(doc => {
        let newItem = doc.data();
        newItem.codigo = doc.id;
        state.itensProjetoCorrente.push(newItem);
      });
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
        commit("PROCESSA_SNAPSHOT_PROJETOS", snap);
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
            // retorna outra Promise com a pesquisa dos itens
            return db
              .collection("projetos")
              .doc(projeto)
              .collection("items")
              .onSnapshot(snap => {
                commit("PROCESSA_SNAPSHOT_ITEMS", snap);
              });
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
    },
    //Ações de itens
    createDefaultItems({ state }, payload) {
      var batch = db.batch();
      Object.keys(payload).forEach(tipoItem => {
        if (payload[tipoItem].valor > 0) {
          for (let i = 1; i <= payload[tipoItem].valor; i++) {
            let idTipo = `${state.projetoCorrente.codigo}_${
              payload[tipoItem].grupo
            }.${i}`;
            let itemRef = db
              .collection("projetos")
              .doc(state.projetoCorrente.codigo)
              .collection("items")
              .doc(idTipo);
            batch.set(itemRef, {
              nome: `${payload[tipoItem].grupo}.${i} ${payload[tipoItem].label}`
            });
          }
        }
      });
      batch
        .commit()
        .then(function() {
          // ...
        })
        .catch(err => {
          console.error(err);
        });
    },
    listaItens() {}
  }
});
