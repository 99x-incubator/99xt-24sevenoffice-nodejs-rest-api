export function safePromise(promise) {
  return promise
  .then(result => [undefined, result])
  .catch(error => [error, undefined]);
}

export async function safeApiCall(sessionId, client, apiMethodName, inputParamObject) {
  client.addHttpHeader('Cookie', `ASP.NET_SessionId=${sessionId}`); //NB: can't destruct the method addHttpHeader due the way it's been implmenented.
  const apiMethod = client[apiMethodName];
  return await safePromise(new Promise((resolve, reject) => {
    apiMethod(inputParamObject, (apiCallError, apiCallResults) => {
      if (apiCallError) reject(apiCallError.message);
      resolve(apiCallResults); 
    });
  }));
}
