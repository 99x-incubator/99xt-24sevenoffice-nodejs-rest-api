# 24sevenoffice Restful API for NodeJS
24sevenoffice (https://24sevenoffice.com) is a cloud based ERP solution that is very popular and have a solid customer base.

One of the primary issues when integrating with their API (http://developer.24sevenoffice.com/) is that its primarly a SOAP based API and only natively support C#.NET and PHP. 

This project is targeted to provide a NodeJS based RESTful API to access all the services of 24sevenoffice API.

## Getting Started
1. Clone the Project
2. Issue the following command to create the .env file in you local enviornment. .env file is used to configure your local development enviornment.

```
cp .env.example .env
```

3. You need to create a 24sevenoffice comunity account and apply for a application ID in order to work with the 24sevenoffice API. Follow instructions given in http://developer.24sevenoffice.com/#api-intro to create the community user account and apply and get an application ID. **NB: Please note you will need these details to contunue from this point onwards**

4. After creating an community user account and obtaining an application Id, fill the values for the enviornment variables defined in your local .env file.
```
APP_NAME=myapi-24seven`
APP_PORT=3000`
ENABLED=1
APPLICATION_SECRET='myappsecret'
API_APP_ID='<your app id>'
COMMUNITY_24SEVENOFFICE_ACCOUNT_EMAIL='<your community account email>'
COMMUNITY_24SEVENOFFICE_ACCOUNT_PASSWORD='<your community account password>'
```

5. In order to test the API, please issue the following command to run the tests
```
npm run tests
```
All tests should run successfully.

## Using 24sevenoffice-nodejs-rest-api

Following code shows how easy it is to connect and use the 24sevenoffice-nodejs-rest-api. The following example shows how to create a new product category. Note that we are using ES6 notation. 

```
import { get24SevenAuthSessionId } from '../../services/soap.client.js';
import { service24seven } from '../../services/coreService.js';

const [authError, sessionId] = await get24SevenAuthSessionId(); // Authenticate the user (defined in the .env file) and get a session id
if(authError) console.log('Error occured when authenticating', authError);

// define the URL of the soap webservice you want to connect.
const productServiceUrl = 'https://api.24sevenoffice.com/Logistics/Product/V001/ProductService.asmx?wsdl';

// Create a parameter object, based on the data type definitions given in http://developer.24sevenoffice.com/diverse/apiproductservice-datatypes/
const paramObject = {
  categories: [
    {
      Category: {
        Id: 5,
        Name: 'Test Transporter',
        IncVat: true,
        Currency: '',
      }
    }
  ]
};
// call the service and get the results
const [error, results] = await service24seven(productServiceUrl, 'SaveCategories', paramObject, sessionId);
console.log(error); // error should be undefined in a successfull call
console.log(results); // see the result json object
```

## Tested Services
At the moment, We have tested with the following services, you can look into these test files to get na idea on how to use 24sevenoffice-nodejs-rest-api to connect to 24sevenoffice.
1. Product Service (http://developer.24sevenoffice.com/#apiproductservice)
2. Company/Customer Service (http://developer.24sevenoffice.com/#apicompanyservice)
3. Invoice Service (http://developer.24sevenoffice.com/#apiinvoiceservice)
You will find a test file correspoinding to each services in the test folder.

## Other Notes for Development
To test inidividual test file, for example to test the soap.client.test.js, issue the following command
```
./node_modules/.bin/mocha --require babel-core/register --timeout 10000 --exit  test/services/soap.client.test.js
```

If you want to create the services using TDD, use the following command to run the tests in watch mode
```
./node_modules/.bin/mocha --require babel-core/register --timeout 10000 --exit --watch  test/services/soap.client.test.js
```