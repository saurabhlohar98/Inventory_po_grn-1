// backend/src/report/report.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PoDetails } from '../entities/po_details.entity';
import { GrnDetails } from '../entities/grn_details.entity';
import { PoMaster } from '../entities/po_master.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(PoDetails) private podRepo: Repository<PoDetails>,
    @InjectRepository(GrnDetails) private grdRepo: Repository<GrnDetails>,
    @InjectRepository(PoMaster) private poMasterRepo: Repository<PoMaster>,
  ) {}

  // ================================
  // 1️⃣ Single product report (old)
  // ================================
  async productReport(proId: number) {
    return this.buildReportForProduct(proId);
  }

  // ======================================================
  // 2️⃣ NEW: All products report (your new requirement)
  // ======================================================
  async allProductsReport() {
    // Step 1: get all unique product IDs
    const poRows = await this.podRepo
      .createQueryBuilder('pd')
      .select('DISTINCT pd.pro_id', 'pro_id')
      .getRawMany();

    const productIds = poRows.map(row => row.pro_id);

    const fullReport: any[] = [];

    for (const pid of productIds) {
      const report = await this.buildReportForProduct(pid);
      fullReport.push(report);
    }

    return fullReport;
  }

  // ==========================
  // CORE LOGIC (used by both)
  // ==========================
  async buildReportForProduct(proId: number) {
    // Fetch all PO detail rows for this product (including the parent PO relation)
    const poDetails = await this.podRepo.find({
      where: { pro_id: proId },
      relations: ['po_master'],
      order: { id: 'ASC' },
    });

    const detailsOut: Array<any> = [];

    let totalOrdered = 0;
    let totalReceived = 0;
    let totalPending = 0;
    let totalAmount = 0;

    for (const pd of poDetails) {
      // Determine the parent PO id from the loaded relation
      const poId = (pd as any).po_master?.id ?? null;

      // Calculate received quantity by summing grn_details.qty where grn_master.po_id = poId and grn_details.pro_id = proId
      const raw = await this.grdRepo
        .createQueryBuilder('gd')
        .select('COALESCE(SUM(gd.qty), 0)', 'received')
        .innerJoin('gd.grn_master', 'gm')
        .where('gm.po_id = :poId', { poId })
        .andWhere('gd.pro_id = :proId', { proId })
        .getRawOne();

      const receivedQty = Number(raw?.received ?? 0);
      const orderQty = Number(pd.order_qty ?? 0);

      // Compute pending from GRN sums (do not use stored pend_qty)
      const pendingQty = Math.max(0, orderQty - receivedQty);

      const lineAmt = Number(pd.amt ?? orderQty * (pd.rate ?? 0));

      detailsOut.push({
        po_id: poId,
        po_no: (pd as any).po_master?.po_no ?? null,
        po_date: (pd as any).po_master?.po_date ?? null,
        sup_id: (pd as any).po_master?.sup_id ?? null,
        order_qty: orderQty,
        rate: Number(pd.rate ?? 0),
        line_amt: lineAmt,
        received_qty: receivedQty,
        pending_qty: pendingQty,
      });

      totalOrdered += orderQty;
      totalReceived += receivedQty;
      totalPending += pendingQty;
      totalAmount += lineAmt;
    }

    return {
      pro_id: proId,
      summary: {
        total_ordered: totalOrdered,
        total_received: totalReceived,
        total_pending: totalPending,
        total_amount: totalAmount,
      },
      details: detailsOut,
    };
  }
}
