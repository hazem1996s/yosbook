import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YosComponent } from './yos.component';

describe('YosComponent', () => {
  let component: YosComponent;
  let fixture: ComponentFixture<YosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
