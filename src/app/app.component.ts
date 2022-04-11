import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SectionDataSharedService } from './core/services/section-data-shared.service';
import { ElectronHelper } from './shared/helpers/electron-helper';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    
`,
  providers: [
    SectionDataSharedService
  ]
})
export class AppComponent implements AfterViewInit {
  
  title = 'Clubhouse Desktop';

  constructor(private _sectionDataSharedService: SectionDataSharedService) {

  }

  ngAfterViewInit(): void {
    ElectronHelper.onWindowCreated('profile', (event: any, data: any) => {
      this._sectionDataSharedService.data = data;
    });
  }
}
