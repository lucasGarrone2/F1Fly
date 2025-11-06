import { computed, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   public readonly isLoggedin= computed( () => this.activeUser() !== undefined )
private readonly activeUser= signal<User | undefined> (undefined)
public readonly isAdmin= computed (() => this.activeUser()?.isAdmin);
 
  private readonly users: User[]=
  [
  {
    username: 'Admin',
    password: 'Admin123',
    isAdmin: true
  }
  ]

login(username: string, password: string)
{
	const user = this.users.find( (u) => u.username === username && u.password ===password );
if(user)
{
this.activeUser.set(user);
}
}

logout()
{
this.activeUser.set(undefined)
}


}
