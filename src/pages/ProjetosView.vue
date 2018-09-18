<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout 
        column 
        align-center>
        <ul>
          <li 
            v-for="projeto in projetos" 
            :key="projeto.codigo"
          >{{ projeto.codigo }}_{{ projeto.nome }}_{{ projeto.cliente }}</li>
        </ul>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Projetos",
  computed: {
    ...mapState(["projetos"])
  },
  created() {
    this.$store.dispatch('listaProjetos');
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
