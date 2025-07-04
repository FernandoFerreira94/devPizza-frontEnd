export interface OrderProps {
  id: string;
  table: number;
  status: boolean;
  name: string | null;
  createdAt: string;
}

export interface CategoryProps {
  id: string;
  name: string;
}

export interface ProductProps {
  id: string;
  price: string;
  name: string;
  description: string;
  image: string;
  category_id: string;
}
