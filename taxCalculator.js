function calculateTax(income, rate) {
  if (typeof income !== 'number' || Number.isNaN(income)) {
    throw new Error('Income must be a number');
  }
  if (income < 0) {
    throw new Error('Income cannot be negative');
  }
  const taxRate = typeof rate === 'number' ? rate : 0.20;
  if (taxRate < 0 || taxRate > 1) {
    throw new Error('Tax rate must be between 0 and 1');
  }
  return Number((income * taxRate).toFixed(2));
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateTax };
}
