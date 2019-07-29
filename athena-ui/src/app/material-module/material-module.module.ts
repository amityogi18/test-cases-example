import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule, MatOption, MatSelect, MatStepperModule, MatFormFieldModule, MatExpansionModule, MatBadgeModule, MatCheckboxModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule,
    MatStepperModule, MatFormFieldModule, MatExpansionModule, MatBadgeModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatOption, MatSelect,
    MatStepperModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatBadgeModule,
    MatCheckboxModule
  ]
})
export class MaterialModuleModule { }
