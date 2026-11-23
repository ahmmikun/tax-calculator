const express = require('express');
const { calculateTax } = require('./taxCalculator');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', function (req, res) {
  res.send('<!DOCTYPE html><html><head><title>Tax Calculator</title></head>' +
    '<body style="font-family:Arial;text-align:center;margin-top:60px">' +
    '<h1>Tax Calculator</h1>' +
    '<p>Enter an income to calculate 20% tax.</p>' +
    '<form action="/tax" method="get">' +
    '<input type="number" name="income" placeholder="Income" required>' +
    '<button type="submit">Calculate</button></form></body></html>');
});

app.get('/tax', function (req, res) {
  try {
    const income = Number(req.query.income);
    const tax = calculateTax(income);
    res.json({ income: income, rate: 0.20, tax: tax, total: income + tax });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/health', function (req, res) {
  res.json({ status: 'UP' });
});

app.listen(port, function () {
  console.log('Tax Calculator listening on port ' + port);
});
