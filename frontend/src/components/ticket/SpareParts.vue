<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>build</v-icon>
            <span class="title font-weight-light">{{ `Refacciones de ticket: ${ticket.ticketNumber}` }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex xs12>
                            <v-text-field
                                v-model="name"
                                :label="$t('name')"
                            ></v-text-field>
                            <v-text-field
                                v-model="cost"
                                :label="$t('cost')"
                            ></v-text-field>
                            <v-text-field
                                v-model="quantity"
                                :label="$t('quantity')"
                            ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-data-table
                            v-model="selected"
                            :headers="headers"
                            :items="parts"
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
                                    <td class="text-xs-left">{{ props.item.cost }}</td>
                                    <td class="text-xs-left">{{ props.item.quantity }}</td>
                                    <td class="justify-center">
                                        <v-icon
                                            small
                                            class="mr-2"
                                            @click="showFile(props.item)"
                                        >
                                            remove_circle
                                        </v-icon>
                                    </td>
                                </tr>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-card-actions>
                <v-btn flat color="blue" @click="save">Guardar</v-btn>
                <v-btn flat color="blue" @click="cancel">Salir</v-btn>
            </v-card-actions>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios'
import config from '../../config'

let self

export default {
    props: {
        ticket: {}
    },
    data () {
        self = this
        return {
            name: '',
            selected: [],
            parts: [],
            cost: 0,
            quantity: 0,
            showProgress: false,
            pagination: {
                sortBy: 'name',
                rowsPerPage: 10
            },
            headers: [
            {
                text: this.$t('name'),
                align: 'left',
                value: 'name'
            },
            { text: this.$t('cost'), value: 'cost' },
            { text: this.$t('quantity'), value: 'quantity' },
            { text: this.$t('actions'), value: '', sortable: false },
            ],
        }
    },
    watch: {
        'ticket' : (value) => {
            self.getParts()
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel')
        },
        getParts(){

            if(this.ticket) {
                this.showProgress = true

                axios
                    .get('/api/tickets/spareparts/' + this.ticket._id)
                    .then(response => {
                        this.parts = response.data
                        this.showProgress = false
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }

        },
        save() {
            axios
                .post('api/tickets/spareparts',{
                            name: this.name,
                            cost: this.cost,
                            quantity: this.quantity,
                            ticket: this.ticket._id
                })
                .then(r => {
                    this.$emit('saved', r)
                    this.getParts()
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getParts()
        })
    }
}
</script>

