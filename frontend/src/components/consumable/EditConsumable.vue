<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>print</v-icon>
            <span class="title font-weight-light">{{ `${consumable.kind} ${consumable.brand} ${consumable.model}` }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-layout wrap justify-space-between>
                    <v-flex xs12 md12>
                        <v-form ref="form">
                            <v-combobox
                                v-model="consumable.kind"
                                :items="kinds"
                                item-text="name"
                                item-value="name"
                                :label="$t('kind')"
                            ></v-combobox>
                            <v-combobox
                                v-model="consumable.brand"
                                :items="brands"
                                item-text="name"
                                item-value="name"
                                :label="$t('brand')"
                            ></v-combobox>
                            <v-text-field
                                v-model="consumable.model"
                                :label="$t('model')"
                            ></v-text-field>
                            <v-text-field
                            v-model="consumable.barcode"
                            :label="$t('barcode')"
                        ></v-text-field>
                        <v-text-field
                            v-model="consumable.quantity"
                            :label="$t('quantity')"
                        ></v-text-field>
                            <v-textarea
                                v-model="consumable.comments"
                                outline
                                :label="$t('comments')"
                            ></v-textarea>
                        </v-form>
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
    </v-card>
</template>

<script>
import axios from 'axios'

let self

export default {
    props: {
        consumable: {},
        editing: false,
    },
    data () {
        self = this
        return {
            brands: [],
            categories: [],
            kinds: []
        }
    },
    methods: {
        saveItem() {
            if(typeof this.consumable.kind === 'object')
                this.consumable.kind = this.consumable.kind.name

            if(typeof this.consumable.brand === 'object')
                this.consumable.brand = this.consumable.brand.name


            axios.post('api/consumables', this.consumable)
                .then(response => {
                    this.consumable = {}
                    this.$emit('save', response)
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        getData() {
            axios.all([
                axios.get('api/assets/brand'),
                axios.get('api/assets/kind'),
            ])
            .then(axios.spread((brands, kinds) => {
                this.brands = brands.data
                this.kinds = kinds.data
            }));
        },
        cancel() {
            this.consumable = {}
            this.$emit('cancel')
        },
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getData()
        })
    }
}
</script>

