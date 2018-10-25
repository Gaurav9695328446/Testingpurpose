import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchiviesComponent } from './achivies.component';

describe('AchiviesComponent', () => {
  let component: AchiviesComponent;
  let fixture: ComponentFixture<AchiviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchiviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchiviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
