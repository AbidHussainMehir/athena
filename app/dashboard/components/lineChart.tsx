import { Options } from 'highcharts';
import React, { useLayoutEffect, useRef } from 'react';
import { Chart } from './hChart';
import Highcharts3D from 'highcharts/highcharts-3d';
import * as Highcharts from 'highcharts';
import { useTheme } from 'next-themes'

if (typeof Highcharts === 'object') {
    Highcharts3D(Highcharts);
}
const LineChart = ({ data }: any) => {

    const theme: any = useTheme()
    const chartRef = useRef<any>(null);

    useLayoutEffect(() => {
        if (chartRef.current !== null) {
            const container = chartRef.current.container.current;
            container.style.height = '200px';
            container.style.width = '100%';
            chartRef.current.chart.reflow();
        }
    }, []);
    useLayoutEffect(() => {
        if (chartRef.current) {
            const chart = chartRef.current.chart as any;
            chart.options.chart.options3d!.alpha = 0;
            chart.options.chart.options3d!.beta = -1;
            chart.options.chart.options3d!.depth = 20;
            chart.redraw(false);
            setTimeout(() => {
                const alphaElement = document.getElementById('alpha-value');
                if (alphaElement) {
                    alphaElement.innerHTML = chart.options.chart.options3d!.alpha;
                }
                const betaElement = document.getElementById('beta-value');
                if (betaElement) {
                    betaElement.innerHTML = chart.options.chart.options3d!.beta;
                }
                const depthElement = document.getElementById('depth-value');
                if (depthElement) {
                    depthElement.innerHTML = chart.options.chart.options3d!.depth;
                }
            }, 1000)

        }
    }, [])

    const options: Options = {
        chart: {
            renderTo: 'container',
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 0,
                beta: -1,
                depth: 20,
            },
            backgroundColor: 'transparent'
        },

        title: {
            text: '',
            align: 'left'
        },

        xAxis: {
            labels: {
                enabled: true, // Hides the labels
                style: { color: theme?.theme === 'light' ? '#09090B' : '#fff' }
            },
            gridLineWidth: 0,
            lineWidth: 0,    // Removes the axis line
            tickLength: 0,   // Removes the ticks
            type: 'category'
        },
        yAxis: {
            labels: {
                enabled: true, // Hides the labels
                style: { color: theme?.theme === 'light' ? '#09090B' : '#fff' }
            },
            title: {
                enabled: false
            },
            gridLineWidth: 0,
            lineWidth: 0,    // Removes the axis line
            tickLength: 0,

        },
        credits: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '{point.y}'
        },

        label: {
            enabled: false, // Hides series labels on the chart
        },
        // plotOptions: {
        //     series: {
        //         pointStart: 2018
        //     },
        //     column: {
        //         stacking: 'normal',
        //         depth: 40
        //     }
        // },

        series: [{
            data: data,
            colorByPoint: true,
            showInLegend: false, // Hides from legend if legend is enabled
            dataLabels: {
                enabled: false, // Hides data labels for this series
            },
        }],
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false, // Hides data labels
                },
                label: {
                    enabled: false, // Hides series labels on the chart
                },
            },
        },
    } as any;


    return <Chart ref={chartRef} options={options} />;
};
export default LineChart;