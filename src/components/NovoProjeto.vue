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
    <v-form ref="form"
      v-model="valid" 
      class="px-2">
      <v-text-field
        @input="payload.codigo = $event.toUpperCase()"
        :value="payload.codigo"
        :rules="rules.codigo"
        label="Código"
        hint="18CXX"
        persistent-hint
        placeholder="18CXX"
        required
      />
      <v-text-field
      @input="payload.projeto = $event.toUpperCase()"
        :value="payload.projeto"
        :rules="rules.nome"
        :counter="16"
        label="Projeto"
        hint="NOME-PROJETO"
        required
      />
      <v-text-field
        @input="payload.cliente = $event.toUpperCase()"
        :value="payload.cliente"
        :rules="rules.nome"
        :counter="16"
        label="Cliente"
        hint="NOME-CLIENTE"
        required
      />
      <v-text-field
        v-model="payload.valor"

        label="Valor"
        
        required
      />
      <v-btn @click="clear">limpar</v-btn>
      <v-btn
      :disabled="!valid"
      @click="$store.dispatch('novoProjeto', payload)"
      >
        criar projeto
      </v-btn>
    </v-form>
  </v-layout>
</template>

<script>
export default {
  name: "NovoProjeto",
  data: () => ({
    valid: false,
    payload: {
      codigo: "",
      projeto: "",
      cliente: "",
      valor: "",
    },
    rules: {
      codigo: [
        v => !!v || "Código é obrigatório",
        //todo fazer verificação se o código é único
        v => v.match("^[1-2][0-9]C[0-9]{2}$") ? true : "Padrão incorreto."
      ],
      nome: [
        v => !!v || "Esse campo é obrigatório.",
        v => v.match("^[A-Z0-9-]{2,16}$") ? true : "Padrão incorreto."
      ],
      valor: [v => !!v || "Valor é obrigatório"]
    }
  }),
  methods: {
    clear () {
      this.$refs.form.reset();
    },

  }
};
</script>
