<template>
    <div id="app">
        <v-app id="verat">
            <v-navigation-drawer
                fixed
                v-model="drawerRight"
                right
                clipped
                app>
                <filters></filters>
            </v-navigation-drawer>
            <v-toolbar
                color="blue-grey"
                dark
                fixed
                app
                clipped-right
                dense>
                <v-toolbar-side-icon @click.stop="mini = !mini"></v-toolbar-side-icon>
                <v-toolbar-title></v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <v-menu offset-y v-model="menu"
                    :close-on-content-click="false"
                    :nudge-width="200">
                    <v-btn color="transparent" icon slot="activator">
                        <v-icon>settings</v-icon>
                    </v-btn>
                    <v-card>
                        <v-list>
                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                            <img :src="userLogo" alt="User">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                            <v-list-tile-title>{{ $store.getters.getUser.name }}</v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                            <v-btn
                                icon
                                @click=""
                            >
                                <v-icon>power_settings_new</v-icon>
                            </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                        </v-list>

                        <v-divider></v-divider>

                        <v-list>
                        <v-list-tile>
                            <v-list-tile-action>
                            <v-switch v-model="message" color="purple"></v-switch>
                            </v-list-tile-action>
                            <v-list-tile-title>Enable messages</v-list-tile-title>
                        </v-list-tile>

                        <v-list-tile>
                            <v-list-tile-action>
                            <v-switch v-model="hints" color="purple"></v-switch>
                            </v-list-tile-action>
                            <v-list-tile-title>Enable hints</v-list-tile-title>
                        </v-list-tile>
                        </v-list>

                        <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn flat @click="menu = false">Cancel</v-btn>
                        <v-btn color="primary" flat @click="menu = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu> -->
                <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
            </v-toolbar>
            <v-navigation-drawer
                fixed
                v-model="drawer"
                :mini-variant="mini"
                app
                >
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

import bus from "./bus";

import LoggedUser from "./components/user/LoggedUser";
import Filters from './components/Filter/Filters'

export default {
    name: 'App',
    data () {
        self = this
        return {
            drawer: true,
            drawerRight: false,
            right: null,
            left: null,
            mini: false,
            items: [
                { title: this.$t('mainMenu[0]'), icon: 'dvr', route: '/assetmgmt' },
                { title: this.$t('mainMenu[1]'), icon: 'supervisor_account', route: '/users' },
                { title: this.$t('mainMenu[2]'), icon: 'bug_report', route: '/tickets' },
                { title: this.$t('mainMenu[3]'), icon: 'print', route: '/consumables' },
                { title: this.$t('mainMenu[4]'), icon: 'description', route: '/contracts' },
                { title: this.$t('mainMenu[5]'), icon: 'memory', route: '/configurations' },
                { title: this.$t('mainMenu[6]'), icon: 'alarm', route: '/scheduledTasks' },
                { title: this.$t('mainMenu[7]'), icon: 'folder', route: '/documents' },
                {
                    title: this.$t('mainMenu[8]'),
                    icon: 'insert_chart',
                    route: '/reports',
                },
            ],
            menu: false,
            userLogo: require('./assets/user-lap.jpg'),
        }
    },
    components: {
        LoggedUser,
        Filters
    },
    methods:{
        navigate(item){
            this.$router.push(item.route)
        },
    },
    props: {
        source: String
    }

}
</script>
