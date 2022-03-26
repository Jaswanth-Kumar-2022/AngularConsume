import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { 

  }
  postTraveller(data:any){
    return this.http.post<any>("https://localhost:44396/api/TravellersDetails",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getTraveller()
  {
    return this.http.get<any>("https://localhost:44396/api/TravellersDetails")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateTraveller(data:any,id:number)
  {
    return this.http.put<any>("https://localhost:44396/api/TravellersDetails/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteTraveller(id:number)
  {
    return this.http.delete<any>("https://localhost:44396/api/TravellersDetails/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
