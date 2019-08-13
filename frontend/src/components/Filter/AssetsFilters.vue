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

        <v-btn @click="getFilteredAssets" color="primary" dark style="width:270px">{{ $t('btnApply')}}
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
            filters: this.$t('assetFilters'),
            items: [],
            item: '',
            //Map(i18n_message,api_expected_filter)
            apiFilters: new Map([
                [this.$t('assetFilters[0]'), "Todo"],
                [this.$t('assetFilters[1]'), "Área"],
                [this.$t('assetFilters[2]'), "Categoria"],
                [this.$t('assetFilters[3]'), "Estado"],
                [this.$t('assetFilters[4]'), "Marca"],
                [this.$t('assetFilters[5]'), "Tipo"],
                [this.$t('assetFilters[6]'), "Usuario"],
            ])
        }
    },
    methods: {
        getItems() {
            if(this.filter === this.$t('assetFilters[2]')){
                axios
                .get('api/assets/category')
                .then( response => {
                    this.items = Array.from(response.data, x => x.name)
                })
            }
            else if(this.filter === this.$t('assetFilters[5]')){
                axios
                .get('api/assets/kind')
                .then( response => {
                    this.items = Array.from(response.data, x => x.name)
                })
            }
            else if(this.filter === this.$t('assetFilters[4]')){
                axios
                .get('api/assets/brand')
                .then( response => {
                    this.items = Array.from(response.data, x => x.name)
                })
            }
            else if(this.filter === this.$t('assetFilters[3]')){
                axios
                .get('api/assets/state')
                .then( response => {
                    this.items = response.data
                })
            }
            else if(this.filter === this.$t('assetFilters[6]')){
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
            else if(this.filter === this.$t('assetFilters[1]')){
                axios
                .get('api/assets/area')
                .then( response => {
                    this.items = Array.from(response.data, x => x.name)
                })
            }
            else if(this.filter === this.$t('assetFilters[0]')){
                this.items = []
                this.item = ''
            }
        },
        getFilteredAssets() {

            if(this.filter != this.$t('assetFilters[0]')) {

                const filter = {
                    type: this.apiFilters.get(this.filter),
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
