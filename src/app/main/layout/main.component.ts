import { ChangeDetectorRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { User, WindowOptions } from '../../core/models';
import { AppSessionService } from '../../core/services/app-session.service';
import { ElectronHelper } from '../../shared/helpers/electron-helper';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  windowOptions!: WindowOptions;

  applicationTitle: string = "Clubhouse";
  currentUser!: User;
  newNotification: boolean = false;

  @ViewChild('profileComponent')
    profileComponent!: ProfileComponent;

  constructor(
    private _appSessionService: AppSessionService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {

    this.windowOptions = {
      name: 'main',
      closable: true,
      maximizable: true,
      minimizable: true,
      maximized: false
    };
    
    let self = this;
    ElectronHelper.onWindowCreated('main', (event: any, data: any) => {
      self.windowOptions = {
        name: data.name,
        closable: data.closable,
        maximizable: data.maximizable,
        minimizable: data.minimizable,
        maximized: data.maximized
      };
      this._changeDetectorRef.detectChanges();

      ElectronHelper.displayWindow('main');
    });
    
  }

  ngOnInit(): void {
    this.currentUser = this._appSessionService.user;
    this.newNotification = this._appSessionService.IsNewNotificationsFound();
  }


  profileButtonClick(): void {
    /*ElectronHelper.displayWindow('profile');*/
    this.profileComponent.show();
  }

}
