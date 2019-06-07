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
        <div>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="assets"
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
                    <tr @click="loadItemInfo(props.item)">
                        <td>{{ props.item.controlNumber }}</td>
                        <td class="text-xs-left">{{ props.item.category }}</td>
                        <td class="text-xs-left">{{ props.item.kind }}</td>
                        <td class="text-xs-left">{{ props.item.model }}</td>
                        <td class="text-xs-left">{{ props.item.user }}</td>
                        <td class="text-xs-left">{{ props.item.area }}</td>
                        <td class="text-xs-left">{{ props.item.status }}</td>
                        <td class="justify-center layout px-0">
                            <v-icon
                                small
                                class="mr-2"
                                @click="editItem(props.item)"
                            >
                                edit
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteItem(props.item)"
                            >
                                delete
                            </v-icon>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
    </div>


</template>

<script>

import axios from 'axios'

let self

export default {
    data () {
        self = this
        return {
            pagination: {
                sortBy: 'kind',
                rowsPerPage: 20
            },
            headers: [
            {
                text: 'Numero de Control',
                align: 'left',
                value: 'controlNumber'
            },
            { text: 'Categoria', value: 'category' },
            { text: 'Tipo', value: 'kind' },
            { text: 'Modelo', value: 'model' },
            { text: 'Usuario', value: 'user' },
            { text: 'Área', value: 'area' },
            { text: 'Status', value: 'status' },
            { text: 'Acciones', value: '', sortable: false },
            ],
            assets: [],
            selected: [],
            showProgress:true,
            valid: false,
            // name: '',
            // username: '',
            // password: '',
            // nameRules: [
            //     v => !!v || 'Name is required'
            // ],
        }
    },
    watch: {
        assets() {
            this.showProgress = false
        }
    },
    methods: {
        getAssets() {
            axios
                .get('http://localhost:3000/api/assets')
                .then(response => {
                    self.assets = response.data
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
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        },
        loadItemInfo (item) {
            alert(item.controlNumber)
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

</style>
