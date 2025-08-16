const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateTableServicos1755299756086 {
    name = 'CreateTableServicos1755299756086'

    async up(queryRunner){
        await queryRunner.query(`DROP INDEX \`UQ_446adfc18b35418aac32ae0b7b5\` ON \`usuarios\``);
        await queryRunner.query(`CREATE TABLE \`servico\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`descricao\` varchar(200) NULL, \`img_url\` varchar(255) NULL, \`valor\` decimal(10,2) NOT NULL, \`usuario_id\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD UNIQUE INDEX \`IDX_446adfc18b35418aac32ae0b7b\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`servico\` ADD CONSTRAINT \`FK_f2bf75ba280e575f1357bb6150a\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner){
        await queryRunner.query(`ALTER TABLE \`servico\` DROP FOREIGN KEY \`FK_f2bf75ba280e575f1357bb6150a\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(0) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`created_at\` \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP INDEX \`IDX_446adfc18b35418aac32ae0b7b\``);
        await queryRunner.query(`DROP TABLE \`servico\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_446adfc18b35418aac32ae0b7b5\` ON \`usuarios\` (\`email\`)`);
    }

}
