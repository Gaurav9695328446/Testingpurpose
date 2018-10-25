import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() profiledetails;
  @Input() noOfPersonRated;
  @Input() ratings;
  overAllRating: number;
  isReadonly = true;
  max = 5;
  constructor() { }

  ngOnInit() {

    let ratingCount = this.ratings.pImageRating +
      this.ratings.accessRating +
      this.ratings.partyImageRating +
      this.ratings.activeRating +
      this.ratings.qualificationRating +
      this.ratings.workRating +
      this.ratings.honestyRating +
      this.ratings.transparacyRating;

    this.overAllRating = ratingCount * 100 / 40;

    this.overAllRating = Math.round(this.overAllRating / 20);

  }
}
