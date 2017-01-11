import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../../testing';

import { FavouritesComponent } from './favourites.component';
import { FavouritesService }   from './favourites.service';
import mocks = require('./favourites.mock');
import { ProfileModule }          from '../profile.module';
import { GlobalState } from '../../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: FavouritesComponent;
let fixture: ComponentFixture<FavouritesComponent>;
let page: Page;

////// Tests //////
describe('FavouritesComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided FavouritesService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubFavouritesService {
    getFavourites(): Observable<any[]> {
      return Observable.of(mocks.mockResponse);
    }
  }

  beforeEach(() => activatedRoute.testParams = { } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ ProfileModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: { params: [activatedRoute.testParams ] } },
        { provide: Router,         useClass: RouterStub},
        { provide: FavouritesService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(FavouritesComponent, {
      set: {
        providers: [
          { provide: FavouritesService, useClass: StubFavouritesService }
        ]
      }
    });
  }));

  let favouritesStub: StubFavouritesService;

  describe('FavouritesComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      favouritesStub = fixture.debugElement.injector.get(FavouritesService);
    }));

    it('fixture injected service is not the component injected service',
      inject([FavouritesService], (service: FavouritesService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(favouritesStub).toBeTruthy('service injected into component');
    }));

    it('have called OnInit and initialized values', () => {
      expect(page.getFavouritesSpy.calls.any()).toBe(true, 'getFavourites called');

      const accordionHeaders = fixture.nativeElement.querySelectorAll('.card-header a');
      accordionHeaders[0].click();
      fixture.detectChanges();

      page.user = fixture.debugElement.query(By.css('.video-title')).nativeElement;
      page.videoPic = fixture.debugElement.query(By.css('#favourite-videos-pic'));
      page.location = fixture.debugElement.query(By.css('#favourite-videos-tile span')).nativeElement;
      page.rating = fixture.debugElement.query(By.css('#favourite-videos-rating span')).nativeElement;
      page.time = fixture.debugElement.query(By.css('#favourite-videos-time')).nativeElement;
      page.views = fixture.debugElement.query(By.css('#favourite-videos-views')).nativeElement;
      page.songsString = fixture.debugElement.query(By.css('#favourite-videos-songs')).nativeElement;

      expect(page.user.textContent).toBe('Uploaded By testUser1', 'user');
      expect(page.videoPic.properties['src']).toBe('1.png', 'videoPic');
      expect(page.location.textContent).toContain('01-01-2016' && 'city1, country1', 'location');
      expect(page.rating.textContent).toContain(5 && 7, 'rating');
      expect(page.time.textContent).toContain('20:00', 'time');
      expect(page.views.textContent).toContain(100, 'views');
      expect(page.songsString.textContent).toContain('song1', 'songsString');
    });


    it('open artist videos when video tile is clicked', () => {
      const accordionHeaders = fixture.nativeElement.querySelectorAll('.card-header a');
      accordionHeaders[0].click();
      fixture.detectChanges();

      page.videoTile = fixture.debugElement.query(By.css('#favourite-videos-tile'));
      click(page.videoTile);
      expect(page.openVideoSpy.calls.any()).toBe(true, 'openVideo called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });
  });
}

/////////// Helpers /////

/** Create the FavouritesComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(FavouritesComponent);
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
  getFavouritesSpy: jasmine.Spy;
  openVideoSpy: jasmine.Spy;

  videoTile: DebugElement;
  videoPic: DebugElement;

  artistName: HTMLElement;
  user: HTMLElement;
  location: HTMLElement;
  tour: HTMLElement;
  rating: HTMLElement;
  time: HTMLElement;
  views: HTMLElement;
  songsString: HTMLElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const favouritesStub = compInjector.get(FavouritesService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getFavouritesSpy = spyOn(favouritesStub, 'getFavourites').and.callThrough();
    this.openVideoSpy = spyOn(comp, 'openVideo').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    if (comp.favourites) {
      this.artistName = fixture.debugElement.query(By.css('#accordion-header')).nativeElement;
    }
  }
}
