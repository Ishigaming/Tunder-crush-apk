import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BirthdatePage } from './birthdate.page';

describe('BirthdatePage', () => {
  let component: BirthdatePage;
  let fixture: ComponentFixture<BirthdatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
