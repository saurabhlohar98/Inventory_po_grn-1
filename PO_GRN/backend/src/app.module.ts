// backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseModule } from './purchase/purchase.module';
import { GrnModule } from './grn/grn.module';
import { ReportModule } from './report/report.module';
import { PoMaster } from './entities/po_master.entity';
import { PoDetails } from './entities/po_details.entity';
import { GrnMaster } from './entities/grn_master.entity';
import { GrnDetails } from './entities/grn_details.entity';

@Module({
imports: [
ConfigModule.forRoot({ isGlobal: true }),
TypeOrmModule.forRoot({
type: 'postgres',
url: process.env.DATABASE_URL,
entities: [PoMaster, PoDetails, GrnMaster, GrnDetails],
synchronize: false,
logging: process.env.NODE_ENV !== 'production',
}),
PurchaseModule,
GrnModule,
ReportModule,
],
})
export class AppModule {}
