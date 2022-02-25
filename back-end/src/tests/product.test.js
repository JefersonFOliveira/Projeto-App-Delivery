const { findAllProducts } = require('../service/repository/productRepository');

jest.mock('../database/models', () => {
  return require('./__mocks__/productMock');
});

describe('Product', () => {
  describe('findAllProducts()', () => {
    it('should return valid product credentials when called', async () => {
      const result = await findAllProducts();

      expect(typeof result[0].id).toBe('number');
      expect(typeof result[0].name).toBe('string');
      expect(typeof result[0].price).toBe('number');
      expect(typeof result[0].url_image).toBe('string');
    });
  });
});