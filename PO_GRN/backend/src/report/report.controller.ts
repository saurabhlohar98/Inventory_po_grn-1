// backend/src/report/report.controller.ts

import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('api/report')
export class ReportController {
  constructor(private readonly svc: ReportService) {}

  @Get('product/:proId')
  async productReport(@Param('proId', ParseIntPipe) proId: number) {
    return this.svc.productReport(proId);
  }
  @Get('products')
  async allProducts() {
  return this.svc.allProductsReport();
  }
}
