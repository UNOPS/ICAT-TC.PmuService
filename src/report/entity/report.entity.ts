
import { Country } from "src/country/entity/country.entity";
import { BaseTrackingEntity } from "src/shared/entities/base.tracking.entity";
import { Column, Entity, ManyToOne,PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'report' })
export class Report extends BaseTrackingEntity{

    constructor() {
        super();
        this.createdBy = '';
        this.editedBy = '';
      }
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reportName: string;

    @Column()
    savedLocation: string;

    @ManyToOne(() => Country, { cascade:false })
    country: Country;

   

    @Column({ default: null })
    description: string;

    @Column({ default: null })
    isPublish: number;

    @Column({ default: 'https://act.campaign.gov.uk/wp-content/uploads/sites/25/2017/02/form_icon-1.jpg' })
    thumbnail: string;

}
