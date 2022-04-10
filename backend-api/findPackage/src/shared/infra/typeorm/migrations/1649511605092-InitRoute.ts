import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class InitRoute1649511605092 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("routes",new TableColumn({
            name: "started",
            type: "boolean",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("routes","started");
    }

}
