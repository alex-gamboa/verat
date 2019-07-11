<template>
    <div class="container" style="height:100%">
        <div>
            <!-- <v-form v-model="valid">
                <v-container>
                    <v-layout>
                        <v-flex
                        xs12
                        md4
                        >
                        <v-text-field
                            v-model="name"
                            :rules="nameRules"
                            label="Name"
                            required
                        ></v-text-field>
                        </v-flex>

                        <v-flex
                        xs12
                        md4
                        >
                        <v-text-field
                            v-model="username"
                            :rules="nameRules"
                            label="Username"
                            required
                        ></v-text-field>
                        </v-flex>

                        <v-flex
                        xs12
                        md4
                        >
                        <v-text-field
                            v-model="password"
                            :type="password"
                            :rules="nameRules"
                            label="Password"
                            required
                        ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form> -->
        </div>
        <v-card>
            <v-card-title>
                <v-icon
                    large
                    left
                >
                    dvr
                </v-icon>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="assets"
                :search="search"
                :loading="true"
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
                        <td>{{ props.item.controlNumber }}</td>
                        <td class="text-xs-left">{{ props.item.categoryName }}</td>
                        <td class="text-xs-left">{{ props.item.kind }}</td>
                        <td class="text-xs-left">{{ props.item.model }}</td>
                        <td class="text-xs-left">{{ props.item.userName }}</td>
                        <td class="text-xs-left">{{ props.item.area }}</td>
                        <td class="text-xs-left">{{ props.item.status }}</td>
                        <td class="text-xs-left">{{ props.item.lastCount }}</td>
                        <td class="justify-center">
                            <v-icon
                                small
                                class="mr-2"
                                @click="editItem(props.item)"
                            >
                                edit
                            </v-icon>
                            <v-icon
                                small
                                class="mr-2"
                                @click="showLog(props.item)"                            >
                                assignment
                            </v-icon>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>

        <br>

        <!-- <edit-asset v-show="editing" :asset="selectedAsset" @asset-saved="onAssetSaved" @cancel="editing = false">
        </edit-asset> -->

        <v-snackbar
            v-model="showTopMessage"
            :timeout="4000"
            :top="true"
            :color="topMessageColor"
            >
            {{ topMessage }}
        </v-snackbar>

        <v-dialog v-model="dialog" persistent max-width="500">
            <v-card>
                <v-card-title class="headline error" primary-title>Confirmación de eliminación</v-card-title>
                <v-card-text>¿Esta seguro que desea eliminar el activo "{{assetToDelete}}" ?</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false">Aceptar</v-btn>
                <v-btn color="blue darken-1" flat @click="dialog = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="editDialog" persistent max-width="900px">
            <edit-asset :asset="selectedAsset" @asset-saved="onAssetSaved" @cancel="editDialog = false" :blockControlNumber="!editing">
            </edit-asset>
        </v-dialog>

        <v-dialog v-model="assetLogDialog" persistent max-width="1100px">
            <asset-log @close="closeLogDialog">
            </asset-log>
        </v-dialog>
    </div>


</template>

<script>

import axios from 'axios'
import moment from "moment";
import bus from "../bus";

import EditAsset from './EditAsset'
import AssetLog from './AssetLog'

let self

export default {
    data () {
        self = this
        return {
            pagination: {
                sortBy: 'kind',
                rowsPerPage: 10
            },
            search: '',
            headers: [
            {
                text: 'Numero de Control',
                align: 'left',
                value: 'controlNumber'
            },
            { text: 'Categoria', value: 'categoryName' },
            { text: 'Tipo', value: 'kind' },
            { text: 'Modelo', value: 'model' },
            { text: 'Usuario', value: 'userName' },
            { text: 'Área', value: 'area' },
            { text: 'Status', value: 'status' },
            { text: 'Ultimo Conteo', value: 'lastCount' },
            { text: 'Acciones', value: '', sortable: false },
            ],
            assets: [],
            selected: [],
            showProgress:true,
            valid: false,
            selectedAsset: {},
            showTopMessage: false,
            topMessage: '',
            topMessageColor: 'info',
            dialog: false,
            editDialog: false,
            editing:false,
            assetToDelete: '',
            assetLogDialog: false,
            assetDialogKey: 0
            // nameRules: [
            //     v => !!v || 'Name is required'
            // ],
        }
    },
    components: {
        'EditAsset': EditAsset,
        'AssetLog': AssetLog
    },
    watch: {
        assets() {
            this.showProgress = false
        }
    },
    methods: {
        getAssets() {
            this.editing = false

            axios
                .get('/api/assets')
                .then(response => {
                    for (const asset of response.data)
                        asset.lastCount = moment(asset.lastCount).format('YYYY-MM-DD hh:mm')

                    this.assets = response.data
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        changeSort (column) {
            if (this.pagination.sortBy === column) {
                this.pagination.descending = !this.pagination.descending
            } else {
                this.pagination.sortBy = column
                this.pagination.descending = false
            }
        },
        editItem (item) {
            this.selectedAsset = Object.assign({}, item)
            this.editDialog = true;
            this.editing = true;
        },
        showDeleteDialog(item) {
            this.assetToDelete = item.controlNumber
            this.dialog = true;
        },
        showLog(item) {
            bus.$emit('loadLogsRequest', {
                id: item._id,
                description: `${item.controlNumber}: ${item.kind} ${item.brand} ${item.model}`,
            })
            // this.$refs.assetLogView.getLogs()  <--  this works too but whitout the eventBus
            this.assetLogDialog = true
        },
        deleteItem (item) {
        },
        onAssetSaved() {
            this.editDialog = false
            this.topMessageColor = 'success'
            this.topMessage = "Los cambios al activo fueron guardados."
            this.showTopMessage = true

            this.getAssets()
        },
        closeLogDialog() {
            this.assetLogDialog = false
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAssets()
        })
    }
  }
</script>

<style>
    tbody tr:nth-of-type(odd) {
        background-color: rgba(0, 0, 0, .05);
    }

    .material-icons {
      vertical-align: middle;
    }
</style>
