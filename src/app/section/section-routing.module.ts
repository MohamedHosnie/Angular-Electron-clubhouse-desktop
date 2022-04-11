import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SectionComponent } from './layout/section.component';

const routes: Routes = [
  {
    path: '',
    component: SectionComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }
