## **Lekce 5: Úvod do DOM: Vlastnosti, Metody a Globální Objekt `window`**

### **1. Obsah Lekce**

#### **A. Úvod do DOM (Document Object Model)**
- **Co je DOM?**
  - Definice a účel.
  - Reprezentace webové stránky jako stromová struktura.
- **Přístup k Prvkům DOM:**
  - `document.getElementById()`.
  - `document.querySelector()` a `document.querySelectorAll()`.
- **Manipulace s Prvky DOM:**
  - Změna obsahu (`innerText`, `innerHTML`).
  - Úprava atributů (`setAttribute()`, `getAttribute()`).
  - Přidávání a odstraňování tříd (`classList.add()`, `classList.remove()`).
- **Zpracování Událostí:**
  - Přidávání posluchačů událostí (`addEventListener()`).
  - Běžné události (kliknutí, vstup, odeslání).


##### Co je DOM?

**Definice:**
Model objektu dokumentu (DOM) je programovací rozhraní, které představuje strukturu HTML nebo XML dokumentu jako strom objektů. Každý prvek, atribut a kus textu se stává objektem, což umožňuje vývojářům programově manipulovat se strukturou, stylem a obsahem stránky.

**Klíčové Vlastnosti:**
- **Struktura jako Strom:** Dokument je reprezentován jako hierarchický strom uzlů.
- **Rozhraní pro Skriptování:** JavaScript může interagovat s uzly DOM, aby změnil to, co je zobrazeno v prohlížeči.
- **Dynamické Aktualizace:** Modifikace prvků, atributů a obsahu za běhu bez znovu načítání celé stránky.

**Případy Použití v Automatizaci Testování:**
- Výběr prvků pro ověření jejich přítomnosti, atributů nebo textu.
- Simulace uživatelských akcí (klikání, psaní) na prvcích DOM.
- Ověření, že prvky se zobrazují nebo mizí podle očekávání po určitých akcích.


##### Zpracování Událostí v DOM

**Definice:**
Zpracování událostí se vztahuje na proces detekce a reakce na uživatelské interakce nebo události řízené prohlížečem na webové stránce. Události mohou zahrnovat kliknutí, stisknutí kláves, odeslání formulářů, pohyby myší nebo jiné akce uživatele.

**Klíčové Vlastnosti:**
- **Posluchači Událostí:** Funkce, které se provádějí v reakci na specifické události.
- **Asynchronní Chování:** Události se vyskytují asynchronně, aktivovány uživatelskou interakcí nebo časovanými akcemi.
- **Kontrola nad Uživatelskou Interakcí:** Umožňuje vývojářům (a testerům) simulovat a ověřit, jak aplikace reaguje na vstup uživatele.

**Případy Použití v Automatizaci Testování:**
- Testování interakcí uživatelského rozhraní, zajištění, že kliknutí na tlačítko spustí správné chování.
- Validace logiky odeslání formuláře nebo zpracování chyb.
- Potvrzení, že události vstupu na klávesnici vedou k očekávaným změnám na obrazovce.

#### **B. Vlastnosti a Metody DOM**

**Co jsou Vlastnosti Prvků DOM?**  
Když je webová stránka načtena do prohlížeče, prohlížeč vytváří Model objektu dokumentu (DOM), který představuje strukturu stránky jako strom objektů. Každý HTML prvek na stránce se stává objektem prvku DOM, který má vlastnosti a metody, které můžete přistupovat a manipulovat pomocí JavaScriptu.

- **Vlastnosti Prvků DOM:**
  - `innerText`, `textContent`, `innerHTML`: Přístup nebo úprava textového a HTML obsahu prvku.
  - `value`: Pro prvky formuláře jako vstupy, přístup nebo nastavení uživatelsky zadané hodnoty.
  - `style`: Přístup k inline CSS vlastnostem.
  - `classList`: Přidání, odstranění nebo přepnutí CSS tříd bez přímé změny HTML řetězců.
- **Běžné Metody DOM:**
  - **Metody Výběru:**
    - `document.getElementById('id')`: Vybere prvek podle ID.
    - `document.querySelector('selector')`: Vybere první prvek odpovídající CSS selektoru.
    - `document.querySelectorAll('selector')`: Vybere všechny prvky odpovídající CSS selektoru a vrátí NodeList.
  - **Vlastní atributy:**
    - `data-*`: Atributy jsou vlastní atributy, které vám umožňují ukládat extra informace o prvku, aniž by to ovlivnilo jeho prezentaci nebo chování ve výchozím nastavení. Jsou zvlášť užitečné v JavaScriptu jako způsob přiřazení dalšího kontextu nebo konfigurace k prvkům.
    - Datové atributy jsou neuvěřitelně silné v automatizaci testování. Přiřazením atributů data-cy, data-test nebo data-testid vytváříte stabilní selektory, které jsou odolné vůči změnám uživatelského rozhraní. Tyto atributy nejsou viditelné pro uživatele a mohou být změněny, aniž by to ovlivnilo rozložení nebo styl uživatelského rozhraní. Testovací skripty mohou spolehlivě vybírat prvky pomocí cy.get('[data-test="login-button"]') v rámci Cypress, například.
  
  - **Metody Manipulace:**
    - `element.appendChild(node)`: Přidává nový uzlový prvek k prvku.
    - `element.removeChild(node)`: Odstraňuje uzlový prvek.
    - `element.setAttribute('name', 'value')`: Nastaví nebo změní atribut na prvku.
    - `element.removeAttribute('name')`: Odstraní atribut.
  - **Zpracování Událostí (stručně zmíněno):**
    - `element.addEventListener('event', callback)`: Připojte posluchače událostí k prvkům DOM.
  - **Použití Řídících Struktur a Datových Struktur:**
    - Smyčky a podmínky k dynamické aktualizaci prvků DOM (např. iterace přes pole dat k vytvoření seznamu položek).
    - Objekty k uložení selektorů nebo referencí DOM pro opětovné použití.
    - JSON data lze načíst a použít k populaci prvků, aktualizující DOM za běhu.


1. **`innerText` / `textContent`:**
   - **Účel:** Přístup nebo změna textového obsahu prvku.
   - **Příklad:**
     ```javascript
     const heading = document.getElementById('main-title');
     console.log(heading.innerText); // Čte zobrazený text nadpisu
     heading.innerText = "Vítejte na Panelu!";
     ```
   - **Rozdíl:** `innerText` respektuje styl a skryté prvky, `textContent` zobrazuje všechen text včetně skrytých prvků a přerušení řádků.

2. **`innerHTML`:**
   - **Účel:** Přístup nebo změna HTML kódu uvnitř prvku.
   - **Příklad:**
     ```javascript
     const container = document.querySelector('#content');
     container.innerHTML = "<p>Nový odstavec!</p>"; // Vkládá HTML kód
     ```
   - **Opatrnost:** Používání `innerHTML` s nedůvěryhodnými daty může vystavit vaši stránku bezpečnostním rizikům jako XSS (Cross-Site Scripting).

3. **`value`:**
   - **Účel:** U prvků formuláře (vstupy, textové oblasti), `value` získá nebo nastaví uživatelsky zadanou hodnotu.
   - **Příklad:**
     ```javascript
     const input = document.getElementById('username');
     input.value = "testUser";
     ```

4. **`classList`:**
   - **Účel:** Správa CSS tříd prvku bez ruční manipulace s řetězcem atributu `class`.
   - **Příklad:**
     ```javascript
     const button = document.querySelector('.btn');
     button.classList.add('active');
     button.classList.remove('disabled');
     button.classList.toggle('hidden');
     ```

5. **`style`:**
   - **Účel:** Přístup nebo změna inline CSS stylů prvku.
   - **Příklad:**
     ```javascript
     const box = document.querySelector('.box');
     box.style.backgroundColor = "blue";
     box.style.color = "white";
     ```
   - **Poznámka:** Je obecně lepší manipulovat s třídami a používat externí CSS místo nastavování stylů inline pro udržovatelnost.

##### Přístup k Prvkům DOM

**Výběr Prvků:**
```html
<!-- index.html -->
<div id="container">
  <h1 class="title">Ahoj, světe!</h1>
  <button id="clickMeBtn">Klikni na mě</button>
</div>
```

```javascript
// JavaScript
const container = document.getElementById("container");
const title = document.querySelector(".title");
const button = document.querySelector("#clickMeBtn");
```

**Nejlepší Praktiky:**
- Používejte `document.getElementById()`, když vybíráte podle ID pro výkon.
- Používejte `document.querySelector()` a `document.querySelectorAll()` pro komplexní nebo flexibilní selektory.
- Udržujte ID a názvy tříd popisné, aby byly selektory srozumitelnější.

##### Manipulace s Prvky DOM

**Změna Obsahu:**
```javascript
title.innerText = "Vítejte na Testovací Stránce!";
```

**Úprava Atributů:**
```javascript
button.setAttribute("disabled", "true");
console.log(button.getAttribute("id")); // "clickMeBtn"
```

**Úprava Tříd:**
```javascript
title.classList.add("highlight");
title.classList.remove("old-class");
```

**Nejlepší Praktiky:**
- Minimalizujte přímou manipulaci s DOM tím, že uchováte reference na prvky.
- Používejte třídy a CSS pro změny stylu spíše než inline styly.
- Udržujte operace DOM dávkově nebo skupinově, abyste snížili výkonové zatížení.

##### Zpracování Událostí

**Přidávání Posluchačů Událostí:**
```javascript
button.addEventListener("click", function () {
  console.log("Tlačítko bylo kliknuto!");
  container.innerHTML += "<p>Tlačítko bylo kliknuto!</p>";
});
```

**Nejlepší Praktiky:**
- Používejte nevtíravé zpracování událostí (tj. `addEventListener`) místo inline atributů `onclick`.
- Pojmenovávejte funkce zpracovávající události popisně:
  
```javascript
function handleButtonClick(event) {
  console.log("Tlačítko bylo kliknuto:", event.target);
}

button.addEventListener("click", handleButtonClick);
```

- Odstraňujte posluchače událostí, když je již nepotřebujete, abyste zabránili únikům paměti:
  
```javascript
button.removeEventListener("click", handleButtonClick);
```


#### **B. Globální Objekt `window`**
**Definice:**  
V webových prohlížečích je `window` objekt globální objekt, který reprezentuje prohlížečské okno obsahující vaši webovou stránku. Všechny globální proměnné, funkce a objekty se stávají vlastnostmi `window`.

- **Co je Objekt `window`?**
  - Objekt `window` je globální objekt v prostředí prohlížeče.
  - Reprezentuje prohlížečské okno a poskytuje metody a vlastnosti pro jeho ovládání.
- **Klíčové Vlastnosti a Metody `window`:**
  - **Vlastnosti:**
    - `window.document`: Odkazuje na aktuální DOM stránky.
    - `window.location`: Informace o aktuální URL a navigaci.
    - `window.history`: Přístup k historii relace prohlížeče.
    - `window.localStorage` a `window.sessionStorage`: Ukládejte a načítejte data v prohlížeči.
  - **Metody:**
    - `window.alert('message')`: Zobrazí dialogové okno s upozorněním.
    - `window.confirm('message')`: Zobrazí dialogové okno s potvrzením, vrací true nebo false.
    - `window.setTimeout(callback, milliseconds)`: Zpožďuje exekuci kódu.
    - `window.setInterval(callback, milliseconds)`: Provádí kód periodicky.
  - **Implicitní Globální Rozsah:**
    - Proměnné deklarované na nejvyšší úrovni (bez `let`, `const` nebo `var` ve starším kódu) se mohou stát vlastnostmi `window`—praktika, které se doporučuje vyhnout.
    - Pochopení rozsahu (z předchozích lekcí) pomáhá předcházet znečištění globálního jmenného prostoru.


**Klíčové Body o `window`:**  
- **Globální Rozsah:** Proměnné deklarované globálně (bez `let`, `const` nebo `var` ve starším kódu) se mohou stát vlastnostmi `window`. Moderní nejlepší praktiky od této funkčnosti odrazují.
- **Přístup k Dokumentu a API Prohlížeče:**  
  - `window.document` poskytuje DOM pro aktuální stránku.  
  - `window.location` poskytuje informace a metody pro aktuální URL.  
  - `window.history` umožňuje navigaci v historii relace prohlížeče.  
  - `window.alert()`, `window.confirm()`, `window.prompt()` zobrazují dialogy.  
  - `window.setTimeout()` a `window.setInterval()` plánují exekuci kódu.

**Příklad:**
```javascript
console.log(window.location.href); // Zaznamenává aktuální URL stránky
window.alert("Vítejte na stránce!");
```

**Nejlepší Praktika:**  
Vyhněte se přiřazování zbytečných dat k `window`. Uchovávejte proměnné ve funkčních nebo modulových rozsazích, aby nedocházelo k znečišťování globálního jmenného prostoru.

#### **D. Nejlepší Praktiky pro Práci s DOM a `window`**
- **Udržovatelnost Kódu:**
  - Ukládejte reference na často přístupné prvky do proměnných.
  - Používejte popisné názvy proměnných pro referencí DOM a vyhněte se „magickým řetězcům“.
- **Úvahy o Výkonu:**
  - Minimalizujte zbytečné manipulace s DOM—dávkujte změny nebo používejte techniky, které omezují přepracování a překreslování.
  - Znovu používejte pole, objekty a JSON data pro generování nebo aktualizaci DOM namísto tvrdého zakódování prvků.
- **Bezpečnost a Ověření Dat:**
  - Vyhněte se nastavení `innerHTML` s nedůvěryhodnými daty (riziko XSS).
  - Ověřujte JSON a uživatelský vstup před injekcí do DOM.
- **Použití Řídících Struktur:**
  - Používejte smyčky a podmínky k dynamické aktualizaci DOM na základě uživatelských akcí nebo dat načtených z API.
  - Například, pokud máte JSON pole produktových objektů, můžete přes ně iterovat a vytvářet DOM prvky pro každý produkt.

#### **E. Praktické Příklady**

1. **Přístup a Aktualizace Obsahu Prvků:**
   ```javascript
   const title = document.getElementById('page-title');
   title.innerText = "Vítejte na Panelu!";
   ```

2. **Úprava Atributů a Tříd Prvků:**
   ```javascript
   const loginButton = document.querySelector('#login-btn');
   loginButton.setAttribute('disabled', 'true');

   const mainHeader = document.querySelector('h1');
   mainHeader.classList.add('highlighted');
   mainHeader.classList.remove('old-class');
   ```

3. **Dynamické Vytváření a Přidávání Prvků:**
   ```javascript
   const userList = document.getElementById('user-list');
   const users = [
     { name: "Alice", role: "admin" },
     { name: "Bob", role: "user" },
     { name: "Charlie", role: "moderátor" }
   ];

   users.forEach(user => {
     const li = document.createElement('li');
     li.innerText = `${user.name} (${user.role})`;
     userList.appendChild(li);
   });
   ```

4. **Načítání JSON Dat a Aktualizace DOM:**
   
**Co je `fetch()`?**  
`fetch()` je vestavěná JavaScript funkce (část Fetch API), která vám umožňuje provádět síťové požadavky, například načítání dat z URL. Vrací Promise, takže je snadné zpracovávat asynchronní operace, aniž by to blokovalo hlavní vlákno.

   ```javascript
   fetch('users.json')
     .then(response => response.json())
     .then(data => {
       const userContainer = document.querySelector('#user-container');
       data.forEach(user => {
         const div = document.createElement('div');
         div.innerText = `${user.name} - ${user.email}`;
         userContainer.appendChild(div);
       });
     });
   ```


  5. **setTimeout**
  **Co je `setTimeout()`?**  
`setTimeout()` je funkce poskytovaná prohlížečem (přes `window`), která vám umožňuje vykonat specifikovanou funkci po nastaveném zpoždění (v milisekundách).

**Syntaxe:**
```javascript
window.setTimeout(() => {
  console.log("Tato zpráva se zobrazí po 2 sekundách");
}, 2000);
```

**Parametry:**
1. **Zpětná Funkce:** Funkce, kterou chcete spustit po zpoždění.
2. **Zpoždění (v milisekundách):** Čas, který se má čekat před zavoláním zpětné funkce. 1000 ms = 1 sekunda.

**Chování:**
- Zpětná funkce není vykonána, dokud neuplyne specifikované zpoždění.
- Kód nezablokuje; naplánuje zpětnou funkci a pokračuje v běhu zbytku skriptu. Když čas vyprší, zpětná funkce se vykoná.

**Případy Použití v Automatizaci Testování:**
- **Simulace čekacích časů uživatele:** Pokud chcete otestovat, jak se uživatelské rozhraní chová po zpoždění (jako zmizení načítacího kruhu po několika sekundách).
- **Plánování asynchronních kontrol:** Spuštění kódu po zpoždění k ověření, zda je některá podmínka v DOM splněna.

**Zastavení Timeoutu:**
- Můžete přiřadit `setTimeout()` do proměnné a použít `clearTimeout()`, abyste ho v případě potřeby zrušili.
  ```javascript
  const timeoutId = setTimeout(() => {
    console.log("Bude tato zpráva zobrazena?");
  }, 5000);

  // Ukončete timeout před jeho spuštěním
  clearTimeout(timeoutId);
  ```
   
**Důležitost JSON v Automatizaci Testování:**  
JSON (JavaScript Object Notation) je lehký datový formát, který je snadno čitelný pro lidi i stroje. Je nezávislý na jazyce a široce používaný pro komunikaci mezi klienty a servery. V automatizaci testování:

1. **Fixture a Testovací Data:**  
   Můžete ukládat testovací vstupy a očekávané výsledky do JSON souborů. To odděluje data od logiky testů, což usnadňuje aktualizaci, údržbu a opětovné použití testovacích scénářů.

2. **Testování API:**  
   Při testování aplikací, které komunikují se servery (API), jsou odpovědi často v JSON. Parsování JSON odpovědí a ověření, že vrácená data odpovídají očekávání, je jednoduché.

3. **Mockování Odpovědí:**  
   V automatizovaných testech můžete sloužit předdefinovaná JSON data jako mockované odpovědi. To zajišťuje deterministické testy bez spoléhání se na externí služby.

**Parsování a Zpracování JSON:**
- **`response.json()` metoda:**  
  Po zavolání `fetch()` často převádíte surovou odpověď na JSON:
  ```javascript
  fetch('users.json')
    .then(response => response.json()) // parsuje JSON z odpovědi
    .then(data => {
      console.log(data);
      // data je nyní JavaScriptový objekt/pole, který můžete iterovat, ověřovat nebo manipulovat
    });
  ```

#### Co je `then` ve Funkci `fetch()`?

**Vysvětlení:**
`then()` je metoda dostupná na Promises. Když zavoláte `fetch()`, vrátí to Promise. Metoda `then()` definuje, co by se mělo stát, když je tato Promise vyřešena (tj. když se asynchronní operace úspěšně dokončí).

- **První `.then()`:** Často se používá k zpracování surové odpovědi z `fetch()` a převodu na použitelný formát (jako JSON).
- **Druhá `.then()`:** Jakmile máte parsovaná data, můžete řetězit další `then()`, abyste zpracovali tato data (např. aktualizovali DOM, prováděli asertace atd.).

**Příklad:**
```javascript
fetch('users.json')
  .then(response => response.json())    // Převádí tělo odpovědi na JSON
  .then(data => {
    console.log(data);                  // Zde použijte parsovaná data
  })
  .catch(error => console.error(error));
```

**Klíčový Bod:**  
- **`then()`** je jak řetězíte operace v asynchronním toku. Každé `then()` vrací novou Promise, což vám umožňuje pokračovat v řetězci.
- **`catch()`** se používá k zpracování chyb, pokud jakákoli část řetězce selže.


5. **Použití Objektu `window`:**
   ```javascript
   console.log(window.location.href); // Aktuální URL stránky
   window.setTimeout(() => {
     alert("Čas vypršel!");
   }, 2000);
   ```

#### **F. Propojení s Předchozími Lekcemi**
- **Pole a Objekty:**
  - Použijte pole k ukládání seznamů dat a iterujte je, abyste dynamicky vytvářeli DOM prvky.
  - Použijte objekty k uložení selektorů nebo referencí DOM pro snazší manipulaci s DOM.
- **JSON a Interakce s API:**
  - Načtěte JSON data a použijte je k populaci prvků na stránce.
- **Řídící Struktury:**
  - Použijte `if/else` příkazy, smyčky a logické podmínky k rozhodnutí o způsobu a načasování aktualizace DOM, zpracování určitých vstupů uživatelů nebo úpravy vlastností `window`.
- **Kombinování Konceptů:**
  - Vše, co bylo naučeno—proměnné, funkce, pole, objekty, JSON, manipulace s DOM, zpracování událostí—může nyní být integrováno k vytvoření interaktivních a dynamických webových zážitků.

---

### **2. Aktivity Hands-On: Cvičení a Návrhy na Webovou Funkcionalitu**

#### **A. Interakce s DOM v Cvičení Testu**
- **Cvičení:**
  - Vytvořte HTML stránku s různými prvky, jako jsou tlačítka, vstupní pole a kontejnery.
  - Napište Cypress testy, které:
    - Vyberou a interagují s prvky DOM pomocí selektorů.
    - Ověří přítomnost a obsah prvků.
    - Simulují uživatelské interakce, jako jsou kliknutí a odeslání formulářů.
  - **Příklad:**
    ```html
    <!-- index.html -->
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Interakce DOM</title>
    </head>
    <body>
      <h1 id="title">Vítejte na Testovací Stránce</h1>
      <button id="changeTitle">Změnit Nadpis</button>
      <input type="text" id="username" placeholder="Zadejte uživatelské jméno" />
      <button id="submitForm">Odeslat</button>
      <div id="output"></div>

      <script>
        document.getElementById('changeTitle').addEventListener('click', () => {
          document.getElementById('title').innerText = 'Nadpis Změněn!';
        });

        document.getElementById('submitForm').addEventListener('click', () => {
          const username = document.getElementById('username').value;
          document.getElementById('output').innerText = `Ahoj, ${username}!`;
        });
      </script>
    </body>
    </html>
    ```

    ```javascript
    // Cypress Test
    describe('Test Interakce DOM', () => {
      beforeEach(() => {
        cy.visit('/index.html');
      });

      it('Změní nadpis, když je tlačítko kliknuto', () => {
        cy.get('#changeTitle').click();
        cy.get('#title').should('have.text', 'Nadpis Změněn!');
      });

      it('Odesílá formulář a zobrazuje pozdrav', () => {
        cy.get('#username').type('TestUser');
        cy.get('#submitForm').click();
        cy.get('#output').should('have.text', 'Ahoj, TestUser!');
      });
    });
    ```

- **Návrh Webové Funkcionality:**
  - Vyvinout dynamickou webovou stránku, kde uživatelé mohou:
    - Změnit název stránky kliknutím na tlačítko.
    - Odeslat formulář se svým uživatelským jménem a vidět personalizovaný pozdrav.
  - Napsat Cypress testy k automatizaci a ověření těchto interakcí.


#### **B. Aktualizace Obsahu DOM Cvičení**
- **Cvičení:**
  - Vytvořte jednoduchou webovou stránku s názvem, odstavcem a tlačítkem.
  - Napište JavaScript kód, který:
    - Změní text nadpisu pomocí `innerText`, když se stránka načte.
    - Aktualizuje text obsahu odstavce, když je tlačítko kliknuto.
  - **Návrh Webové Funkcionality:**
    - „Vítejte“ stránka, která ze začátku zobrazuje obecnou zprávu a personalizuje pozdrav, když uživatel klikne na tlačítko.

#### **C. Dynamické Vytváření Seznamu z JSON Cvičení**
- **Cvičení:**
  - Vytvořte soubor JSON (`products.json`) se polem objektů produktů (`name`, `price`, `category`).
  - Použijte `fetch()` k načtení JSON dat.
  - Dynamicky vytvořte seznam produktů na webové stránce, zobrazující jméno a cenu každého produktu.
  - **Návrh Webové Funkcionality:**
    - Stránka s výpisem produktů, která načítá data o produktech a vykresluje je do tabulky nebo seznamu, aktualizované, kdykoli se data změní.

#### **D. Použití Metod `window` Cvičení**
- **Cvičení:**
  - Zobrazte upozornění po 2 sekundách pomocí `window.setTimeout()`.
  - Zaznamenejte aktuální URL stránky pomocí `window.location.href`.
  - Implementujte tlačítko „Znovu Načíst“, které používá `window.location.reload()` k obnovení stránky.
  - **Návrh Webové Funkcionality:**
    - Stránka s časovaným oznámením a tlačítkem pro obnovení stránky, demonstrující manipulace s `window`.

---

### **3. Potenciální Otázky Studentů**

1. **Jaký je rozdíl mezi `document.getElementById()` a `document.querySelector()`?**
   - **Odpověď:**  
     `document.getElementById()` vybírá prvek podle jeho unikátního ID a je obecně rychlejší. `document.querySelector()` umožňuje vybírat prvky pomocí jakéhokoli CSS selektoru, což poskytuje větší flexibilitu.

2. **Jak mohu upravit obsah prvku DOM pomocí JavaScriptu?**
   - **Odpověď:**  
     Můžete upravit obsah pomocí vlastností jako `innerText`, `innerHTML` nebo `textContent`. Například:
     ```javascript
     document.getElementById('title').innerText = 'Nový Nadpis';
     ```

3. **Kdy bych měl použít `innerText` vs. `innerHTML`?**  
   **Odpověď:**  
   - `innerText` nastavuje nebo získává text srozumitelný člověku uvnitř prvku, ignorující HTML značky.
   - `innerHTML` vám umožňuje přidávat nebo upravovat HTML přímo. Používejte opatrnost při `innerHTML`, abyste se vyhnuli bezpečnostním rizikům jako XSS.

4. **Jak se vyhnout znečištění globálních proměnných pomocí objektu `window`?**  
   **Odpověď:**  
   - Vždy deklarujte proměnné pomocí `let` nebo `const` uvnitř funkcí nebo bloků.
   - Používejte moduly nebo uzávěry, abyste udrželi proměnné místní.
   - Nezávislé na připojování dat k `window`—uchovávejte je v objektech nebo modulech místo toho.

5. **Jaký je rozdíl mezi `document.getElementById()` a `document.querySelector()`?**  
   **Odpověď:**  
   - `getElementById()` vybírá prvek podle jeho unikátního ID a vrací jeden prvek.
   - `querySelector()` používá CSS selektory, může vybrat jakýkoli prvek odpovídající selektoru a vrací první shodu.
   - `querySelector()` je flexibilnější, ale `getElementById()` je rychlejší pro hledání jednotlivých ID.

6. **Mohu iterovat přes kolekce prvků DOM jako přes pole?**  
   **Odpověď:**  
   - `querySelectorAll()` vrací NodeList, který můžete iterovat pomocí `forEach()`.
   - Můžete také převést NodeLists nebo HTMLCollections na pole pomocí `Array.from()` a poté použít metody pole.

---

### **4. Doporučené Doplňující Materiály**

#### **A. Oficiální Dokumentace a Příručky:**
- [MDN Web Docs - Úvod do DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN Web Docs - Objekt Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)
- [MDN Web Docs - Manipulace s DOM](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)

#### **B. Tutoriály a Články:**
- **W3Schools DOM Tutorial:** [https://www.w3schools.com/js/js_htmldom.asp](https://www.w3schools.com/js/js_htmldom.asp)
- **JavaScript.info DOM Tutorial:** [https://javascript.info/document](https://javascript.info/document)

#### **C. Interaktivní Učící Platformy:**
- **FreeCodeCamp:** Cvičení na manipulaci s DOM a zpracování událostí.
- **Codecademy:** Interaktivní lekce o práci s DOM.

#### **D. Video Tutoriály:**
- **Traversy Media na YouTube:** Videa o základech manipulace s DOM.
- **The Net Ninja:** Tutoriály o DOM, vysvětlení vlastností, metod a použití objektu `window`.

#### **E. Platformy pro Praxi:**
- Vytvořte malé demo stránky, abyste experimentovali s různými metodami DOM.
- Použijte JSON soubory jako zdroje dat a dynamicky renderujte UI prvky na základě načtených dat.

#### **F. Komunita a Podpora:**
- **Stack Overflow** a **Reddit** (`r/javascript`): Skvělé zdroje pro specifické dotazy týkající se DOM.
- **Diskozní Komunity:** Připojte se k JavaScript nebo front-end zaměřeným kanálům k diskusi o výzvách DOM.

---

### **5. Navrhovaná Struktura Lekce na 3 Hodiny**

#### **Hodina 1: Vlastnosti a Metody DOM (60 minut)**
- **Rekapitulace Konceptů DOM (10 minut):**
  - Přehled struktury DOM a jak JavaScript vidí webovou stránku.
- **Vlastnosti a Metody DOM (40 minut):**
  - `innerText`, `innerHTML`, `textContent`.
  - `classList` a `style`.
  - Vytváření, modifikace a odstraňování prvků.
- **Krátký Q&A (10 minut):**
  - Odpovědět na naléhavé dotazy.

#### **Hodina 2: Globální Objekt Window a Integrace (60 minut)**
- **Prozkoumání `window` (20 minut):**
  - `window.document`, `window.location`, `window.history`.
  - Časované akce (`setTimeout`, `setInterval`).
- **Praktická Integrace s Daty (20 minut):**
  - Načíst JSON data a aktualizovat prvky DOM.
  - Použít cykly a podmínky k rozhodnutí, co zobrazit.
- **Krátký Q&A (10 minut):**
  - Vyjasnit jakékoli nejasnosti.
- **Pauza (10 minut):**
  - Rychlá přestávka.

#### **Hodina 3: Aktivity Hands-On a Nejlepší Praktiky (60 minut)**
- **Aktivity Hands-On (40 minut):**
  - Aktualizace textu a atributů.
  - Vytváření seznamů z polí nebo JSON.
  - Použití metod `window` k zobrazení upozornění nebo obnovení stránky.
- **Přehled a Q&A (20 minut):**
  - Shrnutí klíčových konceptů a nejlepších praktik.
  - Povzbudit studenty, aby experimentovali a zkoušeli složitější manipulace s DOM.

---

### **6. Další Doporučení**

#### **A. Interaktivní Demonstrace:**
- Ukázat příklady živého kódování:
  - Načtení JSON souboru a zobrazení dat na stránce.
  - Aktualizace tříd prvků při kliknutí na tlačítko.
  - Zobrazit časované upozornění pomocí `setTimeout()`.

#### **B. Zajímavé Vizualizace:**
- Použijte diagramy k zobrazení stromu DOM.
- Tokové diagramy k vizualizaci, jak data proudí z JSON do prvků DOM.
- Zvýrazněte, jak `window` sedí na nejvyšší úrovni prohlížečského prostředí.

#### **C. Povzbuzení ke Zúčastění:**
- Požádejte studenty, aby našli a zaznamenali `window.location.href`.
- Nechte studenty vytvářet a odstraňovat prvky za běhu.
- Umožněte jim vyzkoušet vybírat prvky pomocí různých metod a vlastností.

#### **D. Poskytování Jasných Pokynů:**
- Krok-za-krokem mini úkoly, např. „Změňte text nadpisu a přidejte nový odstavec pod něj.“
- Tipy k řešení problémů pro běžné chyby (např. výběr špatného ID, překlep v selektoru).

#### **E. Podpora Podpůrného Prostředí:**
- Povzbuzujte studenty, aby sdíleli své kódové úryvky.
- Nabídněte přečíst a dát zpětnou vazbu na jejich přístupy.