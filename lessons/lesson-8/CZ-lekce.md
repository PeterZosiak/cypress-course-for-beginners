## **Lekce 8: Zpracování assercí a validací**

### **1. Obsah lekce**

#### **A. Úvod do Assertions**
- **Definice:**
  - Assertions jsou prohlášení ve vašem testovacím kódu, která kontrolují, zda je určitá podmínka pravdivá. Jsou klíčová pro ověření, že stav aplikace odpovídá očekávaným výsledkům.
- **Proč jsou Assertions důležitá:**
  - **Detekce chyb:** Pomáhají rychle identifikovat, kdy se aplikace nechová podle očekávání.
  - **Spolehlivost testů:** Zajišťují, že změny v kódu neporuší očekávanou funkčnost.
  - **Dokumentace:** Slouží jako živá dokumentace toho, co by aplikace měla dělat.

#### **B. Assertions Cypress a integrace s Chai**
- **Vestavěná Assertions Cypress:**
  - Cypress používá Chai v pozadí pro Assertions.
- **Styly Assertions Chai:**
  - **Should:** Řetězová Assertions pomocí `should()`.
  - **Expect:** Funkční styl Assertions pomocí `expect()`.
  - **Assert:** Klasický styl Assertions pomocí `assert`.
- **Příklady:**
  - `cy.get(selector).should('be.visible')`
  - `expect(value).to.equal(expectedValue)`

**Definice:**
Chai je populární knihovna pro Assertions pro JavaScript, která poskytuje různé styly pro psaní testů. Umožňuje vývojářům psát testy, které jsou snadno čitelné s jasnými, popisnými Assertionsi.

**Jak používat Chai:**
- **Integrace s Cypress:**  
  Cypress zahrnuje Chai přímo, takže můžete používat jeho Assertions přímo ve svých testech bez jakéhokoli dodatečného nastavení.
- **Běžné styly Assertions v Chai:**
  - **Should Style:**  
    Používá jazyk pro řetězení, aby vytvářel Assertions, která zní jako přirozený jazyk.
    ```javascript
    cy.get('[data-testid="login-button"]').should('be.visible');
    ```
  - **Expect Style:**  
    Používá funkční volání pro uplatnění očekávání.
    ```javascript
    cy.get('[data-testid="login-button"]').then(($btn) => {
      expect($btn).to.be.visible;
    });
    ```
  - **Assert Style:**  
    Používá klasické funkce Assertions.
    ```javascript
    cy.get('[data-testid="login-button"]').then(($btn) => {
      assert.isTrue($btn.is(':visible'), 'Tlačítko pro přihlášení je viditelné');
    });
    ```


- **Should Style:**  
  - **Výhody:**  
    - Velmi čitelné a expresivní (např. `should('be.visible')`).
    - Podporuje řetězení vícero Assertions v přirozené, plynulé syntaxi.
    - Automaticky opakuje Assertions při použití s příkazy Cypress.
  - **Nevýhody:**  
    - Vyžaduje rozšíření prototypů objektů, což nemusí být preferováno ve všech prostředích.
- **Expect Style:**  
  - **Výhody:**  
    - Jasná syntaxi založená na funkcích, kterou mnoho vývojářů považuje za známou.
    - Není potřeba rozšiřovat prototypy.
  - **Nevýhody:**  
    - Při použití s příkazy Cypress se automaticky neopakuje, protože se obvykle používá uvnitř callbacku `.then()`.
- **Assert Style:**  
  - **Výhody:**  
    - Více tradiční a přímočaré, podobné Assertions v jiných jazycích.
  - **Nevýhody:**  
    - Může být méně čitelné a vyžaduje více boilerplate kódu.


#### **C. Běžné metody Assertions v Cypress**
- **Viditelnost a existence:**
  - `should('be.visible')`, `should('exist')`, `should('not.exist')`
- **Validace obsahu:**
  - `should('have.text', 'očekávaný text')`
  - `should('contain', 'částečný text')`
- **Kontrola atributů:**
  - `should('have.attr', 'názevAtributu', 'hodnota')`
- **Kontrola CSS a stylů:**
  - `should('have.css', 'vlastnost', 'hodnota')`
- **Kontrola stavu:**
  - `should('be.disabled')`, `should('be.enabled')`, `should('be.checked')`

#### **D. Pokročilá Assertions**
- **Více Assertions:**
  - Řetěz více `should()` příkazů pro komplexní validaci.
  - Příklad: Zkontrolujte, že je prvek viditelný a obsahuje specifický text.
- **Podmínková Assertions:**
  - Použijte `.then()` k provedení Assertions na základě dynamického obsahu nebo podmínek.
- **Vlastní Assertions:**
  - Definujte vlastní logiku Assertions, když vestavěná nejsou dostatečná.


##### **Více Assertions a řetězení Assertions**

**Řetězení Assertions pomocí `should()`:**
- **Příklad:**
  ```javascript
  cy.get('[data-testid="username-input"]')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'Zadejte své uživatelské jméno')
    .and(($input) => {
      // Vlastní kontrola, aby se zajistilo, že vstup je ve výchozím stavu prázdný
      expect($input.val()).to.equal('');
    });
  ```
- **Vysvětlení:**  
  Výše uvedený řetězec:
  - Ověřuje, že je prvek viditelný.
  - Kontroluje, že atribut placeholder má očekávanou hodnotu.
  - Provádí vlastní Assertions, aby zajistil, že je hodnota vstupu prázdná.
  
**Více Assertions v jednom příkazu:**
- Použití několika volání `should()` nebo řetězení pomocí `and()` vám umožňuje potvrdit několik podmínek na stejném prvku, aniž byste museli znovu dotazovat DOM, což je efektivní a zlepšuje čitelnost.


### **Proč používat `should()` namísto `expect()` v Cypress**

- **Mechanismus automatického opakování:**
  - **`should()`** je integrováno s opakovatelností Cypress. Pokud Assertions zpočátku selže kvůli dočasnému stavu (např. načítání prvku asynchronně), Cypress automaticky zopakuje Assertions, dokud neprojde nebo nedojde časový limit.
  - **`expect()`** se používá uvnitř bloků `.then()`, což znamená, že vykonává pouze jednou. Pokud prvek není v očekávaném stavu v ten okamžik, test selže okamžitě.
  
- **Řetězení:**
  - `should()` umožňuje řetězit více Assertions na stejném subjektu, čímž se snižuje potřeba opakovaných dotazů na DOM a zjednodušuje testy.
  
- **Čitelnost:**
  - Plynulý, jazykový styl `should()` činí Assertions testů snadno čitelnými a pochopitelnými na první pohled.

- **Konzistence s příkazy Cypress:**
  - Používání `should()` přímo na příkazech Cypress se bezproblémově integruje s frontou příkazů Cypress, což zajišťuje, že Assertions se opakují společně s vykonáváním příkazů.

**Srovnání příkladů:**

Použití **`should()`** (preferované):
```javascript
cy.get('[data-testid="submit-button"]')
  .should('be.visible')
  .and('not.be.disabled');
```

Použití **`expect()`** (méně ideální v kontextu Cypress):
```javascript
cy.get('[data-testid="submit-button"]').then(($btn) => {
  expect($btn).to.be.visible;
  expect($btn).to.not.be.disabled;
});
```
- Ve druhém příkladu, pokud není tlačítko ihned viditelné, test selže bez opakování.


#### **E. Osvedčené postupy pro Assertions a validace**
- **Jasná a popisná Assertions:**
  - Pište Assertions, které jasně vysvětlují, co kontrolují.
  - Používejte vlastní zprávy nebo dodatečné protokolování, pokud je to nutné.
  - Pište Assertions, které jasně uvádějí, co očekáváte, že se stane.  
     _Příklad:_  
     ```javascript
     cy.get('[data-testid="error-message"]')
       .should('be.visible')
       .and('contain', 'Neplatné údaje');
     ```
   - Vyvarujte se nejednoznačným nebo příliš složitým Assertions, která mísí více kontrol bez jasného oddělení.

- **Granulární testování:**
  - Testujte jednu podmínku na Assertions, kdykoli je to možné. To pomáhá přesně určit selhání.
  - Preferujte testování jedné podmínky na Assertions, kdykoli je to možné, aby bylo možné izolovat problémy.  
     Nicméně když jsou podmínky příbuzné (např. viditelnost prvku a obsah), je vhodné řetězit s `should()`.
- **Vyvarujte se překrývajícím se Assertions:**
  - Zajistěte, aby byla Assertions logicky oddělena, abyste se vyhnuli zmatku při ladění selhání.
  - Nedělejte to samé Assertions několika způsoby v rámci jednoho testovacího kroku; místo toho zajistěte, aby mělo každé Assertions unikátní účel.

- **Využijte opakovatelnost Cypress:** 
  - Cypress automaticky opakuje Assertions, dokud neprojdou nebo nevyprší časový limit, takže pište Assertions, která jsou odolná vůči problémům s načasováním.
- **Používejte správné řetězení:**
  - Řetězujte Assertions, aby se snížila redundance kódu a zlepšila čitelnost.

---

### **2. Příklady kódu**

#### **A. Základní Assertions pomocí `should`**

```javascript
// Ověřte, že je tlačítko pro přihlášení viditelné a povolené
cy.get('[data-testid="login-button"]')
  .should('be.visible')
  .and('not.be.disabled');
```

#### **B. Ověření obsahu textu**

```javascript
// Zkontrolujte, zda úspěšná zpráva obsahuje očekávaný text
cy.get('[data-testid="success-message"]')
  .should('be.visible')
  .and('contain', 'Přihlášení úspěšné');
```

#### **C. Kontrola atributů prvku**

```javascript
// Ověřte, že prvek obrázku má správný atribut src
cy.get('[data-testid="hero-image"]')
  .should('have.attr', 'src', 'images/hero.jpg');
```

#### **D. Použití `expect` pro Assertions**

```javascript
// Použití expect pro Assertions založené na proměnných
cy.get('[data-testid="user-count"]').then(($count) => {
  const countText = $count.text();
  expect(parseInt(countText)).to.be.greaterThan(0);
});
```

#### **E. Řetězení více Assertions**

```javascript
// Řetězování Assertions k ověření více podmínek na vstupu formuláře
cy.get('[data-testid="username-input"]')
  .should('be.visible')
  .and('have.attr', 'placeholder', 'Zadejte své uživatelské jméno')
  .and(($input) => {
    // Vlastní Assertions pro kontrolu, zda vstup není prázdný po psaní
    expect($input.val()).to.not.be.empty;
  });
```

#### **F. Podmínková Assertions s `.then()`**

```javascript
// Použití .then() pro podmínkové Assertions na základě dynamického obsahu
cy.get('[data-testid="error-message"]').then(($el) => {
  if ($el.is(':visible')) {
    expect($el).to.contain('Neplatné údaje');
  } else {
    cy.log('Zpráva o chybě není viditelná, test mohl proběhnout.');
  }
});
```

---

### **3. Potenciální otázky studentů**

1. **Jaký je rozdíl mezi `should` a `expect` v Cypress?**
   - **Odpověď:**  
     `should()` je řetězitelný příkaz, který se automaticky opakuje, dokud nevydrží, zatímco `expect()` se používá pro jednorázová Assertions uvnitř bloku `.then()`.

2. **Jak se Cypress vyrovnává s Assertionsi, pokud se prvky načítají?**
   - **Odpověď:**  
     Cypress automaticky opakuje Assertions, dokud neprojdou nebo nevyprší výchozí časový limit, což zajišťuje, že asynchronní prvky se zpracovávají hladce.

3. **Mohu psát vlastní Assertions v Cypress?**
   - **Odpověď:**  
     Ano, můžete psát vlastní Assertions uvnitř bloků `.then()`, aby zpracovaly složitou validační logiku.

4. **Proč bych se měl vyhnout překrývajícím se Assertions?**
   - **Odpověď:**  
     Překrývající se Assertions mohou ztížit určení, která podmínka selhala. Udržování oddělených Assertions usnadňuje ladění a údržbu testů.

5. **Co se stane, pokud Assertions selže?**
   - **Odpověď:**  
     Cypress zastaví vykonávání testu a zaznamená chybu, poskytující podrobnosti o selhání, včetně snímků a protokolů pro ladění.

---

### **4. Další doporučení**

- **Interaktivní ladění:**
  - Povzbuďte studenty, aby používali interaktivní testovací runner Cypress pro sledování, jak se Assertions opakují.
- **Skupinová cvičení:**
  - Spárujte studenty, aby psali testovací případy, které zahrnují vícero Assertions, a diskutovali o logice za každým z nich.
- **Kontrola dokumentace:**
  - Nechte studenty prozkoumat [Dokumentaci k Assertions Cypress](https://docs.cypress.io/guides/references/assertions) pro další učení.