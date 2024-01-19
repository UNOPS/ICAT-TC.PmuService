
import { MasterData } from 'src/shared/entities/master.data.entity';
import { Column, Entity} from 'typeorm';

@Entity('applicability')
export class ApplicabilityEntity extends MasterData {

  @Column({ default: null })
  uniqueIdentification: string;
}