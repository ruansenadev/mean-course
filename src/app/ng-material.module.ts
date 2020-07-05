import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
  exports: [
    MatDialogModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule
  ]
})
export class NgMaterialModule {}
