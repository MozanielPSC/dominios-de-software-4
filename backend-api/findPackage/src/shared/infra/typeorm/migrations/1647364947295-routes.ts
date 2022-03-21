import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class routes1647364947295 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: "routes",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "driver_id",
                        type: "uuid"
                    },
                    {
                        name: "enterprise_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys:[
                    {
                        name: "FKRouteDriver",
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                        columnNames: ["driver_id"],
                        onDelete: "CASCADE",
                        onUpdate:"CASCADE"
                      },
                      {
                        name: "FKRouteEnterprise",
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                        columnNames: ["enterprise_id"],
                        onDelete: "CASCADE",
                        onUpdate:"CASCADE"
                      }
                ]
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("routes")
    }

}
