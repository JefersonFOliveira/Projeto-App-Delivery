'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9,2),
        field: 'total_price',
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        field: 'delivery_address',
      },
      deliveryNumber: {
        type: Sequelize.STRING,
        field: 'delivery_number',
      },
      status: {
        type: Sequelize.STRING
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'sale_date',
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          Key: 'id'
        } 
      },
      sellerId: {
        type: Sequelize.INTEGER,
        field: 'seller_id',
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sales');
  }
};