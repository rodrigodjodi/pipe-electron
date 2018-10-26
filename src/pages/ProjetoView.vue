<template>
        <!-- <h1>{{`${projetoCorrente.codigo}_${projetoCorrente.nome}_${projetoCorrente.cliente}`}}</h1> -->
  <v-container  fluid fill-height class="manual-overflow">
      <v-layout>
        <draggable v-for="(lista, k) in listas" :key="k" class="etapa"
          :id="k" v-model="listas[k].items"
          :options="{group:'items', sort:false, chosenClass:'elevation-7'}" @end="onDragEnd"
        >
          <span class="subheading font-weight-thin text-capitalize">{{lista.label}}</span>
          <CardItem class="elevation-1" v-for="item in listas[k].items" :key="item.codigo" :id="item.codigo"
            :linkTo="{path: item.codigo}"
          >
           
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
var unsubscribe;
export default {
  components: { draggable, CardItem },
  name: "Projeto",
  data() {
    return {
      listas: {
        briefing: {
          label: "Briefing",
          items: []
        },
        modelagem: {
          label: "Modelagem",
          items: []
        },
        composicao: {
          label: "Composição",
          items: []
        },
        revisao: {
          label: "Revisão",
          items: []
        },
        cliente: {
          label: "Cliente",
          items: []
        },
        aprovado: {
          label: "Aprovado",
          items: []
        }
      }
    };
  },
  computed: {
    itensProjetoCorrente() {
      let arr = this.$store.state.itensProjetoCorrente;
      this.listas = {
        briefing: {
          label: "Briefing",
          items: []
        },
        modelagem: {
          label: "Modelagem",
          items: []
        },
        composicao: {
          label: "Composição",
          items: []
        },
        revisao: {
          label: "Revisão",
          items: []
        },
        cliente: {
          label: "Cliente",
          items: []
        },
        aprovado: {
          label: "Aprovado",
          items: []
        }
      };
      arr.forEach(item => {
        this.listas[item.lista].items.push(item);
      });
      return arr;
    },
    ...mapState(["projetos"])
  },
  created() {
    if (!this.projetos.length)
      this.$store.dispatch("listaProjetos", this.$route.params.id);

    unsubscribe = this.$store.dispatch(
      "getItensProjeto",
      this.$route.params.id.toUpperCase()
    );
  },
  methods: {
    onDragEnd(ev) {
      let payload = {
        id: ev.item.id,
        lista: ev.to.id
      };
      this.$store.dispatch("updateItem", payload).catch(function(error) {
        console.error("Erro atualizando documento: ", error);
      });
    }
  },
  destroyed() {
    unsubscribe.then(fn => {
      fn();
      this.$store.commit("PROCESSA_SNAPSHOT_ITEMS", null);
    });
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



