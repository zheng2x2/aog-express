const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_email: {
                type: Sequelize.STRING, //(20),
                primaryKey: true,
                // allowNull: false,
                // unique: true
            },
            account_timestamp: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            user_level: { //레벨
                allowNull: false,
                type: DataTypes.SMALLINT
            },
            user_exp: { //경험치
                allowNull: false,
                type: DataTypes.INTEGER
            },
            user_coin: { 
                allowNull: false,
                type: DataTypes.INTEGER
            },
            user_hint: {
            	allowNull: false,
            	type: DataTypes.INTEGER
            },
            visit_timestamp: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.NOW
            }
        },
        { /* 테이블 옵션 */
            sequelize, //static init 메서드의 매개변수와 연결되는 옵션으로 db.sequelize 객체를 넣어야합니다. 나중에 model/index.js에서 연결합니다.
            timestamps: false, //이 속성값이 true이면 시퀄라이즈는 createdAt과 updatedAt 컬럼을 추가합니다. 각 로우가 생성될 때와 수정될 때의 시간이 자동으로 입력됩니다.
            underscored: false, //sequelize는 기본적으로 테이블명과 컬러명을 camel case(ex:createdAt)로 생성합니다. 이를 snake case(ex:created_at)로 바꾸는 옵션입니다.
            modelName: 'User', //모델이름을 설정할 수 있습니다. 노드 프로젝트에서 사용홥니다.
            tableName: 'user_info', //실제 데이터베이스의 테이블명이 됩니다. 기본적으로는 모델명을 소문자 및 복수형으로 만듭니다. 모델명이 User라면 테이블명은 users가 됩니다.
            paranoid: false, //true일 경우 deletedAt 칼럼이 생성됩니다. 로우를 삭제할 때 완전히 지워지지 않고 deletedAt에 지운 시각이 기록됩니다. 로우를 조회할 때는 deletedAt의 값이 null인 로우를 조회합니다. 이렇게 하는 이유는 나중에 로우를 복원하기 위해서 입니다. 로우를 복원해야 하는 상황이 생길 것 같다면 true로 설정해두세욧.
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    static associate(db) {} //다른 테이블과의 관계정의
}