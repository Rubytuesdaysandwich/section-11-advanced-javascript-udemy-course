'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  movements.array.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1}${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}</div>
  </div>
  `;

    containerMovements.insertAdjacentHTML(afterbegin, html);
  });
};
displayMovements(account1.movements);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//todo has been moved const currencies = new Map([
//todo   ['USD', 'United States dollar'],
//todo   ['EUR', 'Euro'],
//todo   ['GBP', 'Pound sterling'],
//todo ]);

// todo has been moved const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// methods are functions we can call on objects
//arrays are objects
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2)); //returns a new array starting at position 2, does not mutate arr
console.log(arr.slice(2, 4));
console.log(arr.slice(-2)); //gets the last two elements of the array
console.log(arr.slice(-1));
console.log(arr.slice(1, -2)); //extracts the first array and takes of the last two leaving us with b, c
console.log(arr.slice());
console.log(arr.slice([...arr]));

//splice
//console.log(arr.splice(2));
arr.splice(-1); // takes off the last item of the array
console.log(arr); //  ['a', 'b', 'c', 'd']
arr.splice(1, 2); //taking the first and second item of the array arr
console.log(arr); // ['a', 'd']

//reverse
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //reverse mutates the array
console.log(arr2);

//concat
const letters = arr.concat(arr2); //bring together two arrays into one
console.log(letters);
console.log(...arr, ...arr2); // you can also use the spread operator

// JOIN
console.log(letters.join('-')); //make a string with - separating each item
*/
//------ end slice/splice/revers/concat/join methods
//!==================
//------The new at Method
/*
const arr = [23, 11, 64];

console.log(arr[0]); //grabs 23 from arr
console.log(arr.at(0)); // console log the element at array position 0
//getting the last array element
console.log(arr[arr.length - 1]); //grabs the last element at the end of the array
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1)); //get the last element of the array

console.log('jonas'.at(0)); //grab first character of the string
console.log('jonas'.at(-1)); //grab last character of the string
*/
//------The new at Method
//!======================
//------Looping Arrays: forEach
//const movement = [200, 450, -400, 3000, -50, -130];

//FOR-OF
//for (const movement of movements) {
// movements.entries Returns an iterable of key, value pairs for every entry in the array
// [i, movement] key value pairs example: movement 1-200 movement 2-450
// The entries() method does not change the original array.
/*
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}
//FOREACH
// the order of the parameter given in the function matter
//value: number, index: number, array: number[])
// movement = current value
//index is the current index
//array current array we are looping over
//FOREACH method can be used to loop over arrays
// continue and break does NOT work in the FOREACH loop
// using FOREACh or FOR-OF is optional
console.log('---FOREACH----');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
*/
//------end Looping Arrays: forEach
// 0: function(200)
// 1: function(450)
// 2: function(400)
// 3: function(3000)
//...
//we use a call back function to tell another higher order function what it should do
//!=============
//USD, EUR, GBP is the keys of the arrays
//United States dollar,Euro,Pound sterling is the value pair
//with MAP
// A Map holds key-value pairs where the keys can be any datatype
//A Map remembers the original insertion order of the keys
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${key}:${value}`);
});

//with SET
// Each value can only occur once in a Set.
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}:${value}`);
});
*/
//---- end map and SET
//!==============
//---- PROJECT: "Bankist" App

//---- end PROJECT: "Bankist" App
