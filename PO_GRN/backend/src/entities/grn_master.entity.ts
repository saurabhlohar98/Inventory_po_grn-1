// backend/src/entities/grn_master.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { GrnDetails } from './grn_details.entity';
import { PoMaster } from './po_master.entity';

@Entity('grn_master')
export class GrnMaster {
@PrimaryGeneratedColumn()
id!: number;

@Column({ type: 'varchar' })
grn_no!: string;

@Column({ type: 'date' })
grn_date!: string;

@Column({ type: 'int' })
sup_id!: number;

// Removed explicit po_id column. FK will be managed by relation with JoinColumn 'po_id'.

@Column({ type: 'varchar', nullable: true })
note!: string | null;

@Column({ type: 'int', default: 0 })
total_amt!: number;

@CreateDateColumn()
created_at!: Date;

@UpdateDateColumn()
updated_at!: Date;

@OneToMany(() => GrnDetails, (d) => d.grn_master, { cascade: true })
details!: GrnDetails[];

@ManyToOne(() => PoMaster, { nullable: true })
@JoinColumn({ name: 'po_id' })
po_master!: PoMaster | null;
}
