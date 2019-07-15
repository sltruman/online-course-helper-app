import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionsPage } from './interactions.page';

describe('InteractionsPage', () => {
  let component: InteractionsPage;
  let fixture: ComponentFixture<InteractionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
