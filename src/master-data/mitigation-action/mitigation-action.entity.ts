import { MasterData } from 'src/shared/entities/master.data.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mitigationActionType')
export class MitigationActionType extends MasterData {


  @Column({ default: null })
  uniqueIdentification: string;
  
}
