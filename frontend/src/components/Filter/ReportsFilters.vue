<template>
    <v-container style="height:100%" pa-2>
        <br>
        <v-combobox
            v-model="selectedReport"
            :items="$t('reportCategories')"
            :label="$t('selectCategory')"
            prepend-icon="insert_chart"
        ></v-combobox>

        <v-divider></v-divider>
        <br>

        <div v-if="selectedReport == $t('reportCategories[0]')">
            <v-combobox
                v-model="selectedType"
                :items="$t('assetReports')"
                :label="$t('groupBy')"
                prepend-icon="ballot"
            ></v-combobox>
        </div>

        <v-btn @click="showAssets" color="primary" dark style="width:270px">{{this.$t('btnApply')}}
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
        }
    },
    methods: {
        showAssets() {
            if(this.selectedType == this.$t('assetReports[0]')) this.$router.push('/reports/assetsbycategory')
            else if(this.selectedType == this.$t('assetReports[1]')) this.$router.push('/reports/assetsbykind')
            else if(this.selectedType == this.$t('assetReports[2]')) this.$router.push('/reports/assetsbystatus')
            else if(this.selectedType == this.$t('assetReports[3]')) this.$router.push('/reports/assetsbybrand')
        }
    }

}
</script>

<style>

</style>
