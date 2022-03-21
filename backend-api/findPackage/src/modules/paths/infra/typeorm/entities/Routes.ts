import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
@Entity("routes")
class Routes {
    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
    @PrimaryColumn()
    id: string;
    @Column()
    driver_id: string;
    @Column()
    enterprise_id: string;
    @CreateDateColumn()
    created_at: Date;

}

export { Routes }