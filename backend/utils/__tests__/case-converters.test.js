import { describe, expect, it } from 'vitest';
import { toCamelCase, toCamelCaseArray, toSnakeCase } from '../case-converters';

describe('Case Converter Utils', () => {
  describe('toCamelCase', () => {
    it('should convert snake_case keys to camelCase', () => {
      const input = { first_name: 'John', last_name: 'Doe', birth_date: '1990-01-01' };
      const expectedOutput = { firstName: 'John', lastName: 'Doe', birthDate: '1990-01-01' };

      const result = toCamelCase(input);

      expect(result).toEqual(expectedOutput);
    });

    it('should return an empty object if input is empty', () => {
      const input = {};
      const expectedOutput = {};

      const result = toCamelCase(input);

      expect(result).toEqual(expectedOutput);
    });

    it('should not modify already camelCase keys', () => {
      const input = { firstName: 'John', lastName: 'Doe' };
      const expectedOutput = { firstName: 'John', lastName: 'Doe' };

      const result = toCamelCase(input);

      expect(result).toEqual(expectedOutput);
    });
  });

  describe('toCamelCaseArray', () => {
    it('should convert an array of snake_case objects to camelCase', () => {
      const input = [
        { first_name: 'John', last_name: 'Doe' },
        { first_name: 'Jane', last_name: 'Smith' },
      ];
      const expectedOutput = [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' },
      ];

      const result = toCamelCaseArray(input);

      expect(result).toEqual(expectedOutput);
    });

    it('should return an empty array if input is an empty array', () => {
      const input = [];
      const expectedOutput = [];

      const result = toCamelCaseArray(input);

      expect(result).toEqual(expectedOutput);
    });
  });

  describe('toSnakeCase', () => {
    it('should convert camelCase keys to snake_case', () => {
      const input = { firstName: 'John', lastName: 'Doe', birthDate: '1990-01-01' };
      const expectedOutput = { first_name: 'John', last_name: 'Doe', birth_date: '1990-01-01' };

      const result = toSnakeCase(input);

      expect(result).toEqual(expectedOutput);
    });

    it('should return an empty object if input is empty', () => {
      const input = {};
      const expectedOutput = {};

      const result = toSnakeCase(input);

      expect(result).toEqual(expectedOutput);
    });

    it('should not modify already snake_case keys', () => {
      const input = { first_name: 'John', last_name: 'Doe' };
      const expectedOutput = { first_name: 'John', last_name: 'Doe' };

      const result = toSnakeCase(input);

      expect(result).toEqual(expectedOutput);
    });
  });
});
