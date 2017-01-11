import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../testing';

import { ArtistAlbumsComponent } from './artist-albums.component';
import { ArtistAlbumsService }   from './artist-albums.service';
import mocks = require('./artist-albums.mock');
import { ArtistModule }          from '../artist.module';
import { GlobalState } from '../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: ArtistAlbumsComponent;
let fixture: ComponentFixture<ArtistAlbumsComponent>;
let page: Page;

////// Tests //////
describe('ArtistAlbumsComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided ArtistAlbumsService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubArtistAlbumsService {
    getArtistPicture(name: string): Observable<any[]> {
      return Observable.of(mocks.mockArtistPictureResponse);
    }

    getArtistAlbums(newArtistId: string): Observable<any[]> {
      return Observable.of(mocks.mockArtistAlbumsResponse);
    }

    getAlbumTracks(albums): Observable<any[]> {
      return Observable.of(mocks.mockAlbumTracksResponse);
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
        { provide: ArtistAlbumsService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(ArtistAlbumsComponent, {
      set: {
        providers: [
          { provide: ArtistAlbumsService, useClass: StubArtistAlbumsService }
        ]
      }
    });
  }));

  let artistStub: StubArtistAlbumsService;

  describe('ArtistAlbumsComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      artistStub = fixture.debugElement.injector.get(ArtistAlbumsService);
    }));

    it('fixture injected service is not the component injected service',
      inject([ArtistAlbumsService], (service: ArtistAlbumsService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(artistStub).toBeTruthy('service injected into component');
    }));

    it('have called OnInit and initialized values', () => {
      expect(page.getArtistPictureSpy.calls.any()).toBe(true, 'getArtistPicture called');
      expect(page.getArtistAlbumsSpy.calls.any()).toBe(true, 'getArtistAlbums called');
      expect(page.getAlbumTracksSpy.calls.any()).toBe(true, 'getAlbumTracks called');
      expect(page.albumCover.properties['src']).toBe('1album.jpg', 'albumCover');
      expect(page.albumName.textContent).toBe('1album', 'albumName');
      expect(page.albumYear.textContent).toBe('2016', 'albumYear');
      expect(page.albumTrackNum.textContent).toBe('1.', 'albumTrackNum');
      expect(page.albumSong.textContent).toBe('song1', 'albumSong');
    });
  });
}

/////////// Helpers /////

/** Create the ArtistAlbumsComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(ArtistAlbumsComponent);
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
  getArtistPictureSpy: jasmine.Spy;
  getArtistAlbumsSpy: jasmine.Spy;
  getAlbumTracksSpy: jasmine.Spy;

  albumCover: DebugElement;
  albumName: HTMLElement;
  albumYear: HTMLElement;
  albumTrackNum: HTMLElement;
  albumSong: HTMLElement;


  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const artistStub = compInjector.get(ArtistAlbumsService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getArtistPictureSpy = spyOn(artistStub, 'getArtistPicture').and.callThrough();
    this.getArtistAlbumsSpy = spyOn(artistStub, 'getArtistAlbums').and.callThrough();
    this.getAlbumTracksSpy = spyOn(artistStub, 'getAlbumTracks').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    if (comp.artistName) {
      this.albumCover = fixture.debugElement.query(By.css('#artist-album-pic'));
      const albumLabels = fixture.debugElement.queryAll(By.css('.artist-album-name'));
      this.albumName = albumLabels[0].nativeElement;
      this.albumYear = albumLabels[1].nativeElement;
      const albumSongs = fixture.debugElement.queryAll(By.css('.artist-album-songs'));
      this.albumTrackNum = albumSongs[0].nativeElement;
      this.albumSong = albumSongs[1].nativeElement;
    }
  }
}
