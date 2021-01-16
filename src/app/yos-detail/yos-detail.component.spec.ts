import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YosDetailComponent } from './yos-detail.component';

describe('YosDetailComponent', () => {
  let component: YosDetailComponent;
  let fixture: ComponentFixture<YosDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YosDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
