<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>description</v-icon>
            <span class="title font-weight-light">{{ `${configuration.name}` }}</span>
        </v-card-title>

        <v-card-text>
            <v-container grid-list-xl>
                <v-layout wrap justify-space-between>
                    <v-flex xs12 md12>
                        <div class="container" style="height:100%">
                            <Editor ref="editor" :outline="true" :preview="false" v-model="configuration.manual"
                            style="height:100%" />
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-card-actions>
                <v-btn flat color="blue" @click="save">Guardar</v-btn>
                <v-btn flat color="blue" @click="cancel">Cancelar</v-btn>
            </v-card-actions>
        </v-card-actions>
    </v-card>

</template>

<script>
import axios from 'axios'
import { Editor, Renderer, Toolbar } from 'vuetify-markdown-editor';
import 'vuetify-markdown-editor/dist/vuetify-markdown-editor.css'

export default {
    props: {
        configuration: {},
    },
    data() {
        let self = this
        return {
        }
    },
    components: {
        Editor
    },
    methods: {
        save() {
            axios.post('api/configurations', this.configuration)
                .then(response => {
                    this.$emit('save', response)
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        cancel() {
            this.$emit('cancel')
        },
    },
    mounted() {
        this.$refs.editor.focus();
    }

}
</script>

<style>

</style>
