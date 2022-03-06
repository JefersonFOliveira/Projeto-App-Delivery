module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(4, 2),
    urlimage: { type: DataTypes.STRING(200), field: 'url_image' },
  },
  {
    timestamps: false,
    tableName: 'products',
    underscored: true,
  });

  return Product;
};
