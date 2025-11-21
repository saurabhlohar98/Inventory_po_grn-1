// backend/src/purchase/purchase.controller.ts

import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

@Controller('api/po')
export class PurchaseController {
constructor(private readonly svc: PurchaseService) {}
@Post()
create(@Body() dto: any) {
return this.svc.createPO(dto);
}
@Get()
list() {
return this.svc.findAll();
}
@Get(':id')
get(@Param('id', ParseIntPipe) id: number) {
return this.svc.findOne(id);
}
}
