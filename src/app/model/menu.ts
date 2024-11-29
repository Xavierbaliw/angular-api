export interface Menu {
  menu_uuid?: string;  // Added this line to handle the UUID for Menu items
  name: string;
  price: number;
  description: string;
  availability: boolean;
  restaurant_id: number;
  category_id: number;
}