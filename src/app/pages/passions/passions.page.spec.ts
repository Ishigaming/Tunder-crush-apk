import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassionsPage } from './passions.page';

describe('PassionsPage', () => {
  let component: PassionsPage;
  let fixture: ComponentFixture<PassionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PassionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
