import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutletMap } from '@angular/router';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../../../../testing';

import { EditProfileComponent } from './edit-profile.component';
import { SettingsModule }          from '../settings.module';
import { GlobalState } from '../../../../global.state';

import { Observable } from 'rxjs/Observable';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: EditProfileComponent;
let fixture: ComponentFixture<EditProfileComponent>;
let page: Page;

////// Tests //////
describe('EditProfileComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided EditProfileService', overrideSetup);
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
    .overrideComponent(EditProfileComponent, {
      set: {
        providers: [

        ]
      }
    });
  }));

  // let hds: StubFavouritesService;

  describe('EditProfileComponent should ', () => {

    beforeEach( async(() => {
      createComponent();

    }));

    it('have called OnInit and initialized values', () => {

    });

    it('show no errors when valid email is submitted', () => {
      page.email.value = 'test@test.com';
      page.email.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#email div .error-block'))).toBe(null, 'no errors');
    });

    it('show errors when blank email is submitted', () => {
      page.email.value = '';
      page.email.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      page.emailErrors = fixture.debugElement.query(By.css('#email div .error-block')).nativeElement;
      expect(page.emailErrors.textContent).toBe('Enter an Email.', 'errors');
    });

    it('show errors when invalid email is submitted', () => {
      page.email.value = 'test';
      page.email.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      page.emailErrors = fixture.debugElement.query(By.css('#email div .error-block')).nativeElement;
      expect(page.emailErrors.textContent).toBe('Invalid email.', 'errors');
    });

    it('show no errors when valid email is submitted but show invalid email error when email is invalidated', () => {
      page.email.value = 'test@test.com';
      page.email.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#email div .error-block'))).toBe(null, 'no errors');

      page.email.value = 'test';
      page.email.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      page.emailErrors = fixture.debugElement.query(By.css('#email div .error-block')).nativeElement;
      expect(page.emailErrors.textContent).toBe('Invalid email.', 'errors');
    });

    it('show no errors when valid email is submitted but show required email error when email is blank', () => {
      page.email.value = 'test@test.com';
      page.email.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#email div .error-block'))).toBe(null, 'no errors');

      page.email.value = '';
      page.email.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      page.emailErrors = fixture.debugElement.query(By.css('#email div .error-block')).nativeElement;
      expect(page.emailErrors.textContent).toBe('Enter an Email.', 'errors');
    });

    it('show no errors when valid dob is submitted', () => {
      page.dobDay.valueAsNumber = 1;
      page.dobMonth.valueAsNumber = 1;
      page.dobYear.valueAsNumber = 2000;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#dob div .error-block'))).toBe(null, 'no errors');
    });

    it('show no errors when valid dob is submitted (leap year) and show errors when invalid email is entered', () => {
      page.dobDay.valueAsNumber = 29;
      page.dobMonth.valueAsNumber = 2;
      page.dobYear.valueAsNumber = 2000;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#dob div div .error-block'))).toBe(null, 'no errors');

      page.dobDay.valueAsNumber = 29;
      page.dobMonth.valueAsNumber = 2;
      page.dobYear.valueAsNumber = 2001;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      page.dobErrors = fixture.debugElement.query(By.css('#dob div div .error-block')).nativeElement;
      expect(page.dobErrors.textContent).toBe('Invalid Date.', 'errors');
    });

    it('show errors when invalid dob is submitted (leap year) and remove errors when dob is made valid', () => {
      page.dobDay.valueAsNumber = 29;
      page.dobMonth.valueAsNumber = 2;
      page.dobYear.valueAsNumber = 2001;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      page.dobErrors = fixture.debugElement.query(By.css('#dob div div .error-block')).nativeElement;
      expect(page.dobErrors.textContent).toBe('Invalid Date.', 'errors');

      page.dobDay.valueAsNumber = 29;
      page.dobMonth.valueAsNumber = 2;
      page.dobYear.valueAsNumber = 2000;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      expect(comp.submitted).toBe(true, 'submitted');
      expect(fixture.debugElement.query(By.css('#dob div div .error-block'))).toBe(null, 'no errors');
    });

    it('show errors when blank dob is submitted and remove errors when dob is made valid', () => {
      page.dobDay.value = '';
      page.dobMonth.value = '';
      page.dobYear.value = '';
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      page.dobErrors = fixture.debugElement.query(By.css('#dob div .error-block')).nativeElement;
      expect(page.dobErrors.textContent).toBe('Enter a DOB.', 'errors');

      page.dobDay.valueAsNumber = 1;
      page.dobMonth.valueAsNumber = 1;
      page.dobYear.valueAsNumber = 2000;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      expect(comp.submitted).toBe(true, 'submitted');
      expect(fixture.debugElement.query(By.css('#dob div .error-block'))).toBe(null, 'no errors');
    });

    it('show errors when invalid dob is submitted (max values day) and remove errors when dob is made valid', () => {
      page.dobDay.valueAsNumber = 32;
      page.dobMonth.valueAsNumber = 2;
      page.dobYear.valueAsNumber = 2001;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      page.dobErrors = fixture.debugElement.query(By.css('#dob div div .error-block')).nativeElement;
      expect(page.dobErrors.textContent).toBe('Invalid Date.', 'errors');

      page.dobDay.valueAsNumber = 31;
      page.dobMonth.valueAsNumber = 1;
      page.dobYear.valueAsNumber = 2001;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      expect(comp.submitted).toBe(true, 'submitted');
      expect(fixture.debugElement.query(By.css('#dob div div .error-block'))).toBe(null, 'no errors');
    });

    it('show errors when invalid dob is submitted (max values month) and remove errors when dob is made valid', () => {
      page.dobDay.valueAsNumber = 29;
      page.dobMonth.valueAsNumber = 13;
      page.dobYear.valueAsNumber = 2000;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      page.dobErrors = fixture.debugElement.query(By.css('#dob div div .error-block')).nativeElement;
      expect(page.dobErrors.textContent).toBe('Invalid Date.', 'errors');

      page.dobDay.valueAsNumber = 29;
      page.dobMonth.valueAsNumber = 12;
      page.dobYear.valueAsNumber = 2000;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      expect(comp.submitted).toBe(true, 'submitted');
      expect(fixture.debugElement.query(By.css('#dob div div .error-block'))).toBe(null, 'no errors');
    });

    it('show errors when invalid dob is submitted (max values year) and remove errors when dob is made valid', () => {
      page.dobDay.valueAsNumber = 1;
      page.dobMonth.valueAsNumber = 1;
      page.dobYear.valueAsNumber = 2016;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      page.dobErrors = fixture.debugElement.query(By.css('#dob div div .error-block')).nativeElement;
      expect(page.dobErrors.textContent).toBe('Invalid Date.', 'errors');

      page.dobDay.valueAsNumber = 1;
      page.dobMonth.valueAsNumber = 1;
      page.dobYear.valueAsNumber = 2015;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      expect(comp.submitted).toBe(true, 'submitted');
      expect(fixture.debugElement.query(By.css('#dob div div .error-block'))).toBe(null, 'no errors');
    });

    it('show errors when invalid dob is submitted (min values day) and remove errors when dob is made valid', () => {
      page.dobDay.valueAsNumber = 0;
      page.dobMonth.valueAsNumber = 1;
      page.dobYear.valueAsNumber = 2001;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      page.dobErrors = fixture.debugElement.query(By.css('#dob div div .error-block')).nativeElement;
      expect(page.dobErrors.textContent).toBe('Invalid Date.', 'errors');

      page.dobDay.valueAsNumber = 1;
      page.dobMonth.valueAsNumber = 1;
      page.dobYear.valueAsNumber = 2001;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      expect(comp.submitted).toBe(true, 'submitted');
      expect(fixture.debugElement.query(By.css('#dob div div .error-block'))).toBe(null, 'no errors');
    });

    it('show errors when invalid dob is submitted (min values month) and remove errors when dob is made valid', () => {
      page.dobDay.valueAsNumber = 1;
      page.dobMonth.valueAsNumber = 0;
      page.dobYear.valueAsNumber = 2000;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      page.dobErrors = fixture.debugElement.query(By.css('#dob div div .error-block')).nativeElement;
      expect(page.dobErrors.textContent).toBe('Invalid Date.', 'errors');

      page.dobDay.valueAsNumber = 1;
      page.dobMonth.valueAsNumber = 1;
      page.dobYear.valueAsNumber = 2000;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      expect(comp.submitted).toBe(true, 'submitted');
      expect(fixture.debugElement.query(By.css('#dob div div .error-block'))).toBe(null, 'no errors');
    });

    it('show errors when invalid dob is submitted (max values year) and remove errors when dob is made valid', () => {
      page.dobDay.valueAsNumber = 1;
      page.dobMonth.valueAsNumber = 1;
      page.dobYear.valueAsNumber = 1899;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      click(page.submitBtn);
      expect(page.submitSpy.calls.any()).toBe(true, 'submit called');
      expect(comp.submitted).toBe(true, 'submitted');
      fixture.detectChanges();
      page.dobErrors = fixture.debugElement.query(By.css('#dob div div .error-block')).nativeElement;
      expect(page.dobErrors.textContent).toBe('Invalid Date.', 'errors');

      page.dobDay.valueAsNumber = 1;
      page.dobMonth.valueAsNumber = 1;
      page.dobYear.valueAsNumber = 1900;
      page.dobDay.dispatchEvent(newEvent('input'));
      page.dobMonth.dispatchEvent(newEvent('input'));
      page.dobYear.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      expect(comp.submitted).toBe(true, 'submitted');
      expect(fixture.debugElement.query(By.css('#dob div div .error-block'))).toBe(null, 'no errors');
    });

    it('remove profile picture when X button is pressed', () => {
      click(page.removeProfilePic);
      expect(page.removePictureSpy.calls.any()).toBe(true, 'removePicture called');
    });

    it('remove banner picture when X button is pressed', () => {
      click(page.removeBannerPic);
      expect(page.removePictureSpy.calls.any()).toBe(true, 'removePicture called');
    });

    // it('open file chooser when change profile picture button is pressed', () => {
    //   click(page.changeProfilePic);
    //   expect(page.uploadPictureSpy.calls.any()).toBe(true, 'uploadPicture called');
    // });

    // it('open file chooser when change banner picture button is pressed', () => {
    //   click(page.changeBannerPic);
    //   expect(page.uploadPictureSpy.calls.any()).toBe(true, 'uploadPicture called');
    // });
  });
}

/////////// Helpers /////

/** Create the EditProfileComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(EditProfileComponent);
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
  checkDateSpy: jasmine.Spy;
  removePictureSpy: jasmine.Spy;
  uploadPictureSpy: jasmine.Spy;

  removeProfilePic: DebugElement;
  removeBannerPic: DebugElement;
  changeProfilePic: DebugElement;
  changeBannerPic: DebugElement;

  email: HTMLInputElement;
  emailErrors: HTMLElement;
  dobDay: HTMLInputElement;
  dobMonth: HTMLInputElement;
  dobYear: HTMLInputElement;
  dobErrors: HTMLElement;
  submitBtn: DebugElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const router = compInjector.get(Router);

    this.navSpy = spyOn(router, 'navigate');
    this.submitSpy = spyOn(comp, 'submit').and.callThrough();
    this.checkDateSpy = spyOn(comp, 'checkDate').and.callThrough();
    this.removePictureSpy = spyOn(comp, 'removePicture').and.callThrough();
    this.uploadPictureSpy = spyOn(comp, 'uploadPicture').and.callThrough();
  }

  /** Add page elements after OnInit */
  addPageElements() {
    comp.noProfilePicture = false;
    comp.noBannerPicture = false;
    this.removeProfilePic = fixture.debugElement.query(By.css('.userpic i'));
    this.removeBannerPic = fixture.debugElement.query(By.css('.bannerpic i'));
    this.changeProfilePic = fixture.debugElement.query(By.css('.userpic a'));
    this.changeBannerPic = fixture.debugElement.query(By.css('.bannerpic a'));

    this.email = fixture.debugElement.query(By.css('#email input')).nativeElement;
    this.dobDay = fixture.debugElement.query(By.css('#form-day')).nativeElement;
    this.dobMonth = fixture.debugElement.query(By.css('#form-month')).nativeElement;
    this.dobYear = fixture.debugElement.query(By.css('#form-year')).nativeElement;
    this.submitBtn = fixture.debugElement.query(By.css('.save-profile'));
  }
}
