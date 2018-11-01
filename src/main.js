import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import money from "@/assets/v-money";
Vue.use(money);
Vue.config.productionTip = false;
let app;
let config = {
  apiKey: "AIzaSyD4SxOGNkXxNo3bMXw5zxMXQFYLc278BHc",
  authDomain: "sistema-pipe.firebaseapp.com",
  databaseURL: "https://sistema-pipe.firebaseio.com",
  projectId: "sistema-pipe",
  storageBucket: "",
  messagingSenderId: "1085230371223"
};
firebase.initializeApp(config);

if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  var email =
    window.localStorage.getItem("emailForSignIn") ||
    window.prompt("Please provide your email for confirmation");
  firebase
    .auth()
    .signInWithEmailLink(email, window.location.href)
    .then(function(result) {
      window.localStorage.removeItem("emailForSignIn");
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
    })
    .catch(err => {
      console.error(err);
    });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
  if (user) {
    store.commit("SET_USER", user);
  } else {
    store.commit("SET_USER", null);
    router.replace("/login");
  }
});
export const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);
