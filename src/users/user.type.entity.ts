import { LearningMaterialUserType } from 'src/learning-material/entity/learning-material-usertype.entity';
import { MasterData } from 'src/shared/entities/master.data.entity';
import { Entity,OneToMany } from 'typeorm';

@Entity()
export class UserType extends MasterData {
  

    @OneToMany(() => LearningMaterialUserType, learningMaterialUserType => learningMaterialUserType.userType)
    public learningMaterialusertype!: LearningMaterialUserType[];
 
}
