import { HttpClient } from "@angular/common/http";
import { Hotel } from "./hotel-interface";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class HotelService {
  private readonly apiUrl = "http://localhost:3000/hoteles";
  private readonly http = inject(HttpClient)


  getHoteles():Observable<Hotel[]>{
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  getHotelesById(id: number|string):Observable<Hotel>{
    return this.http.get<Hotel>(this.apiUrl + '/' + id);
  }

  addHotel(hotel: Hotel){
    return this.http.post<Hotel>(this.apiUrl, hotel);
  }

  updateHotel(hotel_act: Hotel, id: number|string){
    return this.http.put<Hotel>(this.apiUrl + '/' + id, hotel_act);
  }

  deleteHotel(id: number|string){
    return this.http.delete(this.apiUrl + '/' + id);
  }

}