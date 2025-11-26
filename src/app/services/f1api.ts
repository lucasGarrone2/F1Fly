import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class F1api {
private readonly baseUrl: string = 'https://api.jolpi.ca/ergast/f1'; 

  constructor(private http: HttpClient) {}

  getDriverStandings()
  {
    return this.http.get(`${this.baseUrl}/current/driverStandings.json`);
  }

  getConstructorStandings()
  {
    return this.http.get(`${this.baseUrl}/current/constructorStandings.json`);
  }

   getRaceSchedule() {
    return this.http.get(`${this.baseUrl}/current.json`);
  }

  getLastRaceResults() {
    return this.http.get(`${this.baseUrl}/current/last/results.json`);
  }

  getNextRace() {
    return this.http.get(`${this.baseUrl}/current/next.json`);
  }
}
