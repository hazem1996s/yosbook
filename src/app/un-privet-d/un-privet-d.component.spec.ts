import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnPrivetDComponent } from './un-privet-d.component';

describe('UnPrivetDComponent', () => {
  let component: UnPrivetDComponent;
  let fixture: ComponentFixture<UnPrivetDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnPrivetDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnPrivetDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
