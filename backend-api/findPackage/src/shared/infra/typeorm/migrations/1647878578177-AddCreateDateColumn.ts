import {Column, MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddCreateDateColumn1647878578177 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("paths",new TableColumn({
            name:"created_at",
            type:"timestamp",
            default:"now()"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("paths","created_at");
    }

}
