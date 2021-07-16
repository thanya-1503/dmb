const bcrypt = require('bcryptjs');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('userAccount', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'username'
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'password'
        },
        createBy: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'createBy'
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'createDt'
        },
        updateBy: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'updateBy'
        },
        updateDt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updateDt'
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'status'
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,  
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,  
        },
    }, {
        sequelize,
        tableName: 'userAccount',
        schema: 'public',
        timestamps: false,
        instanceMethods: {
            generateHash(pwd) {
                return bcrypt.hash(pwd, bcrypt.genSaltSync(8));
            },
            validPassword(pwdOld, pwdNew) {
                return bcrypt.compare(pwdOld, pwdNew);
            }
        },
    });
};