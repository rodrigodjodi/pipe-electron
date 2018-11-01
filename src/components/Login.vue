<template>
<v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-card flat>
          <v-card-title >
            <h1>{{title}}</h1>
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid" v-if="!showMessage && !processing">
              <v-text-field
                v-model="email" 
                prepend-icon="email"
                name="Email"
                label="Email"
                required
                :rules="rules.email"
              ></v-text-field>
            </v-form>
            <p v-if="showMessage">{{message}}</p>
          <v-progress-linear v-if="processing" :indeterminate="true"></v-progress-linear>
          </v-card-text>
          <v-card-actions v-if="!showMessage && !processing">
              <v-btn @click="signIn(email)"
               primary large block
              >Entrar com link de email</v-btn>

              <v-btn @click="signInWithRedirect()"
               primary large block
              >Entrar com Google</v-btn>
            </v-card-actions>
        </v-card>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import firebase from "@firebase/app";
import "@firebase/auth";
var provider = new firebase.auth.GoogleAuthProvider();
var actionCodeSettings = {
  url: process.env.VUE_APP_URL,
  handleCodeInApp: true
};
export default {
  name: "Login",
  data: function() {
    return {
      valid: false,
      email: "",
      rules: {
        //todo: fazer direito regras e mensagens
        email: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ]
      },
      processing: false,
      showMessage: false,
      message: "",
      title: "Login"
    };
  },
  methods: {
    signInWithRedirect() {
      firebase.auth().signInWithRedirect(provider);
    },
    signIn(email) {
      if (!this.valid) return;
      this.processing = true;
      this.title = "Criando link...";
      firebase
        .auth()
        .sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem("emailForSignIn", email);
          this.processing = false;
          this.showMessage = true;
          this.title = "Pronto!";
          this.message = `Um link de acesso ao sistema foi enviado para ${
            this.email
          }
          Você já pode fechar essa página.`;
        })
        .catch(error => {
          // Some error occurred, you can inspect the code: error.code
          console.error(error);
          this.processing = false;
          this.showMessage = true;
          this.title = "O-oh!";
          this.message = `Ocorreu um erro na geração do link de acesso.`;
        });
    },
    mounted() {
      if (this.$store.state.user) {
        this.$router.replace("/projetos");
      }
    }
  }
};
</script>

<style>
</style>
