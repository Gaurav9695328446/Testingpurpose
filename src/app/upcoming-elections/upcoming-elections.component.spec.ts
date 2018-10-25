import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingElectionsComponent } from './upcoming-elections.component';

describe('UpcomingElectionsComponent', () => {
  let component: UpcomingElectionsComponent;
  let fixture: ComponentFixture<UpcomingElectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingElectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingElectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
