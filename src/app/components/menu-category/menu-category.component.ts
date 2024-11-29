import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuCategory } from '../../model/menu-category';
import { MenuCategoryService } from '../../services/menu-category.service';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css']
})
export class MenuCategoryComponent implements OnInit {
  
  categories: MenuCategory[] = [];
  
  constructor(private menuCategoryService: MenuCategoryService) {}

  ngOnInit(): void {
    this.getMenuCategories();
  }

  getMenuCategories() {
    this.menuCategoryService.getMenuCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error(err),
    });
  }

  getMenuCategoryDetails(uuid: string | undefined) {
    this.menuCategoryService.getMenuCategoryByUUID(uuid).subscribe({
      next: (category) => {
        alert(`
          Name: ${category.name}
        `);
      },
      error: (err) => console.error(err),
    });
  }

  updateMenuCategory(uuid: string | undefined, category: MenuCategory) {
    const newName = prompt('Enter new name:', category.name || '');

    if (!newName) {
      alert('Update canceled. Name is required.');
      return;
    }

    const updatedCategory: MenuCategory = {
      name: newName,
    };

    this.menuCategoryService.updateMenuCategory(uuid, updatedCategory).subscribe({
      next: () => {
        alert('Menu category updated successfully!');
        this.getMenuCategories();
      },
      error: (err) => {
        console.error(err);
        alert('There was an error updating the category. Please check console');
      },
    });
  }

  deleteMenuCategory(uuid: string | undefined) {
    const isConfirmed = confirm('Are you sure you want to delete this category?');
    if (isConfirmed) {
      this.menuCategoryService.deleteMenuCategory(uuid).subscribe({
        next: () => {
          alert('Menu category deleted successfully');
          this.getMenuCategories();
        },
        error: (err) => {
          console.error(err);
          alert('There was an error deleting the category. Please Check Console');
        },
      });
    }
  }

  createMenuCategory(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out all the fields');
      return;
    }

    const menuCategory: MenuCategory = {
      ...form.value
    };

    this.menuCategoryService.createMenuCategory(menuCategory).subscribe({
      next: () => {
        this.getMenuCategories();
        form.reset();
        alert('Menu category created successfully');
      },
      error: (err) => {
        console.error(err);
        alert('There was an error creating the category. Please Check Console');
      },
    });
  }
}