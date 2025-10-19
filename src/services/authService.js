// 1. Import the constants from our new mockData file
import { MOCK_USER, MOCK_CREDENTIALS } from './mockData/user';

// --- Mock Login API Call ---
export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 2. Use the imported constants
      if (
        email === MOCK_CREDENTIALS.email &&
        password === MOCK_CREDENTIALS.password
      ) {
        resolve({
          status: 200,
          data: MOCK_USER, // 3. Use the imported MOCK_USER
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1500); // 1.5 second delay
  });
};

// --- Mock Sign Up API Call ---
export const signUp = (name, email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // For a real API, you'd check if the email exists.
      // For our mock, we just create the new user.
      const newUser = {
        id: '2', // New mock ID
        name: name,
        email: email,
        token: 'new-mock-jwt-token-67890',
      };
      resolve({
        status: 201,
        data: newUser,
      });
    }, 1500);
  });
};