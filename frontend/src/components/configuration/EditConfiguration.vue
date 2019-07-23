<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>description</v-icon>
            <span class="title font-weight-light">{{ `${configuration.name}` }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-layout wrap justify-space-between>
                    <v-flex xs12 md12>
                        <v-form ref="form">
                            <v-text-field
                                v-model="configuration.name"
                                label="Nombre"
                            ></v-text-field>
                            <v-text-field
                                v-model="configuration.description"
                                label="Descripción"
                            ></v-text-field>
                            <v-text-field
                                v-model="configuration.accessRoute"
                                label="Acceso"
                            ></v-text-field>
                            <v-text-field
                                v-model="configuration.credentials"
                                label="Credenciales"
                            ></v-text-field>
                            <v-textarea
                                v-model="configuration.comments"
                                outline
                                label="Comentarios"
                                rows=10
                            ></v-textarea>
                            <v-text-field
                                v-model="selectedPath"
                                label="Manual"
                                @click="$refs.inputUpload.click()"
                            ></v-text-field>
                            <input v-show="false" ref="inputUpload" type="file" @change="onFilePicked" >
                        </v-form>
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
    </v-card>
</template>

<script>
import axios from 'axios'

let self

export default {
    props: {
        configuration: {},
    },
    data () {
        self = this
        return {
            menu: false,
            files: [],
            selectedPath: ''
        }
    },
    methods: {
        saveItem() {

            let file

            const fr = new FileReader ()

            fr.readAsDataURL(this.files[0])

            fr.addEventListener('load', () => {
                file = this.files[0]

                let formData = new FormData()
                formData.append('file', file)

                axios
                    .post('api/users/documents/save', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                            }
                    })
                    .then(response => {
                        this.configuration.manual = response.data.fileName

                        axios
                            .post('api/configurations', this.configuration)
                            .then(response => {
                                this.$emit('save', response)
                            })
                            .catch(function (error) {
                                console.log(error)
                            });
                    })
                    .catch(e => {
                        console.log(e)
                    })
            })


        },
        cancel() {
            this.$emit('cancel')
        },
        onFilePicked(e) {
            const files = e.target.files
            this.files = files

			if(files[0] !== undefined) {
                this.selectedPath = files[0].name
			}
        }
    },
    mounted: function () {
        this.$nextTick(function () {
        })
    }
}
</script>

