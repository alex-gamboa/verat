<template>
    <div>
        <reports-filters v-if="reportRoutes.indexOf($route.path) > -1"></reports-filters>
        <assets-filters v-if="assetRoutes.indexOf($route.path) > -1"></assets-filters>
    </div>
</template>

<script>

import ReportsFilters from './ReportsFilters'
import AssetsFilters from './AssetsFilters'

export default {
    data() {
        return {
            reportRoutes: [
                '/reports',
                '/reports/assetsbykind',
                '/reports/assetsbycategory',
                '/reports/assetsbystatus',
                '/reports/assetsbybrand',
            ],
            assetRoutes: [
                '/assetmgmt'
            ]
        }
    },
    methods: {
    },
    components: {
        ReportsFilters,
        AssetsFilters
    }

}
</script>

<style>

</style>
