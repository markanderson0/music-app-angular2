import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../../testing';

import { MyUploadsComponent } from './my-uploads.component';
import { MyUploadsService }   from './my-uploads.service';
import mocks = require('./my-uploads.mock');
import { UploadModule }          from '../upload.module';
import { GlobalState } from '../../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: MyUploadsComponent;
let fixture: ComponentFixture<MyUploadsComponent>;
let page: Page;

////// Tests //////
describe('MyUploadsComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided MyUploadsService', overrideSetup);
});

// ////////////////////
function overrideSetup() {
  class StubMyUploadsService {
    getVideos(): Observable<any[]> {
      return Observable.of(mocks.mockResponse);
    }

    getSwipeOptions() {}

    editVideoConfig(songs, videoId) {}
  }

  beforeEach(() => activatedRoute.testParams = { } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ UploadModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: { parent:  { params: [activatedRoute.testParams ] }  } },
        { provide: Router,         useClass: RouterStub},
        { provide: MyUploadsService, useValue: {} },
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(MyUploadsComponent, {
      set: {
        providers: [
          { provide: MyUploadsService, useClass: StubMyUploadsService }
        ]
      }
    });
  }));

  let uploadStub: StubMyUploadsService;

  describe('MyUploadsComponent should ', () => {

    beforeEach( async(() => {
      createComponent();
      uploadStub = fixture.debugElement.injector.get(MyUploadsService);
    }));

    it('fixture injected service is not the component injected service',
      inject([MyUploadsService], (service: MyUploadsService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(uploadStub).toBeTruthy('service injected into component');
    }));

    it('have called OnInit and initialized values', () => {
      expect(page.getVideosSpy.calls.any()).toBe(true, 'getVideos called');

      expect(page.artistName.textContent).toBe('artist1', 'artistName');

    });

    it('show videos when accordion is expanded', () => {
      const accordionHeaders = fixture.nativeElement.querySelectorAll('.card-header a');
      accordionHeaders[0].click();
      fixture.detectChanges();

      page.location = fixture.debugElement.query(By.css('.video-title')).nativeElement;
      page.videoPic = fixture.debugElement.query(By.css('.video-pic'));
      page.editLabel = fixture.debugElement.query(By.css('.video-tile span h5')).nativeElement;
      page.rating = fixture.debugElement.query(By.css('.video-rating span')).nativeElement;
      page.time = fixture.debugElement.query(By.css('.video-time')).nativeElement;
      page.views = fixture.debugElement.query(By.css('.video-views')).nativeElement;
      page.songsString = fixture.debugElement.query(By.css('.video-songs')).nativeElement;

      expect(page.location.textContent).toBe('01-01-2016 | ven1 | city1, country1', 'user');
      expect(page.videoPic.properties['src']).toBe('1.png', 'videoPic');
      expect(page.editLabel.textContent).toBe('Edit Video', 'editLabel');
      expect(page.rating.textContent).toContain(5 && 7, 'rating');
      expect(page.time.textContent).toContain('20:00', 'time');
      expect(page.views.textContent).toContain(100, 'views');
      expect(page.songsString.textContent).toContain('song1', 'songsString');
    });

    it('open configure edit video modal when video is clicked', () => {
      const accordionHeaders = fixture.nativeElement.querySelectorAll('.card-header a');
      accordionHeaders[0].click();
      fixture.detectChanges();

      page.video = fixture.debugElement.query(By.css('.video-tile')).nativeElement;

      click(page.video);
      expect(page.editVideoConfigSpy.calls.any()).toBe(true, 'editVideoConfig called');
    });
  });
}

/////////// Helpers /////

/** Create the MyUploadsComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(MyUploadsComponent);
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
  getVideosSpy: jasmine.Spy;
  editVideoConfigSpy: jasmine.Spy;

  video: DebugElement;
  videoSpan: DebugElement;
  videoPic: DebugElement;
  modalSongs: HTMLElement;

  artistName: HTMLElement;
  location: HTMLElement;
  tour: HTMLElement;
  editLabel: HTMLElement;
  rating: HTMLElement;
  time: HTMLElement;
  views: HTMLElement;
  songsString: HTMLElement;


  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const uploadStub = compInjector.get(MyUploadsService);
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.getVideosSpy = spyOn(uploadStub, 'getVideos').and.callThrough();
    this.editVideoConfigSpy = spyOn(comp, 'editVideoConfig').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    if (comp.videos) {
      this.artistName = fixture.debugElement.query(By.css('#accordion-header')).nativeElement;
    }
  }
}
