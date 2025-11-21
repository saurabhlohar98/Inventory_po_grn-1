// backend/src/purchase/purchase.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PoMaster } from '../entities/po_master.entity';
import { PoDetails } from '../entities/po_details.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PoMaster) private poRepo: Repository<PoMaster>,
    @InjectRepository(PoDetails) private podRepo: Repository<PoDetails>,
  ) {}

  async createPO(dto: any) {
    let total = 0;
    const details = dto.details.map((d: any) => {
      const amt = d.order_qty * d.rate;
      total += amt;
      // Do NOT set po_id here; let TypeORM set it via relation
      return {
        sr_no: d.sr_no,
        pro_id: d.pro_id,
        make: d.make,
        order_qty: d.order_qty,
        rate: d.rate,
        amt,
        pend_qty: d.order_qty,
      } as Partial<PoDetails>;
    });

    const po = this.poRepo.create({
      po_no: dto.po_no,
      po_date: dto.po_date,
      sup_id: dto.sup_id,
      rev_id: dto.rev_id || 0,
      with_trans: !!dto.with_trans,
      trans_amt: dto.trans_amt || 0,
      total_amt: total + (dto.trans_amt || 0),
      details,
    });

    return this.poRepo.save(po);
  }

  async findAll() {
    return this.poRepo.find({ relations: ['details'] });
  }

  async findOne(id: number) {
    const po = await this.poRepo.findOne({ where: { id }, relations: ['details'] });
    if (!po) throw new NotFoundException('PO not found');
    return po;
  }
}
