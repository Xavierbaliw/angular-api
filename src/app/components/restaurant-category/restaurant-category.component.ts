import { Component, OnInit } from '@angular/core';
import { RestaurantCategoryService } from '../../services/restaurant-category.service';

@Component({
  selector: 'app-restaurant-category',
  templateUrl: './restaurant-category.component.html',
  styleUrls: ['./restaurant-category.component.css']
})
export class RestaurantCategoryComponent implements OnInit {
  restaurantCategories: any[] = [];
  selectedRestaurantCategory: any = {};
  newRestaurantCategory = {
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    status: false,
    user_id: 5,
    category_id: 3
  };

  constructor(private categoryService: RestaurantCategoryService) {}

  ngOnInit(): void {
    this.getAllRestaurantCategories();
  }


  createCategory() {
    this.categoryService.createRestaurantCategory(this.newRestaurantCategory).subscribe(response => {
      console.log('Restaurant category created:', response);
      this.getAllRestaurantCategories();
    }, error => {
      console.error('Error creating category:', error);
    });
  }


  getAllRestaurantCategories() {
    this.categoryService.getAllRestaurantCategories().subscribe(response => {
      this.restaurantCategories = response;
      console.log('All restaurant categories:', this.restaurantCategories);
    }, error => {
      console.error('Error fetching categories:', error);
    });
  }

  
  viewCategory(id: number) {
    this.categoryService.getRestaurantCategory(id).subscribe(response => {
      this.selectedRestaurantCategory = response;
      console.log('Selected category details:', this.selectedRestaurantCategory);
    }, error => {
      console.error('Error fetching category:', error);
    });
  }


  updateCategory(id: number) {
    this.categoryService.updateRestaurantCategory(id, this.selectedRestaurantCategory).subscribe(response => {
      console.log('Restaurant category updated:', response);
      this.getAllRestaurantCategories();
    }, error => {
      console.error('Error updating category:', error);
    });
  }


  deleteCategory(id: number) {
    this.categoryService.deleteRestaurantCategory(id).subscribe(response => {
      console.log('Restaurant category deleted:', response);
      this.getAllRestaurantCategories();
    }, error => {
      console.error('Error deleting category:', error);
    });
  }
}
