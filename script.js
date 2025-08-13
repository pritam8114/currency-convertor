const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");
const form = document.getElementById("converter-form");

// List of currencies (ISO codes and names)
const currencies = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  INR: "Indian Rupee",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  NZD: "New Zealand Dollar"
};

// Static exchange rates relative to USD
// These rates are approximate and for demo only.
const staticRates = {
  USD: 1,
  EUR: 0.91,
  GBP: 0.78,
  INR: 82.5,
  JPY: 144.5,
  AUD: 1.46,
  CAD: 1.34,
  CHF: 0.92,
  CNY: 6.97,
  NZD: 1.58
};

// Populate currency selectors
function populateCurrencies() {
  for (const [code, name] of Object.entries(currencies)) {
    const option1 = document.createElement("option");
    option1.value = code;
    option1.textContent = `${code} - ${name}`;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = code;
    option2.textContent = `${code} - ${name}`;
    toCurrency.appendChild(option2);
  }
  fromCurrency.value = "USD";
  toCurrency.value = "EUR";
}

// Convert currency using static rates
function convert(amount, from, to) {
  // Convert amount to USD first
  const amountInUSD = amount / staticRates[from];
  // Then convert USD to target currency
  return amountInUSD * staticRates[to];
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Please enter a valid positive amount.";
    return;
  }

  if (from === to) {
    resultDiv.textContent = "Please select two different currencies.";
    return;
  }

  const converted = convert(amount, from, to);
  resultDiv.textContent = `${amount.toFixed(2)} ${from} = ${converted.toFixed(2)} ${to}`;
});

populateCurrencies();
