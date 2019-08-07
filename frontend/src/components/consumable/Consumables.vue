<template>
    <div class="container" style="height:100%">
        <v-card>
            <v-card-title>
                <v-icon
                    large
                    left
                >
                    print
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
                :items="consumables"
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
                        <!-- <td>{{ props.item._id }}</td> -->
                        <td class="text-xs-left">{{ props.item.kind }}</td>
                        <td class="text-xs-left">{{ props.item.brand }}</td>
                        <td class="text-xs-left">{{ props.item.model }}</td>
                        <td class="text-xs-left">{{ props.item.quantity }}</td>
                        <td class="text-xs-left">{{ props.item.comments }}</td>
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
                            <v-icon
                                small
                                class="mr-2"
                                @click="showHistory(props.item)">
                                assignment
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

        <v-btn @click="showAdd" color="primary" dark>{{ $t('btnNew')}}
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
            <edit-consumable :editing="editing" :consumable="selectedConsumable" @save="onAssetSaved" @cancel="editDialog = false">
            </edit-consumable>
        </v-dialog>
        <v-dialog v-model="assignDialog" persistent max-width="900px">
            <assign-consumable :consumable="selectedConsumable" @save="onAssigned" @cancel="assignDialog = false">
            </assign-consumable>
        </v-dialog>
        <v-dialog v-model="historyDialog" persistent max-width="900px">
            <consumable-history :consumable="selectedConsumable" @close="historyDialog = false">
            </consumable-history>
        </v-dialog>
    </div>
</template>

<script>

import axios from 'axios'
import moment from "moment";
import bus from "../../bus";

import EditConsumable from './EditConsumable'
import AssignConsumable from './AssignConsumable'
import ConsumableHistory from './ConsumableHistory'

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
                { text: this.$t('consumableMainHeaders[0]'), value: 'kind' },
                { text: this.$t('consumableMainHeaders[1]'), value: 'brand' },
                { text: this.$t('consumableMainHeaders[2]'), value: 'model' },
                { text: this.$t('consumableMainHeaders[3]'), value: 'quantity' },
                { text: this.$t('consumableMainHeaders[4]'), value: 'comments' },
                { text: this.$t('consumableMainHeaders[5]'), value: '', sortable: false },
            ],
            consumables: [],
            selected: [],
            showProgress:true,
            valid: false,
            selectedConsumable: {},
            showTopMessage: false,
            topMessage: '',
            topMessageColor: 'info',
            editDialog: false,
            assignDialog: false,
            historyDialog: false,
            editing:false,
            adding:false,
            assetDialogKey: 0
        }
    },
    components: {
        EditConsumable,
        AssignConsumable,
        ConsumableHistory
    },
    watch: {
        consumables() {
            this.showProgress = false
        }
    },
    methods: {
        getConsumables() {
            this.editing = false

            axios
                .get('/api/consumables')
                .then(response => {
                    this.consumables = response.data
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
        showAssign(item){
            this.selectedConsumable = Object.assign({}, item)
            this.assignDialog = true
        },
        showHistory(item){
            this.selectedConsumable = Object.assign({}, item)
            this.historyDialog = true
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
        onAssigned() {
            this.assignDialog = false
            this.topMessageColor = 'success'
            this.topMessage = "El consumible fue asignado."
            this.showTopMessage = true

            this.getConsumables()
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getConsumables()
        })
    }
  }
</script>

<style>

</style>
