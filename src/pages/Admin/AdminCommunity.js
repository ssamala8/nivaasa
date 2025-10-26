import React from 'react';
import Button from '../../components/Button/Button';
import DashboardCard from '../../features/dashboard/components/DashboardCard';
import './AdminPages.scss';

const AdminCommunity = () => {
  return (
    <div className="admin-page">
      <h1>Community Management</h1>
      
      <div className="community-grid">
        <DashboardCard title="Create New Announcement" className="clay-card">
          <form className="admin-form">
            <div className="form-group">
              <label>Title</label>
              <input type="text" placeholder="e.g., Water Outage" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" placeholder="Full details..."></textarea>
            </div>
            <Button type="submit">Publish Announcement</Button>
          </form>
        </DashboardCard>
        
        <DashboardCard title="Create New Poll" className="clay-card">
           <form className="admin-form">
            <div className="form-group">
              <label>Question</label>
              <input type="text" placeholder="e.g., Repaint the lobby?" />
            </div>
            <div className="form-group">
              <label>Option 1</label>
              <input type="text" placeholder="Yes" />
            </div>
             <div className="form-group">
              <label>Option 2</label>
              <input type="text" placeholder="No" />
            </div>
            {/* You would add logic here to add more options */}
            <Button type="submit">Publish Poll</Button>
          </form>
        </DashboardCard>
      </div>
    </div>
  );
};

export default AdminCommunity;