<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout 
        column 
        align-center>
        <v-data-table
          :items="projetos"
          class="elevation-1"
          hide-actions
          hide-headers
        >
          <template slot="items" slot-scope="props">
            <td class="link-to-project-page" @click="$router.push(`projetos/${props.item.codigo}`)">
              {{props.item.codigo
              +"_"+props.item.nome
              +"_"+props.item.cliente}}
            </td>
            <td>{{props.item.valor}}</td>
            <td>{{props.item.status}}</td>
          </template>
        </v-data-table>
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
    this.$store.dispatch("listaProjetos");
  },
  methods: {}
};
</script>

<style>
.link-to-project-page {
  cursor: pointer;
  user-select: none;
}
.link-to-project-page:hover {
  color: #1976d2;
}
</style>


