<template>
<v-container>
  <v-layout>
    <v-data-table
      :items="tarefasProjetoCorrente.filter(tarefa => tarefa.item === idItem)"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.text }}</td>
        <td class="text-xs-right">{{ props.item.item }}</td>
        
      </template>
    </v-data-table>
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
  computed: {
    ...mapState(["tarefasProjetoCorrente"])
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
