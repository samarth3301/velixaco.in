export interface Product {
  id: string;
  name: string;
  img: string;
  price: string;
  oldPrice?: string;
  description?: string;
  category?: string;
  badge?: string;
  badgeType?: 'new' | 'limited' | 'sale' | 'exclusive' | 'trending' | 'vault' | 'flagship' | 'essential' | 'seasonal';
}

export interface CartItem extends Product {
  qty: number;
}
