// src/features/admin/components/PaymentSummaryChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DashboardCard from '../../dashboard/components/DashboardCard';
import './AdminWidgets.scss';

// Register Chart.js components needed for Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const PaymentSummaryChart = ({ payments = [], totalFlats = 0 }) => {
  // Calculate counts based on the payment data
  const paidCount = payments.filter(p => p.status === 'Paid').length;
  // Calculate pending excluding N/A (vacant/non-billed) flats
  const applicablePayments = payments.filter(p => p.status !== 'N/A');
  const pendingCount = applicablePayments.length - paidCount;
  // Calculate N/A based on total flats minus those with payment records
  const notApplicableCount = totalFlats - applicablePayments.length;

  const chartData = {
    labels: ['Paid', 'Pending', 'Vacant/NA'],
    datasets: [
      {
        label: '# of Flats',
        data: [paidCount, pendingCount, notApplicableCount],
        backgroundColor: [
          '#16a085', // Darker Teal (Paid)
          '#f39c12', // Warning Yellow (Pending)
          '#bdc3c7', // Grey (N/A)
        ],
        borderColor: [ // Use card background for border color to blend
          'rgba(255, 255, 255, 0.1)', // Example for dark mode card bg
          'rgba(255, 255, 255, 0.1)',
          'rgba(255, 255, 255, 0.1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows setting height via container
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
           boxWidth: 15,
           padding: 15,
           // Ensure legend text color matches theme
           // color: Needs dynamic color based on theme context or CSS override
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) { label += ': '; }
            if (context.parsed !== null) { label += context.parsed; }
            return label;
          }
        }
      }
    },
  };

  return (
    <DashboardCard title="Current Month Payment Status" className="payment-chart-widget">
      {/* Container needed to control chart size */}
      <div className="chart-container">
         {/* Render Pie chart only if there's data to show */}
         {(paidCount > 0 || pendingCount > 0 || notApplicableCount > 0) ? (
            <Pie data={chartData} options={chartOptions} />
         ) : (
            <p className="empty-state">No payment data for chart.</p>
         )}
      </div>
    </DashboardCard>
  );
};

export default PaymentSummaryChart;