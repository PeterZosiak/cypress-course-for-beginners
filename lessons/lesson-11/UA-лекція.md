## **Урок 11: Патерн Page Object Model (POM) у Cypress**

### **Цілі**

- Реалізувати патерн Page Object Model (POM) для підвищення підтримуваності тестів.  
- Інкапсулювати елементи сторінки та дії у багаторазові модулі.  
- Повторно використовувати об’єкти сторінок у різних тестах, щоб мінімізувати дублювання й підвищити масштабованість.  

---

### **Зміст**

#### **A. Розуміння патернів проєктування POM**

##### Що таке патерн проєктування та чому це важливо?

**Визначення:**

**Патерн проєктування** — це загальне, багаторазове рішення для типової проблеми, що виникає під час розробки ПЗ. Це не завершений дизайн, який можна напряму перетворити на код, а радше шаблон або креслення, яке можна застосувати в різних ситуаціях для розв’язання певної задачі.

**Чому патерни проєктування важливі:**

1. **Повторне використання рішень:**  
   - Вони пропонують перевірені способи розв’язання типових задач, зменшуючи потребу «вигадувати велосипед».

2. **Покращене спілкування:**  
   - Патерни дають спільну мову розробникам. Коли хтось згадує «Factory Pattern» чи «Observer Pattern», команда одразу розуміє загальний підхід.

3. **Підвищена підтримуваність:**  
   - Код стає легшим для розуміння, супроводу та розширення, оскільки його структура зрозуміла й відповідає усталеній практиці.

4. **Краще масштабування:**  
   - Патерни допомагають організувати код так, щоб він легко витримував майбутні зміни чи додавання функціоналу.

5. **Розділення відповідальностей:**  
   - Заохочують розділяти обов’язки, що зменшує зв’язаність та підвищує чіткість ролі кожного компонента.

6. **Швидший розвиток:**  
   - Використання усталених шаблонів прискорює розробку, дозволяючи зосередитися на деталей імплементації, а не на загальній структурі.

#### Page Object Model  
1. **Що таке Page Object Model?**  
   - **Визначення:**  
     Page Object Model (POM) — це патерн автоматизації тестів, який відокремлює представлення сторінки (елементи та дії) від логіки тесту. Кожна сторінка застосунку представлена класом або модулем, що містить локатори (селектори) й методи (дії) для взаємодії зі сторінкою.  
   - **Призначення:**  
     - Абстрагувати UI-деталі від тестового коду.  
     - Робити тести підтримуванішими та зрозумілішими.  

2. **Переваги використання POM у тестовій автоматизації:**  
   - **Підтримуваність:**  
     Коли змінюється UI, досить оновити лише об’єкт сторінки, а не всі тести.  
   - **Повторне використання:**  
     Типові дії (наприклад, логін, заповнення форм) інкапсулюються в одному місці та використовуються у багатьох тестах.  
   - **Читабельність:**  
     Тести стають чистішими й зосередженими на логіці перевірок, адже низькорівневі взаємодії винесені в об’єкти сторінок.  
   - **Масштабованість:**  
     Дозволяє будувати модульний набір тестів, який росте разом із застосунком.  

---

#### **B. Реалізація POM**

1. **Створення класів/модулів сторінок:**  
   - Кожна сторінка представлена власним JavaScript-файлом (або класом), що містить селектори й методи для цієї сторінки.  
   - **Приклад структури директорій:**  
     ```
     cypress/
     ├── integration/
     │   ├── login.spec.js
     │   └── registration.spec.js
     └── support/
         └── pages/
             ├── LoginPage.js
             └── RegistrationPage.js
     ```

2. **Інкапсуляція елементів та дій сторінки:**  
   - **Приклад: LoginPage.js**
     ```javascript
     // cypress/support/pages/LoginPage.js
     class LoginPage {
       // Визначення селекторів елементів
       
       usernameInput () => cy.get('[data-cy="login-username-input"]'),
       passwordInput () => cy.get('[data-cy="login-password-input"]'),
       submitButton () => cy.get('[data-cy="login-submit-button"]'),
       errorMessage () => cy.get('[data-cy="error-invalid"]'),
       successMessage () => cy.get('[data-cy="login-success-message"]')
       
       // Визначення дій
       login(username, password) {
         this.usernameInput().clear().type(username);
         this.passwordInput().clear().type(password);
         this.submitButton().click();
       }
     }

     export const loginPage = new LoginPage();
     ```

   - **Приклад: RegistrationPage.js**
     ```javascript
     // cypress/support/pages/RegistrationPage.js
     class RegistrationPage {
       usernameInput () => cy.get('[data-cy="reg-username-input"]'),
       emailInput () => cy.get('[data-cy="reg-email-input"]'),
       passwordInput () => cy.get('[data-cy="reg-password-input"]'),
       submitButton () => cy.get('[data-cy="reg-submit-button"]'),
       successMessage () => cy.get('[data-cy="reg-success-message"]'),
       errorMessage () => cy.get('[data-cy="reg-error-message"]')

       register(user) {
         this.elements.usernameInput().clear().type(user.username);
         this.elements.emailInput().clear().type(user.email);
         this.elements.passwordInput().clear().type(user.password);
         this.elements.submitButton().click();
       }
     }

     export const registrationPage = new RegistrationPage();
     ```

3. **Повторне використання об’єктів сторінок у різних тестах:**  
   - Після оголошення ви можете імпортувати об’єкти сторінок у тестові файли та виконувати дії без дублювання селекторів.  
   - **Приклад у тесті:**
     ```javascript
     /// <reference types="cypress" />
     import { loginPage } from '../../support/pages/LoginPage';

     describe('User Login @login', () => {
       beforeEach(() => {
         cy.visit('login.html');
       });

       it('should log in successfully with valid credentials', () => {
         loginPage.login('demoUser', 'demoPass');
         loginPage.elements.successMessage().should('be.visible');
       });

       it('should display an error with invalid credentials', () => {
         loginPage.login('wrongUser', 'wrongPass');
         loginPage.elements.errorMessage().should('be.visible');
       });
     });
     ```

#### Реалізація POM із параметризованим конструктором

Іноді на сторінці є декілька схожих віджетів (наприклад, картки товару, віджети дашборду), що мають однакову функціональність, але відрізняються id або іншим атрибутом. Для таких випадків можна використати параметризований конструктор у Page Object.

**Приклад: Page Object для віджета**

Припустімо, на дашборді є кілька віджетів, кожен із яких показує інформацію про різні продукти. Кожен віджет має унікальний id, і вам потрібно працювати з конкретним віджетом.

**HTML-приклад (для віджета):**
```html
<div class="widget" data-testid="widget1">
  <h2 data-cy="widget-title">Заголовок віджета</h2>
  <p data-cy="widget-description">Це опис.</p>
  <button data-cy="widget-action">Дія</button>
</div>
```

**Параметризований Page Object:**
```javascript
// cypress/support/pages/WidgetPage.js

class WidgetPage {
  constructor(widgetId) {
    // Контейнер віджета вибирається на основі переданого widgetId
    this.widgetSelector = `[data-test="${widgetId}"]`;
  }

  // Повертає контейнер віджета
  getContainer() {
    return cy.get(this.widgetSelector);
  }

  // Повертає заголовок усередині віджета
  getTitle() {
    return this.getContainer().find('[data-cy="widget-title"]');
  }

  // Повертає опис усередині віджета
  getDescription() {
    return this.getContainer().find('[data-cy="widget-description"]');
  }

  // Повертає кнопку дії віджета
  getActionButton() {
    return this.getContainer().find('[data-cy="widget-action"]');
  }

  // Дія: клік по кнопці дії
  clickActionButton() {
    this.getActionButton().click();
  }
}

// Фабрична функція для створення нового екземпляра віджета за widgetId
export const getWidget = (widgetId) => new WidgetPage(widgetId);
```

**Використання у тесті:**
```javascript
/// <reference types="cypress" />
import { getWidget } from '../../support/pages/WidgetPage';

describe('Dashboard Widgets', () => {
  beforeEach(() => {
    cy.visit('dashboard.html');
  });

  describe('Widget Interactions', () => {
    it('should display correct title and description for widget1', () => {
      const widget = getWidget('widget1');
      widget.getTitle().should('contain', 'Заголовок віджета');
      widget.getDescription().should('contain', 'Це опис.');
    });

    it('should perform an action when widget1 action button is clicked', () => {
      const widget = getWidget('widget1');
      widget.clickActionButton();
      // Додайте перевірки, пов’язані з дією
    });
  });
});
```

##### Ще один приклад — кошик покупок
```javascript
export default class CartItem {
  private index: number = 0
  constructor(index: number = 0) {
    // логіка конструктора
    this.index = index
  }

  product = () => cy.get(`[data-testid="product-${this.index}"]`)

  productTitle = () => this.product().find('[data-testid="product-header"]')
  productType = () => this.product().find('[data-testid="product-type-attribute"]').eq(0)
  editProductBtn = () => this.product().find('[data-testid*="header-detail-button"]')
  detailProduct = () => this.product().find('[data-testid="button-detail-product"]')

  openProductDetail = () => {
    this.editProductBtn().click()
  }
}
```
**Використання в тесті**
```javascript
it('Should open product detail from the cart on Product page', () => {

    // ... код

    let cartItem = new CartItem(0)
    cartItem.productTitle().should('contain', 'Pivo s rumom')
    cartItem.openProductDetail()

    // ... код
  })
```

---

#### **C. Найкращі практики для POM**

1. **Тримайте об’єкти сторінок чистими та сфокусованими:**  
   - Кожен Page Object має містити лише локатори й дії, специфічні для цієї сторінки.  
   - Уникайте змішання непов’язаних логік.  

2. **Уникайте дублювання:**  
   - Повторно використовуйте селектори й дії через оголошення в об’єктах сторінок.  
   - Якщо кілька сторінок мають спільні елементи чи дії, розгляньте створення базового класу сторінки.  

3. **Забезпечте масштабованість:**  
   - Проєктуйте об’єкти сторінок так, щоб їх легко було розширювати разом зі зростанням застосунку.  
   - Використовуйте зрозумілі методи, що відображають дії користувача (`login()`, `register()`, `fillForm()`).  

4. **Підтримуваність:**  
   - При зміні UI оновлюйте тільки відповідний об’єкт сторінки.  
   - Залишайте тестові файли чистими, зосередженими на асерціях, у той час як об’єкти сторінок відповідають за взаємодії.  

5. **Використовуйте описові іменні конвенції:**  
   - **describe():** назва функціоналу чи сторінки (наприклад, «Login Page Tests»).  
   - **it():** дотримуйтеся патерну AAA («should логін успішно за наявності правильних даних»).  

---

#### **D. Використання власних команд Cypress разом із POM**

- Попри те, що Page Object інкапсулює взаємодії зі сторінкою, custom commands можуть інкапсулювати часто повторювані дії на різних сторінках.  
- **Приклад:** якщо логін використовується у багатьох наборах тестів, оголосіть custom command, що викликає `loginPage.login()`.  
  ```javascript
  // у cypress/support/commands.js
  import { loginPage } from './pages/LoginPage';
  Cypress.Commands.add('login', (username, password) => {
    loginPage.login(username, password);
  });
  // Використання в тесті:
  cy.login('demoUser', 'demoPass');
  ```

---

#### **E. Структура тестів у проєктах Cypress**

- **Організація директорій:**  
  - **fixtures:** зовнішні дані (JSON тощо).  
  - **integration/e2e:** файли тестів, організовані за функціоналом.  
  - **plugins:** налаштування або розширення поведінки Cypress.  
  - **support:** власні команди та файли Page Object.  

- **Послідовність:**  
  - Дотримуйтеся сталої конвенції найменування та структури файлів у проєкті.  

- **Масштабованість:**  
  - Організовуйте тести у логічні групи, використовуючи вкладені `describe()`.  
  - Використовуйте custom commands і POM, щоб зменшити дублювання й спростити супровід.  

---

### **Діяльність**

- **Створити тести для прикладного застосунку:**  
  - Дослідити застосунок і запропонувати тести.  

---

### **Ресурси**

- **Документація Cypress про POM:**  
  [Page Object Model in Cypress](https://docs.cypress.io/guides/references/best-practices#Page-Object-Model)  
- **Приклади проєктів:**  
  Вивчайте відкриті проєкти на GitHub, які використовують POM із Cypress.