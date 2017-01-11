import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../../testing';

import { VideosComponent } from './videos.component';
import { VideosService } from './videos.service';
import mocks = require('./videos.mock');
import { ProfileModule } from '../profile.module';
import { GlobalState } from '../../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: VideosComponent;
let fixture: ComponentFixture<VideosComponent>;
let page: Page;

////// Tests //////
describe('VideosComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided VideosService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubVideosService {
    getVideos(): Observable<any[]> {
      return Observable.of(mocks.mockResponse);
    }

    getSwipeOptions() {}
  }

  beforeEach(() => activatedRoute.testParams = { } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ ProfileModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: { parent:  { params: [activatedRoute.testParams ] }  } },
        { provide: Router,         useClass: RouterStub},
        { provide: VideosService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(VideosComponent, {
      set: {
        providers: [
          { provide: VideosService, useClass: StubVideosService }
        ]
      }
    });
  }));

  let videoStub: StubVideosService;

  describe('VideosComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      videoStub = fixture.debugElement.injector.get(VideosService);
    }));

    it('fixture injected service is not the component injected service',
      inject([VideosService], (service: VideosService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(videoStub).toBeTruthy('service injected into component');
    }));

    it('have called OnInit and initialized values', () => {
      expect(page.getVideosSpy.calls.any()).toBe(true, 'getVideos called');

      expect(page.artistName.textContent).toBe('artist1', 'artistName');
    });

    it('show videos when accordion is expanded', () => {
      const accordionHeaders = fixture.nativeElement.querySelectorAll('.card-header a');
      accordionHeaders[0].click();
      fixture.detectChanges();

      page.location = fixture.debugElement.query(By.css('.video-title')).nativeElement;
      page.videoPic = fixture.debugElement.query(By.css('.video-pic'));
      page.song = fixture.debugElement.query(By.css('.video-tile span h5')).nativeElement;
      page.rating = fixture.debugElement.query(By.css('.video-rating span')).nativeElement;
      page.time = fixture.debugElement.query(By.css('.video-time')).nativeElement;
      page.views = fixture.debugElement.query(By.css('.video-views')).nativeElement;
      page.songsString = fixture.debugElement.query(By.css('.video-songs')).nativeElement;

      expect(page.location.textContent).toBe('01-01-2016 ven1 city1, country1', 'location');
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

      page.videoTile = fixture.debugElement.query(By.css('.video-tile')).nativeElement;

      click(page.videoTile);
      expect(page.openVideoSpy.calls.any()).toBe(true, 'openVideo called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });
  });
}

/////////// Helpers /////

/** Create the VideosComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(VideosComponent);
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

  searchBtn: DebugElement;
  videoTile: DebugElement;
  videoPic: DebugElement;

  artistName: HTMLElement;
  location: HTMLElement;
  song: HTMLElement;
  rating: HTMLElement;
  time: HTMLElement;
  views: HTMLElement;
  songsString: HTMLElement;


  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const videoStub = compInjector.get(VideosService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getVideosSpy = spyOn(videoStub, 'getVideos').and.callThrough();
    this.openVideoSpy = spyOn(comp, 'openVideo').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    if (comp.videos) {
      this.searchBtn = fixture.debugElement.query(By.css('#search-btn'));
      this.artistName = fixture.debugElement.query(By.css('#accordion-header')).nativeElement;
    }
  }
}
