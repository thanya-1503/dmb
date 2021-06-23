module.exports = function(sequelize, DataTypes) {
    return sequelize.define('employeeAsset', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: '_id'
        },
        createBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: false,
          
        },
        updateDt: {
            type: DataTypes.DATE,
            allowNull: false,
           
        },

        updateBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
           
        },
        employeeId: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'employeeId'
        },
        assetId: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'assetId'
        },
    }, {
        sequelize,
        tableName: 'employeeAsset',
        schema: 'public',
        timestamps: false
    });
};