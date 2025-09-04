export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  products: { product: Product; quantity: number }[];
  totalAmount: number;
}

export interface Salary {
  id: number;
  employee: string;
  amount: number;
}

export interface SalaryStatistics {
  average: number;
  min: number;
  max: number;
}