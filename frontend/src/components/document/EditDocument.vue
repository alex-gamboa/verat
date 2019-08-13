<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>description</v-icon>
            <span class="title font-weight-light">{{ `${document.name}` }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-layout wrap justify-space-between>
                    <v-flex xs12 md12>
                        <v-form ref="form">
                            <v-text-field
                                v-model="document.name"
                                :label="$t('name')"
                            ></v-text-field>
                            <v-text-field
                                v-model="document.description"
                                :label="$t('description')"
                            ></v-text-field>
                            <v-text-field
                                v-model="document.tags"
                                :label="$t('tags')"
                            ></v-text-field>
                            <v-text-field
                                v-model="selectedPath"
                                :label="$t('file')"
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
        document: {},
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
                        this.document.filePath = response.data.fileName

                        axios
                            .post('api/documents', this.document)
                            .then(response => {
                                this.clean()
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
        clean(){
            this.selectedPath = ''
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

