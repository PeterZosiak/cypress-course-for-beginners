## **Lekce 15: Síťové požadavky a základní testování API v Cypressu**

### **Cíle**

- Naučit se zachytávat a manipulovat se síťovými požadavky pomocí Cypressu.
- Pochopit, jak stubovat odpovědi pro vytvoření konzistentního a kontrolovaného testovacího prostředí.
- Provádět základní testování API zasíláním požadavků a ověřováním odpovědí.
- Kombinovat UI a API testy pro komplexní testovací pokrytí.

---

### **Obsahová struktura**

#### **Co je API?**

**Definice:**  
API (Application Programming Interface – aplikační programovací rozhraní) je sada pravidel a protokolů, která umožňuje různým softwarovým aplikacím vzájemně komunikovat. API definují metody a formáty dat, které mohou aplikace použít k požadování a výměně informací.

**Klíčové body:**
- **Rozhraní pro komunikaci:**  
  Umožňuje jednomu programu komunikovat s jiným bez znalosti jeho interních mechanismů.
- **Typy:**  
  - **Webová API:** Používají HTTP/HTTPS pro komunikaci mezi klientem a serverem.
  - **Knihovní/SDK API:** Poskytují funkce pro využití knihovny nebo frameworku.
- **Použití:**  
  API jsou zásadní pro integraci systémů, získávání dat ze vzdálených služeb, nebo pro umožnění integrací třetích stran.

#### **Co je Backend a co je Frontend?**

**Frontend:**
- **Definice:**  
  Frontend je část aplikace, se kterou uživatelé přímo interagují. Zahrnuje uživatelské rozhraní (UI), HTML, CSS a JavaScript běžící v prohlížeči.
- **Zaměření v testování:**  
  Cypress se primárně zaměřuje na end-to-end testování frontendu, simuluje uživatelské interakce a ověřuje chování UI.

**Backend:**
- **Definice:**  
  Backend je serverová část aplikace. Zpracovává business logiku, práci s databází, autentizaci a API endpointy.
- **Aspekt testování:**  
  Přestože je Cypress určen hlavně pro testování frontendu, může testovat i backendová API zasíláním HTTP požadavků (příkazem `cy.request()`) a stubováním síťových volání pomocí `cy.intercept()`.

#### **Co je HTTP požadavek a HTTP odpověď?**

**HTTP požadavek:**
- **Definice:**  
  HTTP požadavek je zpráva, kterou klient (například prohlížeč) posílá na server za účelem získání zdroje nebo provedení akce.
- **Komponenty:**  
  - **Metoda:** GET, POST, PUT, DELETE atd.
  - **URL:** Endpoint, ke kterému se klient chce dostat.
  - **Hlavičky (Headers):** Páry klíč-hodnota poskytující další informace (např. Content-Type, Authorization).
  - **Tělo (Body):** Data zasílaná požadavkem (zejména u POST nebo PUT požadavků).

**HTTP odpověď:**
- **Definice:**  
  HTTP odpověď je zpráva, kterou vrací server zpět klientovi po zpracování požadavku.
- **Komponenty:**  
  - **Status kód:** Číselný kód označující výsledek (např. 200 pro úspěch, 404 pro nenalezeno).
  - **Hlavičky:** Metadata o odpovědi (např. Content-Type, Cache-Control).
  - **Tělo:** Vlastní data nebo obsah (HTML, JSON atd.) vrácený serverem.

#### **HTTP hlavičky (Headers)**

**Definice:**  
- **HTTP hlavičky** jsou páry klíč-hodnota zasílané jako součást HTTP požadavku nebo odpovědi. Poskytují metadata o požadavku či odpovědi, jako je typ obsahu, kódování, cache, autentizační tokeny a další.

**Účel a funkce:**
- **Content Negotiation (Vyjednávání obsahu):**  
  Hlavičky jako `Accept` nebo `Content-Type` určují formát dat (např. JSON, XML, HTML), který klient zvládne nebo který je použit v těle zprávy.
- **Autentizace a bezpečnost:**  
  Hlavičky jako `Authorization` (např. Bearer token) slouží k ověření a autorizaci klienta.
- **Cacheování:**  
  Hlavičky jako `Cache-Control`, `ETag` a `Expires` určují, jak mají být odpovědi ukládány do cache klienty a proxy servery.
- **Informace o klientovi a serveru:**  
  Hlavičky jako `User-Agent` (informace o klientu) a `Server` (o serveru) poskytují detaily o zdroji a cíli požadavku/odpovědi.
- **Vlastní hlavičky:**  
  Aplikace mohou použít vlastní hlavičky (často s předponou `X-` nebo `Custom-`) k předávání specifických informací, které nejsou pokryté standardními hlavičkami.

**Příklad v požadavku:**
```http
GET /api/users HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
```

**Příklad v odpovědi:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-cache, no-store, must-revalidate
Expires: 0
Content-Length: 123
```

**Důležitost v testování:**
- Při testování pomocí Cypressu můžete měnit hlavičky (například přidat Authorization token) pomocí `cy.intercept()`.
- Ověřování správnosti hlaviček je důležité pro zajištění správné a bezpečné komunikace aplikace s klienty.

#### **HTTP tělo (Body)**

**Definice:**  
- **HTTP tělo** je část požadavku nebo odpovědi obsahující vlastní posílaná data. V požadavcích může obsahovat formulářová data, JSON, XML nebo binární data. V odpovědích obvykle obsahuje požadovaný zdroj (například HTML stránku, JSON objekt nebo soubor).

**Účel a funkce:**
- **Odesílání dat:**  
  V POST, PUT nebo PATCH požadavcích obsahuje tělo informace, které klient chce zaslat serveru (např. formulářová data nebo soubory).
- **Reprezentace zdroje:**  
  U GET požadavků tělo odpovědi většinou obsahuje zdroj, jako je HTML stránka nebo JSON payload z API.
- **Content Negotiation:**  
  Formát těla je často určován hlavičkou `Content-Type`, aby klient i server rozuměli struktuře dat.

**Příklad v těle požadavku:**
- **POST požadavek (JSON):**
  ```json
  {
    "username": "demoUser",
    "password": "demoPass"
  }
  ```

**Příklad v těle odpovědi:**
- **GET požadavek (JSON):**
  ```json
  [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
  ```

**Důležitost v testování:**
- Při testování API pomocí `cy.request()` nebo stubování odpovědí pomocí `cy.intercept()` je důležité validovat tělo odpovědi, aby odpovídalo očekávaným datům.
- Může být potřeba také posílat konkrétní data v těle požadavku, aby byla ověřena správná zpracovatelnost payloadu aplikací.

#### **Co je MOCK? (Mockování)**

**Definice:**  
Mockování znamená simulaci odpovědí API nebo jiných externích služeb nahrazením skutečných dat předem definovanými hodnotami. To slouží k:
- **Izolaci testů:**  
  Zajistí, že testy nejsou závislé na dostupnosti nebo chování externích systémů.
- **Vytváření konzistentních dat:**  
  Poskytuje předvídatelné odpovědi pro spolehlivé výsledky testování.
- **Zrychlení testů:**  
  Eliminuje síťové prodlevy a nestabilitu způsobenou externími službami.

---

#### **A. Základní testování API**

1. **Zasílání API požadavků v Cypressu:**
   - **Použití `cy.request()`:**
     - **Definice:**  
       `cy.request()` slouží k zasílání HTTP požadavků přímo z testu. Ideální pro testování API endpointů bez interakce s UI.
     - **Příklad:**
       ```javascript
       cy.request('GET', '/api/users').then((response) => {
         // Validace odpovědi zde
       });
       ```

2. **Validace odpovědí API:**
   - **Status kód:**  
     Ověřte, že status odpovědi je očekávaný (například 200 pro úspěch).
     ```javascript
     cy.request('/api/users').its('status').should('eq', 200);
     ```
   - **Tělo odpovědi:**  
     Použijte asserty pro ověření struktury a obsahu odpovědi.
     ```javascript
     cy.request('/api/users').then((response) => {
       expect(response.body).to.be.an('array');
       expect(response.body[0]).to.have.property('name', 'Alice');
     });
     ```

3. **Kombinace UI a API testů:**
   - **Případ použití:**  
     Ověřte, že UI zobrazí data, která odpovídají údajům získaným z API. Například můžete načíst uživatelská data přes `cy.request()` a poté ověřit jejich zobrazení v UI.
     ```javascript
     cy.request('/api/users').then((apiResponse) => {
       cy.visit('/users');
       apiResponse.body.forEach((user, index) => {
         cy.get(`[data-testid="user-${index}"]`).should('contain', user.name);
       });
     });
     ```

---

#### **B. Zachycování síťových požadavků**

1. **Použití `cy.intercept()`:**
   - **Definice:**  
     `cy.intercept()` je příkaz v Cypressu, který umožňuje sledovat, zachycovat a modifikovat HTTP požadavky a odpovědi. Je klíčový pro izolaci testů od backendu a zajištění předvídatelných výsledků.

    **Hlavní použití:**
    - **Sledování požadavků:**  
      Zachycení a analýza síťových požadavků k ověření, že jsou prováděny dle očekávání.
    - **Stubování odpovědí:**  
      Nahrazení odpovědí kontrolovanými a předvídatelnými daty (mocky) pro izolaci testů od backendu.
    - **Modifikace požadavků/odpovědí:**  
      Úprava hlaviček, těla nebo jiných vlastností před doručením aplikaci.

    **Proč je to důležité:**
    - **Izolace:**  
      Testy nejsou závislé na proměnlivém chování backendu, což zajišťuje determinismus.
    - **Kontrola:**  
      Možnost simulovat různé scénáře (úspěch, selhání, zpoždění) úpravou odpovědí.
    - **Flexibilita:**  
      Umožňuje testovat error handling, autentizační toky a další bez zásahů do backendu.

   - **Základní syntaxe:**
     ```javascript
     cy.intercept(method, url, response);
     ```
     - **method:** HTTP metoda (GET, POST atd.).
     - **url:** URL endpointu (může být pattern nebo regex).
     - **response:** Volitelně objekt pro stubování odpovědi.
   - **Příklad:**
     ```javascript
     // Zachycení GET požadavků na "/api/users"
     cy.intercept('GET', '/api/users').as('getUsers');
     ```
   - **Stubování odpovědí:**  
     Místo odeslání požadavku do reálného backendu lze odpověď nahradit custom daty.
     ```javascript
     cy.intercept('GET', '/api/users', {
       statusCode: 200,
       body: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
     }).as('getUsers');
     ```

      **Příklad kódu – stubování odpovědi:**
      ```javascript
      cy.intercept('GET', '/api/users', {
        statusCode: 200,
        body: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
      }).as('getUsers');

      cy.visit('/users');
      cy.wait('@getUsers').its('response.statusCode').should('eq', 200);
      ```

      **Příklad modifikace HTTP hlaviček:**
      ```javascript
      cy.intercept(
        {
          method: 'GET',
          url: '/api/secure-data'
        },
        (req) => {
          // Úprava hlaviček před odesláním požadavku
          req.headers['Authorization'] = 'Bearer my-secret-token';
        }
      ).as('secureData');

      cy.visit('/secure');
      cy.wait('@secureData');
      ```

      ##### **6. Co je .as() v Cypressu?**

      **Definice:**  
      Příkaz `.as()` v Cypressu přiřadí alias požadavku, elementu nebo jinému chainovatelnému objektu. Tento alias můžete později v testech použít pro odkazování na stejný objekt či požadavek, což zlepšuje čitelnost a znovupoužitelnost.

      **Příklad použití:**
      ```javascript
      // Přiřazení aliasu zachycenému síťovému požadavku
      cy.intercept('GET', '/api/users').as('getUsers');
      cy.visit('/users');
      cy.wait('@getUsers').then((interception) => {
        // Lze zde provádět asserty na zachycení
        expect(interception.response.statusCode).to.eq(200);
      });

      // Přiřazení aliasu DOM elementu
      cy.get('[data-testid="login-button"]').as('loginButton');
      cy.get('@loginButton').click();
      ```

      **Výhody:**
      - **Čitelnost:**  
        Aliasy dělají test krokově popisnějšími.
      - **Znovupoužitelnost:**  
        Stejný odkaz můžete použít v několika assertech nebo akcích.

---

#### **C. Osvědčené postupy (Best Practices)**

1. **Izolace testů pomocí mockování odpovědí:**
   - Stubujte síťové odpovědi přes `cy.intercept()`, abyste oddělili testy od backendu.
   - Tím snížíte nestabilitu způsobenou variabilitou sítě nebo problémy backendu.

2. **Zajištění deterministických testů:**
   - Používejte fixní, předvídatelná data pro stuby.
   - Během testů se nespoléhejte na externí služby pro zajištění konzistentních výsledků.

3. **Kombinace UI a API testů:**
   - Ověřte, že UI prvky přesně odrážejí data vrácená z API.
   - Pomocí API testů ověřujte backend chování a pomocí UI testů prezentaci a logiku.

4. **Přehledné aliasování a logování:**
   - Aliasujte zachycené požadavky (např. `.as('getUsers')`) pro lepší čitelnost testů.
   - Používejte logování (`cy.log()`) pro ladění síťových problémů při neúspěšných testech.

---

#### **D. Další JavaScript frameworky či pluginy vhodné pro API testování**

I když je Cypress skvělý pro end-to-end i API testování, existují i další nástroje a frameworky:

- **Postman/Newman:**  
  Postman je populární nástroj pro testování API a Newman je jeho CLI nástroj. Výborný pro spouštění API testů v CI/CD pipeline.
  
- **Jest se Supertest:**  
  Pro unit a integrační testování API kombinuje Jest se Supertestem expresivní zápis testů, které posílají HTTP požadavky na backend.
  
- **Mocha/Chai s Axios nebo Request:**  
  Tyto frameworky lze použít pro psaní API testů mimo prohlížeč, zejména pro složitější nebo čistě backendové testy.
  
- **Puppeteer nebo Playwright:**  
  Přestože jsou tyto nástroje hlavně pro automatizaci prohlížeče, podporují také zachytávání síťových požadavků a provádění API testů.


### **E. Praktické úkoly**

1. **Zachycení a stubování síťových požadavků:**
   - Napište test, který zachytí GET požadavek na `/api/users` a stubuje custom odpověď.
   - Ověřte, že vaše aplikace zobrazí stubovaná data správně.

2. **Základní testování API:**
   - Použijte `cy.request()` pro zaslání požadavku na API endpoint.
   - Ověřte status odpovědi, hlavičky a obsah těla.

3. **Kombinace UI a API testů:**
   - Vytvořte test, který získá data z API přes `cy.request()`, poté přejde na UI stránku a ověří, že zobrazená data odpovídají odpovědi API.

4. **Multidomain testování s cy.origin:**
   - Napište test, který přepne kontext na externí doménu (nebo simulovanou doménu) a ověří specifické prvky nebo odpovědi API.

5. **Správa sessionů s cy.session:**
   - Napište testy používající `cy.session()` pro cacheování stavu přihlášení a ověřte, že následující testy profitují z uložené session díky kratšímu nastavení.

---

### **F. Zdroje**

- **Cypress dokumentace síťových požadavků:**  
  [Cypress Intercept Documentation](https://docs.cypress.io/api/commands/intercept)
- **Příklady testování API v Cypressu:**  
  Hledejte příklady použití `cy.request()` na GitHubu.
- **Cypress Multidomain Testing:**  
  [cy.origin Documentation](https://docs.cypress.io/api/commands/origin)
- **Cypress sessiony:**  
  [cy.session Documentation](https://docs.cypress.io/api/commands/session)

- **Testing API sites for practise**
  [Fake Store API](https://fakestoreapi.com/)
  [Booking app](https://restful-booker.herokuapp.com/)

---

### **Možné dotazy studentů a odpovědi**

1. **Q:** *Proč bych měl v testech stubovat síťové požadavky?*  
   **A:** Stubování síťových požadavků izoluje testy od změn na backendu a problémů s připojením, což zajišťuje, že testy poběží s konzistentními, předvídatelnými daty.

2. **Q:** *Jaký je rozdíl mezi cy.request() a cy.intercept()?*  
   **A:** `cy.request()` se používá k odesílání HTTP požadavků přímo z testu, což je ideální pro testování API. `cy.intercept()` slouží ke sledování nebo stubování požadavků, které vaše aplikace provádí během testování.

5. **Q:** *Mohu v jednom testovacím balíčku kombinovat API a UI testy?*  
   **A:** Ano, kombinace API a UI testů zajišťuje komplexní pokrytí ověřením jak backendových dat, tak jejich správného zobrazení v UI. Například můžete použít `cy.request()` k získání dat a poté ověřit, že UI zobrazuje správná data.

   Níže je detailní vysvětlení HTTP hlaviček a těla:

- **HTTP hlavičky:**  
  Poskytují metadata o požadavku nebo odpovědi (typ obsahu, cacheování, autentizace atd.). Pomáhají řídit a určovat, jak mají být data interpretována.
  
- **HTTP tělo:**  
  Obsahuje vlastní přenášená data (například JSON, HTML nebo obsah souboru). Je to jádro HTTP zprávy.

Pochopení HTTP hlaviček i těla je zásadní při psaní API testů, protože umožňuje ověřit nejen to, že jsou data správně zasílána či přijímána, ale také že jsou zpracovávána ve správném kontextu, s odpovídajícím typem obsahu, autentizací a dalšími potřebnými informacemi.