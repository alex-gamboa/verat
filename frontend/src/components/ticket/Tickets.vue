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
                :items="$store.getters.getTickets"
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
                        <td>
                            <v-icon
                                medium
                                class="mr-2"
                                :color="props.item.color"
                            >
                                {{props.item.icon}}
                            </v-icon>
                        </td>
                        <td>{{ props.item.ticketNumber }}</td>
                        <td class="text-xs-left">{{ props.item.type }}</td>
                        <td class="text-xs-left">{{ props.item.status }}</td>
                        <td class="text-xs-left">{{ props.item.userName }}</td>
                        <td class="text-xs-left">{{ props.item.agent }}</td>
                        <td class="text-xs-left">{{ props.item.description }}</td>
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
                                @click="showParts(props.item)">
                                build
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

        <v-btn @click="showAdd" color="primary" dark> {{ $t('btnNew')}}
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
            <edit-ticket :editing="editing" :ticket="selectedTicket" @ticket-saved="onTicketSaved" @cancel="editDialog = false">
            </edit-ticket>
        </v-dialog>
        <v-dialog v-model="partsDialog" persistent max-width="900px">
            <spare-parts :ticket="selectedTicket" @saved="onPartSaved" @cancel="partsDialog = false">
            </spare-parts>
        </v-dialog>
    </div>
</template>

<script>

import axios from 'axios'
import moment from "moment";
import bus from "../../bus";
import { formatPriorities } from '../Filter/ticketHelper'

import EditTicket from './EditTicket'
import SpareParts from './SpareParts'

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
                { text: this.$t('ticketMainHeaders[0]'), value: '' },
                {
                    text: this.$t('ticketMainHeaders[1]'),
                    align: 'left',
                    value: 'tickerNumber'
                },
                { text: this.$t('ticketMainHeaders[2]'), value: 'type' },
                { text: this.$t('ticketMainHeaders[3]'), value: 'status' },
                { text: this.$t('ticketMainHeaders[4]'), value: 'user' },
                { text: this.$t('ticketMainHeaders[5]'), value: 'agent' },
                { text: this.$t('ticketMainHeaders[6]'), value: 'description' },
                { text: this.$t('ticketMainHeaders[7]'), value: '', sortable: false },
            ],
            tickets: [],
            selected: [],
            showProgress:true,
            valid: false,
            selectedTicket: {},
            showTopMessage: false,
            topMessage: '',
            topMessageColor: 'info',
            editDialog: false,
            partsDialog: false,
            editing:false,
        }
    },
    components: {
        EditTicket,
        SpareParts
    },
    methods: {
        getTickets() {
            this.editing = false
            this.showProgress = true

            axios
                .get('api/tickets')
                .then(response => {
                    this.showProgress = false
                    this.$store.commit('setTickets', formatPriorities(response.data))
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
        showParts(item){
            this.selectedTicket = Object.assign({}, item)
            this.partsDialog = true
        },
        showAdd() {
            this.selectedTicket = {
                id: '',
                ticketNumber: '',
                user: '',
                agent: '',
                description: '',
                solution: '',
                asset: '',
                service: '',
                type: '',
                hours: '',
                spareParts: [],
                status: '',
                priority: ''
            }

            this.editDialog = true
            this.editing = false
        },
        editItem (item) {
            this.selectedTicket = Object.assign({}, item)
            this.editDialog = true;
            this.editing = true;
        },
        onTicketSaved() {
            this.editDialog = false
            this.topMessageColor = 'success'
            this.topMessage = "Los cambios al ticket fueron guardados."
            this.showTopMessage = true

            this.getTickets()
        },
        onPartSaved() {
            this.topMessageColor = 'success'
            this.topMessage = "Los cambios a las refacciones fueron guardados."
            this.showTopMessage = true
        }
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
