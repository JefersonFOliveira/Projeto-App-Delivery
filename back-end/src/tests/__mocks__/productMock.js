const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

const productMock = dbMock.define('Product', {
  id: 1,
  name: 'Skol Lata 250ml',
  price: 2.20,
  url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
});

module.exports = { Product: productMock };