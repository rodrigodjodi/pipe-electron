<template>
<v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-card flat>
          <v-card-title primary-title>
            <h1>Login</h1>
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="payload.email" 
                prepend-icon="email"
                name="Email"
                label="Email"
                required
                :rules="rules.email"
              ></v-text-field>
              <v-text-field
                v-model="payload.password" 
                prepend-icon="lock"
                name="Password"
                label="Password"
                type="password"
                required
                :rules="rules.password"
                @keyup.enter="signIn(payload)"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
              <v-btn @click="signIn(payload)"
               primary large block
              >Entrar</v-btn>
            </v-card-actions>
        </v-card>
        <p>Não tem uma conta?
          <router-link to="/sign-up">Crie uma.</router-link>
        </p>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      valid: false,
      payload: {
        email: "",
        password: ""
      },
      rules: {
        //todo: fazer direito regras e mensagens
        email: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ],
        password: [
          v => !!v || "Name is required",
          v => v.length <= 10 || "Name must be less than 10 characters"
        ]
      }
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch("signIn", this.payload).then(() => {
        this.$router.replace("/projetos");
      });
    }
  }
};
</script>

<style>
</style>
