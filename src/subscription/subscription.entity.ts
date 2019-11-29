import { BaseModel } from '../basemodel';
import { Entity, Column, Unique } from "typeorm";

@Entity()
@Unique('subscriber', ['email'])
export class Subscription extends BaseModel  {
    @Column({nullable: false})
    email: string;

    @Column()
    tags: string;
}
