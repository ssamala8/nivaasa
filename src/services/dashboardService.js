import { MOCK_DASHBOARD_DATA } from './mockData/dashboard';

export const getDashboardData = (userRole) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_DASHBOARD_DATA[userRole]) {
        resolve({
          status: 200,
          data: MOCK_DASHBOARD_DATA[userRole],
        });
      } else {
        reject(new Error('No dashboard data found for this role.'));
      }
    }, 1000); // 1 second delay
  });
};