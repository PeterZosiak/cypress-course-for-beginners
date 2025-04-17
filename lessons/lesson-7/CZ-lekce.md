### **Lekce 7: Interakce s webovými prvky a zpracování uživatelských vstupů**

## **1. Osnova obsahu**

### **A. Úvod**
- **Proč je interakce s webovými prvky důležitá:**
  - Ověřuje, jak uživatelé interagují s prvky jako jsou tlačítka, vstupní pole, zaškrtávací políčka, rozbalovací nabídky atd.
  - Zajišťuje, že webové aplikace fungují podle očekávání v reakci na uživatelské vstupy.


##### Proč je interakce s webovými prvky důležitá

**Vysvětlení:**
- **Simulace reálního světa:**  
  Interakce s webovými prvky simuluje, jak skuteční uživatelé interagují s webovou aplikací. Automatizované testy, které replikují kliknutí, psaní a další akce, pomáhají zajistit, že uživatelské rozhraní správně reaguje v každém scénáři.

- **Ověření chování uživatelského rozhraní:**  
  Potvrzuje, že akce uživatelů (např. odeslání formuláře, výběr možnosti nebo vyvolání modálního okna) vedou k očekávaným změnám v DOM, jako je zobrazování chybových hlášení, aktualizace obsahu nebo navigace na novou stránku.

- **Zachycení regresních problémů:**  
  Automatizované interakce mohou rychle zachytit regresi uživatelského rozhraní. Pokud vývojář provede změnu, která ovlivňuje fungování tlačítka, testy interakce problém ihned označí.

- **Testování end-to-end:**  
  Testování interakcí je zásadní pro end-to-end (E2E) testy, kde je ověřena celá uživatelská cesta - od načtení stránky po provádění sekvence akcí a porovnání výsledků.


### **B. Výběr prvků v Cypressu**
- **CSS Selektory (základní metodologie):**
  - Základní selektory: `.class`, `#id`, `tag`.
  - Složené selektory: `div > button`, `input[type="text"]`.
- **Použití atributů `data-*`:**
  - Best practicies pro selektory v automatizaci:
    ```javascript
    cy.get('[data-testid="login-button"]');
    ```
- **Metody pro procházení:**
  - Najít podřízené prvky: `cy.get('div').find('button')`.
  - Navigace v DOM struktuře: `.parent()`, `.children()`, `.next()`, `.prev()`.
- **Best practicies:**
  - Používejte atributy `data-*` pro stabilitu testů.
  - Vyhněte se křehkým selektorům jako `nth-child`.

##### Proč je atribut `data-testid` lepší než ID nebo CLASS selektor

**Vysvětlení:**
- **Stabilita při změnách uživatelského rozhraní:**  
  Atributy `data-testid` jsou vyhrazeny výhradně pro testování. Obvykle nejsou ovlivněny návrhem CSS nebo refaktoringem, na rozdíl od ID nebo tříd, které se mohou měnit na základě požadavků na design.

- **Oddělení zájmů:**  
  Udržování testovacích selektorů odděleně od stylových či strukturních selektorů zajišťuje, že testy zůstanou robustní a nebudou přerušeny vizuálními aktualizacemi.

- **Popisné a záměr odhalující:**  
  Jasně naznačují, že atribut je určen pro testování (např. `data-testid="login-button"`), což usnadňuje porozumění a údržbu testů.

- **Vyhýbání se konfliktům:**  
  ID a třídy jsou používány pro stylování a rozvržení, takže spolehnutí se na ně může vést k konfliktům nebo neočekávanému chování, pokud jsou stejné selektory znovu použity.

**Příklad:**
```html
<!-- Použití data-testid pro testování -->
<button data-testid="submit-button">Odeslat</button>
```
```javascript
// Cypress test využívající data-testid
cy.get('[data-testid="submit-button"]').click();
```


---

### **C. Akce na webových prvcích**
1. **Klikání na prvky:**
   - Použijte `cy.click()` pro simulaci kliknutí.
   - Příklad:
     ```javascript
     cy.get('[data-testid="submit-button"]').click();
     ```

2. **Psaní do vstupních polí:**
   - Použijte `cy.type()` pro simulaci psaní.
   - Příklad:
     ```javascript
     cy.get('[data-testid="username-input"]').type('testUser');
     ```

3. **Vymazání vstupních polí:**
   - Použijte `.clear()` pro odstranění obsahu.
   - Příklad:
     ```javascript
     cy.get('[data-testid="username-input"]').clear();
     ```

4. **Výběr voleb z rozbalovacích nabídek:**
   - Použijte `.select()` pro prvky `<select>`.
   - Příklad:
     ```javascript
     cy.get('[data-testid="dropdown"]').select('Možnost 1');
     ```

5. **Zaškrtávací políčka a rádio tlačítka:**
   - `.check()` pro výběr, `.uncheck()` pro zrušení výběru zaškrtávacích políček.
   - Příklad:
     ```javascript
     cy.get('[data-testid="accept-terms"]').check();
     ```

6. **Odesílání formulářů:**
   - Použijte `.submit()` pro simulaci odeslání formuláře.
   - Příklad:
     ```javascript
     cy.get('[data-testid="login-form"]').submit();
     ```

7. **Přesun nad prvky:**
   - Cypress nemá specifickou akci pro přejetí myší; použijte `.trigger('mouseover')`.
   - Příklad:
     ```javascript
     cy.get('[data-testid="menu-item"]').trigger('mouseover');
     ```

---

### **D. Ověřování interakcí**
- **Asertace:**
  - Potvrďte, že akce vedou k očekávanému stavu nebo chování.
  - Příklad:
    ```javascript
    cy.get('[data-testid="success-message"]')
      .should('be.visible')
      .and('contain', 'Přihlášení bylo úspěšné!');
    ```
- **Kombinování příkazů:**
  - Kombinujte akce a aserce pro jasné, stručné testy.
  - Příklad:
    ```javascript
    cy.get('[data-testid="submit-button"]')
      .click()
      .get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Neplatné přihlašovací údaje');
    ```

---

### **E. Pokročilé zpracování vstupu**
- **Nahrávání souborů:**
  - Použijte `cy.selectFile()` pro prvky vstupu typu soubor.
  - Příklad:
    ```javascript
    cy.get('[data-testid="file-upload"]').selectFile('cypress/fixtures/sample.pdf');
    ```

- **Simulace událostí z klávesnice:**
  - Použijte `.type()` se speciálními klávesami jako `{enter}`, `{backspace}`.
  - Příklad:
    ```javascript
    cy.get('[data-testid="search-input"]').type('Cypress{enter}');
    ```

- **Interakce s deaktivovanými prvky:**
  - Ověřte nebo vyvolejte události na deaktivovaných prvcích:
    ```javascript
    cy.get('[data-testid="submit-button"]').should('be.disabled');
    ```

##### cy.get() vs cy.find()

**cy.get():**
- **Použití:**  
  `cy.get()` se používá k výběru prvků z celého DOM pomocí daného selektoru.
- **Příklad:**
  ```javascript
  // Vybere prvek s atributem data-testid z celé stránky
  cy.get('[data-testid="login-form"]');
  ```

**cy.find():**
- **Použití:**  
  `cy.find()` se používá k vyhledávání podřízených prvků v dříve vybraném prvku.
- **Příklad:**
  ```javascript
  // Nejprve vyberte rodičovský prvek
  cy.get('[data-testid="login-form"]')
    // Pak najděte podřízený vstupní prvek v tomto formuláři
    .find('[data-testid="username-input"]');
  ```

**Hlavní rozdíl:**  
Použijte `cy.get()` pro dotaz na globální DOM. Použijte `cy.find()` když potřebujete zúžit vyhledávání na prvky uvnitř konkrétního kontejneru nebo kontextu.


##### cy.trigger()

**Vysvětlení:**
- **Účel:**  
  `cy.trigger()` se používá pro simulaci událostí, které nemají vyhrazený příkaz Cypress (jako `mouseover`, `keydown` atd.). To je užitečné pro testování, jak prvky reagují na vlastní nebo složité uživatelské interakce.

- **Příklad:**
  ```javascript
  // Spusťte událost mouseover na prvku
  cy.get('[data-testid="menu-item"]').trigger('mouseover');
  ```

- **Kdy používat:**  
  Použijte `cy.trigger()`, když potřebujete simulovat události nad rámec standardních akcí kliknutí nebo psaní - zejména užitečné pro testování dynamických změn uživatelského rozhraní, jako jsou tooltipy nebo rozbalovací nabídky, které se zobrazují při přejetí myší.



##### cy.within()

**Vysvětlení:**
- **Účel:**  
  `cy.within()` omezí následující příkazy Cypress na konkrétní prvek. To je užitečné, pokud chcete omezit kontext dotazu na konkrétní kontejner, což zajišťuje, že vaše selektory hledají pouze v rámci tohoto kontejneru.

- **Příklad:**
  ```javascript
  // Omezte všechny další příkazy na prvky uvnitř formuláře
  cy.get('[data-testid="login-form"]').within(() => {
    cy.get('[data-testid="username-input"]').type('testUser');
    cy.get('[data-testid="password-input"]').type('password123');
  });
  ```

- **Výhody:**  
  - Zvyšuje spolehlivost testů tím, že zabraňuje falešným pozitivům z podobných prvků na jiné části stránky.
  - Zjednodušuje selektory tím, že zúží kontext vyhledávání.


##### Proč používat plugin pro reálné události Cypress (`cypress-real-events`) místo nativních událostí Cypress

**Vysvětlení:**
- **Nativní omezení:**  
  Vstupní příkazy Cypressu (např. `cy.click()`, `cy.type()`) fungují dobře pro mnoho interakcí, ale někdy zcela neodrážejí skutečné chování uživatelů. Například složité pohyby myši nebo nuance událostí nemusí být vyvolány přesně tak, jak by tomu bylo v reálném prohlížeči.

- **Plugin pro reálné události Cypress:**
  - **Účel:**  
    Plugin `cypress-real-events` posílá skutečné události prohlížeče (např. skutečné pohyby myši nebo události z klávesnice), což může lépe reprezentovat skutečné chování uživatele.
  - **Výhody:**  
    - **Přesnější simulace:** Lépe replikuje nativní chování událostí, zejména pro interakce, které vyžadují více než jednoduché kliknutí.
    - **Zlepšení spolehlivosti testů:** Pomáhá v scénářích, kdy nativní události Cypress nemusí vyvolat určité zpracovatele událostí, jako jsou složité interakce přetahování nebo přejetí myší.
  - **Příklad:**
    ```javascript
    // Nejprve nainstalujte plugin:
    // npm install cypress-real-events --save-dev

    // Ve vašem podnikovém souboru Cypress (např. cypress/support/commands.js), importujte plugin:
    import 'cypress-real-events/support';

    // Poté jej použijte v testu:
    cy.get('[data-testid="drag-item"]').realMouseDown();
    cy.get('[data-testid="drop-zone"]').realMouseUp();
    ```

- **Kdy používat:**  
  Použijte plugin pro reálné události, když potřebujete simulovat sekvenci událostí, která co nejvíc napodobuje interakce uživatelů - například přetahování, efekty přejetí s prodlevami nebo složité scénáře pohybu myši.


---

## **2. Praktické aktivity**

### **A. Cvičení 1: Odeslání formuláře**
- **Cíl:**
  - Vytvořit přihlašovací formulář s atributy `data-testid`.
  - Simulovat uživatelské vstupy (uživatelské jméno, heslo), kliknout na tlačítko přihlášení a ověřit úspěšné nebo chybové zprávy.
- **Návrh webové funkčnosti:**
  - Jednoduchý přihlašovací formulář s ověřením.

### **B. Cvičení 2: Interakce s rozbalovacími nabídkami a zaškrtávacími políčky**
- **Cíl:**
  - Přidat rozbalovací nabídku pro výběr role uživatele a zaškrtávací políčko pro souhlas s podmínkami.
  - Ověřit, že formulář je odeslán pouze tehdy, pokud jsou všechna pole vyplněna a zaškrtávací políčko je zaškrtnuto.
- **Návrh webové funkčnosti:**
  - Formulář, který brání odeslání, dokud nejsou splněny validační kritéria.

### **C. Cvičení 3: Simulace událostí z klávesnice**
- **Cíl:**
  - Vytvořit vyhledávací lištu, která dynamicky filtruje výsledky, jak uživatel píše.
  - Testovat chování vyhledávací funkce pomocí `.type()` a `.clear()`.
- **Návrh webové funkčnosti:**
  - Vyhledávací lišta v reálném čase, která zobrazuje odpovídající výsledky.

---

## **3. Potenciální otázky studentů**

1. **Proč bych měl používat atributy `data-*` místo CSS selektorů?**
   - **Odpověď:** CSS selektory se mohou měnit kvůli aktualizacím designu, zatímco atributy `data-*` jsou stabilní a vyhrazené pro vývojáře/testování, což zajišťuje spolehlivé testovací skripty.

2. **Jak mohu simulovat přejetí myší nad prvkem v Cypress?**
   - **Odpověď:** Použijte `.trigger('mouseover')`, protože Cypress nemá specifickou metodu pro přejetí myší.

3. **Mohou interagovat s prvky, které jsou skryté nebo deaktivované?**
   - **Odpověď:** Cypress standardně brání interakci s hidden nebo disabled prvky, ale můžete použít `.invoke('show')` nebo změnit atributy pro simulaci interakcí.

4. **Jak ověřím, že formulář funguje správně?**
   - **Odpověď:** Kombinujte akce (např. psaní, klikání) s aseveracemi pro potvrzení očekávaných výsledků jako je zobrazení úspěšných/chybových zpráv.

---

## **4. Doplňkové materiály**

- **Oficiální dokumentace:**
  - [Cypress příkazy](https://docs.cypress.io/api/commands)
  - [Cypress nejlepší praktiky](https://docs.cypress.io/guides/references/best-practices)

- **Videonávody a tutoriály:**
  - [Traversy Media: Kurz Cypress](https://www.youtube.com/watch?v=pk4z4k8I8fU)
  - [The Net Ninja: Tutoriály o Cypress](https://www.youtube.com/watch?v=zLtqULPDuE8)

- **Interaktivní nástroje:**
  - Procvičujte pomocí nástrojů jako [TodoMVC](http://todomvc.com).

---

### Navrhované rozdělení lekce na 3 hodiny

#### **Hodina 1: Základy výběru a interakce s prvky (60 minut)**
- Úvod do selektorů prvků.
- Provádění základních akcí jako klikání a psaní.
- Praktická činnost: Vyplnění a odeslání formuláře.

#### **Hodina 2: Pokročilé interakce a zpracování vstupu (60 minut)**
- Zpracování rozbalovacích nabídek, zaškrtávacích políček a nahrávání souborů.
- Simulace událostí z klávesnice a zpracovávání deaktivovaných prvků.
- Praktická činnost: Dynamická interakce rozbalovací nabídky a vyhledávací lišty.

#### **Hodina 3: Ověřování uživatelských akcí (60 minut)**
- Psaní aseverací pro různé scénáře.
- Kombinování akcí a aseverací v testovacích případech.
- Praktická činnost: Testování a ověřování chování formuláře na základě vstupu.