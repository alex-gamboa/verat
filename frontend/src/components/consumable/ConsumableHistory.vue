<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>assignment</v-icon>
            <span class="title font-weight-light">{{description}}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-data-table
                    :headers="headers"
                    :items="logs"
                    :loading="true"
                    :pagination.sync="pagination"
                    select-all
                    item-key="_id"
                    class="elevation-1">
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
                            <td class="text-xs-left">{{ props.item.date }}</td>
                            <td class="text-xs-left">{{ props.item.user }}</td>
                            <td class="text-xs-left">{{ props.item.asset }}</td>
                        </tr>
                    </template>
                </v-data-table>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-card-actions>
                <v-btn flat color="blue" @click="close">Salir</v-btn>
            </v-card-actions>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios'
import moment from "moment";

let self

export default {
    props: {
        consumable: {},
    },
    data() {
        self = this
        return {
            pagination: {
                sortBy: 'date',
                rowsPerPage: 10
            },
            logs: [],
            headers: [
            {
                text: 'Fecha',
                align: 'left',
                value: 'date'
            },
            { text: 'Usuario', value: 'user' },
            { text: 'Activo', value: 'asset' }
            ],
            showProgress:true,
            description: ''
        }
    },
    watch: {
        'consumable' : (value) => {
            self.getLogs()
        }
    },
    methods: {
        close(){
            this.$emit('close')
        },
        getLogs() {
            if(this.consumable._id)
                axios
                    .get('api/consumables/history/'+ this.consumable._id)
                    .then(response => {

                        for (const log of response.data) {
                            log.date = moment(log.date).format('YYYY-MM-DD hh:mm')
                        }

                        this.logs = response.data
                        this.showProgress = false
                    })
                    .catch(error => console.log(error))
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getLogs()
        })
    }
}
</script>

<style>

</style>
