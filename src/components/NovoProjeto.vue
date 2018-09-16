<template>
  <v-layout column>
    <v-toolbar 
        flat 
        class="transparent">
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Novo Projeto</v-list-tile-title>
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
    <v-form 
      v-model="valid" 
      class="px-2">
      <v-text-field
        @input="codigo = $event.toUpperCase()"
        :value="codigo"
        :rules="codigoRules"
        label="Código"
        hint="18CXX"
        persistent-hint
        placeholder="18CXX"
        required
      />
      <v-text-field
      @input="projeto = $event.toUpperCase()"
        :value="projeto"
        :rules="nameRules"
        :counter="16"
        label="Projeto"
        hint="NOME-PROJETO"
        required
      />
      <v-text-field
        @input="cliente = $event.toUpperCase()"
        :value="cliente"
        :rules="nameRules"
        :counter="16"
        label="Cliente"
        hint="NOME-CLIENTE"
        required
      />
      <v-text-field
        v-model="valor"

        label="Valor"
        reverse
        required
      />
    </v-form>
  </v-layout>
</template>

<script>
export default {
  name: "NovoProjeto",
  data: () => ({
    valid: false,
    codigo: "",
    codigoRules: [
      v => !!v || "Código é obrigatório",
      //todo fazer verificação se o código é único
      v => v.match("^[1-2][0-9]C[0-9]{2}$") ? true : "Padrão incorreto."
    ],
    projeto: "",
    cliente: "",
    nameRules: [
      v => !!v || "Esse campo é obrigatório.",
      v => v.match("^[A-Z0-9-]{2,16}$") ? true : "Padrão incorreto."
    ],
    valor: "",
    valorRules: [v => !!v || "Valor é obrigatório"]
  }),
  methods: {
    capitalize(val) {
      return val.toUpperCase();
    }
  }
};
</script>
