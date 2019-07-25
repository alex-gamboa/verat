<template>
    <v-container style="height:100%" pa-2>
        <br>
        <v-combobox
            v-model="selectedReport"
            :items="reports"
            label="Seleccione un reporte"
            prepend-icon="insert_chart"
        ></v-combobox>

        <v-divider></v-divider>
        <br>

        <div v-if="selectedReport == 'Activos'">

            <v-combobox
                v-model="selectedType"
                :items="assetReportTypes"
                label="Agrupar Por"
                prepend-icon="ballot"
            ></v-combobox>
        </div>

        <v-btn @click="showAssets" color="primary" dark style="width:270px">Aplicar
            <v-icon dark right>done</v-icon>
        </v-btn>


    </v-container>
</template>

<script>
export default {

    data() {
        return {
            selectedReport: '',
            selectedType: '',
            reports: [
                'Activos',
                'Costos',
                'Operación',
            ],
            assetReportTypes: [
                'Categoria',
                'Tipo',
                'Estado',
                'Marca'
            ],
        }
    },
    methods: {
        showAssets() {
            if(this.selectedType == 'Categoria') this.$router.push('/reports/assetsbycategory')
            else if(this.selectedType == 'Estado') this.$router.push('/reports/assetsbystatus')
            else if(this.selectedType == 'Tipo') this.$router.push('/reports/assetsbykind')
            else if(this.selectedType == 'Marca') this.$router.push('/reports/assetsbybrand')
        }
    }

}
</script>

<style>

</style>
