import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NslDicomOperationComponent } from './nsl-dicom-operation.component';

describe('NslDicomOperationComponent', () => {
  let component: NslDicomOperationComponent;
  let fixture: ComponentFixture<NslDicomOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NslDicomOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NslDicomOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
