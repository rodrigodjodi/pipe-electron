<template>
        <!-- <h1>{{`${projetoCorrente.codigo}_${projetoCorrente.nome}_${projetoCorrente.cliente}`}}</h1> -->
  <v-container  fluid fill-height class="manual-overflow">
    
      <v-layout>
          <v-layout  v-for="(lista, k) in itensProjetoCorrente" :key="k" class="etapa" :ref="k">
            <draggable v-model="itensProjetoCorrente[k].items" :options="{group:'items', sort:false}" @end="onEnd">
              <v-card v-for="item in itensProjetoCorrente[k].items" :key="item.codigo" dark>
                <v-card-title>
                  <h3>{{item.nome}}</h3>
                </v-card-title>
              </v-card>
            </draggable>
          </v-layout>
        
      </v-layout>
    
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import draggable from "vuedraggable";
export default {
  components: { draggable },
  name: "Projeto",
  data() {
    return {};
  },
  computed: {
    ...mapState(["projetoCorrente", "itensProjetoCorrente"])
  },
  created() {
    this.$store.dispatch("getProjeto", this.$route.params.id.toUpperCase());
  },
  methods: {
    onEnd(ev) {
      /* let payload = {
        id: ev.item._underlying_vm_.codigo,
        lista: 
      } */
      console.log(ev);
    }
  }
};
</script>
<style>
.manual-overflow {
  overflow-x: auto;
  overflow-y: none;
}
.etapa {
  flex: 1 0 200px;
  margin: 0 4px;
  background: #353535;
  border: 2px groove #555;
  padding: 4px;
}
</style>



