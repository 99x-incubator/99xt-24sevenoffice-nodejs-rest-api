import chai from 'chai';
import { fail } from 'assert';

import { get24sevenClient, get24SevenAuthSessionId } from '../../services/soap.client.js';
import { service24seven } from '../../services/coreService.js';


describe('Customer Service Tests', () => {
  let companyId = "";
  const companyServiceUrl = 'https://api.24sevenoffice.com/CRM/Company/V001/CompanyService.asmx?wsdl';
  it('Can create the client to work with the 24sevenoffice company services', async () => {
    const client = await get24sevenClient(companyServiceUrl);
    chai.assert.isNotNull(client);
  });

  it('customerService function is avilable', () => {
    chai.assert.isNotNull(service24seven);
  });

  it('calling customerService without a sessionId throws an error', async () => {
    const [error, result] = await service24seven(companyServiceUrl, null, {}, null);
    chai.assert.equal(error, 'Invalid session id.');
    chai.assert.isUndefined(result);
  });

  it('calling createCustomer  with correct params and session id create an new customer in 24sevenoffice', async () => {
    const [authError, sessionId] = await get24SevenAuthSessionId(''communityaccount@mail.com'', ''communityaccount_password'', null);

    const paramObject = {
      companies: [
        {
          Company: {
            Type: 'Business',
            Name: 'Test Company',
            FirstName: 'Kamal',
            Addresses: [
              {
                Post: {
                  Street: 'Downtown street',
                  State: 'Navada',
                  PostalCode: 'po37473',
                  PostalArea: 'western 475',
                  Name:'New Home',
                  City:'Cansas',
                  Country:'USA',
                }
              },
            ],
            EmailAddresses: [{
              Work: {
                Description: 'Work email address',
                Name: 'Work Email',
                Value: ''communityaccount@mail.com''
              }
            }]

          },
        },
      ]
    };
    const [error, { SaveCompaniesResult: { Company: results }}] = await service24seven(companyServiceUrl,'SaveCompanies', paramObject, sessionId); 
    chai.assert.isUndefined(error);
    chai.assert.isNotNull(results);
    console.log(results[0], results[0].Id);
    companyId = results[0].Id;
  });

  it('calling deleteCustomer  with correct params and session id delete the given customers in 24sevenoffice', async () => {
    const [authError, sessionId] = await get24SevenAuthSessionId(''communityaccount@mail.com'', ''communityaccount_password'', null);

    const paramObject = {
      companies: [
        {
          Company: {
            Id: companyId,
          },
        },
      ]
    };
    console.log('Param Object: ', paramObject);
    console.log('Session ID: ', sessionId);
    const [error, result] = await service24seven(companyServiceUrl,'DeleteCompanies', paramObject, sessionId); 
    chai.assert.isUndefined(error);
    chai.assert.isNotNull(result);
    console.log(result);
    if(result.DeleteCompaniesResult)
      console.log(result.DeleteCompaniesResult.Company);
  });

});