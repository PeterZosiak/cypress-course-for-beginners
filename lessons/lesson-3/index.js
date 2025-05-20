function printHeight(height) {


  // Ak je vyska vacsia ako 180 cm tak som vysoky
  // Ak je vyska mensia ako 180 ale vacsia ako 170 cm tak som stredne vysoky
  // Ak je vyska mensia ako 170 ale vacsia ako 160 cm tak som nizky
  // Ak je vyska mensia ako 160 cm tak som malinky
  // TODO: Implementujte podmienky

}

const vyska = 165

if (vyska >= 180) { 
    console.log('vysoky');
    }
    else if (vyska >= 170 && vyska <180) { 
    console.log('stredne vysoky');
    }
    else if (vyska >= 160 && vyska <170) { 
    console.log('nizky');
    }
    else if (vyska < 160) { 
    console.log('malinky');
}
    
let mesiac = 'Duben';

switch (mesiac) {
    case 'Leden':
        console.log('Dnes je leden');
        break;
    case 'Únor':
        console.log('Dnes je únor');
        break;
    case 'Březen':
        console.log('Dnes je březen');
        break;
    case 'Duben':
        console.log('Dnes je duben');
        break;
    case 'Květen':
        console.log('Dnes je květen');
        break;
    case 'Červen':
        console.log('Dnes je červen');
        break;
    case 'Červenec':
        console.log('Dnes je červenec');
        break;
    case 'Srpen':
        console.log('Dnes je srpen');
        break;
    case 'Září':
        console.log('Dnes je září');
        break;
    case 'Říjen':
        console.log('Dnes je říjen');
        break;
    case 'Listopad':
        console.log('Dnes je listopad');
        break;
    case 'Prosinec':
        console.log('Dnes je prosinec');
        break;
    default:
        console.log('Neznámý měsíc');
}

/*for (let i = 1; i <= 100; i++) {
    console.log(i);
}*/

for (let i = 2; i <= 10; i++) {  
    if (i%2 == 0) {
    console.log(i);
    }
}

let a = 10
let b = 2

function suma(a, b) {
    console.log(`suma je ${a+b}`);
}
suma(a, b)

function division(a, b) {
    if (b == 0) { console.log('chyba')}
    else { 
        console.log(`devide je ${a / b}`);
        }
}
division(a, b)

function difference(a, b) {
    console.log(`difference je ${a-b}`);
}
difference(a, b)


function multiplication(a, b) {
    console.log(`multiplication je ${a*b}`);
}
multiplication(a, b)
