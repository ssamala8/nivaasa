// src/services/mockData/dashboard.js

// Mock data structured for Owner/Tenant dashboards
// This data could be derived/filtered from the admin data in a real backend,
// but for mock purposes, we define it separately for clarity.

export const MOCK_DASHBOARD_DATA = {
  // Data for user with id 'u1' (Jane Owner / Sravan Kumar)
  owner_u1: {
    flatNumber: 'A-101', // Corresponds to MOCK_FLATS
    paymentStatus: 'Paid', // Corresponds to MOCK_MONTHLY_PAYMENTS
    paymentDueDate: 'N/A', // Since it's paid
    alerts: [ // Filtered/relevant alerts from MOCK_ANNOUNCEMENTS
      { id: 'a1', message: 'Water supply will be unavailable from 2 PM to 4 PM on Oct 23rd.' },
      { id: 'a2', message: 'The annual general body meeting is scheduled for this Sunday at 11 AM.' },
    ],
    poll: { // Get the latest active poll from MOCK_POLLS
      id: 'poll1',
      question: 'Should we repaint the building exterior this year?',
      options: ['Yes, it\'s needed', 'No, maybe next year'],
      // Optionally add user's vote status if needed: voted: false
    },
  },
  // Data for user with id 'u3' (John Tenant)
  tenant_u3: {
    flatNumber: 'B-101', // Corresponds to MOCK_FLATS/MOCK_USERS
    // Tenants usually don't see owner's payment status directly, maybe rent status?
    // Let's assume they see the general maintenance status for the flat for now.
    paymentStatus: 'Pending', // Corresponds to MOCK_MONTHLY_PAYMENTS for flat B-101
    paymentDueDate: 'October 25, 2025', // Corresponds to MOCK_MONTHLY_PAYMENTS for flat B-101
     alerts: [ // Filtered alerts
      { id: 'a1', message: 'Water supply will be unavailable from 2 PM to 4 PM on Oct 23rd.' },
      { id: 'a2', message: 'The annual general body meeting is scheduled for this Sunday at 11 AM.' },
      // Maybe add tenant-specific notices if applicable in the future
    ],
    poll: { // Same active poll
      id: 'poll1',
      question: 'Should we repaint the building exterior this year?',
      options: ['Yes, it\'s needed', 'No, maybe next year'],
      // voted: true // Example if tenant voted
    },
  },
   // Add entries for other mock owners/tenants if needed for testing
  owner_u2: { // R. Sharma
    flatNumber: 'A-102',
    paymentStatus: 'Pending',
    paymentDueDate: 'October 25, 2025',
    alerts: [
      { id: 'a1', message: 'Water supply will be unavailable from 2 PM to 4 PM on Oct 23rd.' },
      { id: 'a2', message: 'The annual general body meeting is scheduled for this Sunday at 11 AM.' },
    ],
    poll: {
       id: 'poll1', question: 'Should we repaint the building exterior this year?', options: ['Yes, it\'s needed', 'No, maybe next year']
    },
  },
};