export const MOCK_ADMIN_STATS = {
  totalSocieties: 1,
  totalFlats: 150,
  totalResidents: 450,
  paymentsPending: 25,
};

export const MOCK_APARTMENTS = [
  { id: 'apt1', name: 'Sunrise Towers', location: 'Bengaluru', totalFlats: 150, occupancy: '95%' },
  // (You could add more societies here later)
];

export const MOCK_FLATS = [
  { id: 'f101', flatNumber: 'A-101', owner: 'Jane Owner', status: 'Occupied', apartmentId: 'apt1' },
  { id: 'f102', flatNumber: 'A-102', owner: 'R. Sharma', status: 'Occupied', apartmentId: 'apt1' },
  { id: 'f103', flatNumber: 'B-101', owner: 'John Tenant', status: 'Tenant-Occupied', apartmentId: 'apt1' },
  { id: 'f104', flatNumber: 'B-102', owner: 'S. Gupta', status: 'Vacant', apartmentId: 'apt1' },
  // (Add more mock flats as needed)
];