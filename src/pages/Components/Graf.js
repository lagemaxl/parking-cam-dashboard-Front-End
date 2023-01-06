import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

function Graf() {
    ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
    const data = {
      labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [2, 1, 1, 2, 2, 1, 3 ],
          spanGaps: false,
          cubicInterpolationMode: 'monotone'
        }
      ]
    };
    
    
    
      const options = {
        responsive: false,
        backgroundColor: 'rgb(255, 99, 132)',
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      };
    
      return (
        <div className="App">
          <Line data={data} options={options} width={500} height={300} className="Graf" />
        </div>
      );
    }

export default Graf;
