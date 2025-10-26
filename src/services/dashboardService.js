// src/services/dashboardService.js

// Import main data sources needed to construct the user dashboard view
import { MOCK_FLATS, MOCK_USERS, MOCK_MONTHLY_PAYMENTS, MOCK_ANNOUNCEMENTS, MOCK_POLLS } from './mockData/admin';

// Helper function to find data based on user ID
const findUserData = (userId) => {
    // Find the logged-in user from the main MOCK_USERS array
    const user = MOCK_USERS.find(u => u.id === userId);
    if (!user) {
        console.error(`[dashboardService] User not found for ID: ${userId}`);
        return null;
    }

    // Find associated data based on the user's flat
    const flat = MOCK_FLATS.find(f => f.flatNumber === user.flat);
    const payment = MOCK_MONTHLY_PAYMENTS.find(p => p.flatNumber === user.flat && p.month === 'October 2025'); // Assuming current month - use dynamic date in real app
    const alerts = MOCK_ANNOUNCEMENTS.slice(0, 3).map(a => ({ id: a.id, message: a.title + ": " + a.message.substring(0, 50) + "..." })); // Get recent alerts
    const activePoll = MOCK_POLLS.find(p => p.status === 'Active'); // Find the first active poll

    // Construct the data object needed by the UserDashboard component
    return {
        flatNumber: user.flat || 'N/A',
        // Owners pay maintenance, tenants might see rent status (or owner's maintenance status as fallback)
        paymentStatus: payment ? payment.status : 'N/A',
        paymentDueDate: payment && payment.status === 'Pending' ? 'October 25, 2025' : 'N/A', // Hardcoded for mock
        alerts: alerts || [],
        poll: activePoll ? { id: activePoll.id, question: activePoll.question, options: activePoll.options } : null,
    };
};

// --- Make sure this function is defined and exported ---
export const getDashboardData = (userId) => { // Fetch based on USER ID
  return new Promise((resolve, reject) => { // Ensure 'reject' is available
    setTimeout(() => {
      console.log(`[dashboardService] Fetching data for userId: ${userId}`);
      try {
          const userData = findUserData(userId); // Call the helper

          if (userData) {
            console.log(`[dashboardService] Found data:`, userData);
            resolve({ // Call resolve()
              status: 200,
              data: userData,
            });
          } else {
            // User might exist but has no flat/data - depends on requirements
            // For now, reject if no user found by findUserData
            console.error(`[dashboardService] No user or dashboard data derived for userId: ${userId}`);
            reject(new Error(`No dashboard data found for user ${userId}.`)); // Call reject()
          }
      } catch (error) {
          console.error(`[dashboardService] Error in findUserData:`, error);
          reject(new Error('Internal error fetching dashboard data.')); // Call reject() on unexpected errors
      }
    }, 600); // Shorter delay for user dashboard
  });
};
// --- END FUNCTION ---