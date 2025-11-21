// backend/src/entities/grn_details.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { GrnMaster } from './grn_master.entity';

@Entity('grn_details')
export class GrnDetails {
@PrimaryGeneratedColumn()
id!: number;

@Column({ type: 'int' })
sr_no!: number;

// Removed explicit grn_id column. FK wiAll be managed by relation with JoinColumn 'grn_id'.

@Column({ type: 'int' })
pro_id!: number;

@Column({ type: 'varchar', nullable: true })
make_actual!: string | null;

@Column({ type: 'int' })
qty!: number;

@Column({ type: 'int' })
rate!: number;

@CreateDateColumn()
created_at!: Date;

@UpdateDateColumn()
updated_at!: Date;

@ManyToOne(() => GrnMaster, (g) => g.details, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'grn_id' })
grn_master!: GrnMaster;
}
