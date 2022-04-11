import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable()
export class UserService {
  
  userStore: User[] = [
    {
      id: 1,
      email: 'mohamed.hosnie1@gmail.com',
      name: 'Mohamed Hosnie',
      tagname: '@mohamedhosnie',
      avatar: '',
      bio:
`Live and let live

Nothing is true
`,
      clubs: [],
      nominatedBy: 2,
      followers: [],
      following: [],
      twitter: '',
      instagram: ''
    },
    {
      id: 2,
      email: 'email2@email.com',
      name: 'Ahmed Mostafa',
      tagname: '@ahmedmostafa',
      avatar: '',
      bio:
        ``,
      clubs: [],
      nominatedBy: 3,
      followers: [],
      following: [],
      twitter: '',
      instagram: ''
    },
    {
      id: 3,
      email: 'email3@email.com',
      name: 'Mohamed Ayman',
      tagname: '@mohamedayman',
      avatar: '',
      bio:
        ``,
      clubs: [],
      nominatedBy: 4,
      followers: [],
      following: [],
      twitter: '',
      instagram: ''
    }
  ];

  constructor() { }

  get(id: number): User {
    return this.userStore.filter(x => x.id == id )[0];
  }
}
