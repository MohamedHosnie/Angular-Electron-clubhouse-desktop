import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionRoutingModule } from './section-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SectionComponent } from './layout/section.component';
import { SharedModule } from '../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from '../core/core.module';


@NgModule({
  imports: [
    CommonModule,
    SectionRoutingModule,
    SharedModule,
    CoreModule,
    MatToolbarModule
  ],
  declarations: [
    ProfileComponent,
    SectionComponent
  ],
  exports: []
})
export class SectionModule { }
