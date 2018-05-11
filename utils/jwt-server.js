/**
 * Import dependencies
 * NOTE: This only works in node (no browser support)
 */
import jwt from 'jsonwebtoken';

/**
 * Export function to verify tokens
 */
export async function verify(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(decodedToken);
      }
    });
  });
}

/**
 * Export function to decode tokens (sync)
 */
export function decode(token) {
  let decodedToken = {};

  try {
    decodedToken = jwt.decode(token);
  } catch (err) {
    console.error('Could not decode token', err);
  }

  return decodedToken;
}
