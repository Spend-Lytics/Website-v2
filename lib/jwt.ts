import jwt from 'jsonwebtoken';

// Replace with your secret or key
const SECRET_KEY = 'your-secret-key';

// Function to verify JWT token
export const verifyToken = (token: string) => {
  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Function to generate a new token (optional)
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};
