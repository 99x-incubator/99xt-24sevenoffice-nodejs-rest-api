import chai from 'chai';
import { fail } from 'assert';

import { get24sevenClient, get24SevenAuthSessionId } from '../../services/soap.client.js';
import { service24seven } from '../../services/coreService.js';

async function get24SevenInvoiceServiceClient() {
  const invoiceServiceUrl = 'https://api.24sevenoffice.com/Economy/InvoiceOrder/V001/InvoiceService.asmx?WSDL';
  return await get24sevenClient(invoiceServiceUrl);

}

describe('Invoice Service Tests', () => {
  const invoiceServiceUrl = 'https://api.24sevenoffice.com/Economy/InvoiceOrder/V001/InvoiceService.asmx?wsdl';
  it('Can create the client to work with the 24sevenoffice invoice services', async () => {
    const client = await get24sevenClient(invoiceServiceUrl);
    chai.assert.isNotNull(client);
  });

  it('invoiceService function is avilable', () => {
    chai.assert.isNotNull(service24seven);
  });

  it('calling invoiceService without a sessionId throws an error', async () => {
    const [error, result] = await service24seven(invoiceServiceUrl, null,{}, null);
    chai.assert.equal(error, 'Invalid session id.');
    chai.assert.isUndefined(result);
  });

  it('calling createInvoice  with correct params and session id create an inoice in 24sevenoffice', async () => {
    const [authError, sessionId] = await get24SevenAuthSessionId('communityaccount@mail.com', 'communityaccount_password', null);

    const paramObject = {
      invoices: [
        {
          InvoiceOrder: {
            CustomerId: 2,
            OrderStatus: 'Offer',
            InvoiceRows: [
              {
                InvoiceRow: {
                  ProductId: 102,
                  Price: 2.00,
                  Name: 'Test Product 2',
                  Quantity: 2.00,
                }
              },
            ],
          },
        },
      ]
    };
    const [error, result] = await service24seven(invoiceServiceUrl, 'SaveInvoices', paramObject, sessionId);
    chai.assert.isUndefined(error);
    chai.assert.isNotNull(result);
    console.log(result);
  });

  it('Calling create invoice with new customer information create the customer in 24seven end', async () => {
    const [authError, sessionId] = await get24SevenAuthSessionId('communityaccount@mail.com', 'communityaccount_password', null);

    const paramObject = {
      invoices: [
        {
          InvoiceOrder: {
            CustomerId: 3,
            CustomerName: "Suren Rodrigo Test",
            CustomerDeliveryName: "Suren Dinesh Rodrigo",            
            OrderStatus: 'Offer',
            InvoiceRows: [
              {
                InvoiceRow: {
                  ProductId: 102,
                  Price: 3.00,
                  Name: 'Test Product 3',
                  Quantity: 3.00,
                }
              },
            ],
          },
        },
      ]
    };
    const [error, result] = await service24seven(invoiceServiceUrl, 'SaveInvoices', paramObject, sessionId); // await createInvoice(paramObject, sessionId);
    chai.assert.isUndefined(error);
    chai.assert.isNotNull(result);
    console.log(result);
  });
});