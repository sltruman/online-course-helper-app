import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddPage } from './student-add.page';

describe('StudentAddPage', () => {
  let component: StudentAddPage;
  let fixture: ComponentFixture<StudentAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
