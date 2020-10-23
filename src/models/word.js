const Sequelize = require('sequelize');

module.exports = class Word extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            word_seq: {
                primaryKey: true,
                type: Sequelize.INTEGER,

            },
            level: {
                allowNull: false,
                type: Sequelize.SMALLINT,
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
            sequelize, //static init 메서드의 매개변수와 연결되는 옵션으로 db.sequelize 객체를 넣어야합니다. 
            timestamps: false,
            underscored: false,
            modelName: 'Word',
            tableName: 'words',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    static associate(db) {}
}