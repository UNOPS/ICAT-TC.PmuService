import { UserType } from "src/users/user.type.entity";
import { BaseTrackingEntity } from "src/shared/entities/base.tracking.entity";
import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LearningMaterial } from "./learning-material.entity";

@Entity({ name: 'learning_material_user_type' })
export class LearningMaterialUserType extends BaseTrackingEntity {

  constructor() {
    super();
    this.createdBy = '';
    this.editedBy = '';
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uniqueIdentification: string;

  @ManyToOne(() => LearningMaterial, learningMaterial => learningMaterial.learningMaterialusertype)
  public learningMaterial!: LearningMaterial;

  @ManyToOne(() => UserType, userType => userType.learningMaterialusertype)
  public userType!: UserType;
  
  @Column()
  userid: number
  /*
  @ManyToMany((type) => UserType, {
    eager: true,
    cascade: false,
  })


  @ManyToMany(() => UserType, userType => userType.learningmaterils)
  @JoinTable()
  userTypes?: UserType[];

  @ManyToMany(() => Sector, sector => sector.learningmaterils)
  @JoinTable()
  sectors?: Sector[];

*/






}
