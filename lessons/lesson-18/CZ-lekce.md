## **Lekce 18: Cypress Dashboard, Reporting a Průběžná integrace a dodávání (CI/CD)**

### **Cíle**

- **Cypress Dashboard:**  
  Pochopit funkce a přínosy Cypress Dashboardu pro správu a sledování běhů testů.

- **Reporting:**  
  Naučit se generovat, přizpůsobovat a interpretovat Cypress testovací reporty a metriky.

- **Integrace CI/CD:**  
  Integrovat Cypress testy do automatizovaných workflow pomocí populárních CI/CD nástrojů (například GitHub Actions, GitLab CI nebo Jenkins), aby se testy spouštěly při každém commitu a nasazení kódu.

---

### **Podrobný obsah**

#### **A. Cypress Dashboard**

1. **Přehled funkcí Cypress Dashboardu:**  
Webová služba poskytovaná Cypress.io pro správu a vizualizaci běhů testů.  
K dispozici pro open-source i komerční použití.

Registrujte se zde: [https://dashboard.cypress.io](https://dashboard.cypress.io)

   - **Monitorování v reálném čase:**  
     Sledujte stav běhu testů, videa, screenshoty a logy v reálném čase.
   - **Historie testů & analytika:**  
     Analyzujte trendy v čase, detailní historii běhů a sledujte výkon.
   - **Ladění chyb:**  
     Přístup k časovým snímkům a podrobným logům pro rychlé odhalení problémů.
   - **Spolupráce:**  
     Sdílení výsledků testů s kolegy a integrace s nástroji pro sledování úkolů.

2. **Přínosy pro správu a reporting testů:**  
   - **Centralizovaný pohled:**  
     Všechny běhy testů a jejich detaily jsou uloženy na jednom dashboardu.
   - **Automatický záznam videí a screenshotů:**  
     Jednodušší ladění občasně se vyskytujících problémů.
   - **Vylepšený reporting:**  
     Vizualizace výkonu testů a trendů.
   - **Týmová spolupráce:**  
     Umožňuje sdílení poznatků a historických dat se zainteresovanými stranami.

3. **Nastavení integrace Cypress Dashboardu:**  
   - **Vytvoření účtu:**  
     Registrujte se na [Cypress Dashboard](https://dashboard.cypress.io/).
   - **Konfigurace projektu:**  
     Přidejte ID projektu do konfigurace Cypress.
     ```json
     // Ukázka v cypress.config.js:
     module.exports = defineConfig({
       e2e: {
         // ... další nastavení
         projectId: 'your-project-id', // Poskytuje Cypress Dashboard
       }
     });
     ```
   - **Nahrání výsledků:**  
     Použijte CLI příkaz `npx cypress run --record --key <record-key>` pro nahrání výsledků testů.

   - **Přidání do testovacího příkazu:**
      ```json
      "scripts": {
        "test:cloud": "cypress run --record --key YOUR_PROJECT_KEY"
      }
      ```

---

#### **B. Reporting**

1. **Generování testovacích reportů:**  
- Pomáhá odhalit vzorce v neúspěších.
- Dokumentuje kvalitu a spolehlivost testů.
- Užitečné v týmové komunikaci a CI dashboardech.
- Screenshoty a videa jsou automaticky ukládány při chybě (`videos/`, `screenshots/`).

   - **Vestavěný reporting:**  
     Cypress poskytuje základní reporting v CLI, včetně detailů o úspěšných, neúspěšných a přeskočených testech.
   - **Vlastní reportery:**  
     Pluginy jako `cypress-mochawesome-reporter` mohou generovat podrobné HTML reporty.
     ```bash
     npm install cypress-mochawesome-reporter --save-dev
     ```
     Poté nakonfigurujte v konfiguraci Cypress:
     ```javascript
     module.exports = defineConfig({
       e2e: {
         reporter: 'cypress-mochawesome-reporter',
         reporterOptions: {
           reportDir: 'cypress/reports',
           overwrite: false,
           html: true,
           json: true
         }
       }
     });
     ```
     Vygenerování plného HTML reportu:
      ```bash
      npx mochawesome-merge cypress/reports/*.json | npx mochawesome-report-generator --reportDir cypress/reports/html
      ```

2. **Přizpůsobení výstupních reportů:**  
   - Přizpůsobte název reportu, téma a výstupní složky pomocí voleb v reporteru.
   - Analyzujte metriky jako délka testu, počet opakování a chybové logy pro nové poznatky.

3. **Analýza výsledků testů a metrik:**  
   - Prohlížejte screenshoty a záznamy z Dashboardu.
   - Využijte podrobné logy a snímky k nalezení selhání a úzkých míst ve výkonu testů.

---

#### **C. Průběžná integrace (CI) a průběžné dodávání (CD)**

- **CI (Continuous Integration):** Automaticky testuje a validuje změny v kódu.
- **CD (Continuous Delivery/Deployment):** Automaticky nasazuje kód do testovacích nebo produkčních prostředí.

###### 🔹 Populární CI nástroje:
- GitHub Actions ✅
- GitLab CI
- Jenkins
- CircleCI
- Bitbucket Pipelines
- Azure DevOps

1. **Úvod do konceptů CI/CD:**  
   - **CI (Continuous Integration):**  
     Automatizace procesu buildu a testování kódu při každém commitu.
   - **CD (Continuous Delivery):**  
     Automatizace nasazování, aby se změny kódu dostaly do produkce rychle a spolehlivě.

2. **Konfigurace spouštění Cypress testů v CI/CD pipelinech:**  
   - **Příklad pro GitHub Actions:**
     ```yaml
     # .github/workflows/cypress.yml
     name: Cypress Tests

     on:
       push:
         branches:
           - main
       pull_request:
         branches:
           - main

     jobs:
       cypress-run:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v2
           - name: Use Node.js
             uses: actions/setup-node@v2
             with:
               node-version: '16'
           - name: Install Dependencies
             run: npm install
           - name: Run Cypress Tests
             run: npx cypress run --record --key ${{ secrets.CYPRESS_RECORD_KEY }}
     ```
   - **Automatizace běhů testů:**  
     Nastavte CI/CD pipeline tak, aby testy běžely automaticky při commitech, pull requestech nebo nasazeních.

4. **Notifikace a upozornění:**  
   - Integrace se Slackem, e-mailem nebo jinými zprávovými systémy pro upozornění týmu na selhání testů.
   - Využívejte notifikace Dashboardu k informování zainteresovaných o problémech s buildem.

5. **Osvědčené postupy v CI/CD:**  
   - Bezpečné spravování environment proměnných a tajných údajů (používejte šifrované úložiště CI/CD platforem).
   - Zajištěte konzistentní prostředí pro testování (například pomocí Dockeru nebo kontejnerizace).
   - Optimalizujte běh testů paralelizací a využíváním cachování.

---

#### **D. Praktické aktivity**

1. **Nastavení Cypress Dashboardu:**  
   - Vytvořte účet na Cypress Dashboardu a nakonfigurujte projekt s přiděleným ID projektu.
   - Spouštějte testy s volbou record, aby se výsledky nahrávaly do Dashboardu.

2. **Konfigurace CI pipeline:**  
   - Použijte GitHub Actions (nebo jiný CI nástroj) k nastavení workflow, které bude spouštět Cypress testy automaticky po pushi a pull requestech.
   - Procvičte si spuštění pipeline a prohlédněte si vygenerované reporty testů.

3. **Generování a interpretace testovacích reportů:**  
   - Nakonfigurujte vlastní reporter (například `cypress-mochawesome-reporter`) a generujte HTML reporty.
   - Analyzujte reporty pro odhalení nestabilních testů, problémů s výkonem a trendů v chybách.

4. **Simulace scénáře z praxe:**  
   - Použijte `cy.intercept()` k podvržení síťových požadavků a simulaci různých odpovědí backendu.
   - Kombinujte UI testy s API testy tím, že ověříte, že UI zobrazuje data odpovídající API odpovědím.

5. **CI/CD upozornění:**  
   - Nastavte upozornění (například přes Slack) v CI pipeline, která vás informují o selhání testů.
   - Diskutujte, jak automatizovaná upozornění zlepšují reakci týmu na problémy.

---

#### **E. Zdroje**

- **Dokumentace Cypress Dashboardu:**  
  [Cypress Dashboard](https://docs.cypress.io/guides/dashboard)
- **Pluginy pro reporting v Cypressu:**  
  - [cypress-mochawesome-reporter](https://github.com/adamgruber/cypress-mochawesome-reporter)
- **Průvodci integrací CI/CD:**  
  - GitHub Actions: [GitHub Actions for Cypress](https://docs.cypress.io/guides/guides/continuous-integration)
  - GitLab CI: [Cypress with GitLab CI](https://docs.cypress.io/guides/guides/gitlab-ci)
  - Jenkins: [Using Cypress with Jenkins](https://docs.cypress.io/guides/guides/jenkins)
- **Komunitní příklady:**  
  Vyhledejte na GitHubu repozitáře používající Cypress s CI/CD pipeline pro další příklady a inspiraci.

---

### **Potenciální otázky studentů a odpovědi**

1. **Q:** *Jaký je hlavní přínos používání Cypress Dashboardu?*  
   **A:** Cypress Dashboard centralizuje výsledky běhů testů, poskytuje zpětnou vazbu v reálném čase pomocí videí a screenshotů a pomáhá při ladění chyb díky podrobným logům a historickým datům.

2. **Q:** *Jak můžu v Cypressu přizpůsobit testovací reporty?*  
   **A:** Můžete použít vlastní reportery jako `cypress-mochawesome-reporter` pro generování podrobných HTML reportů. Tito reportéři jsou nakonfigurovatelní pomocí voleb v konfiguračním souboru Cypress pro úpravu formátu reportu a umístění výstupu.

3. **Q:** *Co je CI/CD a proč je důležitý pro testovací automatizaci?*  
   **A:** CI/CD znamená průběžnou integraci a průběžné dodávání. Automatizuje proces buildování, testování a nasazování, což zajišťuje, že změny v kódu jsou automaticky ověřeny a rychle vydávané. Integrace Cypress testů do CI/CD pipeline pomáhá odhalit chyby včas a zajišťuje kvalitu každého vydání.

4. **Q:** *Jak fungují environment proměnné a tajné údaje v CI/CD pipelinech?*  
   **A:** CI/CD platformy poskytují zabezpečené způsoby správy environment proměnných a tajných údajů. Tyto hodnoty jsou vstřikovány do procesu buildu a testování, takže citlivá data (například API klíče) nejsou zapsána v testech natvrdo.

5. **Q:** *Jak cy.intercept() zlepšuje spolehlivost testů?*  
   **A:** `cy.intercept()` umožňuje podvrhnout síťové požadavky, takže vaše testy nejsou ovlivněny variabilitou externího backendu. To vede k determinističtějším výsledkům a rychlejšímu provádění testů.

6. **Q:** *Jaké jsou výhody integrace Cypress testů do CI/CD pipeline?*  
   **A:** Automatizace běhů testů při každém commitu nebo nasazení, rychlá zpětná vazba na změny, zlepšená spolupráce a schopnost odhalit chyby v rané fázi jsou hlavními výhodami. Umožňuje také průběžné zajišťování kvality napříč vývojovým cyklem.
