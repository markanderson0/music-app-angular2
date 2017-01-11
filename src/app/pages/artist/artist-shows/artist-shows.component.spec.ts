import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../testing';

import { ArtistShowsComponent } from './artist-shows.component';
import { ArtistShowsService }   from './artist-shows.service';
import mocks = require('./artist-shows.mock');
import { ArtistModule }          from '../artist.module';
import { GlobalState } from '../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: ArtistShowsComponent;
let fixture: ComponentFixture<ArtistShowsComponent>;
let page: Page;

////// Tests //////
describe('ArtistShowsComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided ArtistShowsService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubArtistShowsService {
    getName(name: string): Observable<any> {
      return Observable.of(mocks.mockNameResponse);
    }

    getArtist(name: string): Observable<any> {
      return Observable.of(mocks.mockArtistResponse);
    }

    getArtistShows(mbid, pageNum): Observable<any[]> {
      return Observable.of(mocks.mockArtistShowsResponse);
    }
  }

  beforeEach(() => activatedRoute.testParams = { artist: 'artist1' } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ ArtistModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: { parent:  { params: [activatedRoute.testParams ] }  } },
        { provide: Router,         useClass: RouterStub},
        { provide: ArtistShowsService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(ArtistShowsComponent, {
      set: {
        providers: [
          { provide: ArtistShowsService, useClass: StubArtistShowsService }
        ]
      }
    });
  }));

  let artistStub: StubArtistShowsService;

  describe('ArtistShowsComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      artistStub = fixture.debugElement.injector.get(ArtistShowsService);
    }));

    it('fixture injected service is not the component injected service',
      inject([ArtistShowsService], (service: ArtistShowsService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(artistStub).toBeTruthy('service injected into component');
    }));

    it('have called OnInit and initialized values', () => {
      expect(page.getNameSpy.calls.any()).toBe(true, 'getName called');
      expect(page.getArtistSpy.calls.any()).toBe(true, 'getArtist called');
      expect(page.getArtistShowsSpy.calls.any()).toBe(true, 'getArtistShows called');

      expect(page.venue.textContent).toBe('ven1', 'venue');
      expect(page.location.textContent).toBe('city1,  country1', 'location');
      expect(page.tour.textContent).toBe('artistTour', 'tour');
      expect(page.date.textContent).toBe('01-01-2016', 'date');
    });

    it('view setlist when isCollapsed is set to true', () => {
      comp.artistShows[0]['isCollapsed'] = true;
      fixture.detectChanges();
      page.song = fixture.debugElement.query(By.css('.artist-setlist ol li')).nativeElement;
      expect(page.song.textContent).toBe('song1', 'song');
    });

    it('hide setlist when isCollapsed is set to false', () => {
      comp.artistShows[0]['isCollapsed'] = false;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.artist-setlist ol li'))).toBe(null, 'song');
    });
  });
}

/////////// Helpers /////

/** Create the ArtistShowsComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(ArtistShowsComponent);
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
  getNameSpy: jasmine.Spy;
  getArtistSpy: jasmine.Spy;
  getArtistShowsSpy: jasmine.Spy;

  venue: HTMLElement;
  location: HTMLElement;
  tour: HTMLElement;
  date: HTMLElement;
  song: HTMLElement;


  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const artistStub = compInjector.get(ArtistShowsService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getNameSpy = spyOn(artistStub, 'getName').and.callThrough();
    this.getArtistSpy = spyOn(artistStub, 'getArtist').and.callThrough();
    this.getArtistShowsSpy = spyOn(artistStub, 'getArtistShows').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    if (comp.artistName) {
      this.venue = fixture.debugElement.query(By.css('.venue-data')).nativeElement;
      const locationandTour = fixture.debugElement.queryAll(By.css('.city-data'));
      this.location = locationandTour[0].nativeElement;
      this.tour = locationandTour[1].nativeElement;
      this.date = fixture.debugElement.query(By.css('#date-data')).nativeElement;
    }
  }
}
