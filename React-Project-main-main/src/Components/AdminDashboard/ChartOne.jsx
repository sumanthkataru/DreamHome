import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'center',
    markers: {
      fillColors: ['#3C50E0', '#80CAEE', '#FF9F00'],
    },
  },
  colors: ['#3C50E0', '#80CAEE', '#FF9F00'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'bar',
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  xaxis: {
    categories: ['Architect', 'Interior Designer', 'Contractor'],
  },
  plotOptions: {
    bar: {
      distributed: true,
      dataLabels: {
        position: 'top',
      },
    },
  },
  dataLabels: {
    enabled: true,
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#3C50E0', '#80CAEE', '#FF9F00'],
    },
  },
  fill: {
    opacity: 1,
  },
  yaxis: {
    title: {
      text: 'Percentage',
    },
  },
  noData: {
    text: 'No data available',
    align: 'center',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      color: undefined,
      fontSize: '14px',
      fontFamily: 'Satoshi, sans-serif',
    },
  },
  toolbar: {
    show: false,
  },
};

const ChartOne = () => {
  const [state, setState] = useState({
    series: [50, 30, 20],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };

  return (
    <div className="col-span-12 pl-30 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5"></div>
          <div className="flex min-w-47.5"></div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={[{ data: state.series }]}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
