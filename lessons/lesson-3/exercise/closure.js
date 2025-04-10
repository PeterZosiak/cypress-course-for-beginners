// Globálny rozsah
var globalnaPremenna = "Som globálna!";

function vonkajsiaFunkcia() {
  // Rozsah vonkajšej funkcie
  let vonkajsiaPremenna = 'Som vonku!';

  function vnutornaFunkcia() {
    // Rozsah vnútornej funkcie
    let vnutornaPremenna = 'Som vnútri!';
    console.log(vonkajsiaPremenna); // Prístupné
    console.log(vnutornaPremenna); // Prístupné
    console.log(globalnaPremenna); // Prístupné
  }

  if (true) {
    // Blokový rozsah
    let blokovaPremenna = "Som v bloku!";
    console.log(blokovaPremenna); // Prístupné
  }
  congole.log(blokovaPremenna); // ReferenceError: blokovaPremenna nie je definovaná

  const arrowFunction = () => { return 'Som šípková funkcia!' };

  vnutornaFunkcia();
  console.log(globalnaPremenna); // Prístupné
  console.log(vnutornaPremenna); // ReferenceError: vnutornaPremenna nie je definovaná
  console.log(arrowFunction()); // Prístupné
}
vonkajsiaFunkcia();

function dalsiaVonkajsiaFunkcia() {
  let dalsiaVonkajsiaPremenna = "Som z vonkajšieho rozsahu!";

  function vnutornaFunkcia() {
    console.log(dalsiaVonkajsiaPremenna); // Prístup k dalsiaVonkajsiaPremenna
  }

  return vnutornaFunkcia;
}

const mojaVnutornaFunkcia = dalsiaVonkajsiaFunkcia();
mojaVnutornaFunkcia(); // Výstup: Som z vonkajšieho rozsahu!

