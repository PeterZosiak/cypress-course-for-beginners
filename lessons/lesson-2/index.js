// work at home

var name = "Liudmyla";
const age = 18
let abc = 53;

console.log(name);
console.log(age);
console.log(abc);

function math1() {
let x = 11;
let y = 22;
console.log('addition:', x + y);
console.log('subtraction:', x - y);
console.log('multiplication:', x * y);
console.log('division:', x / y);
console.log('Modulus:', x % y);
console.log('Exponentiation:', x ** y);
}

function math2(x,y) {
    /*let x = 11;
    let y = 22;*/
    console.log('addition:', x + y);
    console.log('subtraction:', x - y);
    console.log('multiplication:', x * y);
    console.log('division:', x / y);
    console.log('Modulus:', x % y);
    console.log('Exponentiation:', x ** y);
    }

function log() {
    let x = 10;
    let y = 5;

    console.log('A (AND):', x > 5 && y < 10);
    console.log('Alebo (OR):', x > 5 || y > 10);
    console.log('Nie (NOT):', !(x > 5));
  }

let a = 12;
let b = 7;
console.log('equal to:', a == b);
console.log('not equal to:', a != b);
console.log('Is greater than:', a > b);
console.log('Is less than:', a < b);
console.log('Is greater than or equal to', a >= b);
console.log('Is less than or equal to', a <= b);

math1() // math procedure call

log() // log procedure call

math2(x=1, y=2); //procedure call procedure call with definished variables

function incrementDecrementOperators() {
let x = 10;
let y = 5;
console.log('Priradenie:', x = y); //Assignment (Присвоєння) y variable x - x=5
console.log('Sčítanie a priradenie:', x += y); // x = x + y, x = 5+5 =10
console.log('Odčítanie a priradenie:', x -= y); //x = x - y, x = 10-5=5
console.log('Násobenie a priradenie:', x *= y); //x = x * y, x = 5*5=25
console.log('Delenie a priradenie:', x /= y); //x = x / y, x=25/5=5
console.log('Modulus a priradenie:', x %= y); //x = x % y, 0
console.log('Mocnina a priradenie:', x **= y); //x = x ** y, 0
}

let c = 10;
console.log('Inkrementácia:', c++); // post-increment, output = 10
console.log('Inkrementácia:', c); // 11
console.log('Dekrementácia:', c--); // post-increment, output = 11
console.log('Dekrementácia:', c); // 10

let d = 10;
console.log('Inkrementácia:', ++d); //pre-increment, 11
console.log('Dekrementácia:', --d); //pre-increment, 10
