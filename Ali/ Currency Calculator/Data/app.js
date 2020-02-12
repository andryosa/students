// var crrncy = {
//     'EUR': {
//         'PLN': 4.15,
//         'USD': 0.83
//     },
//     'USD': {
//         'PLN': 3.45,
//         'EUR': 1.2
//     }
// }
// var btn = document.querySelector('.calculate-btn');
// var baseCurrencyInput = document.getElementById('currency-1');
// var secondCurrencyInput = document.getElementById('currency-2');
// var amountInput = document.getElementById('amount');
// var toShowAmount = document.querySelector('.given-amount');
// var toShowBase = document.querySelector('.base-currency');
// var toShowSecond = document.querySelector('.second-currency');
// var toShowResult = document.querySelector('.final-result');

// function convertCurrency(event) {
//     event.preventDefault();
//     var amount = amountInput.value;
//     var from = baseCurrencyInput.value;
//     var to = secondCurrencyInput.value;
//     var result = 0;

//     try {
//         if (from == to) {
//             result = amount;
//         } else {
//             result = amount * crrncy[to][from];
//         }
//     } catch (err) {
//         result = amount * (1 / crrncy[from][to]);
//     }

//     toShowAmount.innerHTML = amount;
//     toShowBase.textContent = from + ' = ';
//     toShowSecond.textContent = to;
//     toShowResult.textContent = result;
// }

// btn.addEventListener('click', convertCurrency);

// const currencyEl_one = document.getElementById('currency-1')
// const currencyEl_two = document.getElementById('currency-2')
// function caclulate() {
//     const currency_one = currencyEl_one.value;
//     const currency_two = currencyEl_two.value;
//     fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
//         .then(res => res.json())
//         .then(data => {
//             //console.log(data);
//             const rate = data.rates[currency_two];
//             rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
//             amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
//         });
// }


