import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLeaderProfileSuccessComponent } from './my-leader-profile-success.component';

describe('MyLeaderProfileSuccessComponent', () => {
  let component: MyLeaderProfileSuccessComponent;
  let fixture: ComponentFixture<MyLeaderProfileSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLeaderProfileSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLeaderProfileSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
