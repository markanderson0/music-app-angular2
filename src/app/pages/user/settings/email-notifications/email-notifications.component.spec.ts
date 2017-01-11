import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../../testing';

import { EmailNotificationsComponent } from './email-notifications.component';
import { SettingsModule }          from '../settings.module';
import { GlobalState } from '../../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: EmailNotificationsComponent;
let fixture: ComponentFixture<EmailNotificationsComponent>;
let page: Page;

////// Tests //////
describe('EmailNotificationsComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided EmailNotificationsService', overrideSetup);
});

// ////////////////////
function overrideSetup() {

  beforeEach(() => activatedRoute.testParams = { } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ SettingsModule ],
      providers: [
        GlobalState,
        { provide: ActivatedRoute, useValue: { params: [activatedRoute.testParams ] } },
        { provide: Router,         useClass: RouterStub},
        RouterOutletMap
      ]
    })

    // Override component's own provider
    .overrideComponent(EmailNotificationsComponent, {
      set: {
        providers: [

        ]
      }
    });
  }));

  describe('EmailNotificationsComponent should ', () => {

    beforeEach( async(() => {
      createComponent();

    }));

    it('have called OnInit and initialized values', () => {
      expect(page.notification1.checked).toBe(comp.artistNews, 'notification1');
      expect(page.notification2.checked).toBe(comp.featuresUpdates, 'notification2');
    });

    it('call submit() when submit button is pressed', () => {
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
    });
  });
}

/////////// Helpers /////

/** Create the EmailNotificationsComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(EmailNotificationsComponent);
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
  submitSpy: jasmine.Spy;

  notification1: HTMLInputElement;
  notification2: HTMLInputElement;
  submitBtn: DebugElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');

    this.submitSpy = spyOn(comp, 'submit').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    const checkBox = fixture.debugElement.queryAll(By.css('input'));
    this.notification1 = checkBox[0].nativeElement;
    this.notification2 = checkBox[1].nativeElement;
    this.submitBtn = fixture.debugElement.query(By.css('.save-profile'));
  }
}
