

export interface IUser {
  id: number,
  name: string,
  email: string,
  tagname: string,
  avatar: string,
  bio: string,
  clubs: Club[],
  nominatedBy: number,
  followers: User[],
  following: User[],
  twitter: string,
  instagram: string
}

export class User implements IUser {
  id!: number;
  name!: string;
  email!: string;
  tagname!: string;
  avatar!: string;
  bio!: string;
  clubs!: Club[];
  nominatedBy!: number;
  followers!: User[];
  following!: User[];
  twitter!: string;
  instagram!: string;

  constructor(data?: IUser) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

}

export interface WindowOptions {
  name: string,
  closable: boolean,
  minimizable: boolean,
  maximizable: boolean,
  maximized: boolean
}


export class Club {

}
