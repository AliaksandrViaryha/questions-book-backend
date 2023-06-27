import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCreate1686651320964 implements MigrationInterface {
    name = 'InitialCreate1686651320964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "label" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "categoryId" integer, CONSTRAINT "PK_5692ac5348861d3776eb5843672" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "title" character varying(250) NOT NULL, "answer" text NOT NULL, "rating" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_labels_label" ("questionId" integer NOT NULL, "labelId" integer NOT NULL, CONSTRAINT "PK_65347e6b008899e45d1ee4fb11b" PRIMARY KEY ("questionId", "labelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_489d3a26640efd4576929a29f4" ON "question_labels_label" ("questionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5bdf04d6550011da38d17c8fe1" ON "question_labels_label" ("labelId") `);
        await queryRunner.query(`ALTER TABLE "label" ADD CONSTRAINT "FK_c65430b21d7e973ab302b484e28" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_b8dd754e373b56714ddfa8f545c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "question_labels_label" ADD CONSTRAINT "FK_489d3a26640efd4576929a29f41" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "question_labels_label" ADD CONSTRAINT "FK_5bdf04d6550011da38d17c8fe10" FOREIGN KEY ("labelId") REFERENCES "label"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_labels_label" DROP CONSTRAINT "FK_5bdf04d6550011da38d17c8fe10"`);
        await queryRunner.query(`ALTER TABLE "question_labels_label" DROP CONSTRAINT "FK_489d3a26640efd4576929a29f41"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_b8dd754e373b56714ddfa8f545c"`);
        await queryRunner.query(`ALTER TABLE "label" DROP CONSTRAINT "FK_c65430b21d7e973ab302b484e28"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5bdf04d6550011da38d17c8fe1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_489d3a26640efd4576929a29f4"`);
        await queryRunner.query(`DROP TABLE "question_labels_label"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "label"`);
    }

}
