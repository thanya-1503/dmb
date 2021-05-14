module.exports = function(sequelize, DataTypes) {
    return sequelize.define('typeEm', {
        _id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
            field: '_id'
        },
        emType: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'emType'
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: false,
       
        },
        createBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
           
        },
        updateBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
            
        },
        updateDt: {
            type: DataTypes.DATE,
            allowNull: false,
            
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
           
        }
    }, {
        sequelize,
        tableName: 'typeEm',
        schema: 'public',
        timestamps: false
    });
};