document.getElementById('tax-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const income = Number(document.getElementById('income').value);
  const result = document.getElementById('result');

  try {
    const tax = calculateTax(income);
    result.textContent = 'Tax: ' + tax.toFixed(2) + ' | Total: ' + (income + tax).toFixed(2);
    result.style.color = '#0f4c81';
  } catch (error) {
    result.textContent = error.message;
    result.style.color = '#b91c1c';
  }
});
