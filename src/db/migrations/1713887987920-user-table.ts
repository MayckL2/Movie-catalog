import { MigrationInterface, QueryRunner } from "typeorm";

export class  UserTable1713887987920 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `CREATE TABLE "user" (
                  id uuid NOT NULL DEFAULT uuid_generate_v4(),
                  username varchar(256) NOT NULL,
                  password varchar(256) NOT NULL
              );`,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS user;`);
    }

}
