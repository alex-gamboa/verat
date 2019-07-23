<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>description</v-icon>
            <span class="title font-weight-light">{{ `${contract.name}` }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-layout wrap justify-space-between>
                    <v-flex xs12 md12>
                        <v-form ref="form">
                            <v-text-field
                                v-model="contract.name"
                                label="Nombre"
                            ></v-text-field>
                            <v-text-field
                                v-model="contract.billAmount"
                                label="Costo"
                            ></v-text-field>
                             <v-menu
                                v-model="menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="contract.renovation"
                                    label="Renovación"
                                    readonly
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker v-model="contract.renovation" @input="menu = false"></v-date-picker>
                            </v-menu>
                            <v-text-field
                                v-model="contract.portal"
                                label="Portal de Administración"
                            ></v-text-field>
                            <v-text-field
                                v-model="contract.portalCredentials"
                                label="Credenciales"
                            ></v-text-field>
                            <v-textarea
                                v-model="contract.details"
                                outline
                                label="Detalles"
                                rows=10
                            ></v-textarea>
                        </v-form>
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
        contract: {},
    },
    data () {
        self = this
        return {
            menu: false
        }
    },
    methods: {
        saveItem() {

            axios.post('api/contracts', this.contract)
                .then(response => {
                    this.$emit('save', response)
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        cancel() {
            this.$emit('cancel')
        },
    },
    mounted: function () {
        this.$nextTick(function () {
        })
    }
}
</script>

