module.exports = function(sequelize, DataTypes) {
    return sequelize.define('userAccount', {
        _id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
            field: '_id'
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        createBy: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'createBy'
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'createDt'
        },
        updateBy: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'updateBy'
        },
        updateDt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updateDt'
        }
    }, {
        sequelize,
        tableName: 'userAccount',
        schema: 'public',
        timestamps: false
    });
};