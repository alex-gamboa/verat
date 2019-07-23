<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>alarm</v-icon>
            <span class="title font-weight-light">{{ `${task.name}` }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-layout wrap justify-space-between>
                    <v-flex xs12 md12>
                        <v-form ref="form">
                            <v-text-field
                                v-model="task.name"
                                label="Nombre"
                            ></v-text-field>
                            <v-text-field
                                v-model="task.description"
                                label="Descripción"
                            ></v-text-field>
                            <v-combobox
                                v-model="task.frequency"
                                :items="frequencies"
                                label="Frecuencia"
                            ></v-combobox>
                            <v-text-field
                                v-model="task.day"
                                label="Día"
                            ></v-text-field>
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
        task: {},
    },
    data () {
        self = this
        return {
            menu: false,
            frequencies: ['Diario','Semanal','Mensual','Trimestral','Semestral','Anual']
        }
    },
    methods: {
        saveItem() {

            axios
                .post('api/scheduledTasks', this.task)
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

