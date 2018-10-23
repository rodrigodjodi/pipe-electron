<template>
    <v-layout column>
    <v-toolbar 
        flat 
        class="transparent"
    >
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Itens Projeto</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn
                icon
                @click.stop="$emit('close')"
              >
                <v-icon>clear</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
    </v-toolbar>

    <v-form ref="form"
      v-model="valid" 
      class="px-2"
    >
        <v-text-field v-for="(value, key) in tipos" :key="key"
            :label="tipos[key]['label']"
            v-model.number="tipos[key].valor"
            prepend-icon="remove"
            @click:prepend="decrement(key)"
            append-outer-icon="add"  
            @click:append-outer="increment(key)"
        ></v-text-field>
        

      <!--buttons-->
      <v-btn flat @click="clear">limpar</v-btn>
      <v-btn
      :disabled="!valid"
      @click="createItems"
      >
        criar itens
      </v-btn>
    </v-form>
    

    
  </v-layout>
</template>

<script>
export default {
  name: "formItemProjeto",
  data() {
    return {
      valid: false,
      tipos: {
        externas: { valor: 0, label: "Perspectiva externa:", grupo: "1" },
        internasAreasComuns: {
          valor: 0,
          label: "Interna área comun:",
          grupo: "2"
        },
        internasAreasPrivativas: {
          valor: 0,
          label: "Interna área privativa:",
          grupo: "3"
        },
        plantasHumanizadasPavimento: {
          valor: 0,
          label: "Planta pavimento:",
          grupo: "4"
        },
        plantasHumanizadasApto: {
          valor: 0,
          label: "Planta unidade:",
          grupo: "5"
        },
        pontoTour360: { valor: 0, label: "Ponto tour 360:", grupo: "6" },
        maqueteVirtual: { valor: 0, label: "Maquete virtual:", grupo: "7" },
        video: { valor: 0, label: "Video (segundos):", grupo: "8" }
      }
    };
  },
  methods: {
    clear() {},

    createItems() {
      this.$store.dispatch("createDefaultItems", this.tipos);
    },
    increment(prop) {
      this.tipos[prop].valor++;
    },
    decrement(prop) {
      if (this.tipos[prop].valor > 0) {
        this.tipos[prop].valor--;
      }
    }
  }
};
</script>

<style>
</style>
