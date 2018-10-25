import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLeaderProfileComponent } from './my-leader-profile.component';

describe('MyLeaderProfileComponent', () => {
  let component: MyLeaderProfileComponent;
  let fixture: ComponentFixture<MyLeaderProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLeaderProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLeaderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
