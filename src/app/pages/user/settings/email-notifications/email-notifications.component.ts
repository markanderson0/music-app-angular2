import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'email-notifications',
  templateUrl: 'email-notifications.component.html',
  styleUrls: ['../settings.component.scss']
})
export class EmailNotificationsComponent implements OnInit {

  artistNews: boolean = true;
  featuresUpdates: boolean = false;
  submitted: boolean = false;

  constructor() { }

  ngOnInit() { }

  submit(): void {
    this.submitted = true;
  }
}
