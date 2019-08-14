<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>add_circle</v-icon>
            <span class="title font-weight-light">{{ title }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-layout wrap justify-space-between>
                    <v-flex xs12 md12>
                        <v-form ref="form">
                            <v-text-field
                                v-model="value"
                                label="Value"
                            ></v-text-field>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-card-actions>
                <v-btn flat color="blue" @click="save">{{this.$t('btnSave')}}</v-btn>
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
        title: ''
    },
    data () {
        self = this
        return {
            value:''
        }
    },
    methods: {
        save() {
            this.$emit('save', this.value)
            this.value = ''
        },
        cancel() {
            this.$emit('cancel')
        }
    }
}
</script>

