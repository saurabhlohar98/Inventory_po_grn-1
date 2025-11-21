// backend/src/grn/grn.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { GrnMaster } from '../entities/grn_master.entity';
import { GrnDetails } from '../entities/grn_details.entity';
import { PoDetails } from '../entities/po_details.entity';

@Injectable()
export class GrnService {
  constructor(
    @InjectRepository(GrnMaster) private grnRepo: Repository<GrnMaster>,
    @InjectRepository(GrnDetails) private grdRepo: Repository<GrnDetails>,
    @InjectRepository(PoDetails) private podRepo: Repository<PoDetails>,
    @InjectDataSource() private ds: DataSource,
  ) {}

  async createGRN(dto: any) {
    return await this.ds.transaction(async (trx) => {
      let total = 0;

      const master = await trx.getRepository(GrnMaster).save({
        grn_no: dto.grn_no,
        grn_date: dto.grn_date,
        sup_id: dto.sup_id,
        po_master: dto.po_id ? { id: dto.po_id } : null,
        note: dto.note || null,
      });

      for (const d of dto.details) {
        const amt = d.qty * d.rate;
        total += amt;

        await trx.getRepository(GrnDetails).save({
          sr_no: d.sr_no,
          grn_master: { id: master.id },
          pro_id: d.pro_id,
          make_actual: d.make_actual || null,
          qty: d.qty,
          rate: d.rate,
        });

        if (dto.po_id) {
          const poDetail = await trx.getRepository(PoDetails).findOne({
            where: { po_master: { id: dto.po_id }, pro_id: d.pro_id },
          });

          if (poDetail) {
            // Reduce pending qty but never go below zero
            poDetail.pend_qty = Math.max(0, poDetail.pend_qty - d.qty);
            await trx.getRepository(PoDetails).save(poDetail);
          }
        }
      }

      master.total_amt = total;
      await trx.getRepository(GrnMaster).save(master);

      return trx.getRepository(GrnMaster).findOne({ where: { id: master.id }, relations: ['details'] });
    });
  }

  async findAll() {
    return this.grnRepo.find({ relations: ['details'] });
  }
}
