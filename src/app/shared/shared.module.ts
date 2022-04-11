import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowActionsComponent } from './window-actions/window-actions.component';




@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WindowActionsComponent
  ],
  exports: [
    WindowActionsComponent
  ]
})
export class SharedModule { }
