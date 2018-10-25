import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-profile-image-upload',
  templateUrl: './profile-image-upload.component.html',
  styleUrls: ['./profile-image-upload.component.scss']
})
export class ProfileImageUploadComponent implements OnInit {

  @ViewChild('fileElem') fileElemRef : ElementRef;
  imagePath : string;
  @Output('uploadCallback') uploadCallback = new EventEmitter();
  constructor() { }

  ngOnInit() {
    fromEvent(this.fileElemRef.nativeElement, "change").subscribe((event : any) => {
      let reader = new FileReader();
      reader.onload = fileOnLoad.bind(this);
      reader.readAsDataURL(event.target.files[0]);
    });

    function fileOnLoad(e) {
      this.imagePath = e.target.result;
      this.uploadCallback.emit(e);
    }
  }

}
