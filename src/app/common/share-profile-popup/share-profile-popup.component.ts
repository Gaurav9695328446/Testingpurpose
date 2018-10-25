import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AuthService } from '../../core/service/auth.service';
import { SharePopupTrigger } from '../../triggers/share-popup-trigger';

@Component({
  selector: 'share-profile-popup',
  templateUrl: './share-profile-popup.component.html',
  styleUrls: ['./share-profile-popup.component.scss'],
  animations: [SharePopupTrigger]
})
export class ShareProfilePopupComponent implements OnInit, OnDestroy {

  @Input() openFrom : any;
  @Input() isShowTitle: any;
  animationState : string = "inactive";
  isPopupHide : boolean = true;
  clickElem : any;
  elemClickSubscribe : any;
  
  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.clickElem = fromEvent(this.openFrom, 'click');
    this.elemClickSubscribe = this.clickElem.subscribe((event) => {
      if(!this.authService.isLoggedIn) {
        this.authService.openLoginPopup(true);
      } else {
        this.animationState = "active";
        this.isPopupHide = false;
      }
    })
  }

  prepareToHide(event) {
    this.animationState = "inactive";
    event.stopPropagation();
  }

  hidePopup() {
    if(this.animationState === 'inactive') {
      this.isPopupHide = true;
    }
  }


  ngOnDestroy() {
    this.elemClickSubscribe.unsubscribe();
  }
}
