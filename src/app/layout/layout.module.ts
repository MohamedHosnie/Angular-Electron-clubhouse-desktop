import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GravatarModule } from 'ngx-gravatar';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    GravatarModule
  ],
  declarations: [
    LayoutComponent
  ],
  exports: [
    LayoutComponent
  ],
  providers: []
})
export class LayoutModule { }
