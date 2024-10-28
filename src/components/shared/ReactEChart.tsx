import { Box, BoxProps } from '@mui/material';
import { EChartsReactProps } from 'echarts-for-react';
import { default as EChartsReactCore } from 'echarts-for-react/lib/core';
import { forwardRef } from 'react';

export interface ReactEchartProps extends BoxProps {
  echarts: EChartsReactProps['echarts'];
  option: EChartsReactProps['option'];
}

const ReactEchart = forwardRef<EChartsReactCore | null, ReactEchartProps>(
  ({ option, ...rest }, ref) => {
    return (
      <Box
        component={EChartsReactCore}
        ref={ref}
        option={{
          ...option,
          tooltip: {
            ...option.tooltip,
            confine: true,
            ...(option.tooltip?.formatter ? {} : { formatter: '{b}: {c}' }), // Default formatter if not provided
          },
        }}
        {...rest}
      />
    );
  }
);

export default ReactEchart;
