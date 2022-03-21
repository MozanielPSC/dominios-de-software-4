import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSteps1647816919088 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: "paths",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "route_id",
                        type: "uuid"
                    },
                    {
                        name: "initLat",
                        type: "numeric",
                    },
                    {
                        name: "finalLat",
                        type: "numeric",
                    },
                    {
                        name: "initLong",
                        type: "numeric",
                    },
                    {
                        name: "finalLong",
                        type: "numeric",
                    },
                    {
                        name: "isInitial",
                        type: "boolean",
                    },
                    {
                        name: "isFinal",
                        type: "boolean",
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKRouteRef",
                        referencedTableName: "routes",
                        referencedColumnNames: ["id"],
                        columnNames: ["route_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                ]
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("paths");
    }

}
