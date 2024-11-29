import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantCategoryService {
  private apiUrl = 'https://testsvfcb.pythonanywhere.com/restaurant-category'; // Your API endpoint

  constructor(private http: HttpClient) {}


  createRestaurantCategory(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }


  getRestaurantCategory(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }


  getAllRestaurantCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }


  updateRestaurantCategory(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }


  deleteRestaurantCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
