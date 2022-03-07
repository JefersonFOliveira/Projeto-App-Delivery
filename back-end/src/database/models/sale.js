module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    totalPrice: { type: DataTypes.DECIMAL(9,2), field: 'total_price' },
    deliveryAddress: { type: DataTypes.STRING, field: 'delivery_address' },
    deliveryNumber: { type: DataTypes.STRING, field: 'delivery_number' },
    status: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, field: 'user_id', foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, field: 'seller_id' },
  },
  {
    timestamps: true,
    updatedAt: false,
    createdAt: 'sale_date',
    tableName: 'sales',
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' },
      { foreignKey: 'sellerId', as: 'user' }
  )};
  return Sale;
};