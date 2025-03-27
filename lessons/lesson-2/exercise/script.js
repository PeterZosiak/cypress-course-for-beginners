let counter = 0;

function printPrimitives() {
  var name = "Alice"; // Reťazec
  const age = 30; // Číslo
  let isStudent = true; // Boolean
  let unassigned; // Nedefinované
  let emptyValue = null; // Null
  let uniqueId = Symbol('id'); // Symbol
  let largeNumber = 9007199254740991n; // BigInt

  console.log('Meno:', name, 'Typ:', typeof name);
  console.log('Vek:', age, 'Typ:', typeof age);
  console.log('Je študent:', isStudent, 'Typ:', typeof isStudent);
  console.log('Nedefinované:', unassigned, 'Typ:', typeof unassigned);
  console.log('Prázdna hodnota:', emptyValue, 'Typ:', typeof emptyValue);
  console.log('Unikátne ID:', uniqueId, 'Typ:', typeof uniqueId);
  console.log('Veľké číslo:', largeNumber, 'Typ:', typeof largeNumber);
}

function letVarConst() {
  if (true) {
    var x = 10;
    let y = 20;
  }
  console.log(x); // Výstup: 10
  console.log(y); // ReferenceError: y nie je definované

  console.log(a); // Výstup: undefined
  var a = 5;

  console.log(b); // ReferenceError: Cannot access 'b' before initialization
  let b = 10;
}

function arithmeticOperators() {
  let x = 10;
  let y = 5;

  console.log('Sčítanie:', x + y); // Výstup: 15
  console.log('Odčítanie:', x - y); // Výstup: 5
  console.log('Násobenie:', x * y); // Výstup: 50
  console.log('Delenie:', x / y); // Výstup: 2
  console.log('Modulus:', x % y); // Outputs: 0
  console.log('Exponentiation:', x ** y); // Outputs: 100000
}

function comparisonOperators() {
  let x = 10;
  let y = 5;

  console.log('Rovná sa:', x == y); // Výstup: false
  console.log('Nerovná sa:', x != y); // Výstup: true
  console.log('Väčšie ako:', x > y); // Výstup: true
  console.log('Menšie ako:', x < y); // Výstup: false
  console.log('Väčšie alebo rovné:', x >= y); // Výstup: true
  console.log('Menšie alebo rovné:', x <= y); // Výstup: false
}

function logicalOperators() {
  let x = 10;
  let y = 5;

  console.log('A (AND):', x > 5 && y < 10); // Výstup: true
  console.log('Alebo (OR):', x > 5 || y > 10); // Výstup: true
  console.log('Nie (NOT):', !(x > 5)); // Výstup: false
}

function assigmentOperators() {
  let x = 10;
  let y = 5;

  console.log('Priradenie:', x = y); // Výstup: 5
  console.log('Sčítanie a priradenie:', x += y); // Výstup: 10
  console.log('Odčítanie a priradenie:', x -= y); // Výstup: 5
  console.log('Násobenie a priradenie:', x *= y); // Výstup: 25
  console.log('Delenie a priradenie:', x /= y); // Výstup: 5
  console.log('Modulus a priradenie:', x %= y); // Výstup: 0
  console.log('Mocnina a priradenie:', x **= y); // Výstup: 0
}

function incrementDecrementOperators() {
  let x = 10;

  console.log('Inkrementácia:', x++); // Výstup: 10
  console.log('Inkrementácia:', x); // Výstup: 11
  console.log('Dekrementácia:', x--); // Výstup: 11
  console.log('Dekrementácia:', x); // Výstup: 10
}

printPrimitives();

