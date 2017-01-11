import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../testing';

import { MerchListComponent } from './merch-list.component';
import { MerchListService }   from './merch-list.service';
import { MerchProductService }   from '../merch-product/merch-product.service';
import { MerchNavigationService }   from '../merch-navigation.service';
import merchMocks = require('./merch-list.mock');
import { MerchModule }          from '../merch.module';
import { GlobalState } from '../../../global.state';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: MerchListComponent;
let fixture: ComponentFixture<MerchListComponent>;
let page: Page;

////// Tests //////
describe('MerchListComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided MerchListService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubMerchListService {
    merchSortOptions = 'Best Match,Price (Asc),Price (Dec)';

    getMerch(name, id, pageNum, sort, merch): Promise<any[]> {
      return Promise.resolve(merchMocks.mockResponse);
    }

    getMoreMerch() {}
  }

  class StubMerchProductService {}

  beforeEach(() => activatedRoute.testParams = { category: 'apparel' } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ MerchModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: { params: [ activatedRoute.testParams ] } },
        { provide: Router,         useClass: RouterStub},
        { provide: MerchListService, useValue: {} },
        { provide: MerchProductService, useValue: {} },
        MerchNavigationService,
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(MerchListComponent, {
      set: {
        providers: [
          { provide: MerchListService, useClass: StubMerchListService },
          { provide: MerchProductService, useClass: StubMerchProductService }
        ]
      }
    });
  }));

  let merchStub: StubMerchListService;

  describe('MerchListComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      merchStub = fixture.debugElement.injector.get(MerchListService);
    }));

    it('fixture injected service is not the component injected service',
      inject([MerchListService], (service: MerchListService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(merchStub).toBeTruthy('MerchListService injected into component');
    }));

    it('have called OnInit and initialized Merch values', () => {
      expect(page.getMerchSpy.calls.any()).toBe(true, 'getMerch called');

      expect(page.merchPic.properties['src']).toBe('artist1shirt.jpg', 'merchPic');
      expect(page.merchPrice.textContent).toBe('USD10.00', 'merchPrice');
      expect(page.merchName.textContent).toBe('artist1 shirt', 'merchName');
    });

    it('navigate when click on merch item', () => {
      click(page.merchItem);
      expect(page.openMerchProductSpy.calls.any()).toBe(true, 'openMerchProduct called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('load more mearch when click load more merch button', () => {
      click(page.merchMore);
      expect(page.getMoreMerchSpy.calls.any()).toBe(true, 'getMoreMerch called');
    });
  });
}

/////////// Helpers /////

/** Create the MerchListComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(MerchListComponent);
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
  getMerchSpy: jasmine.Spy;
  openMerchProductSpy: jasmine.Spy;
  getMoreMerchSpy: jasmine.Spy;

  merchItem: DebugElement;
  merchPic: DebugElement;
  merchPrice: HTMLElement;
  merchName: HTMLElement;
  merchMore: DebugElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const merchStub = compInjector.get(MerchListService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');

    this.getMerchSpy = spyOn(merchStub, 'getMerch').and.callThrough();
    this.openMerchProductSpy = spyOn(comp, 'openMerchProduct').and.callThrough();
    this.getMoreMerchSpy = spyOn(comp, 'getMoreMerch').and.callThrough();
  }

  addMerchElements() {
    if (comp.merch) {
      this.merchItem = fixture.debugElement.query(By.css('#merch-items div'));
      this.merchPic = fixture.debugElement.query(By.css('#merch-items div img'));
      this.merchPrice = fixture.debugElement.query(By.css('#merch-items div h4')).nativeElement;
      this.merchName = fixture.debugElement.query(By.css('#merch-items div h6')).nativeElement;
      this.merchMore = fixture.debugElement.query(By.css('#load-button'));
    }
  }
}
