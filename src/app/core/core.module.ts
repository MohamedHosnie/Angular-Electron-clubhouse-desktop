import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from './services/services.module';


@NgModule({
  imports: [
    CommonModule,
    ServicesModule
  ],
  declarations: [
    
  ],
  exports: [
    ServicesModule
  ]
})
export class CoreModule { }
