// backend/src/data-source.ts

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
import { PoMaster } from './entities/po_master.entity';
import { PoDetails } from './entities/po_details.entity';
import { GrnMaster } from './entities/grn_master.entity';
import { GrnDetails } from './entities/grn_details.entity';

export const AppDataSource = new DataSource({
type: 'postgres',
url: process.env.DATABASE_URL,
entities: [PoMaster, PoDetails, GrnMaster, GrnDetails],
migrations: ['dist/migrations/*.{js,ts}'],
synchronize: false,
});
