import { computed, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   public readonly isLoggedin= computed( () => this.activeUser() !== undefined )
private readonly activeUser= signal<User | undefined> (undefined)
public readonly isAdmin= computed (() => this.activeUser()?.isAdmin);
 
  private readonly users: User[]=[];
  
  constructor()
  {
    const savedUsers= localStorage.getItem("users");
    if(savedUsers)
    {
      this.users= JSON.parse(savedUsers);
    }
  }
  

login(username: string, password: string)
{
	const user = this.users.find( (u) => u.username === username && u.password ===password );
if(user)
{
this.activeUser.set(user);
}
else
{
  alert("Usuario o contraseña incorrectos");
  throw new Error("Usuario o contraseña incorrectos");
  return;
}
}

logout()
{
this.activeUser.set(undefined)
}

register(newUser: User)
{
  const exists= this.users.some(u=>u.username === newUser.username);
  if(exists)
  {
    alert("El nombre de usuario ya existe");
    return;
  }
  this.users.push(newUser);
  localStorage.setItem('users', JSON.stringify(this.users));

}

}
