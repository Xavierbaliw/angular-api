import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Menu } from '../model/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = 'https://testsvfcb.pythonanywhere.com/menu';

  constructor(private http: HttpClient) {}

  createMenu(menu: Menu) {
    return this.http.post<Menu>(this.apiUrl, menu);
  }

  getMenus() {
    return this.http.get<Menu[]>(this.apiUrl);
  }

  getMenuByUUID(uuid: string | undefined) {
    return this.http.get<Menu>(`${this.apiUrl}/${uuid}`);
  }

  updateMenu(uuid: string | undefined, menu: Menu) {
    return this.http.put<Menu>(`${this.apiUrl}/${uuid}`, menu);
  }

  deleteMenu(uuid: string | undefined) {
    return this.http.delete(`${this.apiUrl}/${uuid}`);
  }
}