let counter = 0;

const printPrimitives = () => {
  let name = "Alice"; // String
  let age = 30; // Number
  let isStudent = true; // Boolean
  let unassigned; // Undefined
  let emptyValue = null; // Null
  let uniqueId = Symbol('id'); // Symbol
  let largeNumber = 9007199254740991n; // BigInt

  console.log('Name:', name, 'Type:', typeof name);
  console.log('Age:', age, 'Type:', typeof age);
  console.log('Is Student:', isStudent, 'Type:', typeof isStudent);
  console.log('Unassigned:', unassigned, 'Type:', typeof unassigned);
  console.log('Empty Value:', emptyValue, 'Type:', typeof emptyValue);
  console.log('Unique ID:', uniqueId, 'Type:', typeof uniqueId);
  console.log('Large Number:', largeNumber, 'Type:', typeof largeNumber);
}

function letVarConst() {
  if (true) {
    var x = 10;
    let y = 20;
  }
  console.log(x); // Outputs: 10
  console.log(y); // ReferenceError: y is not defined


  console.log(a); // Outputs: undefined
  var a = 5;

  console.log(b); // ReferenceError: Cannot access 'b' before initialization
  let b = 10;
}

function arithmeticOperators() {
  let x = 10;
  let y = 5;

  console.log('Addition:', x + y); // Outputs: 15
  console.log('Subtraction:', x - y); // Outputs: 5
  console.log('Multiplication:', x * y); // Outputs: 50
  console.log('Division:', x / y); // Outputs: 2
  console.log('Modulus:', x % y); // Outputs: 0
  console.log('Exponentiation:', x ** y); // Outputs: 100000
}

function comparisonOperators() {
  let x = 10;
  let y = 5;

  console.log('Equal:', x == y); // Outputs: false
  console.log('Not Equal:', x != y); // Outputs: true
  console.log('Greater Than:', x > y); // Outputs: true
  console.log('Less Than:', x < y); // Outputs: false
  console.log('Greater Than or Equal:', x >= y); // Outputs: true
  console.log('Less Than or Equal:', x <= y); // Outputs: false
}

function logicalOperators() {
  let x = 10;
  let y = 5;

  console.log('AND:', x > 5 && y < 10); // Outputs: true
  console.log('OR:', x > 5 || y > 10); // Outputs: true
  console.log('NOT:', !(x > 5)); // Outputs: false
}

function assigmentOperators() {
  let x = 10;
  let y = 5;

  console.log('Assignment:', x = y); // Outputs: 5
  console.log('Addition Assignment:', x += y); // Outputs: 10
  console.log('Subtraction Assignment:', x -= y); // Outputs: 5
  console.log('Multiplication Assignment:', x *= y); // Outputs: 25
  console.log('Division Assignment:', x /= y); // Outputs: 5
  console.log('Modulus Assignment:', x %= y); // Outputs: 0
  console.log('Exponentiation Assignment:', x **= y); // Outputs: 0
}

function incrementDecrementOperators() {
  let x = 10;

  console.log('Increment:', x++); // Outputs: 10
  console.log('Increment:', x); // Outputs: 11
  console.log('Decrement:', x--); // Outputs: 11
  console.log('Decrement:', x); // Outputs: 10
}

printPrimitives();

