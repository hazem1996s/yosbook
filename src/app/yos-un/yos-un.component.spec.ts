import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YosUnComponent } from './yos-un.component';

describe('YosUnComponent', () => {
  let component: YosUnComponent;
  let fixture: ComponentFixture<YosUnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YosUnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YosUnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
