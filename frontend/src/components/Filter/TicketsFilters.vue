<template>
    <v-container style="height:100%" pa-2>
        <br>
        <v-combobox
            v-model="filter"
            :items="filters"
            label="Filtrar Por"
            prepend-icon="ballot"
            @change="getItems"
        ></v-combobox>
        <v-combobox
            v-model="item"
            :items="items"
            :label="filter"
            item-text="name"
            item-value="name"
            prepend-icon="ballot"
        ></v-combobox>

        <br>

        <v-btn @click="getFilteredTickets" color="primary" dark style="width:270px">Aplicar
            <v-icon dark right>done</v-icon>
        </v-btn>


    </v-container>
</template>

<script>

import axios from 'axios'
import { formatPriorities } from './ticketHelper'
import data from './data'

export default {

    data() {
        return {
            filter: '',
            filters: [
                'Todo',
                'Agente',
                'Estado',
                'Prioridad',
                'Usuario',
            ],
            items: [],
            item: ''
        }
    },
    methods: {
        getItems() {
            if(this.filter === 'Estado'){
                this.items = data.states
            }
            else if(this.filter === 'Agente'){
                this.items = data.agents
            }
            else if(this.filter === 'Prioridad'){
                this.items = data.priorities
            }
            else if(this.filter === 'Usuario'){
                axios
                .get('api/users')
                .then( response => {
                    this.items = response.data.map(function(x) {
                        return {
                            name: x.fullName,
                            _id:x._id
                        }
                    })
                })
            }
            else if(this.filter === 'Todo'){
                this.items = []
                this.item = ''
            }
        },
        getFilteredTickets() {

            if(this.filter != 'Todo') {

                const filter = {
                    type: this.filter,
                    value: (typeof this.item === 'object') ? this.item._id : this.item
                }

                axios
                    .get('api/tickets/filter/' + JSON.stringify(filter))
                    .then( response => {
                        this.$store.commit('setTickets', formatPriorities(response.data))
                    })
            }
            else {
                axios
                    .get('api/tickets')
                    .then( response => {
                        this.$store.commit('setTickets', formatPriorities(response.data))
                    })
            }
        }
    }

}
</script>

<style>

</style>
