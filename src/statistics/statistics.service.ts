import { Injectable } from '@nestjs/common';
import { Product, Order, Salary, SalaryStatistics } from './statistics.types.js';

@Injectable()
export class StatisticsService {
  private readonly orders: Order[] = [
    {
      id: 1,
      products: [
        { product: { id: 1, name: 'Product A', price: 10 }, quantity: 2 },
        { product: { id: 2, name: 'Product B', price: 20 }, quantity: 1 },
      ],
      totalAmount: 40,
    },
    {
      id: 2,
      products: [
        { product: { id: 1, name: 'Product A', price: 10 }, quantity: 5 },
      ],
      totalAmount: 50,
    },
    {
      id: 3,
      products: [
        { product: { id: 2, name: 'Product B', price: 20 }, quantity: 3 },
        { product: { id: 3, name: 'Product C', price: 30 }, quantity: 1 },
      ],
      totalAmount: 90,
    },
    {
      id: 4,
      products: [
        { product: { id: 3, name: 'Product C', price: 30 }, quantity: 1 },
      ],
      totalAmount: 30,
    },
  ];

  private readonly salaries: Salary[] = [
    { id: 1, employee: 'John Doe', amount: 5000 },
    { id: 2, employee: 'Jane Doe', amount: 6000 },
    { id: 3, employee: 'Peter Jones', amount: 5500 },
  ];

  getTotalSales(): number {
    if (this.orders.length === 0) {
      return 0;
    }
    return this.orders.reduce((total, order) => total + order.totalAmount, 0);
  }

  getPopularProduct(): Product | null {
    if (this.orders.length === 0) {
      return null;
    }

    const productCounts = this.orders
      .flatMap((order) => order.products)
      .reduce((acc, { product }) => {
        acc[product.id] = (acc[product.id] || 0) + 1;
        return acc;
      }, {});

    if (Object.keys(productCounts).length === 0) {
      return null;
    }

    const popularProductId = Object.keys(productCounts).reduce((a, b) =>
      productCounts[a] > productCounts[b] ? a : b,
    );

    const foundItem = this.orders
      .flatMap((order) => order.products)
      .find(({ product }) => product.id === +popularProductId);
    
    return foundItem ? foundItem.product : null;
  }

  getMostOrderedProduct(): Product | null {
    if (this.orders.length === 0) {
      return null;
    }

    const productQuantities = this.orders
      .flatMap((order) => order.products)
      .reduce((acc, { product, quantity }) => {
        acc[product.id] = (acc[product.id] || 0) + quantity;
        return acc;
      }, {});

    if (Object.keys(productQuantities).length === 0) {
      return null;
    }

    const mostOrderedProductId = Object.keys(productQuantities).reduce((a, b) =>
      productQuantities[a] > productQuantities[b] ? a : b,
    );

    const foundItem = this.orders
      .flatMap((order) => order.products)
      .find(({ product }) => product.id === +mostOrderedProductId);
    
    return foundItem ? foundItem.product : null;
  }

  getHighestOrderAmount(): Order | null {
    if (this.orders.length === 0) {
      return null;
    }
    return this.orders.reduce((maxOrder, order) =>
      order.totalAmount > maxOrder.totalAmount ? order : maxOrder,
    );
  }

  getSalaryStatistics(): SalaryStatistics | null {
    if (this.salaries.length === 0) {
      return null;
    }

    const amounts = this.salaries.map((s) => s.amount);
    const average = amounts.reduce((a, b) => a + b, 0) / amounts.length;
    const min = Math.min(...amounts);
    const max = Math.max(...amounts);

    return { average, min, max };
  }
}
