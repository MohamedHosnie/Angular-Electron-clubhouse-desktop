import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AvatarModule } from 'ngx-avatar';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';
import { avatarConfig } from '../core/consts';
import { CoreModule } from '../core/core.module';
import { MainComponent } from './layout/main.component';
import { ProfileComponent } from './profile/profile.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    HttpClientModule,
    AvatarModule.forRoot(avatarConfig),
    CoreModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule
  ],
  declarations: [
    MainComponent,
    ProfileComponent
  ],
  exports: [
    MainComponent
  ],
  providers: []
})
export class MainModule { }
