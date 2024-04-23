import { MigrationInterface, QueryRunner } from 'typeorm';

export class MovieTable1713887935145 implements MigrationInterface {
    
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TABLE "movie" (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            name varchar(256) NOT NULL,
            description varchar(512) NULL,
            duration int NOT NULL,
            classification int NOT NULL
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS movie;`);
  }
}
