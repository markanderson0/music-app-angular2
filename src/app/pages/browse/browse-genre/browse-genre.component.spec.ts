import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../testing';

import { BrowseGenreComponent } from './browse-genre.component';
import { BrowseGenreService }   from './browse-genre.service';
import { BrowseModule }          from '../browse.module';
import { GlobalState } from '../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: BrowseGenreComponent;
let fixture: ComponentFixture<BrowseGenreComponent>;
let page: Page;

////// Tests //////
describe('BrowseGenreComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided BrowseGenreService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubBrowseGenreService {
    genre = 'rock';
    artists = [{name: 'artist1', id: '1', pic: '1.jpg'}, {name: 'artist2', id: '2', pic: '2.jpg'}];

    getGenrePlaylist(genre): Observable<any[]>  {
      return Observable.of([]).do(() => Object.assign({}, this.artists));
    }
  }

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ BrowseModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router,         useClass: RouterStub},
        { provide: BrowseGenreService, useValue: {} }
      ]
    })

    // Override component's own provider
    .overrideComponent(BrowseGenreComponent, {
      set: {
        providers: [
          { provide: BrowseGenreService, useClass: StubBrowseGenreService }
        ]
      }
    })

    .compileComponents();
  }));

  let browseStub: StubBrowseGenreService;

  describe('when navigate to genre page', () => {
    let expectedGenre = 'rock';

    beforeEach( async(() => {
      activatedRoute.testParams = { genre: expectedGenre };
      createComponent();
      browseStub = fixture.debugElement.injector.get(BrowseGenreService);
    }));

    it('fixture injected service is not the component injected service',
      inject([BrowseGenreService], (service: BrowseGenreService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(browseStub).toBeTruthy('service injected into component');
    }));

    it('should display stub hero\'s name', () => {
      expect(page.genreLabel.textContent).toBe(browseStub.genre);
    });

    it('should display the genre\'s name', () => {
      expect(page.genreLabel.textContent).toBe(expectedGenre);
    });

    it('should navigate when click browse', () => {
      click(page.homeLabel);
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('should load when click save but not navigate', () => {
      click(page.loadBtn);
      expect(page.loadSpy.calls.any()).toBe(true, 'BrowseGenreService.load called');
      expect(page.navSpy.calls.any()).toBe(false, 'router.navigate not called');
    });

    it('should navigate when click artist', () => {
      click(page.artistDiv);
      expect(page.navSpy.calls.any()).toBe(false, 'router.navigate called');
    });

  });
}

/////////// Helpers /////

/** Create the BrowseGenreComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(BrowseGenreComponent);
  comp    = fixture.componentInstance;
  page    = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.addPageElements();
  });
}

class Page {
  loadSpy: jasmine.Spy;
  navSpy: jasmine.Spy;
  saveSpy: jasmine.Spy;

  loadBtn: DebugElement;
  homeLabel: DebugElement;
  artistDiv: DebugElement;

  artistLabel:  HTMLElement;
  genreLabel:    HTMLElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const browseStub = compInjector.get(BrowseGenreService);
    const router = compInjector.get(Router);

    this.loadSpy       = spyOn(comp, 'getMoreArtists').and.callThrough();
    this.navSpy        = spyOn(router, 'navigate');
  }

  /** Add page elements after hero arrives */
  addPageElements() {
    const buttons    = fixture.debugElement.queryAll(By.css('button'));
    this.loadBtn     = buttons[0];
    const label = fixture.debugElement.queryAll(By.css('label'));
    this.homeLabel = label[0];
    this.genreLabel   = label[2].nativeElement;
    this.artistDiv = fixture.debugElement.children[1].children[0].children[0].children[1];
  }
}
