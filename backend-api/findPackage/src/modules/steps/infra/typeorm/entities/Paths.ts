import { v4 as uuidv4 } from "uuid";
import { Routes } from "./Routes"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
@Entity("paths")
class Paths {
    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
    @PrimaryColumn()
    id: string;
    @Column()
    @ManyToOne(() => Routes)
    @JoinColumn({ name: "route_id" })
    route_id: string;
    @Column()
    initLat: number;
    @Column()
    initLong: number;
    @Column()
    finalLat: number;
    @Column()
    finalLong: number;
    @Column()
    isInitial: boolean;
    @Column()
    isFinal: boolean;
    @CreateDateColumn()
    created_at: Date;

}

export { Paths }