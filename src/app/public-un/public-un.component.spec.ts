import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicUnComponent } from './public-un.component';

describe('PublicUnComponent', () => {
  let component: PublicUnComponent;
  let fixture: ComponentFixture<PublicUnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicUnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicUnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
