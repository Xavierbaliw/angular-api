import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../model/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  menus: Menu[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus() {
    this.menuService.getMenus().subscribe({
      next: (data) => (this.menus = data),
      error: (err) => console.error(err),
    });
  }

  getMenuDetails(uuid: string | undefined) {
    this.menuService.getMenuByUUID(uuid).subscribe({
      next: (menu) => {
        alert(`
          Name: ${menu.name}
          Price: ${menu.price}
          Description: ${menu.description}
          Availability: ${menu.availability}
        `);
      },
      error: (err) => console.error(err),
    });
  }

  updateMenu(uuid: string | undefined, menu: Menu) {
    const newName = prompt('Enter new name:', menu.name || '');
    const newPrice = prompt('Enter new price:', menu.price.toString() || '');
    const newDescription = prompt('Enter new description:', menu.description || '');

    if (!newName || !newPrice || !newDescription) {
      alert('Update canceled. All fields are required.');
      return;
    }

    const updatedMenu: Menu = {
      name: newName,
      price: parseFloat(newPrice),
      description: newDescription,
      availability: true,
      restaurant_id: menu.restaurant_id,
      category_id: menu.category_id,
      menu_uuid: undefined
    };

    this.menuService.updateMenu(uuid, updatedMenu).subscribe({
      next: () => {
        alert('Menu updated successfully!');
        this.getMenus();
      },
      error: (err) => {
        console.error(err);
        alert('Error updating the menu.');
      },
    });
  }

  deleteMenu(uuid: string | undefined) {
    const isConfirmed = confirm('Are you sure you want to delete this menu?');
    if (isConfirmed) {
      this.menuService.deleteMenu(uuid).subscribe({
        next: () => {
          alert('Menu deleted successfully');
          this.getMenus();
        },
        error: (err) => {
          console.error(err);
          alert('Error deleting the menu.');
        },
      });
    }
  }

  createMenu(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out all the fields');
      return;
    }
  
    const menu: Menu = {
      name: form.value.name,
      price: form.value.price,
      description: form.value.description,
      restaurant_id: form.value.restaurant_id,
      category_id: form.value.category_id,
      availability: true,  // Optional if the backend defaults this to true
    };
  
    this.menuService.createMenu(menu).subscribe({
      next: () => {
        this.getMenus();
        form.reset();
        alert('Menu created successfully');
      },
      error: (err) => {
        console.error(err);
        alert('There was an error creating the menu. Please Check Console');
      },
    });
  }
}