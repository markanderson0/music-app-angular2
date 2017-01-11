import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../testing';

import { ArtistComponent } from './artist.component';
import { SearchService }   from '../search/search.service';
import { ArtistModule }          from './artist.module';
import { GlobalState } from '../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: ArtistComponent;
let fixture: ComponentFixture<ArtistComponent>;
let page: Page;

////// Tests //////
describe('ArtistComponent', () => {
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

  // the `id` value is irrelevant because ignored by service stub
  beforeEach(() => activatedRoute.testParams = { artist: 'artist1' } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ ArtistModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router,         useClass: RouterStub},
        { provide: SearchService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(ArtistComponent, {
      set: {
        providers: [
          { provide: SearchService, useClass: StubSearchService }
        ]
      }
    });
  }));

  let searchStub: StubSearchService;

  describe('ArtistComponent should ', () => {
    let artistName = 'artist1';

    beforeEach( async(() => {
      activatedRoute.testParams = { artist: artistName };
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
      expect(page.headerLabel.textContent).toContain(artistName);
      expect(page.bannerPic.properties['src']).toBe('1.jpg');
    });

    it('navigate to the correct artist', () => {
      comp.artistName = 'artist2';
      click(page.headerLabel);
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
      expect(page.navSpy.calls.first().args[0][0]).toBe('artist/artist2/profile');
    });
  });
}

/////////// Helpers /////

/** Create the ArtistComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(ArtistComponent);
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

  bannerPic: DebugElement;

  headerLabel: HTMLElement;
  artistLabel: HTMLElement;
  genreLabel: HTMLElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const searchStub = compInjector.get(SearchService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.searchArtistsSpy = spyOn(searchStub, 'searchArtists').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    this.bannerPic = fixture.debugElement.query(By.css('#artist-banner-pic'));
    this.headerLabel = fixture.debugElement.query(By.css('.artist-header')).nativeElement;
  }
}
