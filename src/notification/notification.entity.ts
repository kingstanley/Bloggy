import { BaseModel } from './../basemodel';
import { Entity, Column } from 'typeorm';

@Entity()
export class Notification extends BaseModel {
    @Column()
    email: string;

    @Column()
    post: string;

    @Column()
    status: string;

    @Column()
    openedAt: Date;
}
