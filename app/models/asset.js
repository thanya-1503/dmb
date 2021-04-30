module.exports = function(sequelize, DataTypes) {
    return sequelize.define('asset', {
        _id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
            field: '_id'
        },
        assetCode: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'assetCode'
        },
        type: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'type'
        },
        brand: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'brand'
        },
        model: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'model'
        },
        color: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'color'
        },
        serialNumber: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'serialNumber'
        },
        purchaseDt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'purchaseDt'
        },
        insuranceDt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'insuranceDt'
            
        },
        insuranceTerm: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            field: 'insuranceTerm'
        },
        purchaseNo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'purchaseNo'
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            field: 'price'
        },
        priceVat: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            field: 'priceVat'
        },
       
        totalPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            field: 'totalPrice'
        },
        activity: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'activity'
        },
        state: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'state'
        },
        repairCount: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            field: 'repairCount'
        },
        repairInsurance: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'repairInsurance'
        },
        saleDt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'saleDt'
        },
        salePrice: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            field: 'salePrice'
        },
        saleAt: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'saleAt'
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
        tableName: 'asset',
        schema: 'public',
        timestamps: false
    });
};