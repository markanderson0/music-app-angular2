import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../testing';

import { TicketsGenreComponent } from './tickets-genre.component';
import { TicketsGenreService }   from './tickets-genre.service';
import { TicketsNavigationService }   from '../tickets-navigation.service';
import mocks = require('./tickets-genre.mock');
import { TicketsModule }          from '../tickets.module';
import { GlobalState } from '../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: TicketsGenreComponent;
let fixture: ComponentFixture<TicketsGenreComponent>;
let page: Page;

////// Tests //////
describe('TicketsGenreComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided TicketsGenreService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubTicketsGenreService {
    loadMore: boolean = true;

    getTickets(genre): Observable<any[]> {
      return Observable.of(mocks.mockResponse);
    }

    getGenreTickets(val, pageNum, genreItems): Promise<any[]> {
      return Promise.resolve(mocks.mockGenreResponse);
    }

    getMoreResults(genreItems) {
      return this.getGenreTickets('', 2, genreItems);
    }
  }

  beforeEach(() => activatedRoute.testParams = { genre: 'alt&indie' } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ TicketsModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: { params: [ activatedRoute.testParams ] } },
        { provide: Router,         useClass: RouterStub},
        { provide: TicketsGenreService, useValue: {} },
        TicketsNavigationService,
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(TicketsGenreComponent, {
      set: {
        providers: [
          { provide: TicketsGenreService, useClass: StubTicketsGenreService }
        ]
      }
    });
  }));

  let ticketsStub: StubTicketsGenreService;

  describe('TicketsGenreComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      ticketsStub = fixture.debugElement.injector.get(TicketsGenreService);
    }));

    it('fixture injected service is not the component injected service',
      inject([TicketsGenreService], (service: TicketsGenreService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(ticketsStub).toBeTruthy('TicketsGenreService injected into component');
    }));

    it('have called OnInit and initialized ticket values', () => {
      expect(page.getTicketsSpy.calls.any()).toBe(true, 'getTickets called');
      expect(page.artistPic.properties['src']).toBe('1.jpg', 'artistPic');
      expect(page.artistLabel.textContent).toBe('artist1', 'artistLabel');
      expect(page.artistTableName.textContent).toBe('artist3', 'artistTableName');
    });

    it('navigate to artist when click find tickets button', () => {
      click(page.findTicketsBtn);
      expect(page.openArtistTicketsSpy.calls.any()).toBe(true, 'openArtistTickets called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('load more tickets when click load more tickets button', () => {
      click(page.loadMoreBtn);
      expect(page.getMoreResultsSpy.calls.any()).toBe(true, 'getMoreResults called');
    });
  });
}

/////////// Helpers /////

/** Create the TicketsGenreComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(TicketsGenreComponent);
  comp    = fixture.componentInstance;
  page    = new Page();
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.addMerchElements();
  });
}

class Page {
  navSpy: jasmine.Spy;

  // Merch
  getMerchSpy: jasmine.Spy;
  getTicketsSpy: jasmine.Spy;
  openArtistTicketsSpy: jasmine.Spy;
  getMoreResultsSpy: jasmine.Spy;

  artistPic: DebugElement;
  artistLabel: HTMLElement;
  artistTile: DebugElement;
  artistTableName: HTMLElement;
  findTicketsBtn: DebugElement;
  loadMoreBtn: DebugElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const ticketsStub = compInjector.get(TicketsGenreService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getTicketsSpy = spyOn(ticketsStub, 'getTickets').and.callThrough();
    this.openArtistTicketsSpy = spyOn(comp, 'openArtistTickets').and.callThrough();
    this.getMoreResultsSpy = spyOn(comp, 'getMoreResults').and.callThrough();
  }

  addMerchElements() {
    if (comp.topEvents) {
      this.artistPic = fixture.debugElement.query(By.css('.event-tile'));
      this.artistLabel = fixture.debugElement.query(By.css('.event-name')).nativeElement;
      this.artistTile = fixture.debugElement.query(By.css('.top-events div'));
      this.artistTableName = fixture.debugElement.query(By.css('#ticket-cat-artist')).nativeElement;
      this.findTicketsBtn = fixture.debugElement.query(By.css('#ticket-cat-find button'));
      this.loadMoreBtn = fixture.debugElement.query(By.css('#load-button'));
    }
  }
}
