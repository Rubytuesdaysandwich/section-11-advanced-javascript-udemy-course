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
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1}${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
  </div>
  `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//todo delete displayMovements(account1.movements);

// Computing Usernames bankist app
//accs = to accounts
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
//calculate the dollars in the account
//!
//----this is part of the display movements
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0); //get the sum of the account total

  labelBalance.textContent = `${acc.balance}€`;
};
//todo delete calcDisplayBalance(account1.movements); //display the balance to the user

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      //console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
//todo delete calcDisplaySummary(account1.movements);

//!========
//----calculate the dollars in the account
createUsernames(accounts);
//console.log(accounts);

// console.log(createUsernames('Steven Thomas Williams'));
// const user = ''; //stw

// console.log(username);
//-- end computing Username
//--------login being implemented
//event handler

//---------UPDATE USER INTERFACE
const updateUI = function (acc) {
  //display movements
  displayMovements(acc.movements);
  //display balance
  calcDisplayBalance(acc);
  //display summary
  calcDisplaySummary(acc);
};

//---------UPDATE USER INTERFACE

let currentAccount;
//!===========
btnLogin.addEventListener('click', function (e) {
  //prevent from submitting
  e.preventDefault();
  //find the current account based on their username value from accounts array
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  //Number causes it to read as a number value and not a string
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display the UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    //change the opacity of the page from 0 to 100 upon user login
    containerApp.style.opacity = 100;
    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //display movements
    //update the user interface
    updateUI(currentAccount);
    console.log('LOGIN');
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('loan');

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add movement
    //add the amount request by the user
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

//--------end login being implemented
//!===========
//-------- btn transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('TRANSFER');
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  //if the amount given is larger than money held it will not transfer
  //will reset the values in the boxes to a default value upon submission
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    //check to see if receiver account exists ?.
    receiverAcc?.username !== currentAccount.username
  ) {
    //doing the transfer pushing amounts into the movements array item of the accounts object
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // update user interface
    updateUI(currentAccount);
  }
});
//-------- end btn transfer
//!===========
//-------- CLOSE ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('delete');

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    //*findIndex method selects the index
    //findIndex can take more complicated arguments then indexOf can
    /*The findIndex() method returns the index of the 
    first element in an array that satisfies 
    the provided testing function. If no elements 
    satisfy the testing function, -1 is returned
    */
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    //check if index exists
    //indexOf(23);

    //delete accounts
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  // making the user no longer exist after being deleted
  inputCloseUsername.value = inputClosePin.value = '';
});
//--------end CLOSE ACCOUNT
//!===========
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES ▼

//todo has been moved const currencies = new Map([
//todo   ['USD', 'United States dollar'],
//todo   ['EUR', 'Euro'],
//todo   ['GBP', 'Pound sterling'],
//todo ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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
// above with the pre loaded data
//---- end PROJECT: "Bankist" App
//!==============
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // dogsJulia.slice(1, 3);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/
//!=========================
/*map returns a new array containing the results of 
applying an operation on all original array elements.
*/
/*filter returns a new array containing the array 
elements that passed a specified test condition.*/
/*reduce boils(reduces) all array 
elements down to one single value(e.g. 
  adding all elements together).*/

//------------Map method
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
//these two are the same but one is an arrow function movementsUSD
const movementsUSD = movements.map(
  mov =>  mov * eurToUsd
);
console.log(movements);
//the map method is not mutating the array.
//the map method creates a new array.
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    //ternary operator
    `Movement${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'}${Math.abs(
      mov
    )}`

  /*if (mov > 0) {
    return `Movement ${i + 1}: You deposited ${mov}`;
  } else {
    return `Movement${i + 1}: You withdrew ${Math.abs(mov)}`;
  }*/
/*
);

console.log(movementsDescriptions);
*/
//------------end map method
//!================
//-----------filter method
/*
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/
//-----------end filter method
//----------reduce method
/*
console.log(movements);
//acc --> accumulator
//accumulator is like a snowball
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// console.log(balance);
//----arrow function method//this is alternate method
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);
//---- end arrow function method
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);
//MAXIMUM VALUE
const max = movements.reduce((acc, mov) => {
  //find the maximum value using the reduce method
  // if accumulator is greater than the current movement then return the accumulator
  //if the movement is greater than the accumulator return mov
  if (acc > mov) return acc;
  else {
    return mov;
  }
}, movements[0]);
console.log(max);
*/
//----------end reduce method
//!==============
// ---------------challenge #2
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);
  // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  //  reduce the array into a single number
  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  // 2 3.(2+3)/2 = 2.5 === 2/2+2/3 = 2.5
  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);
*/
//---------ending challenge #2
//!==============
//--------chaining methods
//you can only chain the method if the method your using returns an array
//something like reduce cannot have something chained onto it
//!keep chaining methods to a minimum causing performance issues because the creation of arrays take up space
//!splice,slice methods and any methods that mutate arrays is a bad practice
//const eurToUsd = 1.1;
//console.log(movements);
//const totalDepositsUSD = movements
// .filter(mov => mov < 0)
//.filter(mov => mov > 0)
// .map((mov, i, arr) => {
//   console.log(arr);
//   return mov * eurToUsd;
// })//----debugging the chain of methods
//.map(mov => mov * eurToUsd)
//.reduce((acc, mov) => acc + mov, 0);
//console.log(totalDepositsUSD);
//--------end chaining methods
//!=============
//------- coding challenge #3
/*rewrite the 'calAverageHumanAge' function from the previous challenge, but this time as an arrow function and using chaining!

TEST DATA:[5,2,4,1,15,8,3]
TEST DATA:[16,6,10,5,6,1,4]
GOOD LUCK 😊
*/

/*
const calcAverageHumanAge =(ages) => {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4))
  .filter(age => age >= 18)
 // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  //  reduce the array into a single number
 .reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  //adult.length
 console.log(humanAges);
  // 2 3.(2+3)/2 = 2.5 === 2/2+2/3 = 2.5
  
};
const avg1 = calcAverageHumanAge([5,2,4,1,15,8,3]);
const avg2 = calcAverageHumanAge([16,6,10,5,6,1,4]);
*/

//------- coding challenge #3 end
//!=================
//------- The find method
//retrieve one element of an array based on a condition
//accepts a call back function
/*
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);
console.log(accounts);

const account = accounts.find(acc => acc.owner==='Jessica Davis')
console.log(account);
*/
//------- end The find method
//!=================
//--------login
// located in the data at the top with the bankist project
//--------login
//!=================
//--- the findIndex method
/*
The findIndex() method returns the index 
of the first element in an array that 
satisfies the provided testing function. 
If no elements satisfy the testing function, -1 is 
returned.
*/
/*
const index = accounts.findIndex(
  acc => acc.username === currentAccount.username
);
console.log(index);
*/
//----end findIndex method
//!======================
//-----some and every
console.log(movements);

/*
The some() method tests whether at least one element in 
the array passes the test implemented by the provided 
function. It returns true if, in the array, it finds an 
element for which the provided function returns true; 
otherwise it returns false. It doesn't modify the array.
*/
//EQUALITY
console.log(movements.includes(-130));

// some :CONDITION
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

/*
The every() method tests whether all elements in the 
array pass the test implemented by the provided 
function. It returns a Boolean value.
*/

//EVERY
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

//separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
//----- end some and every

/* The filter() method creates a shallow copy of a
portion of a given array, filtered down to just the
elements from the given array that pass the test
implemented by the provided function.
*/
