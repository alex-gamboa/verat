<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>print</v-icon>
            <span class="title font-weight-light">{{ `${consumable.kind} ${consumable.brand} ${consumable.model}` }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-layout wrap justify-space-between>
                    <v-flex xs12 md12>
                        <v-form ref="form">
                            <v-combobox
                                v-model="selectedUser"
                                :items="users"
                                item-text="fullName"
                                item-value="fullName"
                                :label="$t('user')"
                                @change="clearAssetSelection"
                            ></v-combobox>
                            <br>
                            <br>
                            <v-combobox
                                v-model="selectedKind"
                                :items="kinds"
                                item-text="name"
                                item-value="name"
                                :label="$t('asset')"
                                @change="getAssets"
                            ></v-combobox>
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="search"
                                append-icon="search"
                                :label="$t('search')"
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
                                    <tr>
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
                <v-btn flat color="blue" @click="save">{{this.$t('btnSave')}}</v-btn>
                <v-btn flat color="blue" @click="cancel">{{this.$t('btnCancel')}}</v-btn>
            </v-card-actions>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios'

let self

export default {
    props: {
        consumable: {}
    },
    data () {
        self = this
        return {
            users: [],
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
                { text: this.$t('assetControlNumber'), value: 'controlNumber' },
                { text: this.$t('brand'), value: 'brand' },
                { text: this.$t('model'), value: 'model' },
                { text: this.$t('area'), value: 'area' },
                { text: this.$t('user'), value: 'userName' },
            ],
            pagination: {
                sortBy: 'brand'
            },
            search: '',
        }
    },
    methods: {
        save() {

            if(this.selectedUser || this.selected.length > 0) {

                let history = {
                    consumable: this.consumable._id,
                    isAsset: true,
                    itemId: ''
                }

                if(this.selectedUser) {
                    history.isAsset = false
                    history.itemId = this.selectedUser._id
                }

                if(this.selected.length > 0) {
                    history.isAsset = true;
                    history.itemId = this.selected[0]._id
                }

                axios
                    .post('api/consumables/history', history)
                    .then(response => {
                        this.selectedUser = null
                        this.selectedKind = ''
                        this.assets = []
                        this.selected = []
                        this.$emit('save', response)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }

        },
        getData() {
            axios.all([
                axios.get('api/assets/brands'),
                axios.get('api/assets/kinds'),
                axios.get('api/users'),
            ])
            .then(axios.spread((brands, kinds, users, models) => {
                this.brands = brands.data
                this.kinds = kinds.data
                this.users = users.data
            }));
        },
        cancel() {
            this.consumable = {}
            this.$emit('cancel')
        },
        clearAssetSelection(){

            if(this.selectedUser) {
                this.selectedKind = ''
                this.assets = []
                this.selected = []
            }
        },
        getAssets(){

            if(this.selectedKind) {
                this.selectedUser = ''
                this.showProgress = true

                axios.get('api/assets/kind/' + this.selectedKind.name)
                .then( response => {
                    this.assets = response.data
                    this.showProgress = false
                })
            }
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

