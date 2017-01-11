import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../testing';

import { SearchComponent } from './search.component';
import { SearchService }   from './search.service';
import { SearchModule }          from './search.module';
import { GlobalState } from '../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: SearchComponent;
let fixture: ComponentFixture<SearchComponent>;
let page: Page;

////// Tests //////
describe('SearchComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided SearchService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubSearchService {
    searchArtists(name, limit): Observable<any[]> {
      return Observable.of([{'name': 'artist1', 'image': '1.jpg'}]);
    }
  }

  beforeEach(() => activatedRoute.testParams = { query: 'artist1' } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ SearchModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router,         useClass: RouterStub},
        { provide: SearchService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(SearchComponent, {
      set: {
        providers: [
          { provide: SearchService, useClass: StubSearchService }
        ]
      }
    });
  }));

  let searchStub: StubSearchService;

  describe('SearchComponent should ', () => {
    let artistName = 'artist1';

    beforeEach( async(() => {
      activatedRoute.testParams = { query: artistName };
      createComponent();
      searchStub = fixture.debugElement.injector.get(SearchService);
    }));

    it('fixture injected service is not the component injected service',
      inject([SearchService], (service: SearchService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(searchStub).toBeTruthy('service injected into component');
    }));

    it('have called OnInit and initialized values', () => {
      expect(page.searchArtistsSpy.calls.any()).toBe(true, 'searchArtists called');
      expect(page.searchHeading.textContent).toBe('Search / ' + artistName, 'searchHeading');
      expect(page.artistLabel.textContent).toBe(artistName, 'artistLabel');
      expect(page.artistPic.properties['src']).toBe('1.jpg', 'artistPic');
    });

    it('navigate to the correct artist', () => {
      click(page.searchTile);
      expect(page.openArtistProfileSpy.calls.any()).toBe(true, 'openArtistProfile called');
    });
  });
}

/////////// Helpers /////

/** Create the SearchComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(SearchComponent);
  comp    = fixture.componentInstance;
  page    = new Page();
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.addPageElements();
  });
}

class Page {
  loadSpy: jasmine.Spy;
  navSpy: jasmine.Spy;
  searchArtistsSpy: jasmine.Spy;
  openArtistProfileSpy: jasmine.Spy;

  searchHeading: HTMLElement;
  searchTile: DebugElement;
  artistPic: DebugElement;
  artistLabel: HTMLElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const searchStub = compInjector.get(SearchService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.searchArtistsSpy = spyOn(searchStub, 'searchArtists').and.callThrough();
    this.openArtistProfileSpy = spyOn(comp, 'openArtistProfile').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    this.searchHeading = fixture.debugElement.query(By.css('#search-heading')).nativeElement;
    this.searchTile = fixture.debugElement.query(By.css('#search-tile'));
    this.artistPic = fixture.debugElement.query(By.css('.browse-event-tile'));
    this.artistLabel = fixture.debugElement.query(By.css('.browse-name')).nativeElement;
  }
}
