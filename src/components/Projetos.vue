<template>
  <div class="hello">
    <h1>PROJETOS</h1>
    <ul>
      <li v-for="projeto in projetos" :key="projeto.codigo">{{projeto.codigo}}_{{projeto.nome}}_{{projeto.cliente}}</li>
    </ul>
    <input :value="novoProjeto.codigo"
      @input="novoProjeto.codigo = $event.target.value.toUpperCase()"
      type="text" name="codigo" id="codigo"
      placeholder="18CXX" pattern="^[1-2][0-9]C[0-9]{2}$">
    _
    <input v-model="novoProjeto.nome" type="text" name="nome" id="nome" placeholder="NOME-PROJETO">
    _
    <input v-model="novoProjeto.cliente" type="text" name="cliente" id="cliente" placeholder="CLIENTE">
    <button @click="adicionaProjeto">Novo Projeto</button>
    <br/>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from "@firebase/app";
import { capitalize } from "../assets/filters";
//import "@firebase/firestore"
//const db = firebase.firestore();
import { db } from "../main";
export default {
  name: "projetos",
  data() {
    return {
      projetos: [],
      novoProjeto: {
        codigo: "",
        nome: "",
        cliente: ""
      }
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    adicionaProjeto() {}
  },
  filters: {
    capitalize
  },
  created() {
    db
      .collection("projetos")
      .get()
      .then(snap => {
        snap.forEach(doc => {
          let newProject = doc.data();
          newProject.codigo = doc.id;
          this.projetos.push(newProject);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
#codigo {
  width: 6ch;
  /*text-transform: uppercase;*/
}
</style>
