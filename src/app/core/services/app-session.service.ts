import { Injectable } from '@angular/core';
import { User } from '../models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AppSessionService {
  user!: User;
  
  constructor(
    private _userService: UserService
  ) {
    this.readSessionData();
  }

  readSessionData() {
    this.user = this._userService.get(1);
  }

  IsNewNotificationsFound(): boolean {
    return true;
  }

}
