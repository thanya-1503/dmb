module.exports = function(sequelize, DataTypes) {
    return sequelize.define('site', {
        _id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
            field: '_id'
        },
        siteType: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'siteType'
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
        tableName: 'site',
        schema: 'public',
        timestamps: false
    });
};