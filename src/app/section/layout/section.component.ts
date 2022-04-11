import { Component, OnInit } from '@angular/core';
import { WindowOptions } from '../../core/models';
import { SectionDataSharedService } from '../../core/services/section-data-shared.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
})
export class SectionComponent implements OnInit {

  windowOptions!: WindowOptions;

  constructor(
    private _sectionDataSharedService: SectionDataSharedService
  ) {
    let data = this._sectionDataSharedService.data;
    this.windowOptions = {
      name: data.name,
      closable: data.closable,
      maximizable: data.maximizable,
      minimizable: data.minimizable,
      maximized: data.maximized
    }

  }

  ngOnInit(): void {
      
  }

}
