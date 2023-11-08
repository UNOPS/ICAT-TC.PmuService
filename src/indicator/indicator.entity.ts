import { Methodology } from 'src/methodology/entity/methodology.entity';
import { BaseTrackingEntity } from 'src/shared/entities/base.tracking.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Indicator extends BaseTrackingEntity {
  /**
   *
   */
  constructor() {
    super();
    this.status = 0;
    this.sortOrder = 0;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ length: 300 })
  description: string;

  @Column()
  sortOrder: number;

  @OneToMany(() => Methodology, (methodology) => methodology.indicator, {
    cascade: false,
  })
  @JoinTable()
  methodology: Methodology[];

}
