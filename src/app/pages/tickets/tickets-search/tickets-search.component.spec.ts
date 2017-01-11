import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../testing';

import { TicketsSearchComponent } from './tickets-search.component';
import { TicketsSearchService }   from './tickets-search.service';
import mocks = require('./tickets-search.mock');
import { TicketsModule }          from '../tickets.module';
import { GlobalState } from '../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: TicketsSearchComponent;
let fixture: ComponentFixture<TicketsSearchComponent>;
let page: Page;

////// Tests //////
describe('TicketsSearchComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided TicketsSearchService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubTicketsSearchService {
    searchEvents(search): Observable<any[]> {
      return Observable.of(mocks.mockResponse);
    }

    simpleSearchEvents(search): Observable<any[]>  {
      return Observable.of(mocks.mockSimpleResponse);
    }
  }

  beforeEach(() => activatedRoute.testParams = { artist: 'artist1' } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ TicketsModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: { params: [ activatedRoute.testParams ] } },
        { provide: Router,         useClass: RouterStub},
        { provide: TicketsSearchService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(TicketsSearchComponent, {
      set: {
        providers: [
          { provide: TicketsSearchService, useClass: StubTicketsSearchService }
        ]
      }
    });
  }));

  let ticketsStub: StubTicketsSearchService;

  describe('TicketsSearchComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
     ticketsStub = fixture.debugElement.injector.get(TicketsSearchService);
    }));

    it('fixture injected service is not the component injected service',
      inject([TicketsSearchService], (service: TicketsSearchService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(ticketsStub).toBeTruthy('TicketsSearchService injected into component');
    }));

    it('have called OnInit and initialized TicketsSearch values', () => {
      expect(page.searchEventsSpy.calls.any()).toBe(true, 'searchEvents called');
      expect(page.searchLabel.textContent).toBe('artist1 Tickets', 'searchLabel');
      expect(page.artistName.textContent).toBe('artist1', 'artistTableName');
      expect(page.ticketVenue.textContent).toContain('ven1' && 'city1, s1 US', 'ticketVenue');
      expect(page.ticketDate.textContent).toBe('2016-01-01', 'ticketDate');
    });

    // it('open tickets page when get tickets button is pressed', () => {
    //   click(page.getTicketBtn);
    //   expect(page.openLinkSpy.calls.any()).toBe(true, 'openLink called');
    // });

    it('open show map when map view button is pressed', () => {
      click(page.openMapBtn);
      expect(page.openMapSpy.calls.any()).toBe(true, 'openMap called');
    });

    it('open show list when list view button is pressed', () => {
      click(page.openListBtn);
      expect(page.openListSpy.calls.any()).toBe(true, 'openList called');
    });
  });
}
/////////// Helpers /////

/** Create the TicketsSearchComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(TicketsSearchComponent);
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

  // Merch
  searchEventsSpy: jasmine.Spy;
  openMapSpy: jasmine.Spy;
  openListSpy: jasmine.Spy;
  setMarkersSpy: jasmine.Spy;
  openLinkSpy: jasmine.Spy;

  searchLabel: HTMLElement;
  openListBtn: DebugElement;
  openMapBtn: DebugElement;
  artistName: HTMLElement;
  ticketVenue: HTMLElement;
  ticketDate: HTMLElement;
  getTicketBtn: DebugElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const ticketsStub = compInjector.get(TicketsSearchService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.searchEventsSpy = spyOn(ticketsStub, 'searchEvents').and.callThrough();
    this.openMapSpy = spyOn(comp, 'openMap').and.callThrough();
    this.openListSpy = spyOn(comp, 'openList').and.callThrough();
    this.setMarkersSpy = spyOn(comp, 'setMarkers').and.callThrough();
    this.openLinkSpy = spyOn(comp, 'openLink').and.callThrough();
  }

  addPageElements() {
    if (comp.tickets) {
      this.searchLabel = fixture.debugElement.query(By.css('.search-label')).nativeElement;
      this.openListBtn = fixture.debugElement.query(By.css('#open-list'));
      this.openMapBtn = fixture.debugElement.query(By.css('#open-map'));
      this.artistName = fixture.debugElement.query(By.css('#name-data')).nativeElement;
      this.ticketVenue = fixture.debugElement.query(By.css('#venue-data')).nativeElement;
      this.ticketDate = fixture.debugElement.query(By.css('#date-data')).nativeElement;
      this.getTicketBtn = fixture.debugElement.query(By.css('#ticket-data button'));
    }
  }
}
