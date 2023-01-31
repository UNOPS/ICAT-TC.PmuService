import { LearningMaterialUserType } from 'src/learning-material/entity/learning-material-usertype.entity';
import { LearningMaterial } from 'src/learning-material/entity/learning-material.entity';
import { MasterData } from 'src/shared/entities/master.data.entity';
import { Entity,OneToMany } from 'typeorm';

@Entity()
export class UserType extends MasterData {
  
    // @Column()
    // userRoleIdIdentity : string;
    
    // @Column()
    // userRoleNameIdentity : string;

    //@ManyToMany(() =>LearningMaterial, learningMaterial => learningMaterial.userTypes)
    //learningmaterils?:LearningMaterial[];

    @OneToMany(() => LearningMaterialUserType, learningMaterialUserType => learningMaterialUserType.userType)
    public learningMaterialusertype!: LearningMaterialUserType[];
 
}
