import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const MaintenanceBudget: React.FC = () => {
  const data = {
    labels: ['Allocated', 'Spent', 'Remaining'],
    datasets: [
      {
        label: 'Budget',
        data: [60, 30, 10],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: '150px' }}>
      <Doughnut data={data} />
    </div>
  );
};

export default MaintenanceBudget;
