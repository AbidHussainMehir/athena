import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Boost from 'highcharts/modules/boost';

interface Iprops {
  options: any;
  boost?: boolean;
  removeNoDataMessage?: boolean;
}
export const Chart = React.forwardRef((props: Iprops, ref: any) => {
  const { options, boost, removeNoDataMessage } = props;

  return (
    <HighchartsReact
      ref={ref}
      options={options}
      highcharts={boost ? Boost(Highcharts) : Highcharts}
    />
  );
});
Chart.displayName = 'Chart';