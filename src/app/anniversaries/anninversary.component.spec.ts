import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnniversaryComponent } from './anninversary.component';

describe('AnniversaryComponentComponent', () => {
  let component: AnniversaryComponent;
  let fixture: ComponentFixture<AnniversaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnniversaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnniversaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
