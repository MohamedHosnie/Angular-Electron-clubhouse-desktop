import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';
import { CoreModule } from './core/core.module';
import { SectionDataSharedService } from './core/services/section-data-shared.service';
import { SectionModule } from './section/section.module';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  declarations: [
    AppComponent
  ],
  exports: [],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
