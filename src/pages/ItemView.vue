<template>
<v-container>
  <v-layout>
    <v-data-table
      :items="tarefasProjetoCorrente.filter(tarefa => tarefa.item === idItem)"
      class="elevation-1"
      hide-actions
      hide-headers
    >
      <template slot="items" slot-scope="props">
        <td class="px-3">
          <v-checkbox
            :input-value="props.item.done"
            hide-details
             
          ></v-checkbox>
        </td>
        <td class="px-2" @click="editTarefa">{{ props.item.text }}</td>
        <td class=" px-0">
          <v-icon
            small
            class="mr-2"
            
          >
            access_time
          </v-icon>
          <v-icon
            small
            class="mr-2"
          >
            delete
          </v-icon>
        </td>
        
      </template>
      <template slot="footer">
        <td colspan="100%">
          <v-text-field
          solo
          clearable
          flat
          placeholder="Adicionar tarefa..."
          v-model="tarefa.text"
          hide-details
          @keyup.enter="novaTarefa"
          >

          </v-text-field>
        </td>
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
      item: {},
      tarefa: {
        text: "",
        item: this.idItem,
        done: false
      }
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
  },
  methods: {
    novaTarefa() {
      let payload = {
        path: `projetos/${this.idProjeto}/tarefas`,
        tarefa: this.tarefa
      };
      this.$store
        .dispatch("novaTarefa", payload)
        .then(docRef => {
          this.tarefa.text = "";
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    },
    editTarefa() {
      console.log("editing");
    }
  }
};
</script>

<style>
</style>
