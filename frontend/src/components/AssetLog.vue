<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>laptop_mac</v-icon>
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
                            <td class="text-xs-left">{{ props.item.assetControlNumber }}</td>
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
</template>

<script>
import axios from 'axios'
import bus from '../bus';
import moment from "moment";

let self

export default {
    data() {
        self = this
        return {
            pagination: {
                sortBy: 'kind',
                rowsPerPage: 5
            },
            logs: [],
            headers: [
            {
                text: this.$t('assetLogHeaders[0]'),
                align: 'left',
                value: 'date'
            },
            { text: this.$t('assetLogHeaders[1]'), value: 'user' },
            { text: this.$t('assetLogHeaders[2]'), value: 'assetControlNumber' },
            { text: this.$t('assetLogHeaders[3]'), value: 'event' },
            { text: this.$t('assetLogHeaders[4]'), value: 'documentId' },
            { text: this.$t('assetLogHeaders[5]'), value: 'newValue' },
            { text: this.$t('assetLogHeaders[6]'), value: 'reason' }
            ],
            showProgress:true,
            assetId: '',
            description: ''
        }
    },
    methods: {
        close(){
            this.$emit('close')
        },
        getLogs() {
            axios.get('api/assets/log/'+ this.assetId)
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
    created() {
            bus.$on('loadLogsRequest', (asset) => {
            this.assetId = asset.id
            this.description = asset.description
            this.getLogs()
        })
    }
}
</script>

<style>

</style>
