import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WindowOptions } from '../../core/models';
import { ElectronHelper } from '../helpers/electron-helper';

@Component({
  selector: 'app-window-actions',
  templateUrl: './window-actions.component.html',
  styleUrls: ['./window-actions.component.css']
})
export class WindowActionsComponent implements OnInit {

  @Input() options!: WindowOptions;

  maximized!: boolean;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
    
  }

  ngOnInit(): void {
    this.maximized = this.options.maximized;

    ElectronHelper.onWindowMaximize(this.options.name, (event) => {
      this.maximized = true;
      this._changeDetectorRef.detectChanges();
    });

    ElectronHelper.onWindowRestore(this.options.name, (event) => {
      this.maximized = false;
      this._changeDetectorRef.detectChanges();
    });


  }

  onMinimizeClick(): void {
    ElectronHelper.minimizeWindow(this.options.name);
  }

  onRestoreClick(): void {
    ElectronHelper.restoreWindow(this.options.name, { maximized: this.maximized });
  }

  onMaximizeClick(): void {
    ElectronHelper.maximizeWindow(this.options.name, { maximized: this.maximized });
  }

  onCloseClick(): void {
    ElectronHelper.closeWindow(this.options.name);
  }
}
