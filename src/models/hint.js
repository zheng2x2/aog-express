const Sequelize = require('sequelize');

module.exports = class Hint extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            hint_seq: {
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            hint_content: {
                allowNull: false,
                type: Sequelize.STRING
            },
            hint_priority: {
                allowNull: false,
                type: Sequelize.SMALLINT
            },
            use_flag: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            word_content: {
                allowNull: false,
                type: Sequelize.STRING
            }
        },
        {
            sequelize, 
            timestamps: false,
            underscored: false,
            modelName: 'Hint',
            tableName: 'hints',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    static associate(db) {}
}