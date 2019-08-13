<template>
    <v-container grid-list-md style="height:100%">
        <v-layout wrap fill-height>
            <v-flex xs12>
                <v-card style="height:100%">
                    <v-card-title>
                        <v-icon large left>insert_chart</v-icon>
                        <span class="title font-weight-light">{{this.$t('reportAssetsBykindTitle')}}</span>
                    </v-card-title>
                        <div class="chart" ref="chartdiv"></div>
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
            assets: [],
        }
    },
    methods: {
        getAssets() {
            axios
                .get('/api/reports/assets/bykind')
                .then(response => {
                    this.assets = response.data
                    this.buildAssetsChart()
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        buildAssetsChart() {
            let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

            chart.data = this.assets;

            chart.paddingBottom = 80;

            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "_id";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 20;
            categoryAxis.renderer.labels.template.horizontalCenter = "right";
            categoryAxis.renderer.labels.template.verticalCenter = "middle";
            categoryAxis.renderer.labels.template.rotation = 270;
            categoryAxis.renderer.labels.template.fontSize = 12;
            categoryAxis.tooltip.disabled = true;
            categoryAxis.renderer.minHeight = 110;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.minWidth = 50;

            // Create series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.sequencedInterpolation = true;
            series.dataFields.valueY = "count";
            series.dataFields.categoryX = "_id";
            series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
            series.columns.template.strokeWidth = 0;

            series.tooltip.pointerOrientation = "vertical";

            series.columns.template.column.cornerRadiusTopLeft = 10;
            series.columns.template.column.cornerRadiusTopRight = 10;
            series.columns.template.column.fillOpacity = 0.8;

            // on hover, make corner radiuses bigger
            var hoverState = series.columns.template.column.states.create("hover");
            hoverState.properties.cornerRadiusTopLeft = 0;
            hoverState.properties.cornerRadiusTopRight = 0;
            hoverState.properties.fillOpacity = 1;

            series.columns.template.adapter.add("fill", function(fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
            });

            // Cursor
            chart.cursor = new am4charts.XYCursor();

            this.chart = chart;
        },
    },
    mounted() {
        this.getAssets()
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
