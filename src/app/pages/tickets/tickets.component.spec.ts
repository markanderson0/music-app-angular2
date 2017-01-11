import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../testing';

import { TicketsComponent } from './tickets.component';
import { TicketsNavigationService }   from './tickets-navigation.service';
import { TicketsModule }          from './tickets.module';
import { GlobalState } from '../../global.state';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: TicketsComponent;
let fixture: ComponentFixture<TicketsComponent>;
let page: Page;

////// Tests //////
describe('TicketsComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided TicketsNavigationService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubTicketsNavigationService {
    getTicketGenres() {
      return [{label: 'alt&indie', name: 'Alt / Indie', search: 'alt', genre: 'alternative', eventSearch: 'alternative rock'}];
    }
  }

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ TicketsModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router,         useClass: RouterStub},
        { provide: TicketsNavigationService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(TicketsComponent, {
      set: {
        providers: [
          { provide: TicketsNavigationService, useClass: StubTicketsNavigationService }
        ]
      }
    });
  }));

  let ticketsStub: StubTicketsNavigationService;

  describe('TicketsComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      ticketsStub = fixture.debugElement.injector.get(TicketsNavigationService);
    }));

    it('fixture injected service is not the component injected service',
      inject([TicketsNavigationService], (service: TicketsNavigationService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(ticketsStub).toBeTruthy('service injected into component');
    }));

    it('have initialized values', () => {
      expect(page.genreLabel.textContent).toBe('Alt / Indie', 'categoryLabel');
    });

    it('search when search button is pressed', () => {
      click(page.searchBtn);
      expect(page.searchSpy.calls.any()).toBe(true, 'search called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('open top Tickets page when heading is clicked', () => {
      click(page.genreBtn);
      expect(page.openTicketGenreSpy.calls.any()).toBe(true, 'openTicketGenre called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('open Tickets category when category button is pressed', () => {
      click(page.ticketsTitle);
      expect(page.openTopTicketsSpy.calls.any()).toBe(true, 'openTopTickets called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });
  });
}

/////////// Helpers /////

/** Create the TicketsComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(TicketsComponent);
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
  getTicketGenresSpy: jasmine.Spy;
  searchSpy: jasmine.Spy;
  openTopTicketsSpy: jasmine.Spy;
  openTicketGenreSpy: jasmine.Spy;

  searchBtn: DebugElement;
  ticketsTitle: DebugElement;
  genreBtn: DebugElement;
  genreLabel: HTMLElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const ticketsStub = compInjector.get(TicketsNavigationService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getTicketGenresSpy = spyOn(ticketsStub, 'getTicketGenres').and.callThrough();
    this.searchSpy = spyOn(comp, 'search').and.callThrough();
    this.openTopTicketsSpy = spyOn(comp, 'openTopTickets').and.callThrough();
    this.openTicketGenreSpy = spyOn(comp, 'openTicketGenre').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    if (comp.genres) {
      this.searchBtn = fixture.debugElement.query(By.css('#search-btn'));
      this.genreBtn = fixture.debugElement.query(By.css('.genre-btn'));
      this.genreLabel = fixture.debugElement.query(By.css('.genre-btn')).nativeElement;
      this.ticketsTitle = fixture.debugElement.query(By.css('.col-sm-6 a'));
    }
  }
}
