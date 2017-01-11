import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../testing';

import { MerchProductComponent } from './merch-product.component';
import { MerchProductService }   from './merch-product.service';
import merchMocks = require('./merch-product.mock');
import { MerchModule }          from '../merch.module';
import { GlobalState } from '../../../global.state';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: MerchProductComponent;
let fixture: ComponentFixture<MerchProductComponent>;
let page: Page;

////// Tests //////
describe('MerchProductComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided MerchProductService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubMerchProductService {
    merchQuantity = '1,2,3,4,5';
    merchSize = 'S,M,L,XL,XXL';
    merchPurchaseDetails = {};
    selectedMerch = [];

    getMerchItem(id): Promise<any[]> {
      return Promise.resolve(merchMocks.mockResponse);
    }
  }

  beforeEach(() => activatedRoute.testParams = { id: '123' } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ MerchModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: { params: [ activatedRoute.testParams ] } },
        { provide: Router,         useClass: RouterStub},
        { provide: MerchProductService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(MerchProductComponent, {
      set: {
        providers: [
          { provide: MerchProductService, useClass: StubMerchProductService }
        ]
      }
    });
  }));

  let merchStub: StubMerchProductService;

  describe('MerchProductComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      merchStub = fixture.debugElement.injector.get(MerchProductService);
    }));

    it('fixture injected service is not the component injected service',
      inject([MerchProductService], (service: MerchProductService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(merchStub).toBeTruthy('MerchProductService injected into component');
    }));

    it('have called OnInit and initialized Merch values', () => {
      expect(page.getMerchItemSpy.calls.any()).toBe(true, 'getMerchItem called');

      expect(page.merchPic.properties['src']).toBe('artist1shirt.jpg', 'merchPic');
      expect(page.merchPrice.textContent).toBe('USD10.00', 'merchPrice');
      expect(page.merchName.textContent).toBe('artist1 shirt', 'merchName');
    });
  });
}

/////////// Helpers /////

/** Create the MerchProductComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(MerchProductComponent);
  comp    = fixture.componentInstance;
  page    = new Page();
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.addMerchElements();
  });
}

class Page {
  navSpy: jasmine.Spy;

  // Merch
  getMerchItemSpy: jasmine.Spy;

  merchPic: DebugElement;
  merchPrice: HTMLElement;
  merchName: HTMLElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const merchStub = compInjector.get(MerchProductService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getMerchItemSpy = spyOn(merchStub, 'getMerchItem').and.callThrough();
  }

  addMerchElements() {
    if (comp.selectedMerch) {
      this.merchPic = fixture.debugElement.query(By.css('#merch-pic'));
      this.merchPrice = fixture.debugElement.query(By.css('#merch-price')).nativeElement;
      this.merchName = fixture.debugElement.query(By.css('#merch-name')).nativeElement;
    }
  }
}
