import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CityState1648445101831 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("paths", new TableColumn({
            name: "city_name",
            type: "varchar"
        }))
        await queryRunner.addColumn("paths", new TableColumn({
            name: "state",
            type: "varchar"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("paths","city_name");
        await queryRunner.dropColumn("paths","state");
    }

}
