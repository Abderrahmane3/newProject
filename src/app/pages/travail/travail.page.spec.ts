import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravailPage } from './travail.page';

describe('TravailPage', () => {
  let component: TravailPage;
  let fixture: ComponentFixture<TravailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
