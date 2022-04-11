import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SectionDataSharedService } from '../../core/services/section-data-shared.service';
import { ElectronHelper } from '../../shared/helpers/electron-helper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private _sectionDataSharedService: SectionDataSharedService
  ) { }

  ngOnInit(): void {
    
  }

}
