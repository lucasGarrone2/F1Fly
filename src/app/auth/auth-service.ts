import { computed, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { of, switchMap, tap, throwError } from 'rxjs';
import { UserClient } from '../clients/user-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 public readonly activeUser = signal<User | undefined>(undefined);
  public readonly isLoggedin = computed(() => this.activeUser() !== undefined);
  public readonly isAdmin = computed(() => this.activeUser()?.isAdmin);

  constructor(private userClient: UserClient) {}


  login(username: string, password: string) {
    this.userClient.getUsers().subscribe({
      next: (users) => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          this.activeUser.set(user);
          localStorage.setItem('loggedUser', JSON.stringify(user));
        } else {
          alert('Usuario o contraseña incorrectos');
          throw new Error('Usuario o contraseña incorrectos');
        }
      },
      error: (err) => {
        console.error('Error al intentar iniciar sesión:', err);
        alert('Error de conexión con el servidor');
      }
    });
  }

  logout() {
    this.activeUser.set(undefined);
    localStorage.removeItem('loggedUser');
  }


  private userExists(newUser: User) {
    return this.userClient.getUsers().pipe(
      switchMap(users => {
        if (users.find(u => u.username === newUser.username)) {
          return throwError(() => new Error('El nombre de usuario ya está elegido'));
        }
        if (users.find(u => u.email === newUser.email)) {
          return throwError(() => new Error('El email ya está registrado'));
        }
        if (users.find(u => u.dni === newUser.dni)) {
          return throwError(() => new Error('El número de DNI ya está registrado'));
        }
        return of(null); 
      })
    );
  }

 
  register(newUser: User) {
    this.userExists(newUser).pipe(
      switchMap(() => this.userClient.createUser({ ...newUser, isAdmin: false })),
      tap(() => alert('Usuario registrado con éxito'))
    ).subscribe({
      next: () => {},
      error: (error) => {
        alert(error.message);
        console.error('Error al registrar usuario:', error);
      }
    });
  }

  
  restoreSession() {
    const saved = localStorage.getItem('loggedUser');
    if (saved) {
      const user: User = JSON.parse(saved);
      this.activeUser.set(user);
    }
  }
}

