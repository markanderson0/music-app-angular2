import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../testing';

import { MerchComponent } from './merch.component';
import { MerchNavigationService }   from './merch-navigation.service';
import { MerchModule }          from './merch.module';
import { GlobalState } from '../../global.state';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: MerchComponent;
let fixture: ComponentFixture<MerchComponent>;
let page: Page;

////// Tests //////
describe('MerchComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided MerchNavigationService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubMerchNavigationService {
    getMerchCategories() {
      return [{label: 'apparel', name: 'Apparel', search: 'band tshirt', cat: '123'}];
    }
  }

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ MerchModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router,         useClass: RouterStub},
        { provide: MerchNavigationService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(MerchComponent, {
      set: {
        providers: [
          { provide: MerchNavigationService, useClass: StubMerchNavigationService }
        ]
      }
    });
  }));

  let merchStub: StubMerchNavigationService;

  describe('MerchComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      merchStub = fixture.debugElement.injector.get(MerchNavigationService);
    }));

    it('fixture injected service is not the component injected service',
      inject([MerchNavigationService], (service: MerchNavigationService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(merchStub).toBeTruthy('service injected into component');
    }));

    it('have initialized values', () => {
      expect(page.categoryLabel.textContent).toBe('Apparel', 'categoryLabel');
    });

    it('search when search button is pressed', () => {
      click(page.searchBtn);
      expect(page.searchSpy.calls.any()).toBe(true, 'search called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('open top merch page when heading is clicked', () => {
      click(page.categoryBtn);
      expect(page.openMerchCategorySpy.calls.any()).toBe(true, 'openMerchCategory called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('open merch category when category button is pressed', () => {
      click(page.merchTitle);
      expect(page.openTopMerchSpy.calls.any()).toBe(true, 'openTopMerch called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });
  });
}

/////////// Helpers /////

/** Create the MerchComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(MerchComponent);
  comp    = fixture.componentInstance;
  page    = new Page();
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.addPageElements();
  });
}

class Page {
  navSpy: jasmine.Spy;
  getMerchCategoriesSpy: jasmine.Spy;
  searchSpy: jasmine.Spy;
  openTopMerchSpy: jasmine.Spy;
  openMerchCategorySpy: jasmine.Spy;

  searchBtn: DebugElement;
  categoryBtn: DebugElement;
  merchTitle: DebugElement;
  categoryLabel: HTMLElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const merchStub = compInjector.get(MerchNavigationService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getMerchCategoriesSpy = spyOn(merchStub, 'getMerchCategories').and.callThrough();
    this.searchSpy = spyOn(comp, 'search').and.callThrough();
    this.openTopMerchSpy = spyOn(comp, 'openTopMerch').and.callThrough();
    this.openMerchCategorySpy = spyOn(comp, 'openMerchCategory').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    if (comp.categories) {
      this.searchBtn = fixture.debugElement.query(By.css('#search-btn'));
      this.categoryBtn = fixture.debugElement.query(By.css('#merch-genre-btn'));
      this.categoryLabel = fixture.debugElement.query(By.css('#merch-genre-btn')).nativeElement;
      this.merchTitle = fixture.debugElement.query(By.css('.col-sm-6 a'));
    }
  }
}
