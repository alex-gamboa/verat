<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>dvr</v-icon>
            <span class="title font-weight-light">Search Asset</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-layout wrap justify-space-between>
                    <v-flex xs12 md12>
                        <v-form ref="form">
                            <v-combobox
                                v-model="selectedKind"
                                :items="kinds"
                                item-text="name"
                                item-value="name"
                                label="Tipo"
                                @change="getAssets"
                            ></v-combobox>
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                            <v-data-table
                                v-model="selected"
                                :headers="headers"
                                :items="assets"
                                :loading="true"
                                :search="search"
                                :pagination.sync="pagination"
                                select-all
                                item-key="controlNumber"
                                class="elevation-1"
                            >
                                <template slot="headers" slot-scope="props">
                                    <tr>
                                        <th
                                            v-for="header in props.headers"
                                            :key="header.text"
                                            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '','text-xs-left']"
                                            @click="changeSort(header.value)"
                                        >
                                            {{ header.text }}
                                            <v-icon small>arrow_upward</v-icon>
                                        </th>
                                    </tr>
                                </template>

                                <v-progress-linear v-show="showProgress" slot="progress" color="blue" indeterminate></v-progress-linear>

                                <template slot="items" slot-scope="props">
                                    <tr @click="emitSelection(props.item)">
                                        <td>
                                            <v-checkbox
                                            v-model="props.selected"
                                            primary
                                            hide-details
                                            ></v-checkbox>
                                        </td>
                                        <td class="text-xs-left">{{ props.item.controlNumber }}</td>
                                        <td class="text-xs-left">{{ props.item.brand }}</td>
                                        <td class="text-xs-left">{{ props.item.model }}</td>
                                        <td class="text-xs-left">{{ props.item.area }}</td>
                                        <td class="text-xs-left">{{ props.item.userName }}</td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-card-actions>
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
    },
    data () {
        self = this
        return {
            kinds: [],
            assets: [],
            selected: [],
            selectedUser: '',
            selectedKind: '',
            selectedBrand: '',
            selectedModel: '',
            showProgress:false,
            headers: [
                { text: '', value: '' },
                { text: 'Numero de Control', value: 'controlNumber' },
                { text: 'Marca', value: 'brand' },
                { text: 'Modelo', value: 'model' },
                { text: 'Area', value: 'area' },
                { text: 'Usuario', value: 'userName' },
            ],
            pagination: {
                sortBy: 'brand'
            },
            search: '',
        }
    },
    methods: {
        emitSelection(item){
            this.$emit('selected', item)
            this.selectedKind = ''
            this.assets = []
            this.showProgress = false
        },
        getData() {
            axios.all([
                axios.get('api/assets/brands'),
                axios.get('api/assets/kinds'),
            ])
            .then(axios.spread((brands, kinds) => {
                this.brands = brands.data
                this.kinds = kinds.data
            }));
        },
        cancel() {
            this.$emit('cancel')
        },
        getAssets(){
            this.showProgress = true

            axios.get('api/assets/kind/' + this.selectedKind.name)
            .then( response => {
                this.assets = response.data
                this.showProgress = false
            })
            .catch(error => {
                this.assets = []
                this.showProgress = false
            })
        },
        toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.desserts.slice()
        },
        changeSort (column) {
            if (this.pagination.sortBy === column) {
            this.pagination.descending = !this.pagination.descending
            } else {
            this.pagination.sortBy = column
            this.pagination.descending = false
            }
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getData()
        })
    }
}
</script>

