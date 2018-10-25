import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  @Input() profiledetails;
  constructor() { }

  ngOnInit() {
  }

}
