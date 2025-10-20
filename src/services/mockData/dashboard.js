// Mock data for the dashboard
export const MOCK_DASHBOARD_DATA = {
  owner: {
    flatNumber: 'A-1201',
    paymentStatus: 'Pending',
    paymentDueDate: 'October 25, 2025',
    alerts: [
      { id: 1, message: 'Water supply will be unavailable from 2 PM to 4 PM tomorrow.' },
      { id: 2, message: 'The annual general body meeting is scheduled for this Sunday.' },
    ],
    poll: {
      id: 101,
      question: 'Should we repaint the building exterior this year?',
      options: ['Yes, it\'s needed', 'No, maybe next year'],
    },
  },
  tenant: {
    flatNumber: 'B-704',
    paymentStatus: 'Paid',
    paymentDueDate: 'N/A',
     alerts: [
      { id: 1, message: 'Water supply will be unavailable from 2 PM to 4 PM tomorrow.' },
      { id: 3, message: 'Please collect your parcels from the security desk.' },
    ],
    poll: {
      id: 101,
      question: 'Should we repaint the building exterior this year?',
      options: ['Yes, it\'s needed', 'No, maybe next year'],
    },
  },
  // Admins might see aggregated data, but for now, let's give them a simple view
  admin: {
    totalFlats: 150,
    paymentsPending: 25,
     alerts: [
      { id: 4, message: 'Monthly maintenance report has been generated.' },
    ],
    poll: null, // Admins might see poll results, not participate
  }
};