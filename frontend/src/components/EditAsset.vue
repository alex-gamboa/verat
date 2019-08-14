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
                                append-outer-icon="add_circle"
                                @click:append-outer="showAddCategory"
                            ></v-combobox>
                            <v-combobox
                                v-model="asset.kind"
                                :items="kinds"
                                item-text="name"
                                item-value="name"
                                :label="$t('kind')"
                                append-outer-icon="add_circle"
                                @click:append-outer="showAddKind"
                            ></v-combobox>
                            <v-combobox
                                v-model="asset.brand"
                                :items="brands"
                                item-text="name"
                                item-value="id"
                                :label="$t('brand')"
                                append-outer-icon="add_circle"
                                @click:append-outer="showAddBrand"
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
                            append-outer-icon="add_circle"
                            @click:append-outer="showAddArea"
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

        <v-dialog v-model="showAddView" persistent max-width="400px">
            <add-view :title="addViewTitle" @save="onAddSave" @cancel="showAddView = false">
            </add-view>
        </v-dialog>
    </v-card>
</template>

<script>
import axios from 'axios'

import AddView from './shared/AddSingleValue'

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
            addViewTitle: '',
            showAddView: false,
            addType: ''
        }
    },
    components: {
        AddView
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
                axios.get('/api/assets/categories'),
                axios.get('/api/assets/brands'),
                axios.get('/api/assets/areas'),
                axios.get('/api/users'),
                axios.get('/api/assets/state'),
                axios.get('/api/assets/kinds'),
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
        },
        showAddCategory(){
            this.addViewTitle = this.$t('addNewCategory')
            this.addType = 'category'
            this.showAddView = true
        },
        showAddKind(){
            this.addViewTitle = this.$t('addNewKind')
            this.addType = 'kind'
            this.showAddView = true
        },
        showAddBrand(){
            this.addViewTitle = this.$t('addNewBrand')
            this.addType = 'brand'
            this.showAddView = true
        },
        showAddArea(){
            this.addViewTitle = this.$t('addNewArea')
            this.addType = 'area'
            this.showAddView = true
        },
        onAddSave(value) {
            if(this.addType === 'category') this.saveCategory(value)
            if(this.addType === 'kind') this.saveKind(value)
            if(this.addType === 'brand') this.saveBrand(value)
            if(this.addType === 'area') this.saveArea(value)
        },
        saveCategory(category) {
            axios
                .post('/api/assets/categories', {
                    name: category
                })
                .then(response => {
                    axios
                        .get('/api/assets/categories')
                        .then(resp => {
                            this.categories = resp.data
                            this.asset.category = ''
                            this.showAddView = false
                            this.addType = ''
                        })
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        saveKind(kind) {
            axios
                .post('/api/assets/kinds', {
                    name: kind
                })
                .then(response => {
                    axios
                        .get('/api/assets/kinds')
                        .then(resp => {
                            this.kinds = resp.data
                            this.asset.kind = ''
                            this.showAddView = false
                            this.addType = ''
                        })
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        saveBrand(brand) {
            axios
                .post('/api/assets/brands', {
                    name: brand
                })
                .then(response => {
                    axios
                        .get('/api/assets/brands')
                        .then(resp => {
                            this.brands = resp.data
                            this.asset.brand = ''
                            this.showAddView = false
                            this.addType = ''
                        })
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        saveArea(area) {
            axios
                .post('/api/assets/areas', {
                    name: area
                })
                .then(response => {
                    axios
                        .get('/api/assets/areas')
                        .then(resp => {
                            this.areas = resp.data
                            this.asset.area = ''
                            this.showAddView = false
                            this.addType = ''
                        })
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getData()
        })
    }
}
</script>

