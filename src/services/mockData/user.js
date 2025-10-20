// This is our mock user database
export const MOCK_USERS = {
  owner: {
    id: '1',
    name: 'Jane Owner',
    email: 'owner@test.com',
    role: 'owner', // <-- Add role
    token: 'mock-jwt-token-owner-123',
  },
  tenant: {
    id: '2',
    name: 'John Tenant',
    email: 'tenant@test.com',
    role: 'tenant', // <-- Add role
    token: 'mock-jwt-token-tenant-456',
  },
  admin: {
    id: '3',
    name: 'Super Admin',
    email: 'admin@test.com',
    role: 'admin', // <-- Add role
    token: 'mock-jwt-token-admin-789',
  },
};

// Update credentials to check against
export const MOCK_CREDENTIALS = {
  owner: { email: 'owner@test.com', password: 'Test123' },
  tenant: { email: 'tenant@test.com', password: 'Test123' },
  admin: { email: 'admin@test.com', password: 'Test123' },
};