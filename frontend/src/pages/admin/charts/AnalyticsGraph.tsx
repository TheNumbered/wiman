import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import './analytics.css'; // Ensure this CSS file is imported

// Register all necessary components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

const AnalyticsGraph: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'User Signups',
        data: [30, 45, 25, 60, 75],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="analytics-graph">
      <h2>New Users Yearly</h2>
      <div className="chart-container">
        <Line data={data} />
      </div>
    </div>
  );
};

export default AnalyticsGraph;
