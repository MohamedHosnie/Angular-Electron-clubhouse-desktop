import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSessionService } from './app-session.service';
import { SectionDataSharedService } from './section-data-shared.service';
import { UserService } from './user.service';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    
  ],
  exports: [
    
  ],
  providers: [
    AppSessionService,
    SectionDataSharedService,
    UserService
  ]
})
export class ServicesModule { }
