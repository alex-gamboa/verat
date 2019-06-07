<template>
    <div>
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
                select-all
                item-key="id"
                class="elevation-1"
            >
                <template slot="headers" slot-scope="props">
                    <tr>
                        <th>
                            <v-checkbox
                                :input-value="props.all"
                                :indeterminate="props.indeterminate"
                                primary
                                hide-details
                                @click.stop="toggleAll"
                            ></v-checkbox>
                        </th>
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
                    <tr :active="props.selected" @click="props.selected = !props.selected">
                        <td>
                            <v-checkbox
                                :input-value="props.selected"
                                primary
                                hide-details
                            ></v-checkbox>
                        </td>
                        <td>{{ props.item.controlNumber }}</td>
                        <td class="text-xs-left">{{ props.item.kind }}</td>
                        <td class="text-xs-left">{{ props.item.model }}</td>
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
                sortBy: 'kind'
            },
            headers: [
            {
                text: 'Numero de Control',
                align: 'left',
                sortable: true,
                value: 'id'
            },
            { text: 'Tipo', value: 'kind' },
            { text: 'Modelo', value: 'model' }
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
                .get('localhost:3000/api/assets')
                .then(response => {
                    self.assets = response.data
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        toggleAll () {
            if (this.selected.length) this.selected = []
            else this.selected = this.users.slice()
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
            this.getAssets()
        })
        }
  }
</script>

<style>

</style>
