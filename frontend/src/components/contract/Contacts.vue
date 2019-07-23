<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>assignment_ind</v-icon>
            <span class="title font-weight-light">{{ `${contract.name}` }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field
                            v-model="name"
                            label="Nombre"
                        ></v-text-field>
                        <v-combobox
                            v-model="type"
                            :items="types"
                            label="Tipo"
                        ></v-combobox>
                        <v-text-field
                            v-model="phone"
                            label="Telefono"
                        ></v-text-field>
                        <v-text-field
                            v-model="email"
                            label="Correo"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-data-table
                            v-model="selected"
                            :headers="headers"
                            :items="contacts"
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
                                    <td class="text-xs-left">{{ props.item.type }}</td>
                                    <td class="text-xs-left">{{ props.item.phone }}</td>
                                    <td class="text-xs-left">{{ props.item.email }}</td>
                                    <td class="justify-center">
                                        <v-icon
                                            small
                                            class="mr-2"
                                            @click="editContact(props.item)"
                                        >
                                            edit
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
        contract: {}
    },
    data () {
        self = this
        return {
            selected: [],
            contacts: [],
            name: '',
            type: '',
            phone: '',
            email: '',
            contactId: '',
            editing: false,
            showProgress: false,
            pagination: {
                sortBy: 'name',
                rowsPerPage: 10
            },
            headers: [
            {
                text: 'Nombre',
                align: 'left',
                value: 'name'
            },
            { text: 'Tipo', value: 'type' },
            { text: 'Telefono', value: 'phone' },
            { text: 'Correo', value: 'email' },
            { text: 'Acciones', value: '', sortable: false },
            ],
            types: ['Soporte', 'Asesor', 'Supervisor']
        }
    },
    watch: {
        'contract' : (value) => {
            self.getContacts()
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel')
        },
        getContacts(){

            if(this.contract) {
                this.showProgress = true

                axios
                    .get('/api/contracts/contact/' + this.contract._id)
                    .then(response => {
                        this.contacts = response.data
                        this.showProgress = false
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        save() {
            let contact = {
                name: this.name,
                phone: this.phone,
                email: this.email,
                type: this.type,
                contract: this.contract._id,
                _id: this.editing ? this.contactId : null
            }

            axios
                .post('api/contracts/contact', contact)
                .then(response => {
                    this.getContacts()
                    this.cleanInputs()
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        editContact(item){
            this.name = item.name
            this.phone = item.phone
            this.email = item.email
            this.type = item.type
            this.contactId = item._id
            this.editing = true
        },
        cleanInputs(){
            this.name = ''
            this.phone = ''
            this.email = ''
            this.type = ''
            this.editing = false
            this.contactId = ''
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getContacts()
        })
    }
}
</script>

