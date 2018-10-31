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
var unsubscribeItens;
var unsubscribeTarefas;
export default {
  components: { draggable, CardItem },
  name: "Projeto",
  props: ["idProjeto"],
  data() {
    return {
      projeto: {}
    };
  },
  computed: {
    ...mapState(["projetos"]),
    listas: {
      get() {
        let lists = {
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
        this.$store.state.itensProjetoCorrente.forEach(el => {
          lists[el.lista].items.push(el);
        });
        return lists;
      },
      set(newValue) {}
    }
  },
  created() {
    const ref = `projetos/${this.idProjeto}`;
    this.$store.dispatch("getDoc", ref).then(doc => {
      this.projeto = doc;
      const stringProjeto =
        this.idProjeto + "_" + this.projeto.nome + "_" + this.projeto.cliente;
      this.$store.commit("SET_TITLE", stringProjeto);
    });
    unsubscribeItens = this.$store.dispatch("getItensProjeto", this.idProjeto);
    unsubscribeTarefas = this.$store.dispatch(
      "getTarefasProjeto",
      this.idProjeto
    );
  },
  mounted() {},
  methods: {
    onDragEnd(ev) {
      let payload = {
        path: `projetos/${this.idProjeto}/items/${ev.item.id}`,
        changes: { lista: ev.to.id }
      };
      this.$store.dispatch("updateDoc", payload).catch(function(error) {
        console.error("Erro atualizando documento: ", error);
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("SET_TITLE", null);
    if (from.params.idProjeto !== to.params.idProjeto) {
      unsubscribeItens.then(fn => {
        fn();
        this.$store.commit("PROCESSA_SNAPSHOT_ITEMS", null);
      });
      unsubscribeTarefas.then(fn => {
        fn();
        this.$store.commit("PROCESSA_SNAPSHOT_TAREFAS", null);
      });
    }
    next();
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



