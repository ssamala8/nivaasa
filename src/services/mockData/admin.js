// src/services/mockData/admin.js

// --- Core Admin Stats ---
export const MOCK_ADMIN_STATS = {
  totalSocieties: 1,
  totalFlats: 150,
  totalResidents: 450,
  paymentsPending: 25,
};

// --- Society/Apartment Details ---
export const MOCK_APARTMENTS = [
  { id: 'apt1', name: 'Nivaasa Residency', location: 'Hyderabad', totalFlats: 150, occupancy: '95%' },
];

// --- Flat Details ---
export let MOCK_FLATS = [ // Use 'let' as adminService modifies it
  { id: 'f101', flatNumber: 'A-101', owner: 'Sravan Kumar', status: 'Occupied', apartmentId: 'apt1' },
  { id: 'f102', flatNumber: 'A-102', owner: 'R. Sharma', status: 'Occupied', apartmentId: 'apt1' },
  { id: 'f103', flatNumber: 'B-101', owner: 'Priya Singh', status: 'Tenant-Occupied', apartmentId: 'apt1', tenant: 'John Tenant' },
  { id: 'f104', flatNumber: 'B-102', owner: 'S. Gupta', status: 'Vacant', apartmentId: 'apt1' },
  { id: 'f105', flatNumber: 'C-201', owner: 'Amit Patel', status: 'Occupied', apartmentId: 'apt1' },
  { id: 'f106', flatNumber: 'C-202', owner: 'Lakshmi Rao', status: 'Occupied', apartmentId: 'apt1' },
  { id: 'f107', flatNumber: 'D-301', owner: 'Vikram Reddy', status: 'Vacant', apartmentId: 'apt1' },
  { id: 'f108', flatNumber: 'D-302', owner: 'Anita Desai', status: 'Tenant-Occupied', apartmentId: 'apt1', tenant: 'Michael D.' },
  // Add more flats if needed...
];

// --- User Details ---
export let MOCK_USERS = [ // Use 'let' as adminService modifies it
    { id: 'u1', name: 'Sravan Kumar', email: 'owner@test.com', role: 'owner', flat: 'A-101' },
    { id: 'u2', name: 'R. Sharma', email: 'sharma@test.com', role: 'owner', flat: 'A-102' },
    { id: 'u3', name: 'John Tenant', email: 'tenant@test.com', role: 'tenant', flat: 'B-101' },
    { id: 'u4', name: 'S. Gupta', email: 'gupta@test.com', role: 'owner', flat: 'B-102' },
    { id: 'u5', name: 'Super Admin', email: 'admin@test.com', role: 'admin', flat: null },
    { id: 'u6', name: 'Priya Singh', email: 'priya@test.com', role: 'owner', flat: 'B-101' },
    { id: 'u7', name: 'Amit Patel', email: 'amit@test.com', role: 'owner', flat: 'C-201' },
    { id: 'u8', name: 'Lakshmi Rao', email: 'lakshmi@test.com', role: 'owner', flat: 'C-202' },
    { id: 'u9', name: 'Vikram Reddy', email: 'vikram@test.com', role: 'owner', flat: 'D-301' },
    { id: 'u10', name: 'Anita Desai', email: 'anita@test.com', role: 'owner', flat: 'D-302' },
    { id: 'u11', name: 'Michael D.', email: 'michael@test.com', role: 'tenant', flat: 'D-302' },
    // Add more users if needed...
];

// --- Payment Data ---
export let MOCK_MONTHLY_PAYMENTS = [ // Use 'let' as adminService modifies it
  { id: 'p1', flatId: 'f101', flatNumber: 'A-101', month: 'October 2025', amount: 1500, status: 'Paid', datePaid: '2025-10-05' },
  { id: 'p2', flatId: 'f102', flatNumber: 'A-102', month: 'October 2025', amount: 1500, status: 'Pending', datePaid: null },
  { id: 'p3', flatId: 'f103', flatNumber: 'B-101', month: 'October 2025', amount: 1500, status: 'Pending', datePaid: null },
  { id: 'p4', flatId: 'f104', flatNumber: 'B-102', month: 'October 2025', amount: 0, status: 'N/A', datePaid: null },
  { id: 'p5', flatId: 'f105', flatNumber: 'C-201', month: 'October 2025', amount: 1500, status: 'Paid', datePaid: '2025-10-10' },
  { id: 'p6', flatId: 'f106', flatNumber: 'C-202', month: 'October 2025', amount: 1500, status: 'Pending', datePaid: null },
  { id: 'p7', flatId: 'f107', flatNumber: 'D-301', month: 'October 2025', amount: 0, status: 'N/A', datePaid: null },
  { id: 'p8', flatId: 'f108', flatNumber: 'D-302', month: 'October 2025', amount: 1500, status: 'Pending', datePaid: null },
  // Add more payments corresponding to pending count...
];

// --- Recent Queries/Issues ---
export let MOCK_RECENT_QUERIES = [ // Use 'let' as adminService modifies it
  { id: 'q1', flatNumber: 'A-102', subject: 'Water leakage in balcony', status: 'Open', date: '2025-10-21' },
  { id: 'q2', flatNumber: 'B-704', subject: 'Parking spot clarification', status: 'Resolved', date: '2025-10-20' },
  { id: 'q3', flatNumber: 'C-201', subject: 'Noise complaint - late night party', status: 'Open', date: '2025-10-22' },
  { id: 'q4', flatNumber: 'A-101', subject: 'Request for pest control', status: 'In Progress', date: '2025-10-19' },
];

// --- Announcements / Polls ---
export let MOCK_ANNOUNCEMENTS = [ // Use 'let' as adminService modifies it
    { id: 'a1', title: 'Water Outage Tomorrow', message: 'Water supply will be unavailable from 2 PM to 4 PM on Oct 23rd due to tank cleaning.', date: '2025-10-22' },
    { id: 'a2', title: 'GBM Reminder', message: 'The annual general body meeting is scheduled for this Sunday at 11 AM in the clubhouse.', date: '2025-10-20' },
];

export let MOCK_POLLS = [ // Use 'let' as adminService modifies it
    { id: 'poll1', question: 'Should we repaint the building exterior this year?', options: ['Yes, it\'s needed', 'No, maybe next year'], status: 'Active', votes: { 'Yes': 15, 'No': 5 } },
    { id: 'poll2', question: 'Preferred timing for Yoga classes?', options: ['Morning (7 AM)', 'Evening (6 PM)'], status: 'Closed', votes: { 'Morning': 12, 'Evening': 18 } },
];