module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SalesProducts', {
      quantity: DataTypes.INTEGER,
  },
  { tableName: 'salesProducts', timestamps: false });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SaleProduct,
      foreignKey: {
        name: 'saleId',
        field: 'sale_id'
      },
      otherKey: {
        name: 'productId',
        field: 'product_id'
      },
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SaleProduct,
      foreignKey: {
        name: 'productId',
        field: 'product_id'
      },
      otherKey: {
        name: 'saleId',
        field: 'sale_id'
      },
    });
  };

  return SaleProduct;
};
