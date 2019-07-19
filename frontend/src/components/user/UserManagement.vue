<template>
    <div class="container" style="height:100%">
        <v-card>
            <v-card-title>
                <v-icon
                    large
                    left
                >
                    supervisor_account
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
                :items="users"
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
                        <td>{{ props.item.fullName }}</td>
                        <td class="text-xs-left">{{ props.item.username }}</td>
                        <td class="text-xs-left">{{ props.item.type }}</td>
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
                                @click="showDocuments(props.item)">
                                folder
                            </v-icon>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>

        <br>

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
            <edit-user :user="selectedUser" @save="onUserSaved" @cancel="editDialog = false">
            </edit-user>
        </v-dialog>

        <v-dialog v-model="documentDialog" persistent max-width="900px">
            <user-document :user="selectedUser" @document-saved="onDocumentSaved" @cancel="documentDialog = false">
            </user-document>
        </v-dialog>
    </div>
</template>

<script>

import axios from 'axios'
import moment from "moment";
import bus from "../../bus";

import UserDocument from './UserDocument'
import EditUser from './EditUser'

let self

export default {
    data () {
        self = this
        return {
            pagination: {
                sortBy: 'fullName',
                rowsPerPage: 10
            },
            search: '',
            headers: [
            {
                text: 'Nombre',
                align: 'left',
                value: 'fullName'
            },
            { text: 'Usuario', value: 'username' },
            { text: 'Tipo', value: 'status' },
            { text: 'Acciones', value: '', sortable: false },
            ],
            users: [],
            selected: [],
            showProgress:true,
            valid: false,
            selectedUser: {},
            showTopMessage: false,
            topMessage: '',
            topMessageColor: 'info',
            editDialog: false,
            documentDialog: false,
            assignDialog: false,
            editing:false
        }
    },
    components: {
        'UserDocument': UserDocument,
        'EditUser': EditUser
    },
    methods: {
        getUsers() {
            this.editing = false
            this.showProgress = true

            axios
                .get('/api/users')
                .then(response => {
                    this.users = response.data
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
        showDocuments(item){
            this.selectedUser = Object.assign({}, item)
            this.documentDialog = true
        },
        showAdd() {
            this.selectedUser = {
                id: '',
                fullName: '',
                username: '',
                password: ''
            }

            this.editDialog = true
        },
        editItem (item) {
            this.selectedUser = Object.assign({}, item)
            this.editDialog = true;
        },
        onDocumentSaved() {
            this.topMessageColor = 'success'
            this.topMessage = "El documento fue guardado."
            this.showTopMessage = true
        },
        onUserSaved() {
            this.topMessageColor = 'success'
            this.topMessage = "Los cambios al usuario fueron guardados."
            this.showTopMessage = true
            this.editDialog = false

            this.getUsers()
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getUsers()
        })
    }
  }
</script>

<style>

</style>
