// backend/src/grn/grn.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrnService } from './grn.service';
import { GrnController } from './grn.controller';
import { GrnMaster } from '../entities/grn_master.entity';
import { GrnDetails } from '../entities/grn_details.entity';
import { PoDetails } from '../entities/po_details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrnMaster, GrnDetails, PoDetails])],
  providers: [GrnService],
  controllers: [GrnController],
})
export class GrnModule {}
