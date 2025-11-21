// backend/src/purchase/purchase.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PoMaster } from '../entities/po_master.entity';
import { PoDetails } from '../entities/po_details.entity';

@Module({
imports: [TypeOrmModule.forFeature([PoMaster, PoDetails])],
providers: [PurchaseService],
controllers: [PurchaseController],
exports: [PurchaseService],
})
export class PurchaseModule {}
