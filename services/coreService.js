import { safeApiCall } from '../utils/safe';
import { getValidatedClient } from '../utils/clients';

export async function service24seven(serviceUrl, methodNameToCall, inputParamObject, sessionId) {
  const [clientError, client] = await getValidatedClient(sessionId, serviceUrl);
  return clientError ? [clientError, undefined] : await safeApiCall(sessionId, client, methodNameToCall, inputParamObject);
}