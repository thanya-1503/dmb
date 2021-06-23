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
            type: DataTypes.NUMERIC,
            allowNull: true,
            
        },
        purchaseNo: {
            type: DataTypes.STRING(100),
            allowNull: true,
           
        },
        price: {
            type: DataTypes.NUMERIC,
            allowNull: true,
            
        },
        		
        priceVat: {
            type: DataTypes.NUMERIC,
            allowNull: true,
            
        },	
        totalPrice: {
            type: DataTypes.NUMERIC,
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
            type: DataTypes.NUMERIC,
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
            type: DataTypes.NUMERIC,
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