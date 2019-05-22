import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyPagePage } from './empty-page.page';

describe('EmptyPagePage', () => {
  let component: EmptyPagePage;
  let fixture: ComponentFixture<EmptyPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
