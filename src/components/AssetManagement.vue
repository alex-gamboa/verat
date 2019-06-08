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
                        <td class="text-xs-left">{{ props.item.lastCount }}</td>
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

        <br>

        <div id="container-edit">
            <v-card
                class="mx-auto"

                max-width="100%"
            >
                <v-card-title>
                <v-icon
                    large
                    left
                >
                    mdi-twitter
                </v-icon>
                <span class="title font-weight-light">{{ selectedControlNumber }}</span>
                </v-card-title>

                <v-card-text class="headline font-weight-bold">
                    <v-container grid-list-xl>
                        <v-layout
                        wrap
                        justify-space-between
                        >
                        <v-flex
                            xs12
                            md4
                        >
                            <v-form ref="form">
                            <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="First name"
                            ></v-text-field>
                            </v-form>
                        </v-flex>

                        <v-flex
                            xs12
                            md6
                        >
                            <v-slider
                            v-model="max"
                            label="Max characters"
                            >
                            </v-slider>

                            <v-checkbox
                            v-model="allowSpaces"
                            label="Allow spaces"
                            ></v-checkbox>

                            <v-text-field
                            v-model="match"
                            label="Value must match"
                            ></v-text-field>
                        </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                <v-list-tile class="grow">
                    <v-list-tile-avatar color="grey darken-3">
                    <v-img
                        class="elevation-6"
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                    <v-list-tile-title>Evan You</v-list-tile-title>
                    </v-list-tile-content>

                    <v-layout
                    align-center
                    justify-end
                    >
                    <v-icon class="mr-1">mdi-heart</v-icon>
                    <span class="subheading mr-2">256</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                    <span class="subheading">45</span>
                    </v-layout>
                </v-list-tile>
                </v-card-actions>
            </v-card>
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
                rowsPerPage: 7
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
            { text: 'Ultimo Conteo', value: 'lastCount' },
            { text: 'Acciones', value: '', sortable: false },
            ],
            assets: [],
            selected: [],
            showProgress:true,
            valid: false,
            selectedControlNumber:null,
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
            this.selectedControlNumber = item.controlNumber
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
