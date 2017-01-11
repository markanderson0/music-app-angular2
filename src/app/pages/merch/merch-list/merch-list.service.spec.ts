// import {
//   fakeAsync,
//   inject,
//   TestBed
// } from '@angular/core/testing';
// import {
//   HttpModule,
//   Http,
//   ResponseOptions,
//   Response,
//   URLSearchParams
// } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
// import { MerchListService } from './merch-list.service';
// import mocks = require('./merch-list.mock');

// const mockRequest = mocks.mockRequest;
// const mockResponse = mocks.mockResponse;

// const apiKey = 'XXXXX';

// describe('MerchList Service', () => {
//   let mockHttp: Http;

//   beforeEach(() => {
//     mockHttp = { get: null } as Http;

//     spyOn(mockHttp, 'get').and.returnValue(Promise.resolve({
//       json: () => mockRequest
//     }));

//     TestBed.configureTestingModule({
//       imports: [HttpModule],
//       providers: [
//         {
//           provide: Http,
//           useValue: mockHttp
//         },
//         MerchListService
//       ]
//     });
//   });

//   it('should get getMerch(name, id, pageNum, sort, merch) results', fakeAsync(
//     inject([MerchListService], service => {
//       let name = 'artist1';
//       let categoryId = '11450';
//       let pageNum = '1';
//       let sort = 'BestMatch';
//       let merch = [];

//       let params = new URLSearchParams();
//       params.set('OPERATION-NAME', 'findItemsAdvanced');
//       params.set('SERVICE-VERSION', '1.0.0');
//       params.set('SECURITY-APPNAME', apiKey);
//       params.set('RESPONSE-DATA-FORMAT', 'JSON');
//       params.set('keywords', name);
//       params.set('categoryId', categoryId);
//       params.set('sortOrder', sort);
//       params.set('outputSelector', 'AspectHistogram');
//       params.set('paginationInput.pageNumber', pageNum);
//       params.set('itemFilter(0).name', 'Condition');
//       params.set('itemFilter(0).value', 'New');

//       service.getMerch(name, categoryId, pageNum, sort, merch)
//         .toPromise()
//         .then(res => {
//           expect(mockHttp.get).toHaveBeenCalledWith('http://svcs.ebay.com/services/search/FindingService/v1', { search: params });
//           expect(res).toEqual(mockResponse);
//         });
//     })
//   ));

// });
