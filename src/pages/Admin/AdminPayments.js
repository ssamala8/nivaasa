import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DataTable from '../../components/DataTable/DataTable';
import Button from '../../components/Button/Button';
import DashboardCard from '../../features/dashboard/components/DashboardCard';
import './AdminPages.scss';

// Mock data for payment status
const paymentLedger = [
  { id: 1, flatNumber: 'A-101', owner: 'Jane Owner', amount: '₹1500', status: 'Paid' },
  { id: 2, flatNumber: 'A-102', owner: 'R. Sharma', amount: '₹1500', status: 'Pending' },
  { id: 3, flatNumber: 'B-101', owner: 'John Tenant', amount: '₹1500', status: 'Pending' },
];
const paymentColumns = [
  { header: 'Flat No.', accessor: 'flatNumber' },
  { header: 'Owner', accessor: 'owner' },
  { header: 'Amount', accessor: 'amount' },
  { header: 'Status', accessor: 'status' },
];

const AdminPayments = () => {
  const [totalAmount, setTotalAmount] = useState('');
  const { flats } = useSelector(state => state.admin);

  const handleSplit = () => {
    // --- THIS IS YOUR MOCK LOGIC ---
    if (!totalAmount || isNaN(totalAmount)) {
      alert("Please enter a valid total amount.");
      return;
    }
    const amountPerFlat = (Number(totalAmount) / flats.length).toFixed(2);
    alert(`Total: ₹${totalAmount}\nFlats: ${flats.length}\nAmount per flat: ₹${amountPerFlat}\n\nAssigned!`);
    // In a real app, you would dispatch a Redux action here
    // dispatch(splitMaintenance({ totalAmount, flats }));
  };

  return (
    <div className="admin-page">
      <h1>Payments & Maintenance</h1>
      
      <DashboardCard title="Create New Maintenance Bill" className="clay-card">
        <form className="admin-form split-form">
          <div className="form-group">
            <label>Total Monthly Maintenance Amount (₹)</label>
            <input 
              type="number" 
              placeholder="e.g., 225000"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)} 
            />
          </div>
          <Button type="button" onClick={handleSplit}>
            Split & Assign to {flats.length} Flats
          </Button>
        </form>
      </DashboardCard>
      
      <h2 className="table-title">Payment Status (Current Month)</h2>
      <DataTable columns={paymentColumns} data={paymentLedger} />
    </div>
  );
};

export default AdminPayments;