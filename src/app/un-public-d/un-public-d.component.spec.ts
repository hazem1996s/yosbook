import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnPublicDComponent } from './un-public-d.component';

describe('UnPublicDComponent', () => {
  let component: UnPublicDComponent;
  let fixture: ComponentFixture<UnPublicDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnPublicDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnPublicDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
