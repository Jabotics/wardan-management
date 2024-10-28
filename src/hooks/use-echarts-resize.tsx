import ReactECharts from 'echarts-for-react';
import { RefObject, useEffect } from 'react';

export const useChartResize = (chartRef: RefObject<ReactECharts>) => {
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const instance = chartRef.current.getEchartsInstance();
        if (instance) {
          instance.resize();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [chartRef]);
};
