// backend/src/grn/grn.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { GrnService } from './grn.service';

@Controller('api/grn')
export class GrnController {
  constructor(private readonly svc: GrnService) {}

  @Post()
  create(@Body() dto: any) {
    return this.svc.createGRN(dto);
  }

  @Get()
  list() {
    return this.svc.findAll();
  }
}
