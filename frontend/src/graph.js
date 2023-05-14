import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};
let dates = [];
let destroyed = [];
const graphData = this.props.graph
graphData.forEach(element => {
  dates.push(element.date)
  destroyed.push(element.count)
});

const data = {
  labels: dates,
  datasets: [
    {
      label: '# Destroyed',
      data: destroyed,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

function RadarChart() {
  return <Bar options={options} data={data} />;
}

export default RadarChart;