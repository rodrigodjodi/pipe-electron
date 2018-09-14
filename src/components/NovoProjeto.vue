<template>
    <v-form v-model="valid" class="px-2">
    <v-text-field
      v-model="codigo"
      :rules="codigoRules"
      label="Código"
      hint="18CXX"
      required
    ></v-text-field>
    <v-text-field
      v-model="projeto"
      :rules="nameRules"
      :counter="16"
      label="Projeto"
      hint="NOME-PROJETO"
      required
    ></v-text-field>
    <v-text-field
      v-model="cliente"
      :rules="nameRules"
      :counter="16"
      label="Cliente"
      hint="NOME-CLIENTE"
      required
    ></v-text-field>
    <v-text-field
      v-model="valor"
      :rules="emailRules"
      label="Valor"
      reverse
      required
      type="number"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: "novoProjeto",
  data: () => ({
    valid: false,
    codigo: "",
    codigoRules: [
      v => !!v || "Código é obrigatório",
      //todo fazer verificação se o código é único
      v => v.match("^[1-2][0-9]C[0-9]{2}$") || "Padrão incorreto."
    ],
    projeto: "",
    cliente: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 16 || "Campo deve ter menos de 16 caracteres."
    ],
    valor: 0,
    valorRules: [v => !!v || "Valor é obrigatório"]
  })
};
</script>
