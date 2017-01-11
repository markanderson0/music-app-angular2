import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'edit-privacy',
  templateUrl: 'edit-privacy.component.html',
  styleUrls: ['../settings.component.scss']
})
export class EditPrivacyComponent implements OnInit {

  submitted: boolean = false;
  follow: boolean = true;
  favourited: boolean = false;
  score: boolean = false;
  ratings: boolean = true;

  constructor() { }

  ngOnInit() { }

  submit(): void {
    this.submitted = true;
  }
}
