// backend/src/report/report.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PoDetails } from '../entities/po_details.entity';
import { GrnDetails } from '../entities/grn_details.entity';
import { GrnMaster } from '../entities/grn_master.entity';
import { PoMaster } from '../entities/po_master.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PoDetails, GrnDetails, GrnMaster, PoMaster]),
  ],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
