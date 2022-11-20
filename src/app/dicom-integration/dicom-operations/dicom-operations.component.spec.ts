import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicomOperationsComponent } from './dicom-operations.component';

describe('DicomOperationsComponent', () => {
  let component: DicomOperationsComponent;
  let fixture: ComponentFixture<DicomOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DicomOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DicomOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
