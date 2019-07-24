<template>
    <v-container grid-list-md style="height:100%">
        <v-layout wrap fill-height>
            <v-flex xs6>
                <v-card style="height:100%">
                    <v-card-title>
                        <v-icon large left>insert_chart</v-icon>
                        <span class="title font-weight-light">Activos por categoria</span>
                    </v-card-title>
                        <div class="chart" ref="chartdiv"></div>
                </v-card>
            </v-flex>
            <v-flex xs6>
                <v-card style="height:100%">
                    <v-card-title>
                        <v-icon large left>pie_chart</v-icon>
                        <span class="title font-weight-light">Activos por estado</span>
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
            assetsByCategory: [],
            assetsByStatus: []
        }
    },
    methods: {
        getAssetsByCategory() {
            axios
                .get('/api/reports/assets/bycategory')
                .then(response => {
                    this.assetsByCategory = response.data
                    this.buildAssetsByCategoryChart()
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        buildAssetsByCategoryChart() {
            let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

            chart.data = this.assetsByCategory;

            chart.paddingBottom = 80;

            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "_id";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.labels.template.horizontalCenter = "right";
            categoryAxis.renderer.labels.template.verticalCenter = "middle";
            categoryAxis.renderer.labels.template.rotation = 270;
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

            this.chart2 = chart
        }
    },
    mounted() {
        this.getAssetsByCategory()
        this.getAssetsByStatus()
    },
     beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
        if (this.chart2) {
            this.chart2.dispose();
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
