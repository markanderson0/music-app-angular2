import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../testing';

import { BrowseNavigationComponent } from './browse-navigation.component';
import { BrowseNavigationService }   from '../browse-navigation.service';
import { BrowseModule }          from '../browse.module';
import { GlobalState } from '../../../global.state';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: BrowseNavigationComponent;
let fixture: ComponentFixture<BrowseNavigationComponent>;
let page: Page;

////// Tests //////
describe('BrowseNavigationComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided BrowseNavigationService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubBrowseNavigationService {
    getBrowseGenres() {
      return [{'name': 'genre1', 'pic': 'genre1.jpg'}];
    }
  }

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ BrowseModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router,         useClass: RouterStub},
        { provide: BrowseNavigationService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(BrowseNavigationComponent, {
      set: {
        providers: [
          { provide: BrowseNavigationService, useClass: StubBrowseNavigationService }
        ]
      }
    });
  }));

  let browseStub: StubBrowseNavigationService;

  describe('BrowseNavigationComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      browseStub = fixture.debugElement.injector.get(BrowseNavigationService);
    }));

    it('fixture injected service is not the component injected service',
      inject([BrowseNavigationService], (service: BrowseNavigationService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(browseStub).toBeTruthy('service injected into component');
    }));

    it('have initialized values', () => {
      expect(page.genrePic.properties['src']).toBe('genre1.jpg', 'genrePic');
      expect(page.genreName.textContent).toBe('genre1', 'genreName');
    });

    it('open video when one is clicked', () => {
      click(page.genreTile);
      expect(page.openGenreSpy.calls.any()).toBe(true, 'openGenre called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });
  });
}

/////////// Helpers /////

/** Create the BrowseNavigationComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(BrowseNavigationComponent);
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
  getBrowseGenresSpy: jasmine.Spy;
  openGenreSpy: jasmine.Spy;

  genreTile: DebugElement;
  genrePic: DebugElement;
  genreName: HTMLElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const browseStub = compInjector.get(BrowseNavigationService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getBrowseGenresSpy = spyOn(browseStub, 'getBrowseGenres').and.callThrough();
    this.openGenreSpy = spyOn(comp, 'openGenre').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    if (comp.genres) {
      this.genreTile = fixture.debugElement.query(By.css('#genre-tile'));
      this.genrePic = fixture.debugElement.query(By.css('.browse-event-tile'));
      this.genreName = fixture.debugElement.query(By.css('.browse-name')).nativeElement;
    }
  }
}
