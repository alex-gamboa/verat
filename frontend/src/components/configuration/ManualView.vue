<template>
    <div>
        <v-card class="mx-auto" max-width="100%">
            <v-card-title>
                <v-icon large left>description</v-icon>
                <span class="title font-weight-light">{{ `${configuration.name}` }}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-xl>
                    <v-layout wrap justify-space-between>
                        <v-flex xs12 md12>
                            <div v-html="previewText"></div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-card-actions>
                    <v-btn flat color="blue" @click="edit">Editar</v-btn>
                    <v-btn flat color="blue" @click="exportar">Exportar</v-btn>
                    <v-btn flat color="blue" @click="cancel">Salir</v-btn>
                </v-card-actions>
            </v-card-actions>
        </v-card>

        <v-dialog v-model="editDialog" persistent max-width="1400px">
                <manual-edit :configuration="configuration" @save="onSave" @cancel="editDialog = false">
                </manual-edit>
        </v-dialog>
    </div>

</template>

<script>

import ManualEdit from './ManualEdit'

let marked = require('marked')

export default {
    props: {
        configuration: {},
    },
    data() {
        return {
            editDialog: false
        }
    },
    components: {
        ManualEdit
    },
    computed: {
        previewText() {
            marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
            });
            return marked(this.configuration.manual)
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel')
        },
        edit(){
            this.editDialog = true
        },
        onSave() {
            this.editDialog = false
        }
  }

}
</script>

<style>

</style>
