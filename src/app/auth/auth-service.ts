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


 private findUsername(username: string): User | undefined
{
  return this.users.find(u=>u.username === username);
}

private findEmail(email: string): User | undefined
{
  return this.users.find(u=>u.email === email);
}

private findDNI(dni: string) : User | undefined
{
  return this.users.find(u=>u.dni === dni);
}


private userExists(newUser: User): string | undefined
{
  if(this.findUsername(newUser.username))
  {
    throw new Error("El nombre de usuario ya esta elegido");
    
  }

  if(this.findEmail(newUser.email))
  {
     throw new Error("El email ya esta registrado");
    return;
  }

  if(this.findDNI(newUser.dni))
  {
     throw new Error("El numero de dni ya esta registrado");
    return;
  }
  return undefined;
}




register(newUser: User)
{
  const mensajeValidacion= this.userExists(newUser);
  if(mensajeValidacion)
  {
    alert(mensajeValidacion);
    throw new Error(mensajeValidacion);
    
  }
  this.users.push(newUser);
  localStorage.setItem('users', JSON.stringify(this.users));

}

}
