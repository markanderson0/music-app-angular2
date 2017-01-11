import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../../testing';

import { FollowingComponent } from './following.component';
import { FollowingService }   from '../../following/following.service';
import mocks = require('../../following/following.mock');
import { ProfileModule }          from '../profile.module';
import { GlobalState } from '../../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: FollowingComponent;
let fixture: ComponentFixture<FollowingComponent>;
let page: Page;

////// Tests //////
describe('FollowingComponent (Profile)', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided FollowingService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubFollowingService {
    getFollowingArtists(): Observable<any[]> {
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
        { provide: FollowingService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(FollowingComponent, {
      set: {
        providers: [
          { provide: FollowingService, useClass: StubFollowingService }
        ]
      }
    });
  }));

  let followingStub: StubFollowingService;

  describe('FollowingComponent (Profile) should ', () => {

    beforeEach( async(() => {
      createComponent();
      followingStub = fixture.debugElement.injector.get(FollowingService);
    }));

    it('fixture injected service is not the component injected service',
      inject([FollowingService], (service: FollowingService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(followingStub).toBeTruthy('service injected into component');
    }));

    it('have called OnInit and initialized values', () => {
      expect(page.getFollowingArtistsSpy.calls.any()).toBe(true, 'getFollowingArtists called');

      expect(page.artistPic.properties['src']).toBe('1.jpg', 'videoPic');
      expect(page.artistName.textContent).toBe('artist1', 'user');
    });

    it('open artist profile when artist picture is clicked', () => {
      click(page.artistPic);
      expect(page.openArtistProfileSpy.calls.any()).toBe(true, 'openArtistProfile called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('open artist profile when profile link is clicked', () => {
      click(page.profileLink);
      expect(page.openArtistProfileSpy.calls.any()).toBe(true, 'openArtistProfile called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('open artist videos when videos link is clicked', () => {
      click(page.videosLink);
      expect(page.openArtistVideosSpy.calls.any()).toBe(true, 'openArtistVideos called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });
  });
}

/////////// Helpers /////

/** Create the FollowingComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(FollowingComponent);
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
  getFollowingArtistsSpy: jasmine.Spy;
  openArtistProfileSpy: jasmine.Spy;
  openArtistVideosSpy: jasmine.Spy;

  artistPic: DebugElement;
  artistName: HTMLElement;
  profileLink: DebugElement;
  videosLink: DebugElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const followingStub = compInjector.get(FollowingService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getFollowingArtistsSpy = spyOn(followingStub, 'getFollowingArtists').and.callThrough();
    this.openArtistProfileSpy = spyOn(comp, 'openArtistProfile').and.callThrough();
    this.openArtistVideosSpy = spyOn(comp, 'openArtistVideos').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    if (comp.artists) {
      this.artistName = fixture.debugElement.query(By.css('#following-name')).nativeElement;
      this.artistPic = fixture.debugElement.query(By.css('#following-image'));
      this.profileLink = fixture.debugElement.query(By.css('#follow-link-profile'));
      this.videosLink = fixture.debugElement.query(By.css('#follow-link-videos'));
    }
  }
}
