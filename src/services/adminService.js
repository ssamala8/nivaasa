import { MOCK_ADMIN_STATS, MOCK_APARTMENTS, MOCK_FLATS } from './mockData/admin';

const mockApiCall = (data) => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ status: 200, data });
  }, 800); // 0.8s delay
});

export const getAdminStats = () => mockApiCall(MOCK_ADMIN_STATS);
export const getApartments = () => mockApiCall(MOCK_APARTMENTS);
export const getFlats = () => mockApiCall(MOCK_FLATS);