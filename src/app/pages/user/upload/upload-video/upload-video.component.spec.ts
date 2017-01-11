import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../../testing';

import { UploadVideoComponent } from './upload-video.component';
import { UploadVideoService }   from './upload-video.service';
import mocks = require('./upload-video.mock');
import { UploadModule }          from '../upload.module';
import { GlobalState } from '../../../../global.state';

import { ArtistShowsService } from '../../../artist/artist-shows/artist-shows.service';
import artistMocks = require('../../../artist/artist-shows/artist-shows.mock');

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: UploadVideoComponent;
let fixture: ComponentFixture<UploadVideoComponent>;
let page: Page;

////// Tests //////
describe('UploadVideoComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided UploadVideoService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubUploadVideoService {
    songsList = 'song1';
    selectedSongs = [];

    getEvent(eventYear, mbid): Promise<any[]> {
      return Promise.resolve(mocks.mockEventResponse);
    }

    getSongs(eventId): Observable<any[]> {
      return Observable.of(mocks.mockSongsResponse);
    }

    clearSongsList() {}

    setSongsList(songsList) {
      this.songsList = songsList;
    }

    selectSong(title, index) {}
  }

  class StubArtistShowsService {
    getName(artistName): Observable<any> {
      return Observable.of(artistMocks.mockNameResponse);
    }

    getArtist(artistName): Observable<any> {
      return Observable.of(artistMocks.mockArtistResponse);
    }
  }

  beforeEach(() => activatedRoute.testParams = { } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ UploadModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: { params: [activatedRoute.testParams ] } },
        { provide: Router,         useClass: RouterStub},
        { provide: UploadVideoService, useValue: {} },
        { provide: ArtistShowsService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(UploadVideoComponent, {
      set: {
        providers: [
          { provide: UploadVideoService, useClass: StubUploadVideoService },
          { provide: ArtistShowsService, useClass: StubArtistShowsService }
        ]
      }
    });
  }));

  let uploadStub: StubUploadVideoService;
  let artistStub: StubArtistShowsService;

  describe('UploadVideoComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      uploadStub = fixture.debugElement.injector.get(UploadVideoService);
      artistStub = fixture.debugElement.injector.get(ArtistShowsService);
    }));

    it('fixture injected service is not the component injected service',
      inject([UploadVideoService], (service: UploadVideoService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(uploadStub).toBeTruthy('service injected into component');
      expect(artistStub).toBeTruthy('service injected into component');
    }));

    it('get selected songs when all data is entered correctly', fakeAsync(() => {
      page.artistName.value = 'artist1';
      page.artistName.dispatchEvent(newEvent('input'));
      fixture.detectChanges();

      expect(page.getNameSpy.calls.any()).toBe(true, 'getName called');
      expect(page.getArtistSpy.calls.any()).toBe(true, 'getArtist called');
      expect(comp.mbid).toBe('m123', 'mbid');

      page.eventYear.value = '2016';
      page.eventYear.dispatchEvent(newEvent('input'));

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(page.getEventCompSpy.calls.any()).toBe(true, 'getEventComp called');
      expect(page.getEventSpy.calls.any()).toBe(true, 'getEvent called');
      click(page.showSelect);

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      page.showsOption = fixture.debugElement.query(By.css('#shows'));
      expect(page.showsOption.nativeElement.textContent).toBe('01-01-2016, ven1', 'showsOption');
      comp.getSongs(page.showsOption.nativeElement.value);

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(page.getSongsSpy.calls.any()).toBe(true, 'getSongs called');
      page.songsOption = fixture.debugElement.query(By.css('#song'));
      expect(page.songsOption.nativeElement.textContent).toBe('song1', 'songsOption');
      comp.selectSong(page.songsOption.nativeElement.textContent, 0);

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(page.setSongsListSpy.calls.any()).toBe(true, 'setSongsList called');
      expect(page.selectSongSpy.calls.any()).toBe(true, 'selectSong called');
      expect(page.selectedSongs.textContent).toContain('song1', 'songsSelect');
    }));
  });
}

/////////// Helpers /////

/** Create the UploadVideoComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(UploadVideoComponent);
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
  getEventSpy: jasmine.Spy;
  getSongsSpy: jasmine.Spy;
  setSongsListSpy: jasmine.Spy;
  getNameSpy: jasmine.Spy;
  getArtistSpy: jasmine.Spy;
  artistChangeSpy: jasmine.Spy;
  getEventCompSpy: jasmine.Spy;
  getSongsCompSpy: jasmine.Spy;
  selectSongSpy: jasmine.Spy;
  clearSongsSpy: jasmine.Spy;
  submitSpy: jasmine.Spy;

  artistName: HTMLInputElement;
  eventYear: HTMLInputElement;
  showSelect: DebugElement;
  showsOption: DebugElement;
  songsSelect: DebugElement;
  songsOption: DebugElement;
  selectedSongs: HTMLElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const uploadStub = compInjector.get(UploadVideoService);
    const artistStub = compInjector.get(ArtistShowsService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getEventSpy = spyOn(uploadStub, 'getEvent').and.callThrough();
    this.getSongsSpy = spyOn(uploadStub, 'getSongs').and.callThrough();
    this.setSongsListSpy = spyOn(uploadStub, 'setSongsList').and.callThrough();
    this.getNameSpy = spyOn(artistStub, 'getName').and.callThrough();
    this.getArtistSpy = spyOn(artistStub, 'getArtist').and.callThrough();
    this.submitSpy = spyOn(comp, 'submit').and.callThrough();
    this.artistChangeSpy = spyOn(comp, 'artistChange').and.callThrough();
    this.getEventCompSpy = spyOn(comp, 'getEvent').and.callThrough();
    this.getSongsCompSpy = spyOn(comp, 'getSongs').and.callThrough();
    this.selectSongSpy = spyOn(comp, 'selectSong').and.callThrough();
    this.clearSongsSpy = spyOn(comp, 'clearSongs').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    this.artistName = fixture.debugElement.query(By.css('#artist div input')).nativeElement;
    this.eventYear = fixture.debugElement.query(By.css('#showYear div input')).nativeElement;
    this.showSelect = fixture.debugElement.query(By.css('#show div select'));
    this.songsSelect = fixture.debugElement.query(By.css('#songs div select'));
    this.selectedSongs = fixture.debugElement.query(By.css('#song-selection')).nativeElement;
  }
}
