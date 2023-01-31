import { BaseTrackingEntity } from 'src/shared/entities/base.tracking.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentOwner } from './document-owner.entity';

@Entity()
export class Documents extends BaseTrackingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  documentOwner: DocumentOwner;

  @Column()
  documentOwnerId: number;

  @Column()
  mimeType: string;

  @Column()
  fileName: string;

  @Column()
  relativePath: string;

  url: string;
}
