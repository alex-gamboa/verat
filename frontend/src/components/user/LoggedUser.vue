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
        </v-list-tile>
    </v-list>
</template>

<script>
export default {
    data() {
        return {
            userLogo: require('../../assets/user-lap.jpg')
        }
    }
}
</script>

<style>

</style>
