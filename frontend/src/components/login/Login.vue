<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12" style="height:480px; width:360px">
                    <br>
                    <div style="text-align: center">
                        <v-avatar
                            :color="color"
                            :tile="false"
                            :size="200"
                            >
                            <img :src="userLogo" alt="avatar">
                        </v-avatar>
                    </div>
                    <!-- <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Iniciar sesión</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar> -->
                <v-card-text>
                    <v-form>
                        <v-text-field
                            v-model="username"
                            label="Username"
                            name="login"
                            prepend-icon="person"
                            type="text"
                        ></v-text-field>

                        <v-text-field
                            v-model="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <br>
                <v-card-actions>
                    <div style="text-align: center; width:100%">
                        <v-btn style="width:300px" color="primary" @click="handleSubmit">Ingresar</v-btn>
                    </div>
                </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>


</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            userLogo: require('../../assets/administrator-male.png')
        }
    },
    methods: {
        handleSubmit(e){
            e.preventDefault()
            if (this.password.length > 0) {
                this.$http.post('api/users/auth', {
                    username: this.username,
                    password: this.password
                })
                .then(response => {
                    let is_admin = response.data.user.is_admin
                    localStorage.setItem('user',JSON.stringify(response.data.user))
                    localStorage.setItem('jwt',response.data.token)

                    this.$i18n.locale = (response.data.user.lang) ? response.data.user.lang : 'en'

                    if (localStorage.getItem('jwt') != null){
                        // this.$emit('loggedIn')
                        this.$store.commit('setUser', response.data.user)
                        this.$http.defaults.headers.Authorization = localStorage.getItem('jwt');

                        if(this.$route.params.nextUrl != null){
                            this.$router.push(this.$route.params.nextUrl)
                        }
                        else {


                            if(is_admin == 1){
                                // location.href = '/'
                                // this.$router.push('home')
                            }
                            else {
                                // location.href = '/'
                                // this.$router.push('home')
                            }

                            location.href = '/'
                        }
                    }
                })
                .catch(function (error) {
                    console.error(error.response);
                });
            }
        }
    }
}
</script>

<style>

</style>
