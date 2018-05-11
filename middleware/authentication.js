import { verify } from '../utils/jwt-server';
import { core } from '../config.js';

export default async function authenticate(req, res, next) {
  const token = req.headers['x-token'];

  if (!token) 
    res.status(500).json({ error: 'no token found' });
  
  try {
    await verify(token, core.APPLICATION_SECRET);
    return next();
  } catch (error) {
    return res.status(403).json({ message: 'Failed to authenticate token.' });
  }
}