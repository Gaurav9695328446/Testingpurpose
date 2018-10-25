import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareProfilePopupComponent } from './share-profile-popup.component';

describe('ShareProfilePopupComponent', () => {
  let component: ShareProfilePopupComponent;
  let fixture: ComponentFixture<ShareProfilePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareProfilePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareProfilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
