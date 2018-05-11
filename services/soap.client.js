import { safePromise } from "../utils/safe";
import { createClientAsync } from 'soap';
import { core } from '../config.js';

export async function get24sevenClient(wsdlUrl) {
  if (!wsdlUrl) return await safePromise(Promise.reject('WSDL Url is empty'));
  const urlFormat = /^https:\/\/api\.24sevenoffice\.com\/.*\?wsdl/;
  const regex = new RegExp(urlFormat);
  if (!wsdlUrl.match(regex)) return ['Invalid URL', undefined];
  return await safePromise(createClientAsync(wsdlUrl));
}

export async function get24SevenAuthSessionId(paramUsername = null, paramPassword = null, sessionId = null) {

  const username = paramUsername || core.COMMUNITY_24SEVENOFFICE_ACCOUNT_EMAIL;
  const password = paramPassword || core.COMMUNITY_24SEVENOFFICE_ACCOUNT_PASSWORD;
  const wsdlUrl = 'https://api.24sevenoffice.com/authenticate/v001/authenticate.asmx?wsdl';
  const [error, authClient] = await get24sevenClient(wsdlUrl);
  if (error) return [error, undefined];
  const param = {
    credential: {
      Username: username,
      Password: password,
      ApplicationId: core.API_APP_ID,
      IdentityId: '00000000-0000-0000-0000-000000000000',
    },
  };
  return await authenticate24Seven(authClient, param, sessionId);
}

export async function authenticate24Seven(client, credentialParamObj = null, sessionId = null) {

  if (!client || !client.Login || !client.HasSession) return ['Invalid Auth Client', undefined];
  const { Login, HasSession } = client;
  if (sessionId) {
    client.addHttpHeader('Cookie', `ASP.NET_SessionId=${sessionId}`); //NB: can't destruct the method addHttpHeader due the way it's been implmenented.
    const [error, isValidSession] = await safePromise(new Promise((resolve, reject) => {

      HasSession(null, (sessionCheckError, sessionCheckResults) => {
        if (sessionCheckError) reject(sessionCheckError.message);
        resolve(sessionCheckResults.HasSessionResult);
      });
    }));
    if (!error && isValidSession) return [undefined, sessionId];
  }

  if (!credentialParamObj) return ['Credential object is missig to perform the authentication', undefined];

  return await safePromise(new Promise((resolve, reject) => {
    Login(credentialParamObj, (error, result) => {
      if (error) reject(error.message);
      if (!result.LoginResult) reject('Error in authenticatin, please check your credentials');
      resolve(result.LoginResult);
    });
  }));
}
