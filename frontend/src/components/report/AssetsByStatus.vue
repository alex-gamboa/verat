<template>
    <v-container grid-list-md style="height:100%">
        <v-layout wrap fill-height>
            <v-flex xs12>
                <v-card style="height:100%">
                    <v-card-title>
                        <v-icon large left>pie_chart</v-icon>
                        <span class="title font-weight-light">{{this.$t('reportAssetsByStatusTitle')}}</span>
                    </v-card-title>
                        <div class="chart" ref="chart2div"></div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>

import axios from 'axios'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

let self

export default {
    data() {
        self = this
        return {
            assetsByStatus: []
        }
    },
    methods: {
        getAssetsByStatus() {
            axios
                .get('/api/reports/assets/bystatus')
                .then(response => {
                    this.assetsByStatus = response.data
                    this.buildAssetsByStatusChart()
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        buildAssetsByStatusChart() {
            var chart = am4core.create(this.$refs.chart2div, am4charts.PieChart);

            chart.paddingBottom = 80;

            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "count";
            pieSeries.dataFields.category = "_id";

            // Let's cut a hole in our Pie chart the size of 30% the radius
            chart.innerRadius = am4core.percent(30);

            // Put a thick white border around each Slice
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;
            pieSeries.slices.template
            // change the cursor on hover to make it apparent the object can be interacted with
            .cursorOverStyle = [
                {
                "property": "cursor",
                "value": "pointer"
                }
            ];

            pieSeries.alignLabels = false;
            pieSeries.labels.template.bent = true;
            pieSeries.labels.template.radius = 3;
            pieSeries.labels.template.padding(0,0,0,0);

            pieSeries.ticks.template.disabled = true;

            // Create a base filter effect (as if it's not there) for the hover to return to
            var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
            shadow.opacity = 0;

            // Create hover state
            var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

            // Slightly shift the shadow and make it more prominent on hover
            var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
            hoverShadow.opacity = 0.7;
            hoverShadow.blur = 5;

            // Add a legend
            chart.legend = new am4charts.Legend();

            chart.data = this.assetsByStatus

            this.chart = chart
        }
    },
    mounted() {
        this.getAssetsByStatus()
    },
     beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
}
</script>

<style>
    .chart {
        width: 100%;
        height: 100%;
    }
</style>
