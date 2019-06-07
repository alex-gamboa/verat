<template>
    <div id="app">
        <v-app id="verat">
            <v-navigation-drawer
                fixed
                v-model="drawerRight"
                right
                clipped
                app>
                <v-list dense>
                    <v-divider></v-divider>
                    <v-list-tile @click.stop="right = !right">
                        <v-list-tile-action>
                            <v-icon>exit_to_app</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar
                color="blue-grey"
                dark
                fixed
                app
                clipped-right>
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-toolbar-title>Toolbar</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
            </v-toolbar>
            <v-navigation-drawer
                fixed
                v-model="drawer"
                app>
                <v-toolbar flat class="transparent" color="blue-grey" dark>
                </v-toolbar>

                <v-list dense>

                    <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        @click="navigate(item)"
                        >
                            <v-list-tile-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.title }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-content>
                <v-container fluid fill-height>
                <v-layout justify-center align-start="">
                    <router-view></router-view>
                </v-layout>
                </v-container>
            </v-content>
            <v-footer color="blue-grey" class="white--text" app>
                <v-spacer></v-spacer>
                <span></span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: true,
      drawerRight: true,
      right: null,
      left: null,
      items: [
          { title: 'Administración de Activos', icon: 'dvr', route: '/assetmgmt' },
        //   { title: 'App Configuration', icon: 'settings', route: '/' },
        //   { title: 'Access Management', icon: 'fingerprint', route: '/accessmgmt' },
        //   { title: 'Generate Drill Plan', icon: 'play_circle_outline', route: '/' },
        //   { title: 'Import Drill Data', icon: 'play_circle_outline', route: '/' },
        //   { title: 'Interpolate', icon: 'play_circle_outline', route: '/' },
        //   { title: 'Extract', icon: 'play_circle_outline', route: '/' },
        //   { title: 'Generate Dig Plan', icon: 'play_circle_outline', route: '/' },
        //   { title: 'Publish', icon: 'public', route: '/' },
        //   { title: 'Production Report', icon: 'assessment', route: '/' },
        ],
    }
  },
  methods:{
        navigate(item){
            this.$router.push(item.route)
        }
  },
  props: {
    source: String
  }
}
</script>
