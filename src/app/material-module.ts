import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  exports: [
    /*A11yModule,
    CdkStepperModule,
    CdkTableModule,*/
    CdkTreeModule,

    DragDropModule,
    MatAutocompleteModule,
    /*MatBadgeModule,
    MatBottomSheetModule,*/
    MatButtonModule,
    //MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    /*MatChipsModule,
    MatStepperModule,*/
    MatDatepickerModule,
    MatDialogModule,
    /*MatDividerModule,*/
    MatExpansionModule,
    //MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    //MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    //MatRippleModule,
    MatSelectModule,
    /*MatSidenavModule,*/
    MatSliderModule,
    MatSlideToggleModule,
    //MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    //MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    // PortalModule,
    ScrollingModule,
    MatFormFieldModule,
    ClipboardModule,
    MatButtonToggleModule,
  ],
})
export class MaterialModule {}

/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
