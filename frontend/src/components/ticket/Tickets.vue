<template>
    <div class="container" style="height:100%">
        <v-card>
            <v-card-title>
                <v-icon
                    large
                    left
                >
                    bug_report
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
                :items="tickets"
                :search="search"
                :loading="true"
                :pagination.sync="pagination"
                select-all
                item-key="id"
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
                        <td>{{ props.item._id }}</td>
                        <td class="text-xs-left">{{ props.item.kind }}</td>
                        <td class="text-xs-left">{{ props.item.brand }}</td>
                        <td class="text-xs-left">{{ props.item.model }}</td>
                        <td class="text-xs-left">{{ props.item.quantity }}</td>
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
                                @click="showAssign(props.item)">
                                assignment_ind
                            </v-icon>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>

        <br>

        <!-- <v-btn flat icon color="blue lighten-2">
            <v-icon large>add_circle</v-icon>
        </v-btn> -->

        <v-btn @click="showAdd" color="primary" dark>Nuevo
            <v-icon dark right>add_circle</v-icon>
        </v-btn>

        <v-snackbar
            v-model="showTopMessage"
            :timeout="4000"
            :top="true"
            :color="topMessageColor"
            >
            {{ topMessage }}
        </v-snackbar>

        <v-dialog v-model="editDialog" persistent max-width="700px">
            <edit-ticket :editing="editing" :consumable="selectedConsumable" @save="onAssetSaved" @cancel="editDialog = false">
            </edit-ticket>
        </v-dialog>
    </div>
</template>

<script>

import axios from 'axios'
import moment from "moment";
import bus from "../../bus";

import EditTicket from './EditTicket'

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
                text: 'ID',
                align: 'left',
                value: '_id'
            },
            { text: 'Tipo', value: 'kind' },
            { text: 'Marca', value: 'brand' },
            { text: 'Modelo', value: 'model' },
            { text: 'Cantidad', value: 'quantity' },
            { text: 'Acciones', value: '', sortable: false },
            ],
            tickets: [],
            selected: [],
            showProgress:true,
            valid: false,
            selectedConsumable: {},
            showTopMessage: false,
            topMessage: '',
            topMessageColor: 'info',
            editDialog: false,
            assignDialog: false,
            editing:false,
            adding:false,
            assetDialogKey: 0
        }
    },
    components: {
        'EditTicket': EditTicket,
    },
    methods: {
        getTickets() {
            this.editing = false
            this.showProgress = true

            axios
                .get('/api/consumables')
                .then(response => {
                    this.consumables = response.data
                    this.showProgress = false
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
        showAdd() {
            this.selectedConsumable = {
                id: '',
                categoryName: '',
                brand: '',
                kind: '',
                comments: '',
                barcode: '',
                quantity: 1
            }
            this.editDialog = true
            this.editing = false
            this.adding = true
        },
        editItem (item) {
            this.selectedConsumable = Object.assign({}, item)
            this.editDialog = true;
            this.editing = true;
            this.adding = false;
        },
        showDeleteDialog(item) {
            this.assetToDelete = item.controlNumber
            this.dialog = true;
        },
        onAssetSaved() {
            this.editDialog = false
            this.topMessageColor = 'success'
            this.topMessage = "Los cambios al consumible fueron guardados."
            this.showTopMessage = true

            this.getConsumables()
        },
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getTickets()
        })
    }
  }
</script>

<style>

</style>
