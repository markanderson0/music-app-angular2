import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../testing';

import { VideoSidebarComponent } from './video-sidebar.component';
import { VideoSidebarService }   from './video-sidebar.service';
import mocks = require('./video-sidebar.mock');
import { VideoPlayerModule }          from '../video-player.module';
import { GlobalState } from '../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: VideoSidebarComponent;
let fixture: ComponentFixture<VideoSidebarComponent>;
let page: Page;

////// Tests //////
describe('VideoSidebarComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided VideoSidebarService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubVideoSidebarService {
    getVideos(playlistId, showId, artistName): Observable<any[]> {
      return Observable.of(mocks.mockVideosResponse);
    }

    getSetlist(artist, eventDate, eventVenue, eventlocation): Observable<any[]> {
      return Observable.of(mocks.mockSetlistResponse);
    }
  }

  beforeEach(() => activatedRoute.testParams = { artist: 'artist1', playlist: 'p123', show: 'show123', id: 'vid123' } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ VideoPlayerModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: {  params: [activatedRoute.testParams ] } },
        { provide: Router,         useClass: RouterStub},
        { provide: VideoSidebarService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(VideoSidebarComponent, {
      set: {
        providers: [
          { provide: VideoSidebarService, useClass: StubVideoSidebarService },
        ]
      }
    });
  }));

  let videoStub: StubVideoSidebarService;

  describe('VideoSidebarComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      videoStub = fixture.debugElement.injector.get(VideoSidebarService);
    }));

    it('fixture injected service is not the component injected service',
      inject([VideoSidebarService], (service: VideoSidebarService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(videoStub).toBeTruthy('VideoSidebarService injected into component');
    }));

    it('have called OnInit and initialized ShowVideos values', () => {
      expect(page.getShowVideosSpy.calls.any()).toBe(true, 'getShowVideos called');
      expect(page.getVideosSpy.calls.any()).toBe(true, 'getVideos called');

      expect(page.songs.textContent).toContain('song1', 'songs');
      expect(page.videoPic.properties['src']).toBe('1.png', 'videoPic');
      expect(page.rating.textContent).toContain(5 && 7, 'rating');
      expect(page.time.textContent).toContain('20:00', 'time');
      expect(page.views.textContent).toContain(100, 'views');
      expect(page.songsString.textContent).toContain('song1', 'songsString');
    });

    it('show setlist when previous setlist tab is clicked', fakeAsync( () => {
      page.setlistTab.nativeElement.dispatchEvent(newEvent('select'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      page.addSetlistElements();
      expect(page.getSetlistCompSpy.calls.any()).toBe(true, 'getSetlistComp called');
      expect(page.getSetlistSpy.calls.any()).toBe(true, 'getSetlist called');
      expect(page.showsSong.textContent).toContain('song1', 'song');
    }));

    it('navigate when click on video', () => {
      click(page.video);
      expect(page.openVideoSpy.calls.any()).toBe(true, 'openVideo called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });
  });
}

/////////// Helpers /////

/** Create the VideoSidebarComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(VideoSidebarComponent);
  comp    = fixture.componentInstance;
  page    = new Page();
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.addTabs();
    page.addShowVideoElements();
  });
}

class Page {
  navSpy: jasmine.Spy;

  // Tabs
  videoTab: DebugElement;
  setlistTab: DebugElement;

  // ShowVideos
  getVideosSpy: jasmine.Spy;
  getShowVideosSpy: jasmine.Spy;
  openVideoSpy: jasmine.Spy;

  video: DebugElement;
  videoPic: DebugElement;
  songs: HTMLElement;
  tour: HTMLElement;
  rating: HTMLElement;
  time: HTMLElement;
  views: HTMLElement;
  songsString: HTMLElement;

  // Setlist
  getSetlistSpy: jasmine.Spy;
  getSetlistCompSpy: jasmine.Spy;

  showsSong: HTMLElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const videoStub = compInjector.get(VideoSidebarService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getVideosSpy = spyOn(videoStub, 'getVideos').and.callThrough();
    this.getShowVideosSpy = spyOn(comp, 'getShowVideos').and.callThrough();
    this.openVideoSpy = spyOn(comp, 'openVideo').and.callThrough();

    this.getSetlistSpy = spyOn(videoStub, 'getSetlist').and.callThrough();
    this.getSetlistCompSpy = spyOn(comp, 'getSetlist').and.callThrough();
  }

  /** Add page elements after OnInit */
  addTabs() {
    const tabs = fixture.debugElement.queryAll(By.css('tab'));
    this.videoTab = tabs[0];
    this.setlistTab = tabs[1];
  }

  addShowVideoElements() {
    if (comp.artistName) {
      this.video = fixture.debugElement.query(By.css('#playlist-tile span'));
      this.videoPic = fixture.debugElement.query(By.css('#playlist-image'));
      this.songs = fixture.debugElement.query(By.css('#playlist-songs')).nativeElement;
      this.rating = fixture.debugElement.query(By.css('#playlist-song-rating span')).nativeElement;
      this.time = fixture.debugElement.query(By.css('#playlist-video-time')).nativeElement;
      this.views = fixture.debugElement.query(By.css('#playlist-video-views')).nativeElement;
      this.songsString = fixture.debugElement.query(By.css('#playlist-songs-list')).nativeElement;
    }
  }

  addSetlistElements() {
    if (comp.artistName) {
      this.showsSong = fixture.debugElement.query(By.css('#playlist-tab-setlist li h5')).nativeElement;
    }
  }
}
