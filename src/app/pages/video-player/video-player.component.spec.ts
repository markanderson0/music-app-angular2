// import {
//   async, ComponentFixture, fakeAsync, inject, TestBed, tick
// } from '@angular/core/testing';

// import { By }           from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { RouterOutletMap } from '@angular/router';

// import {
//   ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
// } from '../../../testing';

// import { VideoPlayerComponent } from './video-player.component';
// import { SearchService }   from '../search/search.service';
// import { ArtistShowsService } from '../artist/artist-shows/artist-shows.service';
// import { VideoPlayerModule }          from './video-player.module';
// import { GlobalState } from '../../global.state';

// import { Observable } from 'rxjs/Observable';

// ////// Testing Vars //////
// let activatedRoute: ActivatedRouteStub;
// let comp: VideoPlayerComponent;
// let fixture: ComponentFixture<VideoPlayerComponent>;
// let page: Page;

// ////// Tests //////
// describe('VideoPlayerComponent', () => {
//   beforeEach(() => {
//     activatedRoute = new ActivatedRouteStub();
//   });
//   describe('when override its provided SearchService', overrideSetup);
// });

// // ////////////////////
// function overrideSetup() {
//   class StubSearchService {
//     getShowDetails(showId, artistName): Observable<any[]> {
//       return Observable.of([{'name': 'artist1', 'image': '1.jpg'}]);
//     }
//   }

//   class StubArtistShowsService {
//   }

//   beforeEach(() => activatedRoute.testParams = { artist: 'artist1' } );

//   beforeEach( async(() => {
//     TestBed.configureTestingModule({
//       imports:   [ VideoPlayerModule ],
//       providers: [
//         GlobalState,
//         { provide: ActivatedRoute, useValue: {  params: [activatedRoute.testParams ] } },
//         { provide: Router,         useClass: RouterStub},
//         { provide: SearchService, useValue: {} },
//         { provide: ArtistShowsService, useValue: {} },
//         RouterOutletMap
//       ]
//     })

//     // Override component's own provider
//     .overrideComponent(VideoPlayerComponent, {
//       set: {
//         providers: [
//           { provide: SearchService, useClass: StubSearchService },
//           { provide: ArtistShowsService, useClass: StubArtistShowsService }
//         ]
//       }
//     });
//   }));

//   let searchStub: StubSearchService;
//   let showsStub: StubArtistShowsService;

//   describe('VideoPlayerComponent should ', () => {

//     beforeEach( async(() => {
//       createComponent();
//       searchStub = fixture.debugElement.injector.get(SearchService);
//       showsStub = fixture.debugElement.injector.get(ArtistShowsService);
//     }));

//     it('fixture injected service is not the component injected service',
//       inject([SearchService], (service: SearchService) => {

//       expect(service).toEqual({}, 'service injected from fixture');
//       expect(searchStub).toBeTruthy('SearchService injected into component');
//       expect(showsStub).toBeTruthy('SearchService injected into component');
//     }));

//     it('have called OnInit and initialized values', () => {
//       expect(page.searchArtistsSpy.calls.any()).toBe(true, 'searchArtists called');
//       expect(page.headerLabel.textContent).toContain('artist1');
//       expect(page.bannerPic.properties['src']).toBe('1.jpg');
//     });

//     it('navigate to the correct artist', () => {
//       comp.artistName = 'artist2';
//       click(page.headerLabel);
//       expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
//       expect(page.navSpy.calls.first().args[0][0]).toBe('artist/artist2/profile');
//       expect(page.openArtistProfileSpy.calls.any()).toBe(true, 'openArtistProfile called');
//     });

//   });
// }

// /////////// Helpers /////

// /** Create the VideoPlayerComponent, initialize it, set test variables  */
// function createComponent() {
//   fixture = TestBed.createComponent(VideoPlayerComponent);
//   comp    = fixture.componentInstance;
//   page    = new Page();
//   fixture.detectChanges();
//   return fixture.whenStable().then(() => {
//     fixture.detectChanges();
//     page.addVideoElements();
//   });
// }

// class Page {
//   navSpy: jasmine.Spy;
//   searchArtistsSpy: jasmine.Spy;
//   openArtistProfileSpy: jasmine.Spy;
//   bannerPic: DebugElement;
//   headerLabel: HTMLElement;
//   artistLabel: HTMLElement;
//   genreLabel: HTMLElement;


//   constructor() {
//     // Use component's injector to see the services it injected.
//     const compInjector = fixture.debugElement.injector;
//     const searchStub = compInjector.get(SearchService);
//     const showsStub = compInjector.get(ArtistShowsService);
//     const router = compInjector.get(Router);

//     this.navSpy = spyOn(router, 'navigate');
//     this.searchArtistsSpy = spyOn(searchStub, 'searchArtists').and.callThrough();
//     this.openArtistProfileSpy = spyOn(comp, 'openArtistProfile').and.callThrough();
//   }

//   /** Add page elements after OnInit */
//   addVideoElements() {
//     if (comp.artistName) {
//       this.bannerPic = fixture.debugElement.query(By.css('#artist-banner-pic'));
//       this.headerLabel = fixture.debugElement.query(By.css('.artist-header')).nativeElement;
//     }
//   }
// }
