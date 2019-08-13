<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>laptop_mac</v-icon>
            <span class="title font-weight-light">{{ `${asset.controlNumber}: ${asset.kind} ${asset.brand} ${asset.model}` }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-layout wrap justify-space-between>
                    <v-flex xs12 md5>
                        <v-form ref="form">
                            <v-text-field
                                v-model="asset.controlNumber"
                                :label="$t('assetControlNumber')"
                                :readonly="blockControlNumber"
                            ></v-text-field>
                            <v-combobox
                                v-model="asset.categoryName"
                                :items="categories"
                                item-text="name"
                                item-value="name"
                                :label="$t('category')"
                            ></v-combobox>
                            <v-combobox
                                v-model="asset.kind"
                                :items="kinds"
                                item-text="name"
                                item-value="name"
                                :label="$t('kind')"
                            ></v-combobox>
                            <v-combobox
                                v-model="asset.brand"
                                :items="brands"
                                item-text="name"
                                item-value="id"
                                :label="$t('brand')"
                            ></v-combobox>
                            <v-text-field
                                v-model="asset.model"
                                :label="$t('model')"
                            ></v-text-field>
                            <v-text-field
                                v-model="asset.serialNumber"
                                :label="$t('serialNumber')"
                            ></v-text-field>
                            <v-textarea
                                v-model="asset.comments"
                                outline
                                :label="$t('comments')"
                            ></v-textarea>
                        </v-form>
                    </v-flex>

                    <v-flex xs12 md6>
                        <v-combobox
                            v-model="asset.userName"
                            :items="users"
                            item-text="fullName"
                            item-value="fullName"
                            :label="$t('user')"
                        ></v-combobox>
                        <v-combobox
                            v-model="asset.status"
                            :items="states"
                            item-text="name"
                            item-value="name"
                            :label="$t('status')"
                        ></v-combobox>
                        <v-combobox
                            v-model="asset.area"
                            :items="areas"
                            item-text="name"
                            item-value="name"
                            :label="$t('area')"
                        ></v-combobox>
                        <v-text-field
                            v-model="asset.barcode"
                            :label="$t('barcode')"
                        ></v-text-field>
                        <v-text-field
                            v-model="asset.quantity"
                            :label="$t('quantity')"
                        ></v-text-field>
                        <v-textarea
                            v-model="reason"
                            outline
                            :label="$t('reason')"
                            v-show="showReason"
                        ></v-textarea>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-card-actions>
                <v-btn flat color="blue" @click="saveItem">{{$t('btnSave')}}</v-btn>
                <v-btn flat color="blue" @click="cancel">{{$t('btnCancel')}}</v-btn>
            </v-card-actions>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios'

let self

export default {
    props: {
        asset: {},
        blockControlNumber: false
    },
    data () {
        self = this
        return {
            areas:[],
            states: [],
            brands: [],
            categories: [],
            kinds: [],
            users: [],
            reason: "",
            showReason: false,
            editing: false,
            isStatusChanged: false,
        }
    },
    watch: {
        'asset.status': (newValue, old) => {
            if (newValue === 'Reparación' || newValue === 'Scrap' || newValue === 'Baja') {
                self.showReason = true
                self.isStatusChanged = true;
            }

        }
    },
    methods: {
        saveItem() {

            if(typeof this.asset.category === 'object')
                this.asset.category = this.asset.categoryName._id
            if(typeof this.asset.categoryName === 'object')
                this.asset.categoryName = this.asset.categoryName.name
            if(typeof this.asset.userName === 'object') {
                this.asset.user = this.asset.userName._id
                this.asset.userName = this.asset.userName.fullName
            }
            if(typeof this.asset.area === 'object')
                this.asset.area = this.asset.area.name
            if(typeof this.asset.kind === 'object')
                this.asset.kind = this.asset.kind.name
            if(typeof this.asset.brand === 'object')
                this.asset.brand = this.asset.brand.name

            axios.post('/api/assets', this.asset)
            .then(response => {
                this.asset._id = response.data._id

                if(this.showReason) this.saveLog()

                this.asset = {}
                this.isStatusChanged = false
                this.$emit('asset-saved', response)
            })
            .catch(function (error) {
                console.log(error)
            });
        },
        getData() {
            axios.all([
                axios.get('/api/assets/category'),
                axios.get('/api/assets/brand'),
                axios.get('/api/assets/area'),
                axios.get('/api/users'),
                axios.get('/api/assets/state'),
                axios.get('/api/assets/kind'),
            ])
            .then(axios.spread((categories, brands, areas, users, states, kinds) => {
                this.categories = categories.data
                this.brands = brands.data
                this.areas = areas.data
                this.users = users.data
                this.states = states.data
                this.kinds = kinds.data
            }));
        },
        getKinds() {

        },
        cancel() {
            this.asset = {}
            this.$emit('cancel')
        },
        saveLog() {
            axios.post('/api/assets/log', {
                date: new Date(),
                asset: this.asset._id,
                assetControlNumber: this.asset.controlNumber,
                documentId: null,
                event: 'Cambio de estado',
                newValue: this.asset.status,
                reason: this.reason
            })
            .then(r => {
                this.reason = ""
                this.showReason = false
            })
            .catch(function (error) {
                console.log(error)
            });
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getData()
        })
    }
}
</script>

