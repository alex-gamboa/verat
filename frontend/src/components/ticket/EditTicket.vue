<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>bug_report</v-icon>
            <span class="title font-weight-light">{{ `${ticket.ticketNumber}: ${ticket.type} ${ticket.status}` }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-layout wrap justify-space-between>
                    <v-flex xs12 md5>
                        <v-form ref="form">
                            <v-text-field
                                v-model="ticket.ticketNumber"
                                label="Folio"
                                :readonly="true"
                            ></v-text-field>
                            <v-text-field
                                v-model="ticket.date"
                                label="Creado"
                                :readonly="true"
                            ></v-text-field>
                            <v-combobox
                                v-model="selectedUser"
                                :items="users"
                                item-text="fullName"
                                item-value="_id"
                                label="Usuario"
                            ></v-combobox>
                            <v-combobox
                                v-model="ticket.agent"
                                :items="agents"
                                item-text="name"
                                item-value="name"
                                label="Agente"
                            ></v-combobox>
                            <v-text-field
                                v-model="asset.controlNumber"
                                label="Activo"
                                @click="showAssetSearch = true"
                            ></v-text-field>
                            <v-combobox
                                v-model="ticket.service"
                                :items="services"
                                item-text="name"
                                item-value="id"
                                label="Servicio"
                            ></v-combobox>
                            <v-combobox
                                v-model="ticket.type"
                                :items="types"
                                item-text="name"
                                item-value="id"
                                label="Tipo"
                            ></v-combobox>
                            <v-text-field
                                v-model="ticket.hours"
                                label="Horas"
                            ></v-text-field>
                        </v-form>
                    </v-flex>

                    <v-flex xs12 md6>
                        <v-combobox
                            v-model="ticket.status"
                            :items="states"
                            label="Estado"
                        ></v-combobox>
                        <v-combobox
                            v-model="ticket.priority"
                            :items="priorities"
                            label="Prioridad"
                        ></v-combobox>
                        <v-textarea
                                v-model="ticket.description"
                                outline
                                label="Descripción"
                                rows=5
                        ></v-textarea>
                        <v-textarea
                            v-model="ticket.solution"
                            outline
                            label="Solución"
                            rows=15
                        ></v-textarea>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-card-actions>
                <v-btn flat color="blue" @click="saveItem">Guardar</v-btn>
                <v-btn flat color="blue" @click="cancel">Cancelar</v-btn>
            </v-card-actions>
        </v-card-actions>

        <v-dialog v-model="showAssetSearch" persistent max-width="900px">
            <asset-search @selected="onAssetSelected" @cancel="showAssetSearch = false">
            </asset-search>
        </v-dialog>

    </v-card>
</template>

<script>
import axios from 'axios'
import AssetSearch from "../shared/AssetSearch";

let self

export default {
    props: {
        ticket: {}
    },
    data () {
        self = this
        return {
            users:[],
            agents: this.$t('agents'),
            asset: '',
            services: ['Internet','Correo','ERP','CCTV','Telefonia','Dominio','Documentos compartidos','Impresión','Windows','Software'],
            types: this.$t('ticketTypes'),
            states: this.$t('states'),
            editing: false,
            showAssetSearch: false,
            selectedUser: {},
            priorities: this.$t('priorities'),
        }
    },
    components: {
        'AssetSearch': AssetSearch,
    },
    watch: {
        ticket() {
            this.selectedUser = this.users.find(user => user._id === this.ticket.user)
            this.asset = {
                _id: this.ticket.assetId,
                controlNumber: this.ticket.assetControlNumber
            }
        }
    },
    methods: {
        saveItem() {

            this.ticket.asset = this.asset
            this.ticket.user = this.selectedUser._id
            this.ticket.userName = this.selectedUser.fullName

            axios.post('api/tickets', this.ticket)
            .then(response => {
                this.ticket = {}
                this.$emit('ticket-saved', response)
            })
            .catch(function (error) {
                console.log(error)
            });
        },
        onAssetSelected(asset){
            this.asset = asset
            this.showAssetSearch = false
        },
        getData() {
            axios.all([
                axios.get('api/users')
            ])
            .then(axios.spread((users) => {
                this.users = users.data
            }));
        },
        cancel() {
            this.asset = {}
            this.$emit('cancel')
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getData()
        })
    }
}
</script>

