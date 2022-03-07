module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    totalPrice: { type: DataTypes.DECIMAL(9,2), field: 'total_price' },
    deliveryAddress: { type: DataTypes.STRING, field: 'delivery_address' },
    deliveryNumber: { type: DataTypes.STRING, field: 'delivery_number' },
    saleDate: { type: DataTypes.DATE, field: 'sale_date' },
    updatedAt: DataTypes.DATE,
    status: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, field: 'user_id', foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, field: 'seller_id' },
    seller_name: DataTypes.STRING
  },
  {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
      { foreignKey: 'user_id', as: 'user' },
      { foreignKey: 'seller_Id', as: 'user' }
  )};
  return Sale;
};