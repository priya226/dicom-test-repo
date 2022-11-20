import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DicomOperationsComponent } from './dicom-operations/dicom-operations.component';
import { NslDicomOperationModule } from 'projects/nsl-dicom-operation/src/public-api';
import { MaterialModule } from '../material-module';



@NgModule({
  declarations: [
    DicomOperationsComponent
  ],
  imports: [
    CommonModule,
    NslDicomOperationModule,
    MaterialModule,
  ],
  exports: [
    DicomOperationsComponent,
  ]
})
export class DicomIntegrationModule { }
