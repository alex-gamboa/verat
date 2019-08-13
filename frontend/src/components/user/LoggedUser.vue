<template>
    <v-list class="pa-0">
        <v-list-tile avatar>
            <v-list-tile-avatar>
                <v-avatar
                    :tile="false"
                    :size="50"
                    >
                    <img :src="userLogo" alt="avatar">
                </v-avatar>
            </v-list-tile-avatar>

            <v-list-tile-content>
                <v-list-tile-title>{{ $store.getters.getUser.name }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-item-action>
                <v-btn
                    icon
                    @click="logout"
                >
                    <v-icon>power_settings_new</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-tile>
    </v-list>
</template>

<script>
import bus from "../../bus";

export default {
    data() {
        return {
            userLogo: require('../../assets/user-lap.jpg'),
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('user')
            localStorage.removeItem('jwt')
            location.reload()
        }
    },
}
</script>

<style>

</style>
