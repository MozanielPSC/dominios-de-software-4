import { query } from "express";
import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class RouteDate1648445749529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("routes",new TableColumn({
            name:"initialDate",
            type: "timestamp"
        }))
        await queryRunner.addColumn("routes",new TableColumn({
            name:"expectedEnd",
            type:"timestamp",
            isNullable:true
        }))
        await queryRunner.addColumn("routes",new TableColumn({
            name :"isFinished",
            type:"boolean",
            default:false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("routes","initialDate");
        await queryRunner.dropColumn("routes","expectedEnd");
        await queryRunner.dropColumn("routes","isFinished");
    }

}
