import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../testing';

import { TopTicketsComponent } from './top-tickets.component';
import { TicketsGenreService }   from '../tickets-genre/tickets-genre.service';
import mocks = require('../tickets-genre/tickets-genre.mock');
import { TicketsModule }          from '../tickets.module';
import { GlobalState } from '../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: TopTicketsComponent;
let fixture: ComponentFixture<TopTicketsComponent>;
let page: Page;

////// Tests //////
describe('TopTicketsComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided TicketsGenreService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubTicketsGenreService {
    getTickets(genre): Observable<any[]> {
      return Observable.of(mocks.mockResponse);
    }
  }

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ TicketsModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router,         useClass: RouterStub},
        { provide: TicketsGenreService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(TopTicketsComponent, {
      set: {
        providers: [
          { provide: TicketsGenreService, useClass: StubTicketsGenreService }
        ]
      }
    });
  }));

  let topTicketsStub: StubTicketsGenreService;

  describe('TopTicketsComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      topTicketsStub = fixture.debugElement.injector.get(TicketsGenreService);
    }));

    it('fixture injected service is not the component injected service',
      inject([TicketsGenreService], (service: TicketsGenreService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(topTicketsStub).toBeTruthy('service injected into component');
    }));

    it('have initialized values', () => {
      expect(page.getTicketsSpy.calls.any()).toBe(true, 'getTickets called');
      expect(page.artistPic.properties['src']).toBe('1.jpg', 'artistPic');
      expect(page.artistLabel.textContent).toBe('artist1', 'artistLabel');
    });

    it('open Tickets category when category button is pressed', () => {
      click(page.artistTile);
      expect(page.openArtistTicketsSpy.calls.any()).toBe(true, 'openArtistTickets called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });
  });
}

/////////// Helpers /////

/** Create the TopTicketsComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(TopTicketsComponent);
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
  getTicketsSpy: jasmine.Spy;
  openArtistTicketsSpy: jasmine.Spy;

  artistPic: DebugElement;
  artistLabel: HTMLElement;
  artistTile: DebugElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const topTicketsStub = compInjector.get(TicketsGenreService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getTicketsSpy = spyOn(topTicketsStub, 'getTickets').and.callThrough();
    this.openArtistTicketsSpy = spyOn(comp, 'openArtistTickets').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    if (comp.topEvents) {
      this.artistPic = fixture.debugElement.query(By.css('.event-tile'));
      this.artistLabel = fixture.debugElement.query(By.css('.event-name')).nativeElement;
      this.artistTile = fixture.debugElement.query(By.css('.top-events div'));
    }
  }
}
