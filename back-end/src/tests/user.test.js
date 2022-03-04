const { findByEmail, create, findByRole } = require('../service/repository/userRepository');

jest.mock('../database/models', () => {
  return require('./__mocks__/userMock');
});

describe('User', () => {
  describe('findByEmail()', () => {
    const validEmail = 'adm@deliveryapp.com';
    const invalidEmail = "invalidEmail";

    it('should return valid user credentials when called with a valid email', async () => {
      const result = await findByEmail(validEmail);

      expect(typeof result.id).toBe('number');
      expect(typeof result.name).toBe('string');
      expect(typeof result.email).toBe('string');
      expect(typeof result.password).toBe('string');
      expect(typeof result.role).toBe('string');
    });

    it('should return null when called with a invalid email', async () => {
      const result = await findByEmail(invalidEmail);

      expect(result).toEqual(null);
    });
  });

  describe('create()', () => {
    const validEmail = 'valid@email.com';
    const validName = 'validName';
    const validPassword = 'validPassword123';

    it('should return valid user credentials when called with valid name, email and password', async () => {
      const result = await create(validName, validEmail, validPassword);

      expect(result.id).toEqual(1);
      expect(result.name).toEqual('validName');
      expect(result.email).toEqual('valid@email.com');
      expect(result.password).toEqual('validPassword123');
    });
  });

  describe('findByRole()', () => {
    const validRole1 = 'administrator';
    const validRole2 = 'seller';
    const validRole3 = 'customer';
    const invalidRole = 'invalid';

    it('should return a administrator user when called with a administrator role', async () => {
      const result = await findByRole(validRole1);

      expect(result.role).toEqual('administrator');
    });

    it('should return a seller user when called with a seller role', async () => {
      const result = await findByRole(validRole2);

      expect(result.role).toEqual('seller');
    });

    it('should return a customer user when called with a customer role', async () => {
      const result = await findByRole(validRole3);

      expect(result.role).toEqual('customer');
    });
    it('should return null when called with a invalid role', async () => {
      const result = await findByRole(invalidRole);

      expect(result).toEqual(null);
    });

  })
});