import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerTitleComponent } from './marker-title.component';

describe('MarkerTitleComponent', () => {
  let component: MarkerTitleComponent;
  let fixture: ComponentFixture<MarkerTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
