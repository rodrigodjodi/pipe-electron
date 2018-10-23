<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout 
        column 
        align-center>
        <h1>{{`${projetoCorrente.codigo}_${projetoCorrente.nome}_${projetoCorrente.cliente}`}}</h1>
        <ul>
          <li v-for="item in itensProjetoCorrente" :key="item.codigo">{{item.nome}}</li>
        </ul>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Projeto",
  computed: {
    ...mapState(["projetoCorrente", "itensProjetoCorrente"]) //todo: resolver com um getter na lista de projetos já disponível
  },
  created() {
    this.$store.dispatch("getProjeto", this.$route.params.id.toUpperCase());
  },
  methods: {}
};
</script>



