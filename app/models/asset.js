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
            type: DataTypes.STRING(100),
            allowNull: false,
            
        },
        brand: {
            type: DataTypes.STRING(100),
            allowNull: false,
           
        },
        model: {
            type: DataTypes.STRING(100),
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
        puchaseDt: {
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