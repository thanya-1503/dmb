module.exports = function(sequelize, DataTypes) {
    return sequelize.define('brand', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: '_id'
        },
        brandType: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'brandType'
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
            
        }
    }, {
        sequelize,
        tableName: 'brand',
        schema: 'public',
        timestamps: false
    });
};