module.exports = function(sequelize, DataTypes) {
    return sequelize.define('repair', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: '_id'
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'state'
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: false,
       
        },
        createBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
           
        },
        assetCode: {
            type: DataTypes.STRING(100),
            allowNull: true,
            
        },
        updateBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
            
        },
        updateDt: {
            type: DataTypes.DATE,
            allowNull: false,
            
        },
        remark: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        boi: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        pricerepair: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        pricerepairvat: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        totalpricerepair: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        repairAt: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        repairDt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'repair',
        schema: 'public',
        timestamps: false
    });
};