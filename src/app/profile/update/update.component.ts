import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  @Input() profiledetails;
  @Input() likeCounter = 1005;
  constructor() { }

  ngOnInit() {
    
  }

}
