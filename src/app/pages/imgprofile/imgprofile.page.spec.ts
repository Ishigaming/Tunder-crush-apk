import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImgprofilePage } from './imgprofile.page';

describe('ImgprofilePage', () => {
  let component: ImgprofilePage;
  let fixture: ComponentFixture<ImgprofilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
