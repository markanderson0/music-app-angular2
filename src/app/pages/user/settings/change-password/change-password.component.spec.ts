import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../../testing';

import { ChangePasswordComponent } from './change-password.component';
import { SettingsModule }          from '../settings.module';
import { GlobalState } from '../../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: ChangePasswordComponent;
let fixture: ComponentFixture<ChangePasswordComponent>;
let page: Page;

////// Tests //////
describe('ChangePasswordComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided ChangePasswordService', overrideSetup);
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
    .overrideComponent(ChangePasswordComponent, {
      set: {
        providers: [

        ]
      }
    });
  }));

  describe('ChangePasswordComponent should ', () => {

    beforeEach( async(() => {
      createComponent();

    }));

    it('have called OnInit and initialized values', () => {
      expect(page.oldPassword.textContent).toBe('', 'oldPassword');
      expect(page.newPassword.textContent).toBe('', 'newPassword');
      expect(page.confirmPassword.textContent).toBe('', 'confirmPassword');
    });

    it('show no errors all passwords are valid and show errors when they are removed', () => {
      page.oldPassword.value = 'password';
      page.newPassword.value = 'password123';
      page.confirmPassword.value = 'password123';
      page.oldPassword.dispatchEvent(newEvent('input'));
      page.newPassword.dispatchEvent(newEvent('input'));
      page.confirmPassword.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      expect(fixture.debugElement.query(By.css('#old-password div .error-block'))).toBe(null, 'no errors');
      expect(fixture.debugElement.query(By.css('#new-password div .error-block'))).toBe(null, 'no errors');
      expect(fixture.debugElement.query(By.css('#confirm-password div .error-block'))).toBe(null, 'no errors');

      page.oldPassword.value = '';
      page.newPassword.value = '';
      page.confirmPassword.value = '';
      page.oldPassword.dispatchEvent(newEvent('input'));
      page.newPassword.dispatchEvent(newEvent('input'));
      page.confirmPassword.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      page.oldPasswordErrors = fixture.debugElement.query(By.css('#old-password div .error-block')).nativeElement;
      page.newPasswordErrors = fixture.debugElement.query(By.css('#new-password div .error-block')).nativeElement;
      page.confirmPasswordErrors = fixture.debugElement.query(By.css('#confirm-password div .error-block')).nativeElement;
      expect(page.oldPasswordErrors.textContent).toBe('Enter a Password.', 'errors');
      expect(page.newPasswordErrors.textContent).toBe('Enter a Password.', 'errors');
      expect(page.confirmPasswordErrors.textContent).toBe('Passwords don\'t match.', 'errors');
    });

    it('show errors when new and confirm passwords dont match and remove errors when the do match', () => {
      page.oldPassword.value = 'password';
      page.newPassword.value = 'password123';
      page.confirmPassword.value = 'password234';
      page.oldPassword.dispatchEvent(newEvent('input'));
      page.newPassword.dispatchEvent(newEvent('input'));
      page.confirmPassword.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      page.confirmPasswordErrors = fixture.debugElement.query(By.css('#confirm-password div .error-block')).nativeElement;
      expect(page.confirmPasswordErrors.textContent).toBe('Passwords don\'t match.', 'errors');

      page.oldPassword.value = 'password';
      page.newPassword.value = 'password123';
      page.confirmPassword.value = 'password123';
      page.oldPassword.dispatchEvent(newEvent('input'));
      page.newPassword.dispatchEvent(newEvent('input'));
      page.confirmPassword.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      expect(comp.submitted).toBe(true, 'submitted');
      const errors = fixture.debugElement.queryAll(By.css('.error-block'));
      expect(errors.length).toBe(0, 'no errors');
    });

    it('show errors when passwords are too short and remove errors when they fit the required length', () => {
      page.oldPassword.value = 'passw';
      page.newPassword.value = 'passw';
      page.confirmPassword.value = 'passw';
      page.oldPassword.dispatchEvent(newEvent('input'));
      page.newPassword.dispatchEvent(newEvent('input'));
      page.confirmPassword.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      page.oldPasswordErrors = fixture.debugElement.query(By.css('#old-password div .error-block')).nativeElement;
      page.newPasswordErrors = fixture.debugElement.query(By.css('#new-password div .error-block')).nativeElement;
      page.confirmPasswordErrors = fixture.debugElement.query(By.css('#confirm-password div .error-block')).nativeElement;
      expect(page.oldPasswordErrors.textContent).toBe('Password is too short.', 'errors');
      expect(page.newPasswordErrors.textContent).toBe('Password is too short.', 'errors');
      expect(page.confirmPasswordErrors.textContent).toBe('Passwords don\'t match.', 'errors');

      page.oldPassword.value = 'password';
      page.newPassword.value = 'password123';
      page.confirmPassword.value = 'password123';
      page.oldPassword.dispatchEvent(newEvent('input'));
      page.newPassword.dispatchEvent(newEvent('input'));
      page.confirmPassword.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      expect(comp.submitted).toBe(true, 'submitted');
      expect(fixture.debugElement.query(By.css('#old-password div .error-block'))).toBe(null, 'no errors');
      expect(fixture.debugElement.query(By.css('#new-password div .error-block'))).toBe(null, 'no errors');
      expect(fixture.debugElement.query(By.css('#confirm-password div .error-block'))).toBe(null, 'no errors');
    });
  });
}

/////////// Helpers /////

/** Create the ChangePasswordComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(ChangePasswordComponent);
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
  matchPasswordsSpy: jasmine.Spy;

  oldPassword: HTMLInputElement;
  oldPasswordErrors: HTMLElement;
  newPassword: HTMLInputElement;
  newPasswordErrors: HTMLElement;
  confirmPassword: HTMLInputElement;
  confirmPasswordErrors: HTMLElement;
  submitBtn: DebugElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.submitSpy = spyOn(comp, 'submit').and.callThrough();
    this.matchPasswordsSpy = spyOn(comp, 'matchPasswords').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    this.oldPassword = fixture.debugElement.query(By.css('#old-password input')).nativeElement;
    this.newPassword = fixture.debugElement.query(By.css('#new-password input')).nativeElement;
    this.confirmPassword = fixture.debugElement.query(By.css('#confirm-password input')).nativeElement;
    this.submitBtn = fixture.debugElement.query(By.css('.save-profile'));
  }
}
