import { Options } from 'highcharts';
import React, { useLayoutEffect, useRef } from 'react';
import { Chart } from './hChart';
import Highcharts3D from 'highcharts/highcharts-3d';
import * as Highcharts from 'highcharts';
import { CreditCard } from 'lucide-react';

if (typeof Highcharts === 'object') {
    Highcharts3D(Highcharts);
}
const LineChart = ({ data }: any) => {

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
    //   const getName = (color: string, name: string, value: number): string => {
    //     return (
    //       '<div style="font-family:' +
    //       theme.typography.fontFamily +
    //       '; color:' +
    //       theme.typography.subtitle1.color +
    //       ';font-size: 2.125rem;  margin-bottom: 1rem; font-weight: 600; line-height: 2.125rem; letter-spacing: -0.02em;text-align: left; " >' +
    //       value +
    //       '</div > <div style="display:flex;align-items:center; margin-bottom: 1rem;"><div style="font-family:' +
    //       theme.typography.fontFamily +
    //       ';background-color:' +
    //       color +
    //       ';padding:0;height:0.5rem;width:0.75rem;border-radius:0.25rem;margin-right:0.313rem;"></div> <p style="font-family:' +
    //       theme.typography.fontFamily +
    //       ';font-weight:600;font-size:0.875rem;line-height:1.375rem;padding:0;color:' +
    //       theme.typography.h2.color +
    //       '">' +
    //       name +
    //       '</p></div>'
    //     );
    //   };
    const options: Options = {
        chart: {
            renderTo: 'container',
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 0,
                beta: -1,
                depth: 20,
                // viewDistance: 25
            },
            backgroundColor: 'transparent'
        },

        title: {
            text: '',
            align: 'left'
        },

        xAxis: {
            gridLineWidth: 0,
            lineWidth: 0,    // Removes the axis line
            tickLength: 0,   // Removes the ticks
            labels: {
                enabled: true, // Hides the labels
            },
            type: 'category'
        },
        yAxis: {

            title: {
                enabled: false
            }

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