## **Lekce 9: Práce s fixtures a správou testovacích dat**

#### **A. Použití fixtures**

##### **Proč je správa dat důležitá?**

1. **Konzistence a spolehlivost:**
   - **Centralizovaná testovací data:** Ukládání testovacích dat ve fixtures nebo externích souborech zajišťuje, že testy běží nad konzistentními a kontrolovanými datovými sadami. Snižuje se tak riziko nespolehlivých (flaky) testů způsobených proměnlivými daty.  
   - **Opakovatelné výsledky:** Díky dobře spravovaným datům je každý běh testů reprodukovatelný, což usnadňuje diagnostiku problémů při selháních.

2. **Udržovatelnost:**
   - **Oddělení dat a logiky:** Oddělením testovacích dat od testovacích skriptů je jednodušší aktualizovat či měnit vstupy bez zásahu do samotného testovacího kódu.  
   - **Snazší aktualizace:** Když se změní datové modely aplikace, je potřeba upravit jen fixtures nebo datové soubory, nikoli všechny testy, které daná data používají.

3. **Škálovatelnost:**
   - **Podpora více scénářů:** Správa dat umožňuje snadnou parametrizaci testů, takže stejná testovací logika může běžet s různými datovými sadami. Podporuje to testování řízené daty (data-driven testing) a pokrytí většího množství okrajových případů.  
   - **Jednodušší organizace testů:** Strukturovaná data pomáhají lépe organizovat testy, umožňují seskupovat související testy a spouštět jen vybrané podmnožiny.

4. **Efektivita automatizace:**
   - **Mockování externích služeb:** Pro API testy fixtures simulují odpovědi backendu, což dělá testy nezávislými na živých vnějších systémech.  
   - **Dynamická generace dat:** Integrací nástrojů jako Faker lze generovat unikátní data za běhu testu, vyhnout se konfliktům (např. duplicitním účtům) a zajistit, že každý test poběží ve „čistém“ kontextu.

1. **Vytváření souborů fixtures (JSON):**
   - **Definice:**  
     Fixtures jsou externí datové soubory (obvykle ve formátu JSON), které ukládají testovací data odděleně od testovacího kódu.  
   - **Účel:**  
     - Udržet testovací data organizovaná a znovupoužitelná.  
     - Umožnit úpravy a aktualizace dat bez zásahu do testovacích skriptů.  
   - **Příklad fixture:**  
     Vytvořte soubor `users.json` ve složce `cypress/fixtures`:
     ```json
     [
       { "username": "demoUser", "password": "demoPass", "role": "admin" },
       { "username": "userOne", "password": "passOne", "role": "user" }
     ]
     ```

2. **Načítání dat z fixtures v testech (cy.fixture()):**
   - **Použití:**  
     `cy.fixture()` načte data z fixture, která pak mohou být použita v testu.  
   - **Příklad:**
     ```javascript
     cy.fixture('users').then((users) => {
       // Použijte data z fixture (např. iterujte přes uživatele a provádějte testy přihlášení)
       expect(users).to.have.length.above(0);
     });
     ```

3. **Strukturování fixtures pro znovupoužitelnost:**
   - **Doporučené postupy:**  
     - Rozdělte fixtures do logických souborů (např. zvlášť pro uživatele, produkty, nastavení).  
     - Používejte jasné a popisné názvy souborů.  
     - Pokud jsou data hierarchická, zanořujte objekty odpovídajícím způsobem.  
   - **Tip:**  
     Strukturovat fixtures tak, aby odrážely různé testovací scénáře (platná data, neplatná data, okrajové případy).

---

#### **B. Vzory zahrnutí/vyloučení**

1. **Organizace testů:**
   - **Vzory zahrnutí:**  
     - Seskupujte testy podle vlastností, modulů nebo funkcionalit.  
     - Používejte pojmenovací konvence nebo strukturu složek pro přehledné uspořádání testů.  
   - **Vzory vyloučení:**  
     - Vylučujte konkrétní testy při určitých bězích (např. dlouho trvající testy nebo testy, které nejsou relevantní pro současnou sestavu).  
   - **Příklady:**  
     - Použití štítků jako `@smoke` nebo `@regression` pro zahrnutí/vyloučení testů.  
     - Předpony souborů (např. `smoke-login.spec.js`) pro jednodušší filtrování.

2. **Správa testů pomocí tagů nebo pojmenovacích konvencí:**
   - **Výhody:**  
     - Rychlý výběr testů pro různá prostředí nebo fáze testování.  
     - Zkrácení celkové doby běhu testů při rychlých validačních cyklech.  
   - **Implementace:**  
     Cypress nemá vestavěnou podporu tagů, ale můžete použít pojmenovací konvence nebo komunitní pluginy pro správu tagů.

---

#### **B. Práce s dynamickými daty**

1. **Generování náhodných dat pro testy:**
   - **Účel:**  
     - Otestovat, jak aplikace zvládá nepředvídatelné nebo unikátní vstupy.  
     - Předejít kolizím dat v testech, které se mohou spouštět opakovaně.  
   - **Postup:**  
     Použijte JavaScriptové funkce nebo knihovny (např. Faker.js) k generování náhodných řetězců, čísel, dat apod.  
   - **Příklad:**
     ```javascript
     function getRandomString(length) {
       const chars = 'abcdefghijklmnopqrstuvwxyz';
       let result = '';
       for (let i = 0; i < length; i++) {
         result += chars.charAt(Math.floor(Math.random() * chars.length));
       }
       return result;
     }

     const randomUsername = `user_${getRandomString(5)}`;
     cy.log(randomUsername);
     ```

### **Proč je důležité používat Faker?**

1. **Generování unikátních, realistických testovacích dat:**
   - **Zamezení kolizím:**  
     Faker generuje náhodná, realistická data (např. jména, e‑maily, adresy), čímž se testy vyhnou konfliktům jako duplicitní uživatelská jména.  
   - **Realističnost:**  
     Testovací data napodobující reálné scénáře přesněji simulují chování uživatele.

2. **Dynamická data pro parametrizaci:**
   - **Testy řízené daty:**  
     Díky integraci Faker mohou testy za běhu generovat vstupní data, podporovat scénáře, kdy je stejná logika aplikována s různými vstupy.  
   - **Škálovatelnost:**  
     S růstem testovací sady je snadné generovat velké množství dat bez manuální údržby rozsáhlých statických souborů.

3. **Lepší izolace testů:**
   - **Nezávislé běhy testů:**  
     Generováním unikátních dat za běhu se testy méně ovlivňují navzájem, což je klíčové zejména v paralelních CI prostředích.

4. **Jednoduché použití:**
   - **Jednoduché API:**  
     Faker nabízí přehledné rozhraní, které umožňuje generovat různé typy dat několika řádky kódu.  
   - **Integrace:**  
     Dobře spolupracuje s Cypress; ve vašich testovacích skriptech můžete volat Faker funkce během běhu testu.

**Příklad použití Faker:**

```javascript
// Nainstalujte faker: npm install faker --save-dev
import faker from 'faker';

const randomUsername = faker.internet.userName();
const randomEmail = faker.internet.email();

cy.log(`Generated Username: ${randomUsername}`);
cy.log(`Generated Email: ${randomEmail}`);

// Použijte tyto hodnoty v testu, například k vytvoření nového uživatele.
cy.get('[data-testid="username-input"]').type(randomUsername);
cy.get('[data-testid="email-input"]').type(randomEmail);
```

2. **Parametrizace testů s různými daty:**
   - **Použití:**  
     Spouštějte stejnou testovací logiku s více datovými sadami ze fixtures nebo generovanými dynamicky.  
   - **Příklad:**  
     Iterujte přes pole uživatelů (z fixture) a provádějte testy přihlášení:
     ```javascript
     cy.fixture('users').then((users) => {
       users.forEach((user) => {
         cy.get('[data-testid="username-input"]').clear().type(user.username);
         cy.get('[data-testid="password-input"]').clear().type(user.password);
         cy.get('[data-testid="login-button"]').click();
         // Přidejte zde aserce podle očekávaných výsledků
       });
     });
     ```

---

### **2. Praktické aktivity**

1. **Vytvoření a použití fixtures:**
   - **Aktivita:**  
     Vytvořte JSON soubor (např. `users.json`) s více objekty uživatelů.  
     Napište Cypress test, který načte tento fixture a ověří, že pole uživatelů obsahuje platná data.

2. **Generování dynamických dat:**
   - **Aktivita:**  
     Napište pomocnou funkci, která generuje náhodná uživatelská data (např. uživatelské jméno, e‑mail).  
     Použijte tato dynamická data v testu k vytvoření nového uživatele a ověření procesu.

3. **Parametrizace testu:**
   - **Aktivita:**  
     Pomocí fixture souboru spusťte stejný test přihlášení pro více uživatelů.  
     Ověřte, že aplikace reaguje správně pro každý uživatelský scénář.

---

### **3. Zdroje**

- **Dokumentace k Cypress Fixtures:**  
  https://docs.cypress.io/api/commands/fixture  
- **Ukázkové soubory fixtures a příklady testovacích dat:**  
  Prozkoumejte příklady na GitHubu nebo v dokumentaci Cypressu.  
- **Knihovny pro dynamická data:**  
  Zvažte využití knihoven jako [Faker.js](https://www.npmjs.com/package/faker) pro generování náhodných testovacích dat.