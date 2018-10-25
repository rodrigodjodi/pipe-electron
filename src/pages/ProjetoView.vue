<template>
        <!-- <h1>{{`${projetoCorrente.codigo}_${projetoCorrente.nome}_${projetoCorrente.cliente}`}}</h1> -->
  <v-container  fluid fill-height class="manual-overflow">
      <v-layout>
        <draggable v-for="(lista, k) in itensProjetoCorrente" :key="k" class="etapa"
          :id="k" v-model="itensProjetoCorrente[k].items"
          :options="{group:'items', sort:false, chosenClass:'elevation-7'}" @end="onEnd"
        >
          <span class="subheading font-weight-thin text-capitalize">{{lista.label}}</span>
          <CardItem class="elevation-1" v-for="item in itensProjetoCorrente[k].items" :key="item.codigo" :id="item.codigo">
           
              {{item.nome}}
            
          </CardItem>
        </draggable>
      </v-layout>
    
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import draggable from "vuedraggable";
import CardItem from "@/components/CardItem";
export default {
  components: { draggable, CardItem },
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
      let payload = {
        id: ev.item.id,
        lista: ev.to.id
      };
      this.$store.dispatch("updateItem", payload).catch(function(error) {
        console.error("Erro atualizando documento: ", error);
      });
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
  flex-direction: column;
  margin: 0 4px;
  background: #353535;
  border: 2px groove #555;
  padding: 4px;
}
</style>



