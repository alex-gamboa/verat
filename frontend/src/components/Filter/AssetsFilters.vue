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

        <v-btn @click="getFilteredAssets" color="primary" dark style="width:270px">Aplicar
            <v-icon dark right>done</v-icon>
        </v-btn>


    </v-container>
</template>

<script>

import axios from 'axios'

export default {

    data() {
        return {
            filter: '',
            filters: [
                'Todo',
                'Área',
                'Categoria',
                'Estado',
                'Marca',
                'Tipo',
                'Usuario',
            ],
            items: [],
            item: ''
        }
    },
    methods: {
        getItems() {
            if(this.filter === 'Categoria'){
                axios
                .get('api/assets/category')
                .then( response => {
                    this.items = Array.from(response.data, x => x.name)
                })
            }
            else if(this.filter === 'Tipo'){
                axios
                .get('api/assets/kind')
                .then( response => {
                    this.items = Array.from(response.data, x => x.name)
                })
            }
            else if(this.filter === 'Marca'){
                axios
                .get('api/assets/brand')
                .then( response => {
                    this.items = Array.from(response.data, x => x.name)
                })
            }
            else if(this.filter === 'Estado'){
                axios
                .get('api/assets/state')
                .then( response => {
                    this.items = response.data
                })
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
            else if(this.filter === 'Área'){
                axios
                .get('api/assets/area')
                .then( response => {
                    this.items = Array.from(response.data, x => x.name)
                })
            }
            else if(this.filter === 'Todo'){
                this.items = []
                this.item = ''
            }
        },
        getFilteredAssets() {

            if(this.filter != 'Todo') {

                const filter = {
                    type: this.filter,
                    value: (typeof this.item === 'object') ? this.item._id : this.item
                }

                axios
                    .get('api/assets/filter/' + JSON.stringify(filter))
                    .then( response => {
                        this.$store.commit('setAssets', response.data)
                    })
            }
            else {
                axios
                    .get('api/assets')
                    .then( response => {
                        this.$store.commit('setAssets', response.data)
                    })
            }
        }
    }

}
</script>

<style>

</style>
