import { computed, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { map, of, switchMap, tap, throwError } from 'rxjs';
import { UserClient } from '../clients/user-client';
import { NotificationService } from '../services/notification-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 public readonly activeUser = signal<User | undefined>(undefined);
  public readonly isLoggedin = computed(() => this.activeUser() !== undefined);
  public readonly isAdmin = computed(() => this.activeUser()?.isAdmin);



  constructor(private userClient: UserClient, private notify: NotificationService) {
  this.restoreSession();
}
login(username: string, password: string) {
  return this.userClient.getUsers().pipe(
    map(users => {
      const user = users.find(
        u => u.username === username && u.password === password
      );

      if (!user) { 
        throw new Error('Usuario o contraseña incorrectos');
      }
      this.activeUser.set(user);
      localStorage.setItem('loggedUser', JSON.stringify(user));

      return user;
    })
  );
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
      tap(() => this.notify.show("Registro exitoso", "success"))
      
    ).subscribe({
      next: () => {},
      error: (error) => {
        this.notify.show("Error al registrar el usuario", "error");
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

 updateUser(updated: Partial<User>) {
  const user = this.activeUser();
  if (!user) return;

  return this.userClient.actualizarPerfil(user.id!, updated).pipe(
    tap((patchedData) => {
      const merged = { ...user, ...patchedData }; 

      this.activeUser.set(merged);
      localStorage.setItem('loggedUser', JSON.stringify(merged));
    })
  );
}
}

