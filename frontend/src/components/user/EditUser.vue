<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>print</v-icon>
            <span class="title font-weight-light">{{ `${user.fullName}` }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-layout wrap justify-space-between>
                    <v-flex xs12 md12>
                        <v-text-field
                            v-model="user.fullName"
                            label="Nombre Completo"
                        ></v-text-field>
                        <v-text-field
                            v-model="user.username"
                            label="Username"
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            label="Password"
                            type='password'
                        ></v-text-field>
                        <v-combobox
                            v-model="user.type"
                            :items="types"
                            label="Tipo"
                        ></v-combobox>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-card-actions>
                <v-btn flat color="blue" @click="saveItem">Guardar</v-btn>
                <v-btn flat color="blue" @click="cancel">Cancelar</v-btn>
            </v-card-actions>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios'

let self

export default {
    props: {
        user: {}
    },
    data () {
        self = this
        return {
            types: ['Soporte','Usuario','Dato'],
            password: '',
        }
    },
    methods: {
        saveItem() {
            this.user.password = this.password

            console.log(this.user);


            axios.post('api/users', this.user)
                .then(response => {
                    this.password = ''
                    this.$emit('save', response)
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        cancel() {
            this.password = ''
            this.$emit('cancel')
        },
    },
    mounted: function () {
        this.$nextTick(function () {
            // this.getData()
        })
    }
}
</script>

