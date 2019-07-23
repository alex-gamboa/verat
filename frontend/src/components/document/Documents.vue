<template>
    <div class="container" style="height:100%">
        <v-card>
            <v-card-title>
                <v-icon
                    large
                    left
                >
                    folder
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
                :items="documents"
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
                        <td class="text-xs-left">{{ props.item.description }}</td>
                        <td class="text-xs-left">{{ props.item.tags }}</td>
                        <td class="text-xs-left">{{ props.item.date }}</td>
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
                                @click="showDocument(props.item)">
                                description
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

        <v-dialog v-model="editDialog" persistent max-width="900px">
            <edit-document :document="selectedDocument" @save="onSave" @cancel="editDialog = false">
            </edit-document>
        </v-dialog>
    </div>
</template>

<script>

import axios from 'axios'
import moment from "moment";
import bus from "../../bus";

import config from '../../config'
import EditDocument from './EditDocument'

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
                text: 'Nombre',
                align: 'left',
                value: 'name'
            },
            { text: 'Descripción', value: 'description' },
            { text: 'Etiquetas', value: 'tags' },
            { text: 'Fecha', value: 'date' },
            { text: 'Acciones', value: '', sortable: false },
            ],
            documents: [],
            selected: [],
            showProgress:true,
            valid: false,
            selectedDocument: {},
            showTopMessage: false,
            topMessage: '',
            topMessageColor: 'info',
            editDialog: false,
        }
    },
    components: {
        EditDocument
    },
    methods: {
        getDocuments() {
            this.editing = false
            this.showProgress = true

            axios
                .get('/api/documents')
                .then(response => {
                    this.documents = response.data
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
            this.selectedDocument = {
                id: '',
                name: '',
                description: '',
                tags: ''
            }

            this.editDialog = true
        },
        editItem (item) {
            this.selectedDocument = Object.assign({}, item)
            this.editDialog = true
        },
        showDocument(item){
            window.open(config.apiURL + '/' + item.filePath,'window');
            return false
        },
        onSave() {
            this.editDialog = false
            this.topMessageColor = 'success'
            this.topMessage = "Los cambios al documento fueron guardados."
            this.showTopMessage = true

            this.getDocuments()
        },
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getDocuments()
        })
    }
  }
</script>

<style>

</style>
