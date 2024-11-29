import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuCategory } from '../model/menu-category';

@Injectable({
  providedIn: 'root',
})
export class MenuCategoryService {
  private apiUrl = 'https://testsvfcb.pythonanywhere.com/menu-category';

  constructor(private http: HttpClient) {}

  createMenuCategory(category: MenuCategory) {
    return this.http.post<MenuCategory>(this.apiUrl, category);
  }

  getMenuCategories() {
    return this.http.get<MenuCategory[]>(this.apiUrl);
  }

  getMenuCategoryByUUID(uuid: string | undefined) {
    return this.http.get<MenuCategory>(`${this.apiUrl}/${uuid}`);
  }

  updateMenuCategory(uuid: string | undefined, category: MenuCategory) {
    return this.http.put<MenuCategory>(`${this.apiUrl}/${uuid}`, category);
  }

  deleteMenuCategory(uuid: string | undefined) {
    return this.http.delete(`${this.apiUrl}/${uuid}`);
  }
}