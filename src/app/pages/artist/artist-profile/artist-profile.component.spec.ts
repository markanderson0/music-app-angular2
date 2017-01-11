import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../testing';

import { ArtistProfileComponent } from './artist-profile.component';
import { ArtistProfileService }   from './artist-profile.service';
import mocks = require('./artist-profile.mock');
import ticketsMocks = require('../../tickets/tickets-search/tickets-search.mock');
import merchMocks = require('../../merch/merch-list/merch-list.mock');
import albumsMocks = require('../artist-albums/artist-albums.mock');
import showsMocks = require('../artist-shows/artist-shows.mock');
import { ArtistModule }          from '../artist.module';
import { GlobalState } from '../../../global.state';

import { Observable } from 'rxjs/Observable';

import { TicketsSearchService } from '../../tickets/tickets-search/tickets-search.service';
import { MerchListService } from '../../merch/merch-list/merch-list.service';
import { ArtistAlbumsService } from '../artist-albums/artist-albums.service';
import { ArtistShowsService } from '../artist-shows/artist-shows.service';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: ArtistProfileComponent;
let fixture: ComponentFixture<ArtistProfileComponent>;
let page: Page;

////// Tests //////
describe('ArtistProfileComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided ArtistProfileService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubArtistProfileService {
    getVideos(artistName): Observable<any[]> {
      return Observable.of(mocks.mockResponse);
    }
  }

  class StubTicketsSearchService {
    hasTickets: boolean = true;
    displayTickets: any[] = ticketsMocks.mockSimpleResponse;

    simpleSearchEvents(artistName): Observable<any[]> {
      return Observable.of(ticketsMocks.mockSimpleResponse);
    }
  }

  class StubMerchListService {
    hasMerch: boolean = true;
    displayMerch: any[] = merchMocks.mockResponse;

    getMerch(name, id, pageNum, sort, merch): Promise<any[]> {
      return Promise.resolve(merchMocks.mockResponse);
    }
  }

  class StubArtistAlbumsService {
    hasAlbums: boolean = true;
    displayAlbums: any[] = albumsMocks.mockArtistAlbumsResponse;

    getArtistPicture(artistName): Observable<any[]> {
      return Observable.of(albumsMocks.mockArtistPictureResponse);
    }

    getArtistAlbums(artistName): Observable<any[]> {
      return Observable.of(albumsMocks.mockArtistAlbumsResponse);
    }
  }

    class StubArtistShowsService {
    hasShows: boolean = true;
    displayShows: any[] = showsMocks.mockArtistShowsResponse;

    getName(artistName): Observable<any> {
      return Observable.of(showsMocks.mockNameResponse);
    }

    getArtist(artistName): Observable<any> {
      return Observable.of(showsMocks.mockArtistResponse);
    }

    getArtistShows(mbid, pageNum): Observable<any[]> {
      return Observable.of(showsMocks.mockArtistShowsResponse);
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
        { provide: ArtistProfileService, useValue: {} },
        { provide: TicketsSearchService, useValue: {} },
        { provide: MerchListService, useValue: {} },
        { provide: ArtistAlbumsService, useValue: {} },
        { provide: ArtistShowsService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(ArtistProfileComponent, {
      set: {
        providers: [
          { provide: ArtistProfileService, useClass: StubArtistProfileService },
          { provide: TicketsSearchService, useClass: StubTicketsSearchService },
          { provide: MerchListService, useClass: StubMerchListService },
          { provide: ArtistAlbumsService, useClass: StubArtistAlbumsService },
          { provide: ArtistShowsService, useClass: StubArtistShowsService },
        ]
      }
    });
  }));

  let profileStub: StubArtistProfileService;
  let ticketsStub: StubTicketsSearchService;
  let merchStub: StubMerchListService;
  let showsStub: StubArtistShowsService;
  let albumsStub: StubArtistAlbumsService;

  describe('ArtistProfileComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      profileStub = fixture.debugElement.injector.get(ArtistProfileService);
      ticketsStub = fixture.debugElement.injector.get(TicketsSearchService);
      merchStub = fixture.debugElement.injector.get(MerchListService);
      showsStub = fixture.debugElement.injector.get(ArtistShowsService);
      albumsStub = fixture.debugElement.injector.get(ArtistAlbumsService);
    }));

    it('fixture injected service is not the component injected service',
      inject([ArtistProfileService], (service: ArtistProfileService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(profileStub).toBeTruthy('ArtistProfileService injected into component');
      expect(ticketsStub).toBeTruthy('TicketsSearchService injected into component');
      expect(merchStub).toBeTruthy('MerchListService injected into component');
      expect(showsStub).toBeTruthy('ArtistShowsService injected into component');
      expect(albumsStub).toBeTruthy('StubArtistAlbumsService injected into component');
    }));

    it('have called OnInit and initialized TopVideos values', () => {
      expect(page.getVideosSpy.calls.any()).toBe(true, 'getVideos called');

      expect(page.location.textContent).toContain('01-01-2016' && 'ven1' && 'city1, country1', 'location');
      expect(page.user.textContent).toBe('Uploaded By testUser1', 'user');
      expect(page.videoPic.properties['src']).toBe('1.png', 'videoPic');
      expect(page.rating.textContent).toContain(5 && 7, 'rating');
      expect(page.time.textContent).toContain('20:00', 'time');
      expect(page.views.textContent).toContain(100, 'views');
      expect(page.songsString.textContent).toContain('song1', 'songsString');
    });

    it('have called OnInit and initialized Tickets values', () => {
      expect(page.simpleSearchEventsSpy.calls.any()).toBe(true, 'simpleSearchEvents called');

      expect(page.ticketsDate.textContent).toBe('2016-01-01', 'ticketsDate');
      expect(page.ticketsVenue.textContent).toContain('ven1' && 'city1, s1 US', 'ticketsVenue');
    });

    it('have called OnInit and initialized Merch values', () => {
      expect(page.getMerchSpy.calls.any()).toBe(true, 'getMerch called');

      expect(page.merchPic.properties['src']).toBe('artist1shirt.jpg', 'merchPic');
      expect(page.merchPrice.textContent).toBe('USD10.00', 'merchPrice');
      expect(page.merchName.textContent).toBe('artist1 shirt', 'merchName');
    });

    it('have called OnInit and initialized PreviousShows values', () => {
      expect(page.getNameSpy.calls.any()).toBe(true, 'getName called');
      expect(page.getArtistSpy.calls.any()).toBe(true, 'getArtist called');
      expect(page.getArtistShowsSpy.calls.any()).toBe(true, 'getArtistShows called');

      expect(page.showsVenue.textContent).toContain('ven1', 'venue');
      expect(page.showsCity.textContent).toBe('city1,  country1', 'city');
      expect(page.showsDate.textContent).toContain('01-01-2016', 'date');
    });

    it('have called OnInit and initialized Albums values', () => {
      expect(page.getArtistPictureSpy.calls.any()).toBe(true, 'getArtistPicture called');
      expect(page.getArtistAlbumsSpy.calls.any()).toBe(true, 'getArtistAlbums called');

      expect(page.albumCover.properties['src']).toBe('1album.jpg', 'albumCover');
      expect(page.albumName.textContent).toBe('1album', 'albumName');
    });

    it('navigate when click on video', () => {
      click(page.video);
      expect(page.openVideoSpy.calls.any()).toBe(true, 'openVideo called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('navigate when click more videos', () => {
      click(page.videosMore);
      expect(page.openVideosSpy.calls.any()).toBe(true, 'openVideos called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('navigate when click more tickets', () => {
      click(page.ticketsMore);
      expect(page.openTicketsSpy.calls.any()).toBe(true, 'openTickets called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('navigate when click more merch', () => {
      click(page.merchMore);
      expect(page.openMerchSpy.calls.any()).toBe(true, 'openMerch called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('navigate when click more shows', () => {
      click(page.showsMore);
      expect(page.openShowsSpy.calls.any()).toBe(true, 'openShows called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('navigate when click more albums', () => {
      click(page.albumsMore);
      expect(page.openAlbumsSpy.calls.any()).toBe(true, 'openAlbums called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

  });
}

/////////// Helpers /////

/** Create the ArtistProfileComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(ArtistProfileComponent);
  comp    = fixture.componentInstance;
  page    = new Page();
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.addTopVideoElements();
    page.addTicketsElements();
    page.addMerchElements();
    page.addPreviousShowsElements();
    page.addAlbumsElements();
  });
}

class Page {
  navSpy: jasmine.Spy;

  // TopVideos
  getVideosSpy: jasmine.Spy;
  openVideoSpy: jasmine.Spy;
  openVideosSpy: jasmine.Spy;

  video: DebugElement;
  videoPic: DebugElement;
  user: HTMLElement;
  location: HTMLElement;
  tour: HTMLElement;
  rating: HTMLElement;
  time: HTMLElement;
  views: HTMLElement;
  songsString: HTMLElement;
  videosMore: DebugElement;

  // TicketsSearch
  simpleSearchEventsSpy: jasmine.Spy;
  openTicketsSpy: jasmine.Spy;

  ticketsDate: HTMLElement;
  ticketsVenue: HTMLElement;
  ticketsMore: DebugElement;

  // Merch
  getMerchSpy: jasmine.Spy;
  openMerchSpy: jasmine.Spy;

  merchPic: DebugElement;
  merchPrice: HTMLElement;
  merchName: HTMLElement;
  merchMore: DebugElement;

  // PreviousShows
  getNameSpy: jasmine.Spy;
  getArtistSpy: jasmine.Spy;
  getArtistShowsSpy: jasmine.Spy;
  openShowsSpy: jasmine.Spy;

  showsVenue: HTMLElement;
  showsCity: HTMLElement;
  showsDate: HTMLElement;
  showsMore: DebugElement;

  // Albums
  getArtistPictureSpy: jasmine.Spy;
  getArtistAlbumsSpy: jasmine.Spy;
  openAlbumsSpy: jasmine.Spy;

  albumCover: DebugElement;
  albumName: HTMLElement;
  albumsMore: DebugElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const profileStub = compInjector.get(ArtistProfileService);
    const ticketsStub = compInjector.get(TicketsSearchService);
    const merchStub = compInjector.get(MerchListService);
    const showsStub = compInjector.get(ArtistShowsService);
    const albumsStub = compInjector.get(ArtistAlbumsService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getVideosSpy = spyOn(profileStub, 'getVideos').and.callThrough();
    this.openVideoSpy = spyOn(comp, 'openVideo').and.callThrough();
    this.openVideosSpy = spyOn(comp, 'openVideos').and.callThrough();

    this.simpleSearchEventsSpy = spyOn(ticketsStub, 'simpleSearchEvents').and.callThrough();
    this.openTicketsSpy = spyOn(comp, 'openTickets').and.callThrough();

    this.getMerchSpy = spyOn(merchStub, 'getMerch').and.callThrough();
    this.openMerchSpy = spyOn(comp, 'openMerch').and.callThrough();

    this.getNameSpy = spyOn(showsStub, 'getName').and.callThrough();
    this.getArtistSpy = spyOn(showsStub, 'getArtist').and.callThrough();
    this.getArtistShowsSpy = spyOn(showsStub, 'getArtistShows').and.callThrough();
    this.openShowsSpy = spyOn(comp, 'openShows').and.callThrough();

    this.getArtistPictureSpy = spyOn(albumsStub, 'getArtistPicture').and.callThrough();
    this.getArtistAlbumsSpy = spyOn(albumsStub, 'getArtistAlbums').and.callThrough();
    this.openAlbumsSpy = spyOn(comp, 'openAlbums').and.callThrough();

  }

  /** Add page elements after OnInit */
  addTopVideoElements() {
    if (comp.artistName) {
      this.video = fixture.debugElement.query(By.css('#top-video-tile span'));
      this.location = fixture.debugElement.query(By.css('#top-video-tile span')).nativeElement;
      this.user = fixture.debugElement.query(By.css('#top-video-tile label')).nativeElement;
      this.videoPic = fixture.debugElement.query(By.css('.video-pic'));
      this.rating = fixture.debugElement.query(By.css('#top-video-rating span')).nativeElement;
      this.time = fixture.debugElement.query(By.css('#top-video-time')).nativeElement;
      this.views = fixture.debugElement.query(By.css('#top-video-views')).nativeElement;
      this.songsString = fixture.debugElement.query(By.css('#top-video-songs')).nativeElement;
      this.videosMore = fixture.debugElement.query(By.css('#more-videos'));
    }
  }

  addTicketsElements(){
    if (comp.artistName) {
      this.ticketsDate = fixture.debugElement.query(By.css('#tickets .table-data .date-data')).nativeElement;
      this.ticketsVenue = fixture.debugElement.query(By.css('#tickets .table-data .venue-data')).nativeElement;
      this.ticketsMore = fixture.debugElement.query(By.css('#more-tickets'));
    }
  }

  addMerchElements() {
    if (comp.artistName) {
      this.merchPic = fixture.debugElement.query(By.css('.artist-merch-div div img'));
      this.merchPrice = fixture.debugElement.query(By.css('.artist-merch-div div h4')).nativeElement;
      this.merchName = fixture.debugElement.query(By.css('.artist-merch-div div h6')).nativeElement;
      this.merchMore = fixture.debugElement.query(By.css('#more-merch'));
    }
  }

  addPreviousShowsElements() {
    if (comp.artistName) {
      this.showsVenue = fixture.debugElement.query(By.css('#previous-shows .table-data .venue-data')).nativeElement;
      this.showsCity = fixture.debugElement.query(By.css('#previous-shows .table-data .city-data')).nativeElement;
      this.showsDate = fixture.debugElement.query(By.css('#previous-shows .table-data .date-data')).nativeElement;
      this.showsMore = fixture.debugElement.query(By.css('#more-shows'));
    }
  }

  addAlbumsElements() {
    if (comp.artistName) {
      this.albumCover = fixture.debugElement.query(By.css('.artist-album-div div img'));
      this.albumName = fixture.debugElement.query(By.css('.artist-album-div div h6')).nativeElement;
      this.albumsMore = fixture.debugElement.query(By.css('#more-albums'));
    }
  }
}
