import Vue from "vue";
import Vuex from "vuex";
import firebase from "@firebase/app";
import "@firebase/auth";
import { db } from "./main";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
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
    title: "",
    //PROJETOS
    projetos: [],
    //Itens
    itensProjetoCorrente: null,
    tarefasProjetoCorrente: null
  },

  mutations: {
    SET_TITLE(state, payload) {
      state.title = payload;
    },
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
    SET_PROJETO_CORRENTE(state, projeto) {
      state.projetoCorrente = projeto;
    },
    //ITENS
    PROCESSA_SNAPSHOT_ITEMS(state, snap) {
      if (!snap) {
        state.itensProjetoCorrente = null;
      } else {
        state.itensProjetoCorrente = [];
        snap.forEach(doc => {
          let newItem = doc.data();
          newItem.codigo = doc.id;
          state.itensProjetoCorrente.push(newItem);
        });
      }
    },
    //TAREFAS
    PROCESSA_SNAPSHOT_TAREFAS(state, snap) {
      if (!snap) {
        state.tarefasProjetoCorrente = null;
      } else {
        state.tarefasProjetoCorrente = [];
        snap.forEach(doc => {
          let newTask = doc.data();
          newTask.codigo = doc.id;
          state.tarefasProjetoCorrente.push(newTask);
        });
      }
    }
  },

  actions: {
    //Ações genéricas de banco de dados
    getDoc({}, refPath) {
      return db
        .doc(refPath)
        .get()
        .then(doc => {
          return doc.data();
        });
    },
    getTarefasProjeto({ commit }, idProjeto) {
      return db
        .collection("projetos")
        .doc(idProjeto)
        .collection("tarefas")
        .onSnapshot(snap => {
          commit("PROCESSA_SNAPSHOT_TAREFAS", snap);
        });
    },
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
    getItensProjeto({ commit }, projeto) {
      return db
        .collection("projetos")
        .doc(projeto)
        .collection("items")
        .onSnapshot(snap => {
          commit("PROCESSA_SNAPSHOT_ITEMS", snap);
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
              nome: `${payload[tipoItem].grupo}.${i} ${
                payload[tipoItem].label
              }`,
              lista: "briefing"
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
    updateItem({}, payload) {
      let ref = db.doc(payload.path);
      return ref.update(payload.changes);
    }
  }
});
