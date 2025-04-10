// Vypiste vsetky cisla od 1 do 100 len parne


function mojaFunkcia(meno, vek, pohlavie) {
  console.log(`Ahonj ${meno}`);
  console.log(`Mas ${vek} rokov`);
}

function scitanie(a, b) {
  const vysledok = a + b
  return vysledok
}

const nasobenie = function (a, b) {
  return a * b
}

const delenie = (a, b) => {
  return a / b
}


mojaFunkcia('Peter', 20, 'M')
let vyseldok = scitanie(10, 10)
let hodnotaScitanie = scitanie(2, 3)
console.log(hodnotaScitanie)
console.log(scitanie(5, 10))
console.log(nasobenie(5, 5))



// zadanie vytvorte kalkulacku + - * /
// delenie 0 nie je validna matematicka operacia
let a = 10
let b = 5

// Scope 
var pocasie = 'Slnecno'

function dom() {
  let televize = 'LG'
  congole.log(pocasie) // Slnecno

  if (true) {
    let gauc = 'cierny'
    console.log(gauc) // cierny
    console.log(pocasie) // Slnecno
  }

  congole.log(gauc) // ReferenceError: gauc nie je definovaná

  function manzelskaHadka() {
    let manzel = 'vinny'
    let manzelka = 'nevinna'
    let televize = 'Samsung'
    console.log(televize) // Samsung
    console.log(manzel) // vinny
    console.log(manzelka) // function manzelskaHadka() { ... }
    congole.log(pocasie) // Slnecno
  }

  manzelskaHadka()
  console.log(televize) // LG

  console.log(manzel) // ReferenceError: manzel nie je definovaná
  console.log(manzelka) // ReferenceError: manzelka nie je definovaná

}
dom()
congole.log(televize) // ReferenceError: televize nie je definovaná
console.log(pocasie) // Slnecno