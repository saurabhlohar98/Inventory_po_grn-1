// backend/src/entities/po_details.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { PoMaster } from './po_master.entity';

@Entity('po_details')
export class PoDetails {
@PrimaryGeneratedColumn()
id!: number;

@Column({ type: 'int' })
sr_no!: number;

@Column({ type: 'int' })
@Column({ type: 'int' })
pro_id!: number;

@Column({ type: 'varchar', nullable: true })
make!: string | null;

@Column({ type: 'int' })
order_qty!: number;

@Column({ type: 'int' })
rate!: number;

@Column({ type: 'int' })
amt!: number;

@Column({ type: 'int', default: 0 })
pend_qty!: number;

@CreateDateColumn()
created_at!: Date;

@UpdateDateColumn()
updated_at!: Date;

@ManyToOne(() => PoMaster, (p) => p.details, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'po_id' })
po_master!: PoMaster;
}
