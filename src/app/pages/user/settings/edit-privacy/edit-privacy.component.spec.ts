import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../../testing';

import { EditPrivacyComponent } from './edit-privacy.component';
import { SettingsModule }          from '../settings.module';
import { GlobalState } from '../../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: EditPrivacyComponent;
let fixture: ComponentFixture<EditPrivacyComponent>;
let page: Page;

////// Tests //////
describe('EditPrivacyComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided EditPrivacyService', overrideSetup);
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
    .overrideComponent(EditPrivacyComponent, {
      set: {
        providers: [

        ]
      }
    });
  }));

  describe('EditPrivacyComponent should ', () => {

    beforeEach( async(() => {
      createComponent();

    }));

    it('have called OnInit and initialized values', () => {
      expect(page.privacy1.checked).toBe(comp.follow, 'privacy1');
      expect(page.privacy2.checked).toBe(comp.favourited, 'privacy2');
      expect(page.privacy3.checked).toBe(comp.score, 'privacy3');
      expect(page.privacy4.checked).toBe(comp.ratings, 'privacy4');
    });

    it('call submit() when submit button is pressed', () => {
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
    });
  });
}

/////////// Helpers /////

/** Create the EditPrivacyComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(EditPrivacyComponent);
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

  privacy1: HTMLInputElement;
  privacy2: HTMLInputElement;
  privacy3: HTMLInputElement;
  privacy4: HTMLInputElement;
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
    this.privacy1 = checkBox[0].nativeElement;
    this.privacy2 = checkBox[1].nativeElement;
    this.privacy3 = checkBox[2].nativeElement;
    this.privacy4 = checkBox[3].nativeElement;
    this.submitBtn = fixture.debugElement.query(By.css('.save-profile'));
  }
}
