module.exports = function(sequelize, DataTypes) {
    return sequelize.define('asset', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: '_id'
        },
        assetCode: {
            type: DataTypes.STRING(100),
            allowNull: false,
            
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
        },
        brand: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
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
            allowNull: false,
            
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
            allowNull: false,
           
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            
        },
        		
        priceVat: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            
        },	
        totalPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            
        },
        activity: {
            type: DataTypes.STRING(100),
            allowNull: false,
            
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
            allowNull: false,
            
        },
        createBy: {
            type: DataTypes.STRING(100),
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
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            
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
        timestamps: false
    });
};