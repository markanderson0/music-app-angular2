import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../testing';

import { PlayerComponent } from './player.component';
import { PlayerService }   from './player.service';
import mocks = require('./player.mock');
import { VideoPlayerModule }          from '../video-player.module';
import { GlobalState } from '../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: PlayerComponent;
let fixture: ComponentFixture<PlayerComponent>;
let page: Page;

////// Tests //////
describe('PlayerComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided PlayerService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubPlayerService {
    getShowDetails(showId, artistName): Observable<any[]> {
      return Observable.of(mocks.mockShowDetailsResponse);
    }

    getVideoDetails(playlistId, showId, videoId, artistName): Observable<any[]> {
      return Observable.of(mocks.mockVideoDetailsResponse);
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
        { provide: PlayerService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(PlayerComponent, {
      set: {
        providers: [
          { provide: PlayerService, useClass: StubPlayerService },
        ]
      }
    });
  }));

  let playerStub: StubPlayerService;

  describe('PlayerComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      playerStub = fixture.debugElement.injector.get(PlayerService);
    }));

    it('fixture injected service is not the component injected service',
      inject([PlayerService], (service: PlayerService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(playerStub).toBeTruthy('PlayerService injected into component');
    }));

    it('have called OnInit and initialized ShowVideos values', () => {
      expect(page.getShowDetailsCompSpy.calls.any()).toBe(true, 'getShowDetails (Comp) called');
      expect(page.getShowDetailsSpy.calls.any()).toBe(true, 'getShowDetails called');
      expect(page.getVideoDetailsCompSpy.calls.any()).toBe(true, 'getShowDetails (Comp) called');
      expect(page.getVideoDetailsSpy.calls.any()).toBe(true, 'getShowDetails called');

      expect(page.videoStats.textContent).toContain('5 |' &&  '7 |' && '100 Views', 'videoStats');
      expect(page.location.textContent).toContain('01-01-2016 | ven1 | city1, country1', 'location');
      expect(page.songsString.textContent).toContain('song1', 'songsString');
      expect(page.following.nativeElement.textContent).toContain('Follow', 'following');
      expect(page.favourited.nativeElement.textContent).toContain('Favourite', 'favourited');
    });

    it('toggle follow and favourite buttons when clicked', () => {
      click(page.following);
      click(page.favourited);
      fixture.detectChanges();
      expect(page.toggleFollowSpy.calls.any()).toBe(true, 'toggleFollow called');
      expect(page.toggleFavouriteSpy.calls.any()).toBe(true, 'toggleFavourite called');
      expect(page.following.nativeElement.textContent).toContain('Following', 'following');
      expect(page.favourited.nativeElement.textContent).toContain('Favourited', 'favourited');
    });

    it('set and display ratings correctly', () => {
      comp.audioRated = true;
      comp.audioRating = '10';
      comp.videoRated = true;
      comp.videoRating = '10';
      fixture.detectChanges();
      const rating = fixture.debugElement.queryAll(By.css('#video-rated h5'));
      page.audioRating = rating[0].nativeElement;
      page.videoRating = rating[1].nativeElement;
      expect(page.audioRating.textContent).toContain('Audio' && ': 10', 'audioRating');
      expect(page.videoRating.textContent).toContain('Video' && ': 10', 'videoRating');
    });
  });
}

/////////// Helpers /////

/** Create the PlayerComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(PlayerComponent);
  comp    = fixture.componentInstance;
  page    = new Page();
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.addVideoElements();
  });
}

class Page {
  navSpy: jasmine.Spy;

  getShowDetailsSpy: jasmine.Spy;
  getVideoDetailsSpy: jasmine.Spy;
  getShowDetailsCompSpy: jasmine.Spy;
  getVideoDetailsCompSpy: jasmine.Spy;
  toggleFollowSpy: jasmine.Spy;
  toggleFavouriteSpy: jasmine.Spy;

  video: DebugElement;
  videoStats: HTMLElement;
  location: HTMLElement;
  songsString: HTMLElement;
  following: DebugElement;
  favourited: DebugElement;
  rateAudio: DebugElement;
  rateVideo: DebugElement;
  audioRating: HTMLElement;
  videoRating: HTMLElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const playerStub = compInjector.get(PlayerService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getShowDetailsSpy = spyOn(playerStub, 'getShowDetails').and.callThrough();
    this.getVideoDetailsSpy = spyOn(playerStub, 'getVideoDetails').and.callThrough();
    this.getShowDetailsCompSpy = spyOn(comp, 'getShowDetails').and.callThrough();
    this.getVideoDetailsCompSpy = spyOn(comp, 'getVideoDetails').and.callThrough();
    this.toggleFollowSpy = spyOn(comp, 'toggleFollow').and.callThrough();
    this.toggleFavouriteSpy = spyOn(comp, 'toggleFavourite').and.callThrough();
  }

  /** Add page elements after OnInit */
  addVideoElements() {
    if (comp.artistName) {
      this.video = fixture.debugElement.query(By.css('#video-player'));
      this.videoStats = fixture.debugElement.query(By.css('#video-stats h5')).nativeElement;
      this.location = fixture.debugElement.query(By.css('#video-location-label')).nativeElement;
      this.songsString = fixture.debugElement.query(By.css('#video-songs-list')).nativeElement;
      const followFav = fixture.debugElement.queryAll(By.css('#video-details button'));
      this.following = followFav[0];
      this.favourited = followFav[1];
      const rate = fixture.debugElement.queryAll(By.css('#video-ratings div'));
      this.rateAudio = rate[0];
      this.rateVideo = rate[1];
    }
  }
}
