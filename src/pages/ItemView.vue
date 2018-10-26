<template>
    <h1>{{itensProjetoCorrente[$route.params.item].nome}}</h1>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ItemView",
  computed: {
    ...mapState(["itensProjetoCorrente"])
  },
  created() {}
};
</script>

<style>
</style>
