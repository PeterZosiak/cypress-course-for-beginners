## **Lekce 10: Strukturování testovacích sad a testovacích případů**

### **Cíle**
- Organizovat testy podle osvědčených postupů kvůli udržovatelnosti a škálovatelnosti.
- Využívat příkazy Cypress k tvorbě čistého a znovupoužitelného testovacího kódu.
- Implementovat správné postupy nastavení (setup) a úklidu (teardown).
- Pomocí značek (tagů) a konvencí pojmenování kategorizovat testy pro selektivní spouštění.

---

### **Rozpis obsahu**

#### **A. Organizace testů**
- **Použití bloků `describe()` a `it()`:**
  - **Blok `describe()`:**  
    Slouží ke sdružování příbuzných testů do jedné testovací sady. Pomáhá logicky organizovat testy podle funkce nebo vlastnosti.
    - **Příklad:**
      ```javascript
      describe('Funkcionalita přihlášení', () => {
        // Sem patří testovací případy týkající se přihlášení.
      });
      ```
  - **Blok `it()`:**  
    Definuje jednotlivý testovací případ, který ověřuje konkrétní chování.
    - **Příklad:**
      ```javascript
      it('úspěšně se přihlásí s platnými údaji', () => {
        // Kroky testu a aserce.
      });
      ```
- **Seskupování souvisejících testů:**
  - Organizujte testy podle uživatelských cest (např. přihlášení, registrace, dashboard) nebo podle funkcionality.
  - V případě potřeby použijte vnořené bloky `describe()` k vytvoření podskupin pro podrobnější strukturování.

##### **Příklad vnořených bloků describe()**

Vnořené bloky describe pomáhají dále seskupovat a organizovat testy, zejména u složitých uživatelských cest nebo různých pohledů na stejnou funkcionalitu.

**Příklad:**
```javascript
describe('Uživatelský účet', () => {
  describe('Funkcionalita přihlášení', () => {
    it('přihlásí se úspěšně s platnými údaji', () => {
      // Testovací logika pro přihlášení
    });

    it('zobrazí chybu při neplatných údajích', () => {
      // Testovací logika pro chybový případ
    });
  });

  describe('Funkcionalita registrace', () => {
    it('zaregistruje nového uživatele s platnými údaji', () => {
      // Testovací logika pro registraci
    });

    it('zobrazí chyby u chybějících polí', () => {
      // Testovací logika pro validační chyby
    });
  });
});
```

##### **Správné konvence pojmenování pro describe() a it()**

**Konvence pojmenování** by měly být jasné, popisné a konzistentní. Dobrou praxí je používat přirozený jazyk k popsání toho, co se testuje, a očekávaného výsledku.

- **Názvy bloků describe():**  
  Použijte podstatné jméno nebo název funkce, který jasně identifikuje předmět testů.
  
  **Příklady:**
  - `describe('Funkcionalita přihlášení', () => { ... })`
  - `describe('Registrace uživatele', () => { ... })`
  - `describe('Operace nákupního košíku', () => { ... })`

- **Názvy bloků it():**  
  Použijte větu nebo frázi, která popisuje očekávané chování. Když je to možné, zapojte do názvů i vzor Arrange‑Act‑Assert (AAA).
  
  **Příklady:**
  - `it('zobrazí uvítací zprávu při úspěšném přihlášení', () => { ... })`
  - `it('zobrazí chybu, pokud při registraci chybí povinná pole', () => { ... })`
  - `it('přidá položku do košíku a aktualizuje celkovou cenu', () => { ... })`

##### **Použití AAA (Arrange‑Act‑Assert) v testech a jejich názvech**

**Vzor AAA:**  
Strukturuje testy do tří jasných fází:

- **Arrange (Příprava):** Nastavení testovacího scénáře, inicializace dat a příprava prostředí.
- **Act (Akce):** Provedení akce, kterou chceme testovat.
- **Assert (Ověření):** Zjištění, zda výsledek odpovídá očekávání.

**V názvech testů:**  
Naznačení fází AAA v názvech testů může zpřehlednit záměr:
- **Příklad názvu testu:**  
  `it('připraví platné přihlašovací údaje, odešle formulář a ověří zobrazení uvítací zprávy', () => { ... })`

**Příklad testu využívajícího AAA:**
```javascript
it('přihlásí se úspěšně s platnými údaji', () => {
  // Arrange
  const validUsername = 'demoUser';
  const validPassword = 'demoPass';

  // Act
  cy.get('[data-testid="username-input"]').type(validUsername);
  cy.get('[data-testid="password-input"]').type(validPassword);
  cy.get('[data-testid="login-button"]').click();

  // Assert
  cy.get('[data-testid="login-success-message"]').should('be.visible');
});
```

#### **B. Metody Setup and Teardown**
- **Přehled hooků:**
  - **Hook `before()`:**  
    Spustí se jednou před všemi testy v bloku `describe()`.
  - **Hook `beforeEach()`:**  
    Spustí se před každým jednotlivým testem; užitečné pro reset stavu nebo navigaci na společný výchozí bod.
  - **Hook `after()`:**  
    Spustí se jednou po všech testech v bloku `describe()`, často pro úklid.
  - **Hook `afterEach()`:**  
    Spustí se po každém testu; slouží k resetu změn provedených během testu.
- **Praktické využití:**
  - **Předpodmínky:**  
    Příprava testovacích dat nebo přihlášení uživatele před spuštěním testů.
  - **Úklid:**  
    Reset dat nebo vymazání session storage pro zajištění izolace testů.
  - **Příklad:**
    ```javascript
    describe('Přihlášení uživatele', () => {
      before(() => {
        // Spustí se jednou před všemi testy
        cy.log('Spouštím testovací sadu přihlášení');
      });

      beforeEach(() => {
        // Navigace na stránku přihlášení před každým testem
        cy.visit('/login');
      });

      afterEach(() => {
        // Vymazání cookies, pokud je to nutné
        cy.clearCookies();
      });

      after(() => {
        cy.log('Testovací sada přihlášení dokončena');
      });
      
      it('přihlásí se úspěšně s platnými údaji', () => {
        // Testovací kód
      });
    });
    ```

#### **C. Tagování a kategorizace testů**
- **Použití konvencí pojmenování:**
  - Přidávejte předpony či přípony k názvům testů pro označení kategorie (např. `@smoke`, `@regression`, `@login`).
  - **Příklad:**
    ```javascript
    describe('Přihlášení uživatele @smoke', () => { ... });
    ```
- **Pluginy Cypress pro tagování:**
  - **Cypress‑Grep:**  
    Umožňuje filtrovat testy podle tagů při spouštění.
    - **Instalace:**  
      ```bash
      npm install cypress-grep --save-dev
      ```
    - **Použití:**  
      Spusťte testy s konkrétním tagem:
      ```bash
      npx cypress run --env grep=@login
      ```
  - **Vlastní tagování:**  
    Pokud je potřeba, použijte komentáře či vlastní metadata pro další organizaci testů.

#### **D. Funkce vlastních příkazů Cypress**
- **Vestavěné příkazy Cypress:**
  - Příkazy jako `cy.visit()`, `cy.get()`, `cy.click()`, `cy.type()` apod. slouží k interakci s aplikací.
  - **Příklad:**
    ```javascript
    cy.visit('/login');
    cy.get('[data-testid="username-input"]').type('demoUser');
    cy.get('[data-testid="password-input"]').type('demoPass');
    cy.get('[data-testid="login-button"]').click();
    ```

- **Vlastní příkazy:**

  ##### **Vlastní příkazy Cypress**

  **Co jsou vlastní příkazy?**  
  Vlastní příkazy v Cypressu jsou funkce, které definujete (obvykle v souboru `cypress/support/commands.js`) a které zapouzdřují opakující se akce nebo složitou logiku. Pomáhají snížit duplicitu, zjednodušují testovací kód a podporují znovupoužitelnost.

  **Výhody:**
  - **Znovupoužitelnost:**  
    Napíšete jednou a znovu použijete v mnoha testech.
  - **Čitelnost:**  
    Vlastní příkazy vytvářejí vyšší úroveň abstrakce, díky níž jsou testy srozumitelnější.
  - **Udržovatelnost:**  
    Úpravy společné funkcionality stačí provést pouze na jednom místě.

  **Nevýhody:**
  - **Režie abstrakce:**  
    Nadměrné používání nebo příliš obecné příkazy mohou ztížit ladění testů.
  - **Skrytá logika:**  
    Pokud příkaz zapouzdří příliš mnoho logiky, může být nejasné, co se ve skutečnosti v testu děje.

  **Příklad definice vlastních příkazů:**

  V **cypress/support/commands.js**:
  ```javascript
  // Vlastní příkaz pro přihlášení
  Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-testid="username-input"]').clear().type(username);
    cy.get('[data-testid="password-input"]').clear().type(password);
    cy.get('[data-testid="login-button"]').click();
  });

  // Vlastní příkaz pro registraci nového uživatele
  Cypress.Commands.add('registerUser', (user) => {
    cy.get('[data-testid="reg-username-input"]').clear().type(user.username);
    cy.get('[data-testid="reg-email-input"]').clear().type(user.email);
    cy.get('[data-testid="reg-password-input"]').clear().type(user.password);
    cy.get('[data-testid="reg-submit-button"]').click();
  });
  ```

  **Použití v testech:**
  ```javascript
  describe('Autentizace uživatele', () => {
    it('přihlásí se úspěšně', () => {
      // Využití vlastního příkazu login
      cy.login('demoUser', 'demoPass');
      cy.get('[data-testid="login-success-message"]').should('be.visible');
    });

    it('zaregistruje nového uživatele', () => {
      const user = {
        username: 'newUser',
        email: 'newuser@example.com',
        password: 'newPassword123'
      };

      // Využití vlastního příkazu registrace
      cy.registerUser(user);
      cy.get('[data-testid="reg-success-message"]').should('be.visible');
    });
  });
  ```

  **Další přínosy vlastních příkazů:**
  - **Zapouzdření:**  
    Zapouzdření běžných UI interakcí snižuje opakování kódu.
  - **Abstrakce:**  
    Odsouvá nízkoúrovňové příkazy Cypress stranou, aby se testy soustředily na vyšší logiku.
  - **Zjednodušená údržba:**  
    Při změnách v aplikaci stačí upravit příkaz, nikoli každý test zvlášť.

  - Rozšiřujte funkcionalitu Cypress přidáváním vlastních příkazů do souboru `cypress/support/commands.js`.
  - **Příklad:**
    ```javascript
    // V cypress/support/commands.js
    Cypress.Commands.add('login', (username, password) => {
      cy.get('[data-testid="username-input"]').type(username);
      cy.get('[data-testid="password-input"]').type(password);
      cy.get('[data-testid="login-button"]').click();
    });
    // Použití v testech:
    cy.login('demoUser', 'demoPass');
    ```
- **Osvědčené postupy:**
  - Udržujte názvy příkazů popisné a snadno udržovatelné.
  - Používejte vlastní příkazy ke snížení opakování a centralizaci logiky.
  - Zajistěte, aby účel každého příkazu byl jasný komukoli, kdo test čte.

#### **E. Struktura testů v projektech Cypress**

**Osvědčené postupy:**

- **Adresářová struktura:**
  - **cypress/fixtures:** Obsahuje externí datové soubory (JSON apod.) pro testovací data.
  - **cypress/integration (nebo e2e):** Obsahuje všechny testovací specifikace uspořádané podle funkcionalit (např. login.spec.js, registration.spec.js).
  - **cypress/plugins:** Ukládá pluginy nebo modifikace výchozího chování Cypress.
  - **cypress/support:**  
    - **commands.js:** Definice vlastních příkazů.
    - **index.js:** Globální konfigurace a kód nastavení pro testy Cypress.
  
- **Organizace testů:**
  - Seskupujte testy bloky `describe()` podle funkce nebo modulu.
  - Pro podfunkce používejte vnořené bloky `describe()`.
  - Konzistentně pojmenovávejte testovací soubory (např. login.spec.js pro testy přihlášení).
  
- **Konfigurace prostředí:**
  - Používejte konfigurační soubor (cypress.config.js) k nastavení baseUrl, timeoutů a proměnných prostředí.
  - Oddělte testy specifické pro dané prostředí pomocí konvencí pojmenování nebo pluginu Cypress‑grep.
  
- **Udržovatelnost a znovupoužitelnost:**
  - Pište vlastní příkazy pro snížení duplicity.
  - Využívejte fixtures k externalizaci testovacích dat a udržení testů přehledných.
  - Dodržujte vzor AAA (Arrange‑Act‑Assert) pro přehlednou strukturu testů.

- **Příklad struktury adresářů:**
  ```
  cypress/
  ├── fixtures/
  │   └── users.json
  ├── integration/
  │   ├── login.spec.js
  │   └── registration.spec.js
  ├── plugins/
  │   └── index.js
  └── support/
      ├── commands.js
      └── index.js
  ```
---

### **Praktické aktivity**

1. **Strukturování testů pomocí `describe()` a `it()`:**
   - Vytvořte ukázkovou testovací sadu pro funkcionalitu přihlášení.
   - Rozdělte testy do samostatných bloků (např. platné přihlášení, neplatné přihlášení).
   
2. **Implementace hooků pro nastavení a úklid:**
   - Napište testy využívající `before()`, `beforeEach()`, `after()`, `afterEach()` k řízení stavu testů.
   - Příklad aktivity: Protokolovat zprávy nebo nastavit podmínky (například navigaci na přihlašovací stránku) před každým testem.

3. **Tagování a filtrování testů:**
   - Používejte konvence pojmenování nebo tagy (např. `@smoke`, `@regression`) v názvech testů.
   - Nastavte a ukažte spouštění testů pomocí pluginu Cypress‑grep.
   
4. **Vlastní příkazy:**
   - Vytvořte vlastní příkaz (např. `cy.login()`) a využijte jej v několika testovacích případech.
   - Refaktorujte stávající testovací kód, aby využíval tento vlastní příkaz.

5. **Procvičování příkazů Cypress:**
   - Napište testovací případy, které demonstrují řetězení příkazů (např. výběr elementu, ověření jeho viditelnosti a kliknutí).
   - Experimentujte s příkazem `cy.within()` pro ohraničení testů na konkrétní elementy.

---

### **Zdroje**

- **Dokumentace Cypress:**
  - [Struktura testů v Cypress](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests)
  - [Příkazy Cypress](https://docs.cypress.io/api/commands)
- **Ukázkové testovací sady:**
  - Vyhledejte ukázkové projekty na GitHubu, které ukazují dobře organizované Cypress testy.
- **Plugin Cypress‑Grep:**
  - [GitHub repozitář Cypress‑Grep](https://github.com/cypress-io/cypress-grep)