<template>
    <div class="container" style="height:100%">
        <v-card>
            <v-card-title>
                <v-icon
                    large
                    left
                >
                    description
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
                :items="contracts"
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
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.renovation }}</td>
                        <td class="text-xs-left">{{ props.item.billAmount }}</td>
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
                                @click="showContacts(props.item)">
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

        <v-btn @click="showAdd" color="primary" dark> {{$t('btnNew')}}
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

        <v-dialog v-model="editDialog" persistent max-width="900px">
            <edit-contract :contract="selectedContract" @save="onSave" @cancel="editDialog = false">
            </edit-contract>
        </v-dialog>

        <v-dialog v-model="contactDialog" persistent max-width="900px">
            <contacts :contract="selectedContract" @cancel="contactDialog = false">
            </contacts>
        </v-dialog>
    </div>
</template>

<script>

import axios from 'axios'
import moment from "moment";
import bus from "../../bus";

import EditContract from './EditContract'
import Contacts from './Contacts'

let self

export default {
    data () {
        self = this
        return {
            pagination: {
                sortBy: 'name',
                rowsPerPage: 10
            },
            search: '',
            headers: [
            {
                text: this.$t('contractMainHeaders[0]'),
                align: 'left',
                value: 'name'
            },
            { text: this.$t('contractMainHeaders[1]'), value: 'renovation' },
            { text: this.$t('contractMainHeaders[2]'), value: 'billAmount' },
            { text: this.$t('contractMainHeaders[3]'), value: '', sortable: false },
            ],
            contracts: [],
            selected: [],
            showProgress:true,
            valid: false,
            selectedContract: {},
            showTopMessage: false,
            topMessage: '',
            topMessageColor: 'info',
            editDialog: false,
            contactDialog: false,
            editing:false,
        }
    },
    components: {
        'EditContract': EditContract,
        'Contacts': Contacts
    },
    methods: {
        getContracts() {
            this.editing = false
            this.showProgress = true

            axios
                .get('/api/contracts')
                .then(response => {
                    this.contracts = response.data
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
            this.selectedContract = {
                id: '',
                name: '',
                billAmount: '',
                renovation: '',
                details: '',
                portal: '',
                portalCredentials: ''
            }

            this.editDialog = true
            this.editing = false
        },
        editItem (item) {
            this.selectedContract = Object.assign({}, item)
            this.editDialog = true
        },
        showContacts(item){
            this.selectedContract = Object.assign({}, item)
            this.contactDialog = true
        },
        onSave() {
            this.editDialog = false
            this.topMessageColor = 'success'
            this.topMessage = "Los cambios al contrato fueron guardados."
            this.showTopMessage = true

            this.getContracts()
        },
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getContracts()
        })
    }
  }
</script>

<style>

</style>
