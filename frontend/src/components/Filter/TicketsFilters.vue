<template>
    <v-container style="height:100%" pa-2>
        <br>
        <v-combobox
            v-model="filter"
            :items="filters"
            :label="$t('filterBy')"
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
            filters: this.$t('ticketFilters'),
            items: [],
            item: '',
            apiFilters: new Map([
                [this.$t('ticketFilters[0]'), "Todo"],
                [this.$t('ticketFilters[1]'), "Agente"],
                [this.$t('ticketFilters[2]'), "Estado"],
                [this.$t('ticketFilters[3]'), "Prioridad"],
                [this.$t('ticketFilters[4]'), "Usuario"],
            ])
        }
    },
    methods: {
        getItems() {
            if(this.filter === this.$t('ticketFilters[2]')){
                this.items = this.$t('states')
            }
            else if(this.filter === this.$t('ticketFilters[1]')){
                this.items = this.$t('agents')
            }
            else if(this.filter === this.$t('ticketFilters[3]')){
                this.items = this.$t('priorities')
            }
            else if(this.filter === this.$t('ticketFilters[4]')){
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
            else if(this.filter === this.$t('ticketFilters[0]')){
                this.items = []
                this.item = ''
            }
        },
        getFilteredTickets() {

            if(this.filter != this.$t('ticketFilters[0]')) {

                const filter = {
                    type: this.apiFilters.get(this.filter),
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
