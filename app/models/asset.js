module.exports = function(sequelize, DataTypes) {
    return sequelize.define('asset', {
        _id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
            field: '_id'
        },
        employeeCode: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        prefix: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        position: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        site: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        workStart: {
            type: DataTypes.DATE,
            allowNull: true
        },
        workEnd: {
            type: DataTypes.DATE,
            allowNull: true
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'createDt'
        },
        createBy: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'createBy'
        },
       
        updateDt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updateDt'
        },

        updateBy: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'updateBy'
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'status'
        }
    }, {
        sequelize,
        tableName: 'asset',
        schema: 'public',
        timestamps: false
    });
};