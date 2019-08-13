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
                                :label="$t('number')"
                                :readonly="true"
                            ></v-text-field>
                            <v-text-field
                                v-model="ticket.date"
                                :label="$t('ticketCreationDate')"
                                :readonly="true"
                            ></v-text-field>
                            <v-combobox
                                v-model="selectedUser"
                                :items="users"
                                item-text="fullName"
                                item-value="_id"
                                :label="$t('user')"
                            ></v-combobox>
                            <v-combobox
                                v-model="ticket.agent"
                                :items="agents"
                                item-text="fullName"
                                item-value="_id"
                                :label="$t('agent')"
                            ></v-combobox>
                            <v-text-field
                                v-model="asset.controlNumber"
                                :label="$t('asset')"
                                @click="showAssetSearch = true"
                            ></v-text-field>
                            <v-combobox
                                v-model="ticket.service"
                                :items="services"
                                item-text="name"
                                item-value="id"
                                :label="$t('service')"
                            ></v-combobox>
                            <v-combobox
                                v-model="ticket.type"
                                :items="types"
                                item-text="name"
                                item-value="id"
                                :label="$t('type')"
                            ></v-combobox>
                            <v-text-field
                                v-model="ticket.hours"
                                :label="$t('hours')"
                            ></v-text-field>
                        </v-form>
                    </v-flex>

                    <v-flex xs12 md6>
                        <v-combobox
                            v-model="ticket.status"
                            :items="states"
                            item-text="name"
                            item-value="id"
                            :label="$t('status')"
                        ></v-combobox>
                        <v-combobox
                            v-model="ticket.priority"
                            :items="priorities"
                            item-text="name"
                            item-value="id"
                            :label="$t('priority')"
                        ></v-combobox>
                        <v-textarea
                                v-model="ticket.description"
                                outline
                                :label="$t('description')"
                                rows=5
                        ></v-textarea>
                        <v-textarea
                            v-model="ticket.solution"
                            outline
                            :label="$t('solution')"
                            rows=15
                        ></v-textarea>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-card-actions>
                <v-btn flat color="blue" @click="saveItem">{{this.$t('btnSave')}}</v-btn>
                <v-btn flat color="blue" @click="cancel">{{this.$t('btnCancel')}}</v-btn>
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
            agents: [],
            asset: '',
            services: [],
            types: [],
            states: [],
            editing: false,
            showAssetSearch: false,
            selectedUser: '',
            priorities: [],
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
            this.ticket.agent = this.ticket.agent.fullName
            this.ticket.service = this.ticket.service.name
            this.ticket.type = this.ticket.type.name
            this.ticket.status = this.ticket.status.name
            this.ticket.priority = this.ticket.priority.name

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
                axios.get('api/users'),
                axios.get('api/tickets/states'),
                axios.get('api/tickets/priorities'),
                axios.get('api/tickets/types'),
                axios.get('api/tickets/services'),
                axios.get('api/users/agents'),
            ])
            .then(axios.spread((users, states, priorities, types, services, agents) => {
                this.users = users.data
                this.states = states.data
                this.priorities = priorities.data
                this.types = types.data
                this.services = services.data
                this.agents = agents.data
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

