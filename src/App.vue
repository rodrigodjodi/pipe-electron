<template>
  <v-app id="inspire" dark>
<!-- DRAWER ESQUERDA -->
    <v-navigation-drawer v-if="user"
      v-model="drawer"
      :mini-variant.sync="mini"
      mini-variant-width="80"
      fixed
      permanent
      app
      clipped
    >
      <v-list expand>
        <v-list-tile
          v-for="item in navItems"
          :key="item.title"
          @click="$router.push(item.route)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
<!-- TOOLBAR TOPO -->
    <v-toolbar v-if="user"
      color="blue-grey" 
      dark 
       clipped-right
       clipped-left
      app>
      <v-btn icon>
        <v-icon @click.stop="tollbarIconAction">{{tollbarIcon}}</v-icon>
      </v-btn>
      <v-avatar>
        <img
          src="http://pipe3d.com.br/ui/pipe-icon96.png"
          alt="Logo Pipe"
        >
      </v-avatar>
      <v-toolbar-title>{{ $route.meta.title || $store.state.title}}</v-toolbar-title>
      <v-spacer/>
      <v-btn icon v-if="!drawerRight" @click.stop="drawerRight = true">
        <v-icon>add</v-icon>
      </v-btn>
      <v-menu bottom left>
        <v-avatar slot="activator">
          <v-icon dark>account_circle</v-icon>
        </v-avatar>
        <v-list>
          <v-list-tile @click="logout">
            <v-list-tile-title>Sair</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
<!-- DRAWER DIREITA -->
    <v-navigation-drawer v-if="user"
    clipped
      v-model="drawerRight"
      right
      app
    >
      <router-view name="rightDrawer" @close="drawerRight=false"></router-view>
    </v-navigation-drawer>
    
    <v-content>
      <router-view/>
    </v-content>
  
    <v-footer 
      color="blue-grey" 
      class="white--text" 
      app>
      <span>Pipe Studio</span>
      <span ref="tooltip"></span>
      <v-spacer/>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  components: {},
  props: {
    source: String
  },
  data: () => ({
    drawer: true,
    drawerRight: false,
    mini: true
  }),
  computed: {
    rightDrawer() {
      return this.$route.meta.rightDrawerComponent;
    },
    ...mapState({
      navItems: state => state.navItems,
      user: state => state.user
    }),
    tollbarIcon() {
      return Object.keys(this.$route.params).length ? "arrow_back" : "menu";
    }
  },
  methods: {
    ...mapActions(["logout"]),
    tollbarIconAction() {
      // Se a rota  tem parâmetros
      if (Object.keys(this.$route.params).length) {
        //Faça voltar
        this.$router.go(-1);
      } else {
        this.mini = !this.mini;
      }
    }
  },
  created() {
    this.$store.dispatch("listaProjetos");
  }
};
</script>
