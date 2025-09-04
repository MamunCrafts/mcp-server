import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service.js';
import { Product, Order, SalaryStatistics } from './statistics.types.js';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('total-sales')
  getTotalSales(): number {
    return this.statisticsService.getTotalSales();
  }

  @Get('popular-product')
  getPopularProduct(): Product | null {
    return this.statisticsService.getPopularProduct();
  }

  @Get('most-ordered-product')
  getMostOrderedProduct(): Product | null {
    return this.statisticsService.getMostOrderedProduct();
  }

  @Get('highest-order-amount')
  getHighestOrderAmount(): Order | null {
    return this.statisticsService.getHighestOrderAmount();
  }

  @Get('salary-statistics')
  getSalaryStatistics(): SalaryStatistics | null {
    return this.statisticsService.getSalaryStatistics();
  }
}
