// src/services/adminService.js

// Import MUTABLE arrays from admin mock data
import {
  MOCK_ADMIN_STATS, MOCK_APARTMENTS,
  MOCK_FLATS, MOCK_USERS, MOCK_MONTHLY_PAYMENTS, MOCK_RECENT_QUERIES,
  MOCK_ANNOUNCEMENTS, MOCK_POLLS
} from './mockData/admin';

// Reusable Mock API Call
const mockApiCall = (data, delay = 800) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log("Mock API resolving:", data); // Optional log
    resolve({ status: 200, data });
  }, delay);
});

// --- Read Operations ---
export const getAdminStats = () => mockApiCall(MOCK_ADMIN_STATS);
export const getApartments = () => mockApiCall([...MOCK_APARTMENTS]);
export const getFlats = () => mockApiCall([...MOCK_FLATS]); // Return copy
export const getUsers = () => mockApiCall([...MOCK_USERS]); // Return copy
export const getMonthlyPayments = (month = 'October 2025') => mockApiCall(
    [...MOCK_MONTHLY_PAYMENTS.filter(p => p.month === month)] // Return copy
);
export const getRecentQueries = () => mockApiCall([...MOCK_RECENT_QUERIES]); // Return copy
export const getAnnouncements = () => mockApiCall([...MOCK_ANNOUNCEMENTS]); // Return copy
export const getPolls = () => mockApiCall([...MOCK_POLLS]); // Return copy


// --- CRUD Operations for Flats ---
let nextFlatIdCounter = MOCK_FLATS.reduce((maxId, flat) => Math.max(maxId, parseInt(flat.id.substring(1), 10)), 0) + 1;

export const createFlat = (flatData) => {
  try {
    const newFlat = { ...flatData, id: `f${nextFlatIdCounter++}`, apartmentId: 'apt1' };
    MOCK_FLATS.push(newFlat); // Modify imported array
    console.log("Mock Create Flat:", newFlat);
    return mockApiCall(newFlat, 400);
  } catch (e) { return Promise.reject(new Error("Failed to create flat")); }
};

export const updateFlat = (flatId, updatedData) => {
  const index = MOCK_FLATS.findIndex(f => f.id === flatId);
  if (index !== -1) {
    MOCK_FLATS[index] = { ...MOCK_FLATS[index], ...updatedData }; // Modify imported array
    console.log("Mock Update Flat:", MOCK_FLATS[index]);
    return mockApiCall({ ...MOCK_FLATS[index] }, 400); // Return a copy
  }
  return Promise.reject(new Error('Flat not found'));
};

export const deleteFlat = (flatId) => {
  const index = MOCK_FLATS.findIndex(f => f.id === flatId);
  if (index !== -1) {
    MOCK_FLATS.splice(index, 1); // Modify imported array
    console.log("Mock Delete Flat:", flatId);
    return mockApiCall({ id: flatId }, 400);
  }
  return Promise.reject(new Error('Flat not found'));
};

// --- CRUD Operations for Users ---
let nextUserIdCounter = MOCK_USERS.reduce((maxId, user) => Math.max(maxId, parseInt(user.id.substring(1), 10)), 0) + 1;

export const createUser = (userData) => {
   try {
    const { password, ...restData } = userData;
    const newUser = { ...restData, id: `u${nextUserIdCounter++}`};
    MOCK_USERS.push(newUser); // Modify imported array
    console.log("Mock Create User:", newUser);
    return mockApiCall(newUser, 400);
   } catch (e) { return Promise.reject(new Error("Failed to create user")); }
};

export const updateUser = (userId, updatedData) => {
    const index = MOCK_USERS.findIndex(u => u.id === userId);
    if (index !== -1) {
        const { password, ...restData } = updatedData;
        const updatePayload = password ? { ...restData, password } : restData;
        MOCK_USERS[index] = { ...MOCK_USERS[index], ...updatePayload }; // Modify imported array
        console.log("Mock Update User:", MOCK_USERS[index]);
        const { password: userPassword, ...returnData } = MOCK_USERS[index];
        return mockApiCall({ ...returnData }, 400); // Return copy without password
    }
    return Promise.reject(new Error('User not found'));
};

export const deleteUser = (userId) => {
    const index = MOCK_USERS.findIndex(u => u.id === userId);
     if (index !== -1) {
        MOCK_USERS.splice(index, 1); // Modify imported array
        console.log("Mock Delete User:", userId);
        return mockApiCall({ id: userId }, 400);
    }
    return Promise.reject(new Error('User not found'));
};

// --- Community Actions ---
let nextAnnouncementId = MOCK_ANNOUNCEMENTS.length + 1;
export const createAnnouncement = (announcementData) => {
    const newAnnouncement = { ...announcementData, id: `a${nextAnnouncementId++}`, date: new Date().toISOString().split('T')[0] };
    MOCK_ANNOUNCEMENTS.unshift(newAnnouncement);
    console.log("Mock Create Announcement:", newAnnouncement);
    return mockApiCall(newAnnouncement, 400);
};

let nextPollId = MOCK_POLLS.length + 100;
export const createPoll = (pollData) => {
    const newPoll = { ...pollData, id: `poll${nextPollId++}`, status: 'Active', votes: {} };
    pollData.options.forEach(option => { if(option) newPoll.votes[option] = 0; });
    MOCK_POLLS.unshift(newPoll);
    console.log("Mock Create Poll:", newPoll);
    return mockApiCall(newPoll, 400);
};

// --- Payment Actions ---
export const assignMaintenanceBill = ({ totalAmount, flats }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                if (!totalAmount || isNaN(totalAmount) || !flats || flats.length === 0) {
                     return reject(new Error("Invalid data for splitting bill"));
                }
                const applicableFlats = flats.filter(f => f.status !== 'Vacant');
                if (applicableFlats.length === 0) {
                    return reject(new Error("No applicable flats found to assign bill."));
                }
                const amountPerFlat = (Number(totalAmount) / applicableFlats.length).toFixed(2);
                const currentDate = new Date();
                const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

                const newPayments = applicableFlats.map((flat, index) => ({
                    id: `p${Date.now() + index}`,
                    flatId: flat.id,
                    flatNumber: flat.flatNumber,
                    month: monthYear,
                    amount: Number(amountPerFlat),
                    status: 'Pending',
                    datePaid: null
                }));

                const otherMonthPayments = MOCK_MONTHLY_PAYMENTS.filter(p => p.month !== monthYear);
                MOCK_MONTHLY_PAYMENTS = [...otherMonthPayments, ...newPayments]; // Update global mock array

                console.log(`Mock Assigned Bill: Total ₹${totalAmount} split into ₹${amountPerFlat} for ${applicableFlats.length} flats for ${monthYear}.`);

                MOCK_ADMIN_STATS.paymentsPending = MOCK_MONTHLY_PAYMENTS.filter(p=> p.status === 'Pending').length;

                resolve({ status: 200, data: { message: "Bill assigned successfully", amountPerFlat }});
            } catch (error) {
                console.error("Error in assignMaintenanceBill:", error);
                reject(new Error("Internal error assigning bill."));
            }
        }, 600);
    });
};