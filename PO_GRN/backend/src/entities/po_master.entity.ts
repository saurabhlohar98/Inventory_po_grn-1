// backend/src/entities/po_master.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PoDetails } from './po_details.entity';

@Entity('po_master')
export class PoMaster {
@PrimaryGeneratedColumn()
id!: number;

@Column({ type: 'varchar' })
po_no!: string;

@Column({ type: 'date' })
po_date!: string;

@Column({ type: 'int' })
sup_id!: number;

@Column({ type: 'int', default: 0 })
rev_id!: number;

@Column({ type: 'boolean', default: false })
with_trans!: boolean;

@Column({ type: 'int', default: 0 })
trans_amt!: number;

@Column({ type: 'int', default: 0 })
total_amt!: number;

@CreateDateColumn()
created_at!: Date;

@UpdateDateColumn()
updated_at!: Date;

@OneToMany(() => PoDetails, (d) => d.po_master, { cascade: true })
details!: PoDetails[];
}
