import React from 'react';
import {Line } from 'react-chartjs-2';


const Chart = ({data}) =>{
  
  const sortedData = data.slice().sort((a, b) => b.date - a.date) // first is the latest date
  const sortedDataReversed =  sortedData.reverse()

  const counters = sortedDataReversed.map(item=> {
    return item.counter
  }) 
  const dates = sortedDataReversed.map(item=> {
    const date = new Date (item.date)
    return date.toLocaleDateString()
  }) 
  
  const options = {
    labels: dates,
    datasets: [
      {
        label: 'reported bugs',
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
        data: counters,
      }
    ]
  };
  
    return (
      <div>
          <Line data={options} />
      </div>
    );
  }
  export default Chart;