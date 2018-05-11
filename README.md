# fetch-24seven-wrapper
Wrapper API for 24sevenoffice

## Testing Individual test files (Example: soap.client.test) for unit testing
`./node_modules/.bin/mocha --require babel-core/register --timeout 10000 --exit  test/services/soap.client.test.js`

If you want to create the services using TDD, use the following command to run the tests in watch mode
`./node_modules/.bin/mocha --require babel-core/register --timeout 10000 --exit --watch  test/services/soap.client.test.js`

## Test all unit and integration tests
`npm run test`

# How to call a 24SevenOffice service
* Authenticate on 24seven office API to use the services
  * If you don't have a previously authenticated session id, obtain a session id
    * `const [authError, sessionId] = await get24SevenAuthSessionId('communityaccount@mail.com', 'communityaccount_password', null );`
  * If you alredy have a sessionId verify the session id is valid (if not valid, a new session ID will be returned)
    * `const [authError, sessionId] = await get24SevenAuthSessionId('communityaccount@mail.com', 'communityaccount_password', sessionId );`
* Call the requried service with the input params and session Id, Example, create a new invoice in 24sevenoffice
  * ` const [error, results] = await createInvoice(inputParamObject, sessionId);`

# TODO
* Add Product services to create/edit and delete products
* Update Invoice tests to create customer, product at the begining and delete them after test
* Ensure all officewrapper services have uniform return patterns



