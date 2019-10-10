import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  accepted: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  accpeted() {
    localStorage.setItem('terms', 'accepted');
  }

  isAccepted() {
    if ( localStorage.getItem('terms') === 'accepted') {
      return true;
    }
    return false;
  }

  unaccpeted() {
    localStorage.removeItem('terms');
  }

}
