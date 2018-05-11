import chai from 'chai';
import { fail } from 'assert';

import { get24sevenClient, get24SevenAuthSessionId } from '../../services/soap.client.js';
import { service24seven } from '../../services/coreService.js';

describe('Product Service Tests', () => {
  let companyId = "";
  let productServiceUrl = 'https://api.24sevenoffice.com/Logistics/Product/V001/ProductService.asmx?wsdl';

  it('Can create the client to work with the 24sevenoffice product services', async () => {
    const client = await get24sevenClient(productServiceUrl);
    chai.assert.isNotNull(client);
  });

  it('createProduct function is avilable', () => {
    chai.assert.isDefined(service24seven);
  });

  it('calling createProduct without a sessionId throws an error', async () => {
    const [error, result] = await service24seven(productServiceUrl, null, null, null);
    chai.assert.equal(error, 'Invalid session id.');
    chai.assert.isUndefined(result);
  });

  it('calling SaveCategories with the correct parameters create a category', async () => {
    const [authError, sessionId] = await get24SevenAuthSessionId('communityaccount@mail.com', 'communityaccount_password', null);
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
    const [error, { SaveCategoriesResult: { Category: results } }] = await service24seven(productServiceUrl, 'SaveCategories', paramObject, sessionId);
    chai.assert.isUndefined(error);
    chai.assert.isNotEmpty(results);
    chai.assert.equal(5, results[0].Id);
    chai.assert.equal('Test Transporter', results[0].Name);
  });

  it('calling SaveCategory with empty parameter object will throw an error', async () => {
    const [authError, sessionId] = await get24SevenAuthSessionId('communityaccount@mail.com', 'communityaccount_password', null);
    const paramObject = {};
    const [error, results] = await service24seven(productServiceUrl, 'SaveCategories', paramObject, sessionId);
    chai.assert.isUndefined(results);
    chai.assert.isNotEmpty(error);
  });

  it('calling SaveCategory with invalid parameter object will throw an error', async () => {
    const [authError, sessionId] = await get24SevenAuthSessionId('communityaccount@mail.com', 'communityaccount_password', null);
    const paramObject = {
      categosdsries: [
        {
          Categdsfory: {
            Idd: 5,
            Name: 'Test Transporter',
            IncVat: true,
            Currency: '',
          }
        }
      ]
    };
  });

  it('calling SaveCategory with invalid category object parameter will not create an object', async () => {
    const [authError, sessionId] = await get24SevenAuthSessionId('communityaccount@mail.com', 'communityaccount_password', null);
    const paramObject = {
      categories: [
        {
          Categdsfory: {
            Idd: 5,
            Name: 'Test Transporter',
            IncVat: true,
            Currency: '',
          }
        }
      ]
    };
    const [error, results] = await service24seven(productServiceUrl, 'SaveCategories', paramObject, sessionId);
    chai.assert.isUndefined(error);
    chai.assert.isNotEmpty(results);
    chai.assert.equal(results.SaveCategoriesResult, null);
  });

  it('calling SaveProducts with valid parameter object will create a product', async () => {
    const [authError, sessionId] = await get24SevenAuthSessionId('communityaccount@mail.com', 'communityaccount_password', null);
    const paramObject = {
      products: [
        {
          Product: {
            Id: 102,
            Name: 'Test Product',
            CategoryId: 5,
          }
        }
      ]
    };
    const [error, { SaveProductsResult: { Product: results } }] = await service24seven(productServiceUrl, 'SaveProducts', paramObject, sessionId);
    chai.assert.isUndefined(error);
    chai.assert.isNotEmpty(results);
    chai.assert.equal(102, results[0].Id);
    chai.assert.equal('Test Product', results[0].Name);
  });

  it('calling DeleteProducts with valid parameter object will delete a product', async () => {
    const [authError, sessionId] = await get24SevenAuthSessionId('communityaccount@mail.com', 'communityaccount_password', null);
    const paramObjToCreate = {
      products: [
        {
          Product: {
            Id: 103,
            Name: 'Test Product 2',
            CategoryId: 5,
          }
        }
      ]
    };
    const [error, { SaveProductsResult: { Product: results } }] = await service24seven(productServiceUrl, 'SaveProducts', paramObjToCreate, sessionId);
    chai.assert.isUndefined(error);
    chai.assert.isNotEmpty(results);
    chai.assert.equal(103, results[0].Id);
    chai.assert.equal('Test Product 2', results[0].Name);

    const paramObjToDelete = {
      products: [
        {
          Product: {
            Id: 103,
          }
        }
      ]
    };

    const [errorDelete, { DeleteProductsResult: { Product: deleteResult } }] = await service24seven(productServiceUrl, 'DeleteProducts', paramObjToDelete, sessionId);
    chai.assert.isUndefined(errorDelete);
    chai.assert.isNotEmpty(deleteResult);
    chai.assert.equal(103, results[0].Id);
  });
});