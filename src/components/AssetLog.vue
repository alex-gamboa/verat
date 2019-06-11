<template>
    <v-container>
        <v-card class="mx-auto" max-width="100%">
            <v-card-title>
                <v-icon large left>laptop_mac</v-icon>
                <span class="title font-weight-light">{{assetControlNumber}}</span>
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
                                <td class="text-xs-left">{{ props.item.event }}</td>
                                <td class="text-xs-left">{{ props.item.documentId }}</td>
                                <td class="text-xs-left">{{ props.item.newValue }}</td>
                                <td class="text-xs-left">{{ props.item.reason }}</td>
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

    </v-container>
</template>

<script>
import axios from 'axios'

let self

export default {
    props: {
        assetControlNumber: ''
    },
    data() {
        self = this
        return {
            logs: [],
            headers: [
            {
                text: 'Fecha',
                align: 'left',
                value: 'date'
            },
            { text: 'Usuario', value: 'user' },
            { text: 'Activo', value: 'asset' },
            { text: 'Evento', value: 'event' },
            { text: 'Document', value: 'documentId' },
            { text: 'Valor', value: 'newValue' },
            { text: 'Motivo', value: 'reason' }
            ],
            showProgress:true,
        }
    },
    watch: {
        assetControlNumber() {
            this.getLogs()
        }
    },
    methods: {
        close(){
            this.$emit('close')
        },
        getLogs() {
            axios.get('http://localhost:3000/api/logs/'+ this.assetControlNumber)
            .then(response => {
                this.logs = response.data
                this.showProgress = false
            })
            .catch(error => console.log(error))
        }
    }
}
</script>

<style>

</style>
