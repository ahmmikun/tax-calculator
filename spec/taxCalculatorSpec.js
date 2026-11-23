const { calculateTax } = require('../taxCalculator');

describe('Tax Calculator', function () {
  it('calculates 20% tax on a whole-number income', function () {
    expect(calculateTax(1000)).toBe(200);
  });

  it('calculates tax on a decimal income', function () {
    expect(calculateTax(1234.56)).toBe(246.91);
  });

  it('returns zero tax for zero income', function () {
    expect(calculateTax(0)).toBe(0);
  });

  it('accepts a custom tax rate', function () {
    expect(calculateTax(500, 0.1)).toBe(50);
  });

  it('rejects a negative income', function () {
    expect(function () { calculateTax(-1); }).toThrowError('Income cannot be negative');
  });

  it('rejects a non-numeric income', function () {
    expect(function () { calculateTax('abc'); }).toThrowError('Income must be a number');
  });

  it('rejects a tax rate greater than 1', function () {
    expect(function () { calculateTax(100, 1.5); }).toThrowError('Tax rate must be between 0 and 1');
  });
});
