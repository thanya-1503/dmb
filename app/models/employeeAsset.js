module.exports = function(sequelize, DataTypes) {
    return sequelize.define('employeeAsset', {
        _id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
            field: '_id'
        },
        employeeId: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'employeeId'
        },
        assetList: {
            type: DataTypes.JSON,
            allowNull: false,
            field: 'assetList'
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'createDt'
        },
        createBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'createBy'
        },
       
        updateDt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updateDt'
        },

        updateBy: {
            type: DataTypes.STRING(100),
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
        tableName: 'employeeAsset',
        schema: 'public',
        timestamps: false
    });
};