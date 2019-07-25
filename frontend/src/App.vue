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
                            <v-list-tile-title>.</v-list-tile-title>
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
                <v-toolbar-title></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
            </v-toolbar>
            <v-navigation-drawer
                fixed
                v-model="drawer"
                app>
                <v-toolbar flat class="transparent">
                    <logged-user></logged-user>
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
let self

import LoggedUser from "./components/user/LoggedUser";

export default {
    name: 'App',
    data () {
        self = this
        return {
            drawer: true,
            drawerRight: false,
            right: null,
            left: null,
            items: [
                { title: 'Activos', icon: 'dvr', route: '/assetmgmt' },
                { title: 'Usuarios', icon: 'supervisor_account', route: '/users' },
                { title: 'Tickets', icon: 'bug_report', route: '/tickets' },
                { title: 'Consumibles', icon: 'print', route: '/consumables' },
                { title: 'Contratos', icon: 'description', route: '/contracts' },
                { title: 'Configuraciones', icon: 'memory', route: '/configurations' },
                { title: 'Tareas Programadas', icon: 'alarm', route: '/scheduledTasks' },
                { title: 'Documentos', icon: 'folder', route: '/documents' },
                { title: 'Reportes', icon: 'insert_chart', route: '/reports' },
            ],
        }
    },
    components: {
        LoggedUser
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
