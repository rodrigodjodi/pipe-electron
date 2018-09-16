<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout 
        column 
        align-center>
        <ul>
          <li 
            v-for="projeto in projetos" 
            :key="projeto.codigo">{{ projeto.codigo }}_{{ projeto.nome }}_{{ projeto.cliente }}</li>
        </ul>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { capitalize } from "../assets/filters";
import { mapActions } from "vuex";
import { db } from "../main";
export default {
  name: "Projetos",
    filters: {
      capitalize
    },
  data() {
    return {
      projetos: []
    };
  },
    created() {
      db.collection("projetos")
        .get()
        .then(snap => {
          snap.forEach(doc => {
            let newProject = doc.data();
            newProject.codigo = doc.id;
            this.projetos.push(newProject);
          });
        });
    },
  methods: {},
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
