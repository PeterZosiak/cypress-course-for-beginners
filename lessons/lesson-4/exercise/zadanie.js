// Vytvorte pole mien, aby boli aspon 4 mena

let userNames = ["Peter", "Jozef", "Milan"];

// console.log(userNames[0])

// userNames.push("Nove meno")
// userNames.pop(1)

// console.log(userNames)

// userNames.forEach((element) => {
//   console.log(element.toUpperCase())
// })

// console.log(userNames)


let userProfiles =
  [
    {
      "jemno": "Peter",
      "prijmeni": "Zosiak",
      vek: 35,
      jeAktivny: true,
      role: ["admim", "tester"],
      adresa: {
        ulica: null,
        mesto: undefined,
        geo: {
          sirka: "adsdas",
          dlska: "asdsadas"
        }
      }
    },
    {
      jemno: "Jozef",
      prijmeni: "Kozak",
      vek: 30,
      jeAktivny: false,
      role: ["user"],
      adresa: {
        ulica: "Hlavna",
        mesto: "Bratislava",
        geo: {
          sirka: "adsdas",
          dlska: "asdsadas"
        }
      }
    },
  ]

// console.log(userProfiles[0].jemno); // Alice
// console.log(userProfiles[0].adresa.mesto); // Townsville

// console.log(userProfiles[0]["jemno"]); // Alice
// console.log(userProfiles[0]["adresa"]["mesto"]); // Townsville


// Vytvorte pole users, ktoré bude obsahovať zoznam používateľov. 
// Každý user bude mať nasledovné vlastnosti: meno, email, role (admin || user), adresu (ulica, mesto, PSČ)

// // Vypiste pole users do konzoly
// console.log(userProfiles);

// // Vypiste meno prveho pouzivatela
// console.log(userProfiles[0].jemno);

// Vypiste len mena vsetkych pouzivatelov
// userProfiles.forEach((user) => {
//   console.log(user.jemno);
// });

// // ====
// for (let i = 0; i < userProfiles.length; i++) {
//   console.log(userProfiles[i].jemno);
// }


// Pridajte do pola users 1 nového usera 
userProfiles.push(
  {
    jemno: "Mila",
    prijmeni: "Zosiak",
    vek: 35,
    jeAktivny: true,
    role: ["admim", "tester"],
    adresa: {
      ulica: "Hlavna",
      mesto: "Praha",
      geo: {
        sirka: "adsdas",
        dlska: "asdsadas"
      }
    }
  }
)

console.log(userProfiles);
let userProfilesJsonString = JSON.stringify(userProfiles)














let phones = '[{"id":"1","name":"Google Pixel 6 Pro","data":{"color":"Cloudy White","capacity":"128 GB"}},{"id":"2","name":"Apple iPhone 12 Mini, 256GB, Blue","data":null},{"id":"3","name":"Apple iPhone 12 Pro Max","data":{"color":"Cloudy White","capacity GB":512}},{"id":"4","name":"Apple iPhone 11, 64GB","data":{"price":389.99,"color":"Purple"}},{"id":"5","name":"Samsung Galaxy Z Fold2","data":{"price":689.99,"color":"Brown"}},{"id":"6","name":"Apple AirPods","data":{"generation":"3rd","price":120}},{"id":"7","name":"Apple MacBook Pro 16","data":{"year":2019,"price":1849.99,"CPU model":"Intel Core i9","Hard disk size":"1 TB"}},{"id":"8","name":"Apple Watch Series 8","data":{"Strap Colour":"Elderberry","Case Size":"41mm"}},{"id":"9","name":"Beats Studio3 Wireless","data":{"Color":"Red","Description":"High-performance wireless noise cancelling headphones"}},{"id":"10","name":"Apple iPad Mini 5th Gen","data":{"Capacity":"64 GB","Screen size":7.9}},{"id":"11","name":"Apple iPad Mini 5th Gen","data":{"Capacity":"254 GB","Screen size":7.9}},{"id":"12","name":"Apple iPad Air","data":{"Generation":"4th","Price":"419.99","Capacity":"64 GB"}},{"id":"13","name":"Apple iPad Air","data":{"Generation":"4th","Price":"519.99","Capacity":"256 GB"}}]'


let phonesData = JSON.parse(phones)

// Vypiste prvy produkt jeho meno, id
// Vypiste mena vsetkych produktov 
















// phones.forEach(element => {
//   console.log(element.name);
// });

// const parsedUserProfiles = '"[{\"jemno\":\"Peter\",\"prijmeni\":\"Zosiak\",\"vek\":35,\"jeAktivny\":true,\"role\":[\"admim\",\"tester\"],\"adresa\":{\"ulica\":null,\"geo\":{\"sirka\":\"adsdas\",\"dlska\":\"asdsadas\"}}},{\"jemno\":\"Jozef\",\"prijmeni\":\"Kozak\",\"vek\":30,\"jeAktivny\":false,\"role\":[\"user\"],\"adresa\":{\"ulica\":\"Hlavna\",\"mesto\":\"Bratislava\",\"geo\":{\"sirka\":\"adsdas\",\"dlska\":\"asdsadas\"}}},{\"jemno\":\"Mila\",\"prijmeni\":\"Zosiak\",\"vek\":35,\"jeAktivny\":true,\"role\":[\"admim\",\"tester\"],\"adresa\":{\"ulica\":\"Hlavna\",\"mesto\":\"Praha\",\"geo\":{\"sirka\":\"adsdas\",\"dlska\":\"asdsadas\"}}}]"'


// let newUserPRofiles = JSON.parse(JSON.stringify(userProfiles))

// newUserPRofiles.forEach((user) => {
//   if (user.adresa.mesto != undefined) {
//     console.log(user.adresa.mesto);
//   }
// })

// console.log(newUserPRofiles[0].jemno); // Peter

