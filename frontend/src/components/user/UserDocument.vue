<template>
    <v-card class="mx-auto" max-width="100%">
        <v-card-title>
            <v-icon large left>folder</v-icon>
            <span class="title font-weight-light">{{ `${user.fullName}` }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex xs12>
                            <v-text-field
                                v-model="selectedPath"
                                :label="$t('file')"
                                @click="$refs.inputUpload.click()"
                            ></v-text-field>
                            <input v-show="false" ref="inputUpload" type="file" @change="onFilePicked" >
                            <v-text-field
                                v-model="description"
                                :label="$t('description')"
                            ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-data-table
                            v-model="selected"
                            :headers="headers"
                            :items="documents"
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
                                    <td class="text-xs-left">{{ props.item.description }}</td>
                                    <td class="text-xs-left">{{ props.item.date }}</td>
                                    <td class="justify-center">
                                        <v-icon
                                            small
                                            class="mr-2"
                                            @click="showFile(props.item)"
                                        >
                                            visibility
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
                <v-btn flat color="blue" @click="save">{{ this.$t('btnSave')}}</v-btn>
                <v-btn flat color="blue" @click="cancel">{{ this.$t('btnClose')}}</v-btn>
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
        user: {}
    },
    data () {
        self = this
        return {
            selectedPath: '',
            selected: [],
            files: [],
            documents: [],
            description: '',
            showProgress: false,
            pagination: {
                sortBy: 'name',
                rowsPerPage: 10
            },
            headers: [
            {
                text: this.$t('userDocumentHeaders[0]'),
                align: 'left',
                value: 'name'
            },
            { text: this.$t('userDocumentHeaders[1]'), value: 'description' },
            { text: this.$t('userDocumentHeaders[2]'), value: 'date' },
            { text: this.$t('userDocumentHeaders[3]'), value: '', sortable: false },
            ],
        }
    },
    watch: {
        'user' : (value) => {
            self.getDocuments()
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel')
        },
        showFile(item) {
            window.open(config.apiURL + '/' + item.filePath,'window');
            return false
        },
        getDocuments(){

            if(this.user) {
                this.showProgress = true

                axios
                    .get('/api/users/documents/' + this.user._id)
                    .then(response => {
                        this.documents = response.data
                        this.showProgress = false
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }

        },
        save() {
            let file

            const fr = new FileReader ()

            fr.readAsDataURL(this.files[0])
            fr.addEventListener('load', () => {
                this.imageUrl = fr.result
                file = this.files[0]

                let formData = new FormData()
                formData.append('file', file)

                axios.post('api/users/documents/save', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                            }
                    })
                    .then(response => {
                        axios.post('api/users/documents',{
                            name: this.selectedPath,
                            description: this.description,
                            filePath: response.data.fileName,
                            user: this.user._id
                        })
                        .then(r => {
                            this.$emit('document-saved', r)
                            this.getDocuments()
                        })
                        .catch(e => {
                            console.log(e)
                        })
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            })
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
            this.getDocuments()
        })
    }
}
</script>

