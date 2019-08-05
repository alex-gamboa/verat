<template>
    <div>
        <reports-filters v-if="reportRoutes.indexOf($route.path) > -1"></reports-filters>
        <assets-filters v-if="assetRoutes.indexOf($route.path) > -1"></assets-filters>
        <ticket-filters v-if="ticketRoutes.indexOf($route.path) > -1"></ticket-filters>
    </div>
</template>

<script>

import ReportsFilters from './ReportsFilters'
import AssetsFilters from './AssetsFilters'
import TicketFilters from './TicketsFilters'

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
            ],
            ticketRoutes: [
                '/tickets'
            ]
        }
    },
    methods: {
    },
    components: {
        ReportsFilters,
        AssetsFilters,
        TicketFilters
    }

}
</script>

<style>

</style>
