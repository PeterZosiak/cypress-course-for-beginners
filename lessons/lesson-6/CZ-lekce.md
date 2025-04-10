## **Lekce 6: Instalace a konfigurace Cypress**

### **1. Obsah lekce**

#### **A. Úvod do instalace Cypress**
- **Proč je instalace důležitá:**
  - Před psaním testů Cypress je potřeba správně nastavit prostředí, aby byla zajištěna kompatibilita a hladké provádění testu.
- **Požadavky pro instalaci:**
  - Node.js nainstalovaný v systému.
  - Základní porozumění správcům balíčků jako `npm` nebo `yarn`.

1. **Nainstalovaný Node.js:**
   - Cypress vyžaduje Node.js k řízení své instalace a závislostí (balíčků).
   - Nainstalujte Node.js z oficiálního webu: [https://nodejs.org/](https://nodejs.org/).
   - Ověřte instalaci pomocí:
     ```bash
     node -v
     npm -v
     ```

2. **Správce balíčků:**
   - Node.js standardně obsahuje `npm` (Node Package Manager). Alternativně můžete použít `yarn`, `pnpm` nebo jiné.

3. **Inicializovaný projekt JavaScriptu:**
   - Váš projekt by měl mít soubor `package.json`, který je vytvořen pomocí `npm init` nebo `yarn init`. Tento soubor sleduje závislosti jako Cypress a další metadata projektu.

4. **Základní porozumění příkazové řádce:**
   - Budete potřebovat vykonávat příkazy v terminálu k instalaci a spuštění Cypress.

##### **Co je npm a jak funguje?**

**Co je npm?**
- `npm` (Node Package Manager) je nástroj, který přichází s Node.js a používá se k řízení JavaScriptových balíčků a závislostí.
- Pomáhá vývojářům:
  - Instalovat knihovny a nástroje.
  - Sdílet své vlastní knihovny s komunitou.
  - Řídit projektové nebo globální závislosti.

**Jak npm funguje:**
1. **Instalace balíčků:**
   - Nainstalujte balíček lokálně (specifický pro projekt):
     ```bash
     npm install package-name
     ```
   - Nainstalujte balíček globálně (přístupný ve všech projektech):
     ```bash
     npm install -g package-name
     ```

2. **Správa závislostí:**
   - Nainstalované balíčky jsou uvedeny v `package.json` v sekci `dependencies` nebo `devDependencies`.

3. **Automatizace skriptů:**
   - `npm` může spouštět vlastní skripty definované v `package.json`:
     ```json
     {
       "scripts": {
         "start": "node app.js",
         "test": "cypress open"
       }
     }
     ```
   - Spusťte skript:
     ```bash
     npm run test
     ```

---

### **Rozdíl mezi npm, yarn, bun a pnpm**

| Funkce              | **npm**                       | **yarn**                     | **bun**                      | **pnpm**                       |
|---------------------|------------------------------|------------------------------|------------------------------|--------------------------------|
| **Rychlost**        | Střední                      | Rychlejší než npm           | Nejrychlejší                 | Rychlejší než npm/yarn        |
| **Využití místa na disku** | Vyšší (duplicitní balíčky) | Střední                     | Efektivní                   | Nízké (používá tvrdé odkazy k omezení duplicity) |
| **Strom závislostí**| Ploché strom                 | Ploché strom                 | Ploché strom                 | Hierarchické strom (lepší izolace) |
| **Offline režim**   | Omezený                     | Podporováno                 | Podporováno                  | Podporováno                    |
| **Přijetí**         | Široce používáno             | Populární ve větších projektech | Nové (emergující)          | Roste přijetí v podnicích      |
| **Nejlepší použití** | Obecné                     | Velké nebo výkonově kritické projekty | Rychlé vývojové workflow     | Projekty vyžadující efektivní úložiště |

#### **B. Krok za krokem proces instalace**
1. **Inicializace projektu:**
   - Vytvořte novou složku projektu.
   - Spusťte `npm init` nebo `yarn init` k inicializaci souboru `package.json`.
2. **Instalace Cypress:**
   - Použijte příkaz `npm install cypress --save-dev` nebo `yarn add cypress --dev`.
3. **Ověření instalace:**
   - Spusťte `npx cypress open` nebo `yarn cypress open` k otevření testovacího běžce Cypress.

##### **Co je `npm init`?**

**Účel:**
`npm init` inicializuje nový projekt Node.js vytvořením souboru `package.json`, který slouží jako konfigurační soubor pro řízení závislostí a skriptů projektu.

**Jak to funguje:**
1. Spusťte `npm init` ve vaší projektové složce:
   ```bash
   npm init
   ```
2. Odpovězte na otázky (název projektu, verze, popis atd.) nebo je přeskakujte pomocí příznaku `-y` pro výchozí hodnoty:
   ```bash
   npm init -y
   ```
3. Je vytvořen soubor `package.json`, který obsahuje metadata jako:
   ```json
   {
     "name": "my-project",
     "version": "1.0.0",
     "scripts": {},
     "dependencies": {},
     "devDependencies": {}
   }
   ```

#### **C. Přehled struktury složky Cypress**
- **Výchozí adresáře:**
  - `cypress/fixtures`: JSON soubory pro testovací data.
  - `cypress/e2e`: Soubory s testy.
  - `cypress/plugins`: Rozširuje funkcionalitu Cypress.
  - `cypress/support`: Opakovaně použitelné utility a globální konfigurace.
##### **Účel složek Cypress**

1. **`fixtures`:**
   - Složka pro testovací data.
   - Používá se pro simulaci odpovědí API nebo poskytování testovacích dat.
   - Příklad: `cypress/fixtures/users.json`
     ```json
     [
       { "id": 1, "name": "Alice", "role": "admin" },
       { "id": 2, "name": "Bob", "role": "user" }
     ]
     ```
   - Přístup v testech:
     ```javascript
     cy.fixture('users').then((users) => {
       cy.log(users[0].name); // Loguje "Alice"
     });
     ```

2. **`e2e` (nebo `integration` ve starších verzích):**
   - Ukládá testovací skripty, obvykle organizované podle funkčnosti.
   - Příklad:
     ```
     cypress/integration/login.spec.js
     cypress/integration/dashboard.spec.js
     ```

3. **`plugins`:**
   - Rozširuje funkcionalitu Cypress, například upravením chování prohlížeče nebo konfigurací pluginů.
   - Příklad:
     ```javascript
     module.exports = (on, config) => {
       // Upravte konfiguraci nebo nastavte posluchače událostí
     };
     ```

4. **`support`:**
   - Obsahuje opakovaně použitelný kód jako vlastní příkazy nebo globální konfigurace.
   - Příklad: Přidejte vlastní příkaz pro přihlášení do `cypress/support/commands.js`:
     ```javascript
     Cypress.Commands.add('login', (username, password) => {
       cy.get('[data-testid="username"]').type(username);
       cy.get('[data-testid="password"]').type(password);
       cy.get('[data-testid="login-button"]').click();
     });
     ```

#### **D. Konfigurační soubory**
- **Přehled `cypress.config.js`:**
  - Konfigurační soubor. Lze nastavit základní URL, velikost viewportu, časové limity a další.
  - Příklad:
    ```javascript
    const { defineConfig } = require('cypress');

    module.exports = defineConfig({
      e2e: {
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
        defaultCommandTimeout: 8000,
        supportFile: 'cypress/support/index.js',
      },
    });
    ```

##### **Co je `baseUrl` v kontextu Cypress?**

**Definice:**
`baseUrl` je konfigurační vlastnost v `cypress.config.js`, která nastavuje výchozí kořenovou URL pro testovanou aplikaci. Zjednodušuje testovací kód tím, že eliminuje potřebu opakovaně uvádět celou URL v příkazech `cy.visit()`.

**Příklad:**
- V `cypress.config.js`:
  ```javascript
  module.exports = {
    e2e: {
      baseUrl: 'http://localhost:3000',
    },
  };
  ```
- Použití v testech:
  ```javascript
  cy.visit('/login'); // Převádí na 'http://localhost:3000/login'
  ```

**Výhody:**
- Snižuje redundantnost v testovacích souborech.
- Usnadňuje aktualizaci testů, pokud se změní kořenová URL (např. přechod z `localhost` na staging server).

- **Nastavení proměnných prostředí:**
  - Použijte `env` v konfiguračním souboru pro citlivá data nebo znovu použitelné hodnoty.
  - Příklad:
    ```javascript
    module.exports = defineConfig({
      env: {
        apiUrl: 'https://api.example.com',
      },
    });
    ```
  - Přístup v testech pomocí `Cypress.env('apiUrl')`.


### **`env` vlastnost v `cypress.config.js`**

**Definice:**
Vlastnost `env` v `cypress.config.js` uchovává proměnné specifické pro prostředí, jako jsou API koncové body, přihlašovací údaje nebo příznaky. Tyto hodnoty lze přistupovat v testech pomocí `Cypress.env()`.

**Příklad:**
- V `cypress.config.js`:
  ```javascript
  module.exports = {
    e2e: {
      env: {
        apiUrl: 'https://api.example.com',
        userRole: 'admin',
      },
    },
  };
  ```
- Použití v testech:
  ```javascript
  describe('API Testy', () => {
    it('by měl načíst data z API', () => {
      const apiUrl = Cypress.env('apiUrl');
      cy.request(`${apiUrl}/users`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
  ```

**Výhody:**
- Centralizuje hodnoty specifické pro prostředí, což usnadňuje jejich aktualizaci.
- Drží citlivá data (např. API klíče) mimo testovací kód.


#### **E. Spuštění testů Cypress**
- **Dev režim:**
  - Použijte `npx cypress open` k otevření uživatelského rozhraní Test Runneru.
- **Headless režim:**
  - Použijte `npx cypress run` k provedení testů v terminálu.
  - Užitečné pro CI/CD pipeline.
- **Příklad příkazu:**
  ```bash
  npx cypress run --spec cypress/integration/login.spec.js
  ```

**`npx`** je nástroj, který přichází s `npm` (od verze 5.2.0) a používá se k spusteni balíčků Node.js přímo z příkazové řádky bez jejich globální instalace. Umožňuje spouštět binární soubory balíčků, které jsou buď nainstalovány lokálně ve vašem projektu, nebo staženy přímo z npm registru.


##### **Proč používat `npx`?**

1. **Dočasné provádění:**
   - S `npx` můžete balíček spustit dočasně, aniž byste ho trvale instalovali do systému.
   - Například:
     ```bash
     npx create-react-app my-app
     ```
     Tímto se spustí balíček `create-react-app` bez nutnosti globální instalace.

2. **Vyhněte se globálním instalacím:**
   - Místo instalace balíčku globálně (např. `npm install -g some-package`), `npx` stáhne a spustí balíček přímo.
   - To udržuje váš globální environment čistý a vyhýbá se konfliktům verzí.

3. **Spusťte lokálně nainstalované balíčky:**
   - Pokud je balíček nainstalován lokálně ve vašem projektu (`node_modules`), `npx` jej automaticky spustí, aniž by bylo potřeba odkazovat na celou cestu.
   - Příklad:
     ```bash
     npx cypress open
     ```
     Tímto se spustí Cypress z vaší lokální složky `node_modules`, pokud je již nainstalován.

4. **Provádění konkrétní verze:**
   - Můžete specifikovat konkrétní verzi balíčku:
     ```bash
     npx some-package@1.2.3
     ```

5. **Generování a scaffolding:**
   - `npx` se běžně používá k provádění nástrojů, které generují nové projekty nebo konfigurační soubory, aniž byste museli instalovat nástroj globálně.
   - Příklad:
     ```bash
     npx eslint --init
     ```


### **Jak `npx` funguje?**
- Když spustíte příkaz pomocí `npx`:
  1. Zkontroluje, zda balíček existuje lokálně ve vašem `node_modules`.
  2. Pokud balíček není nalezen lokálně, dočasně jej stáhne a spustí.
  3. Jakmile je process dokončen, npx vykoná vyčištení odstraněním dočasných souborů (pokud byl stažen).

---

### **Kdy používat `npx` vs `npm`?**

| **Funkce**                | **`npm`**                                   | **`npx`**                                |
|---------------------------|---------------------------------------------|------------------------------------------|
| **Instalace**             | Nainstaluje balíček lokálně nebo globálně. | Spustí balíček bez instalace.           |
| **Použití**               | Vyžaduje instalaci balíčku nejprve.        | Není nutná instalace; vykonává přímo.   |
| **Globální balíčky**      | Často používáno pro správu globálních nástrojů. | Nahrazuje potřebu globálních instalací.   |
| **Jednorázové použití**    | Není vhodné bez instalace.                 | Ideální pro jednorázová vykonání.       |

---

### **Příklady použití `npx`**

1. **Spustit Cypress bez globální instalace:**
   ```bash
   npx cypress open
   ```

2. **Vygenerovat novou React aplikaci:**
   ```bash
   npx create-react-app my-app
   ```

3. **Lintovat soubory bez globální instalace ESLint:**
   ```bash
   npx eslint myfile.js
   ```

4. **Spustit konkrétní verze balíčků:**
   ```bash
   npx some-package@2.0.0
   ```

5. **Dočasná exekuce pro testování:**
   - Spusťte `npx cowsay` jako zábavným příkladem:
     ```bash
     npx cowsay "Hello, World!"
     ```
`npx` je všestranný nástroj, který zjednodušuje provádění balíčků a pomáhá se vyhnout zaplňování systému zbytečnými globálními instalacemi, což je ideální pro vývojáře, kteří často pracují s nástroji a frameworky JavaScriptu.


#### **F. Nejlepší praktiky pro nastavení**
- **Udržujte Cypress aktualizovanou:**
  - Pravidelně aktualizujte Cypress, abyste měli přístup k novým funkcím a opravám chyb.
- **Používejte verzování pro konfigurační soubory:**
  - Sledujte změny v `cypress.config.js` a dalších nastavení.
- **Vytvořte základní URL:**
  - Definujte základní URL v konfiguračním souboru pro zjednodušení testovacích příkazů jako `cy.visit()`.

---

### **2. Praktické aktivity**

#### **A. Cvičení Instalace Cypress**
- **Cíl:**
  - Příručka pro studenty při instalaci Cypress ve svém prostředí.
- **Kroky:**
  1. Nainstalujte Node.js, pokud ještě není nainstalován.
  2. Inicializujte nový projekt pomocí `npm init`.
  3. Nainstalujte Cypress pomocí `npm install cypress --save-dev`.
  4. Spusťte `npx cypress open` a prozkoumejte výchozí strukturu složek.
- **Výsledek:**
  - Studenti by měli vidět, že Cypress Test Runner je úspěšně otevřen.

#### **B. Cvičení Nastavení konfiguračního souboru**
- **Cíl:**
  - Upravte soubor `cypress.config.js` přidáním základní URL a nastavení viewportu.
- **Kroky:**
  1. Otevřete `cypress.config.js`.
  2. Přidejte následující:
     ```javascript
     module.exports = {
       e2e: {
         baseUrl: 'http://localhost:3000',
         viewportWidth: 1366,
         viewportHeight: 768,
       },
     };
     ```
  3. Uložte soubor a znovu spusťte `npx cypress open`.
- **Výsledek:**
  - Studenti by měli být schopni přejít na základní URL spuštěním `cy.visit('/')` ve svých testech.

---

### **3. Potenciální otázky studentů**

1. **Co se stane, pokud nemám nainstalovaný Node.js?**
   - **Odpověď:** Cypress vyžaduje, aby byl nainstalovaný Node.js, protože je řízen pomocí npm (Node Package Manager). Studenti si musí stáhnout a nainstalovat Node.js před pokračováním.

2. **Musím instalovat Cypress globálně?**
   - **Odpověď:** Ne, Cypress je obvykle nainstalován lokálně v projektu pro lepší správu verzí a reprodukovatelnost.

3. **Jaký je rozdíl mezi Dev režimem a Headless režimem Cypress?**
   - **Odpověď:** Dev režim spouští interaktivní Cypress Test Runner, což umožňuje studentům vizuálně sledovat provádění testů. Headless režim spouští testy v terminálu bez otevření uživatelského rozhraní, vhodné pro automatizované pipeline.

4. **Proč bych měl použít základní URL v konfiguraci?**
   - **Odpověď:** Nastavení základní URL zjednodušuje testovací příkazy. Místo psaní `cy.visit('http://localhost:3000/login')` můžete napsat `cy.visit('/login')`. 

5. **Mohu používat Cypress s existujícími projekty?**
   - **Odpověď:** Ano, Cypress může být přidán do jakéhokoli JavaScriptového projektu instalací jako vývojová závislost.

---

### **4. Doporučené materiály**

#### **A. Oficiální dokumentace:**
- [Průvodce instalací Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)
- [Konfigurace Cypress](https://docs.cypress.io/guides/references/configuration)

#### **B. Tutoriály a články:**
- [Struktura složky Cypress a nastavení](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests)
- [Průvodce pro začátečníky k instalaci Cypress](https://blog.testproject.io/2021/01/05/getting-started-with-cypress/)

#### **C. Videa:**
- **Traversy Media:** Základní kurz Cypress
- **The Net Ninja:** Začínáme s testováním Cypress

#### **D. Platformy pro praxi:**
- Nastavte Cypress v jednoduché aplikaci TodoMVC nebo v online ukázce jako `http://todomvc.com`. 

---

### **5. Navrhované rozdělení lekce na 3 hodiny**

#### **Hodina 1: Úvod a instalace (60 minut)**
- **Instalace Cypress (30 minut):**
  - Příručka pro studenty krok za krokem během instalace.
  - Ověření nastavení pomocí `npx cypress open`.
- **Přehled struktury složky (20 minut):**
  - Vysvětlení účelu každé složky.
  - Diskuse o tom, kde psát testy a ukládat mock data.
- **Q&A (10 minut):**
  - Řešení jakýchkoli dotazů souvisejících s instalací.

#### **Hodina 2: Konfigurace Cypress (60 minut)**
- **Vytvoření a úprava `cypress.config.js` (30 minut):**
  - Nastavte základní URL, velikost viewportu a vlastní proměnné prostředí.
  - Diskuse o důležitosti konfiguračních souborů.
- **Praktická aktivita (20 minut):**
  - Upravte konfigurační soubor a spusťte Test Runner k potvrzení změn.
- **Q&A (10 minut):**
  - Vyjasnění jakýchkoli dotazů týkajících se konfigurace.

#### **Hodina 3: Spuštění testů Cypress (60 minut)**
- **Otevřené a bezhlavé režimy (20 minut):**
  - Demonstrujte oba režimy a vysvětlete jejich případy použití.
- **Prozkoumání příkladových testů (30 minut):**
  - Spusťte výchozí příkladové testy v Cypress, aby jste ukázali vestavěné funkce.
  - Diskuse o tom, jak strukturovat vlastní testy ve složce `integration`.
- **Rekapitulace a Q&A (10 minut):**
  - Přezkoumání kroků instalace a konfigurace.
  - Odpovězení na poslední otázky a příprava studentů na další lekci.

---

### **6. Další doporučení**

#### **Interaktivní demonstrace:**
- Ukažte studentům, jak řešit běžné problémy s instalací (např. oprávnění, chybějící Node.js).
- Demonstrujte živé úpravy `cypress.config.js` a jejich okamžité účinky.

#### **Podporujte účast:**
- Nechte studenty samostatně nainstalovat Cypress a vzájemně si pomáhat s problémy s nastavením.
- Nechte studenty experimentovat s nastaveními konfigurace jako časová omezení a velikosti viewportu.

#### **Poskytněte jasné pokyny:**
- Krok-za-krokem příkazy pro instalaci a konfiguraci.
- Tipy pro organizaci složky `integration` pro škálovatelné testovací případy.

#### **Zaměřte se na praktičnost:**
- Použijte vztahové příklady, jako je nastavení základní URL pro vzorovou aplikaci.
- Vysvětlete, jak správné nastavení ovlivňuje udržovatelnost a škálovatelnost projektů automatizace testů.