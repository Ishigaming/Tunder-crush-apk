import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenderSelectionPage } from './gender-selection.page';

describe('GenderSelectionPage', () => {
  let component: GenderSelectionPage;
  let fixture: ComponentFixture<GenderSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
