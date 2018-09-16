<template>
  <div class="login">
    <h3>Login</h3>
    <input 
      v-model="payload.email" 
      type="text" 
      placeholder="Email"><br>
    <input 
      v-model="payload.password" 
      type="password" 
      placeholder="Password"><br>
    <button @click="signIn(payload)">Entrar</button>
    <p>Não tem uma conta? <router-link to="/sign-up">Crie uma</router-link></p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data: function() {
    return {
      payload: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["signIn"])
  }
};
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
.login {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
