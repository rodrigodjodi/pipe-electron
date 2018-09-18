<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-if="user"
      v-model="drawer"
      :mini-variant.sync="mini"
      fixed
      permanent
      app
    >
      <v-toolbar
     
        flat 
        class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon>person</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Rodrigo López Moreira</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn
                icon
                @click.stop="mini = !mini"
              >
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0">
        <v-divider/>
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

    <v-toolbar v-if="user"
      color="blue-grey" 
      dark 
       clipped-right
       clipped-left
      app>
      <v-avatar style="margin-left:-12px;">
      <img
        src="http://pipe3d.com.br/ui/pipe-icon96.png"
        alt="Usuário"
      >
    </v-avatar>
      
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>{{mini ? "chevron_right" : "chevron_left"}}</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
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

    <v-navigation-drawer v-if="user"
    clipped
      v-model="drawerRight"
      
      right
      app
    >
      <component :is="rightDrawer" @close="drawerRight=false"></component>
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
  components: {
    NovoProjeto: () =>
      import("@/components/NovoProjeto")
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: true,
    drawerRight: false,
    right: null,
    left: null,
    mini: true,
  }),
  computed: {
    rightDrawer() {
      return this.$route.meta.rightDrawerComponent;
    },
    ...mapState({
      navItems: state => state.navItems,
      user: state => state.user
    })
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>
