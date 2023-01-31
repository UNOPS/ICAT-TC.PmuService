import { BaseTrackingEntity } from "src/shared/entities/base.tracking.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn, Generated } from "typeorm";
import { LearningMaterialUserType } from "./learning-material-usertype.entity";
import { LearningMaterialSector } from "./learning-material-sector.entity";


@Entity({ name: 'learning_material' })
export class LearningMaterial extends BaseTrackingEntity {

    constructor() {
        super();
        this.createdBy = '';
        this.editedBy = '';
      }
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null })
    documentType: string;  // Learning Material and User Guidence
    
    @Column({ default: null })
    documentName: string;

    @Column({ default: null })
    document: string;

    @Column({ default: 'https://www.pngkey.com/png/detail/342-3428680_document-clipart.png' })  
    thumbnail: string;

    @Column({ nullable: true })
    isPublish: boolean;

    @DeleteDateColumn()
    deletedAt?: Date;

    @Column()
    @Generated("uuid")
    uniqueIdentification: string;

    @OneToMany(() => LearningMaterialUserType, learningMaterialUserType => learningMaterialUserType.userType)
    public learningMaterialusertype!: LearningMaterialUserType[];

    @OneToMany(() => LearningMaterialSector, learningMaterialSector => learningMaterialSector.learningMaterial2)
    public learningMaterialsector!: LearningMaterialSector[];

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
    sectors?: Sector[];*/





    		 	


}
