const { MigrationInterface, QueryRunner, Table } = require("typeorm");

module.exports = class CreateTableUsuario1754700586974 {

        async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: 'usuarios',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true,
                },
                {
                    name: 'nome',
                    type: 'varchar(100)'
                },
                {
                    name: 'email',
                    type: 'varchar(100)',
                    isUnique: true,
                },
                {
                    name: 'senha',
                    type: 'varchar(255)'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                }
            ]
        }))
    }

        async down(queryRunner) {
        await queryRunner.dropTable('usuarios');
    }

}
