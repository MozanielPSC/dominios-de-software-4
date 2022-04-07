import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangePaths1648428139667 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("paths", "initLat")
        await queryRunner.dropColumn("paths", "finalLat")
        await queryRunner.dropColumn("paths", "initLong")
        await queryRunner.dropColumn("paths", "finalLong")
        await queryRunner.dropColumn("paths", "isInitial")
        await queryRunner.dropColumn("paths", "isFinal")
        await queryRunner.addColumn("paths", new TableColumn({
            name: "isInitial",
            type: "boolean",
            isNullable: true
        }))
        await queryRunner.addColumn("paths", new TableColumn({
            name: "isFinal",
            type: "boolean",
            isNullable: true
        }))
        await queryRunner.addColumn("paths", new TableColumn({
            name: "initLat",
            type: "numeric",
            isNullable: true
        }))
        await queryRunner.addColumn("paths", new TableColumn({
            name: "finalLat",
            type: "numeric",
            isNullable: true
        }))
        await queryRunner.addColumn("paths", new TableColumn({
            name: "initLong",
            type: "numeric",
            isNullable: true
        }))
        await queryRunner.addColumn("paths", new TableColumn({
            name: "finalLong",
            type: "numeric",
            isNullable: true
        }))
        await queryRunner.addColumn("paths", new TableColumn({
            name: "isComplete",
            type: "boolean",
            default: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("paths", "isInitial");
        await queryRunner.dropColumn("paths", "isFinal");
        await queryRunner.dropColumn("paths", "isComplete");
        await queryRunner.dropColumn("paths", "initLat");
        await queryRunner.dropColumn("paths", "finalLat");
        await queryRunner.dropColumn("paths", "initLong");
        await queryRunner.dropColumn("paths", "finalLong");
    }

}
