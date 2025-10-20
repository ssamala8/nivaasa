import { MOCK_USERS, MOCK_CREDENTIALS } from './mockData/user';

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      for (const role in MOCK_CREDENTIALS) {
        if (
          email === MOCK_CREDENTIALS[role].email &&
          password === MOCK_CREDENTIALS[role].password
        ) {
          resolve({ status: 200, data: MOCK_USERS[role] });
          return;
        }
      }
      reject(new Error('Invalid email or password'));
    }, 1500);
  });
};

// (signUp service can remain the same)
export const signUp = (name, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: '4', 
          name: name,
          email: email,
          role: 'owner', // Default new users to 'owner'
          token: 'new-mock-jwt-token-signup',
        };
        resolve({
          status: 201,
          data: newUser,
        });
      }, 1500);
    });
  };