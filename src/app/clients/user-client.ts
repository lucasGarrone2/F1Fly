import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserClient {
 
  private readonly http = inject(HttpClient);
  private readonly apiUrl= "http://localhost:3000/users";
  

  getUsers()
  {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserEmail(email:string)
  {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`);
  }

  createUser(user: User)
  {
    return this.http.post<User>(this.apiUrl, user);   
  }

  deleteUser(id:number)
  {
    return this.http.delete<User>(`${this.apiUrl}/${id}`);
  }
}
