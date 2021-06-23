module.exports = function(sequelize, DataTypes) {
    return sequelize.define('asset', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true,
            field: '_id'
        },
        assetCode: {
            type: DataTypes.STRING(100),
            allowNull: true,
            
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: true,
           
        },
        brand: {
            type: DataTypes.INTEGER,
            allowNull: true,
            
        },
        model: {
            type: DataTypes.INTEGER,
            allowNull: true,
           
        },
        color: {
            type: DataTypes.STRING(100),
            allowNull: true,
            
        },
        serialNumber: {
            type: DataTypes.STRING(100),
            allowNull: true,
            
        },
        purchaseDt: {
            type: DataTypes.DATE,
            allowNull: true,
            
        },
        insuranceDt: {
            type: DataTypes.DATE,
            allowNull: true,
            
            
        },
        insuranceTerm: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            
        },
        purchaseNo: {
            type: DataTypes.STRING(100),
            allowNull: true,
           
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            
        },
        		
        priceVat: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            
        },	
        totalPrice: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            
        },
        activity: {
            type: DataTypes.STRING(100),
            allowNull: true,
            
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: true,
            
        },
        repairCount: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            
        },
        repairInsurance: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            
        },
        saleDt: {
            type: DataTypes.DATE,
            allowNull: true,
            
        },
        salePrice: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            
        },
        saleAt: {
            type: DataTypes.STRING(100),
            allowNull: true,
            
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: true,
            
        },
        createBy: {
            type: DataTypes.STRING(100),
            allowNull: true,
            
        },
       
        updateDt: {
            type: DataTypes.DATE,
            allowNull: true,
           
        },

        updateBy: {
            type: DataTypes.STRING(100),
            allowNull: true,
            
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            
        },
        remark: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        boi: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    }, {
        sequelize,
        tableName: 'asset',
        schema: 'public',
        timestamps: true
    });
};