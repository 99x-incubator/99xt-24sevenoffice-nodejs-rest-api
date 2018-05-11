import { get24sevenClient } from '../services/soap.client';

export async function getValidatedClient(sessionId, url) {
  if (!sessionId) return ['Invalid session id.', undefined];
  if (!url) return ['No client provider given.', undefined];  
  return await get24sevenClient(url);
}