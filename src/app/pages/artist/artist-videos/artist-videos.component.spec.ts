import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../testing';

import { ArtistVideosComponent } from './artist-videos.component';
import { ArtistVideosService }   from './artist-videos.service';
import mocks = require('./artist-videos.mock');
import { ArtistModule }          from '../artist.module';
import { GlobalState } from '../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: ArtistVideosComponent;
let fixture: ComponentFixture<ArtistVideosComponent>;
let page: Page;

////// Tests //////
describe('ArtistVideosComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided ArtistVideosService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubArtistVideosService {
    getVideos(artistName): Observable<any[]> {
      return Observable.of(mocks.mockResponse);
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
        { provide: ArtistVideosService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(ArtistVideosComponent, {
      set: {
        providers: [
          { provide: ArtistVideosService, useClass: StubArtistVideosService }
        ]
      }
    });
  }));

  let artistStub: StubArtistVideosService;

  describe('ArtistVideosComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      artistStub = fixture.debugElement.injector.get(ArtistVideosService);
    }));

    it('fixture injected service is not the component injected service',
      inject([ArtistVideosService], (service: ArtistVideosService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(artistStub).toBeTruthy('service injected into component');
    }));

    it('have called OnInit and initialized values', () => {
      expect(page.getVideosSpy.calls.any()).toBe(true, 'getVideos called');

      expect(page.location.textContent).toBe('01-01-2016 | ven1 | city1, country1', 'location');

    });

    it('show videos when accordion is expanded', () => {
      const accordionHeaders = fixture.nativeElement.querySelectorAll('.card-header a');
      accordionHeaders[0].click();
      fixture.detectChanges();

      page.user = fixture.debugElement.query(By.css('.video-title')).nativeElement;
      page.videoPic = fixture.debugElement.query(By.css('.video-pic'));
      page.song = fixture.debugElement.query(By.css('.video-tile span h5')).nativeElement;
      page.rating = fixture.debugElement.query(By.css('.video-rating span')).nativeElement;
      page.time = fixture.debugElement.query(By.css('.video-time')).nativeElement;
      page.views = fixture.debugElement.query(By.css('.video-views')).nativeElement;
      page.songsString = fixture.debugElement.query(By.css('.video-songs')).nativeElement;

      expect(page.user.textContent).toBe('Uploaded By testUser1', 'user');
      expect(page.videoPic.properties['src']).toBe('1.png', 'videoPic');
      expect(page.song.textContent).toBe('song1', 'song');
      expect(page.rating.textContent).toContain(5 && 7, 'rating');
      expect(page.time.textContent).toContain('20:00', 'time');
      expect(page.views.textContent).toContain(100, 'views');
      expect(page.songsString.textContent).toContain('song1', 'songsString');
    });

    it('open video when one is clicked', () => {
      const accordionHeaders = fixture.nativeElement.querySelectorAll('.card-header a');
      accordionHeaders[0].click();
      fixture.detectChanges();

      page.video = fixture.debugElement.query(By.css('.video-tile')).nativeElement;

      click(page.video);
      expect(page.openVideoSpy.calls.any()).toBe(true, 'openVideo called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });
  });
}

/////////// Helpers /////

/** Create the ArtistVideosComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(ArtistVideosComponent);
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
  getVideosSpy: jasmine.Spy;
  openVideoSpy: jasmine.Spy;

  video: DebugElement;
  videoPic: DebugElement;

  user: HTMLElement;
  location: HTMLElement;
  tour: HTMLElement;
  song: HTMLElement;
  rating: HTMLElement;
  time: HTMLElement;
  views: HTMLElement;
  songsString: HTMLElement;


  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const artistStub = compInjector.get(ArtistVideosService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getVideosSpy = spyOn(artistStub, 'getVideos').and.callThrough();
    this.openVideoSpy = spyOn(comp, 'openVideo').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    if (comp.artistName) {
      this.location = fixture.debugElement.query(By.css('#accordion-header')).nativeElement;
    }
  }
}
