import chai from 'chai';
import { get24sevenClient, get24SevenAuthSessionId, authenticate24Seven, createInvoice } from '../../services/soap.client.js';
import { fail } from 'assert';

async function get24SevenAuthClient() {
  const wsdlUrl = 'https://api.24sevenoffice.com/authenticate/v001/authenticate.asmx?wsdl';
  return await get24sevenClient(wsdlUrl);
}

describe('Soap Client tests', () => {
  it('function to connect to wsdl is avilable', (done) => {
    chai.assert.isNotNull(get24sevenClient);
    done();
  });

  it('calling get24sevenClient without the wsdl url returns and error', async () => {
    const [error, value] = await get24sevenClient();
    chai.assert.isNotNull(error);
    chai.assert.isUndefined(value);
  });

  it('get24sevenClient with the right wsdl link will create and return a client', async () => {
    const [error, client] = await get24SevenAuthClient();
    chai.assert.isNotNull(client);
    chai.assert.isUndefined(error);
  });

  it('get24sevenClient with the wrong wsdl link will return an error', async () => {
    const wsdlUrl = 'https://api.24sevensddoffice.com/authenticate/v001/authenticate.asmx?wsdl';
    const [error, client] = await get24sevenClient(wsdlUrl);
    chai.assert.equal(error, 'Invalid URL');
    chai.assert.isUndefined(client);
  });


  it('24Seven authentication function return error if client is not passed', async () => {
    const authClient = null;
    const [error, results] = await authenticate24Seven(authClient);
    chai.assert.equal(error, 'Invalid Auth Client');
    chai.assert.isUndefined(results)
  });

  it('get24SevenAuthSessionId return the session ID when valid username and password given', async () => {
    const [authError, results] = await get24SevenAuthSessionId('communityaccount@mail.com', 'communityaccount_password', null );
    chai.assert.isUndefined(authError);
    chai.assert.isNotEmpty(results);
  });

  it('24Seven authentication function return error on invalid application id', async () => {
    const [error, authClient] = await get24SevenAuthClient();
    if (error) fail();
    const param = {
      credential: {
        Username: 'communityaccount@mail.com',
        Password: 'communityaccount_password',
        ApplicationId: '2a03e782-1cea-4ffb-a2a7-42b74093ea1f',
        IdentityId: '00000000-0000-0000-0000-000000000000',
      },
    };
    const [authError, results] = await authenticate24Seven(authClient, param);
    chai.assert.equal(authError, 'soap:Server: Server was unable to process request. ---> Your application id is not registered. Please visit http://developer.24sevenoffice.com to register.');
    chai.assert.isUndefined(results);
  });

  it('24Seven authentication function return error on invalid username or password', async () => {
    const [authError, results] = await get24SevenAuthSessionId('surednr@99x.lk', 'communityaccount_password', null );
    chai.assert.equal(authError, 'Error in authenticatin, please check your credentials');
    chai.assert.isUndefined(results);
  });


  it('24Seven authentication function verify the session id when passed', async () => {
    const [authError, sessionId] = await get24SevenAuthSessionId('communityaccount@mail.com', 'communityaccount_password', null );
    const [sessionCheckError, sessionCheckResults] = await get24SevenAuthSessionId('communityaccount@mail.com', 'communityaccount_password', sessionId);
    chai.assert.isUndefined(sessionCheckError);
    chai.assert.equal(sessionCheckResults, sessionId);
  });

  it('calling 24seven authentication function without the param or the sessionid will result in error', async () => {
    const [error, authClient] = await get24SevenAuthClient();
    const [sessionCheckError, sessionCheckResults] = await authenticate24Seven(authClient, null, null);
    chai.assert.isUndefined(sessionCheckResults);
    chai.assert.isNotEmpty(sessionCheckError);
  });  
});
