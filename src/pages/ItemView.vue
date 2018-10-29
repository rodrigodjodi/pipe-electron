<template>
<v-container>
  <v-layout>
    

  </v-layout>
</v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ItemView",
  props: ["idItem", "idProjeto"],
  data() {
    return {
      item: {}
    };
  },
  created() {
    const ref = `projetos/${this.idProjeto}/items/${this.idItem}`;
    this.$store.dispatch("getDoc", ref).then(doc => {
      this.item = doc;
      this.$store.commit("SET_TITLE", doc.nome);
    });
  }
};
</script>

<style>
</style>
