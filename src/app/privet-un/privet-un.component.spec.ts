import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivetUnComponent } from './privet-un.component';

describe('PrivetUnComponent', () => {
  let component: PrivetUnComponent;
  let fixture: ComponentFixture<PrivetUnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivetUnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivetUnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
