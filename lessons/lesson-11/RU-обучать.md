## **Урок 11: Шаблон Page Object Model (POM) в Cypress**

### **Цели**

- Реализовать шаблон Page Object Model (POM) для повышения сопровождаемости тестов.
- Инкапсулировать элементы страницы и действия в переиспользуемые модули.
- Переиспользовать объекты страниц в нескольких тестах, чтобы минимизировать дублирование и улучшить масштабируемость.

---

### **Разбор содержимого**

#### **A. Понимание паттернов проектирования POM**

##### Что такое паттерн проектирования и почему он важен?

**Определение:**

**Паттерн проектирования** — это общее, многократно применимое решение типичной проблемы, возникающей при проектировании программного обеспечения. Это не законченный дизайн, который можно сразу превратить в код, а скорее шаблон или чертёж, который можно применить в разных ситуациях для решения архитектурной задачи.

**Почему паттерны проектирования важны:**

1. **Переиспользуемые решения:**  
   - Они предоставляют проверенные способы решения распространённых дизайнерских проблем, снижая необходимость «изобретать велосипед».

2. **Улучшенная коммуникация:**  
   - Паттерны дают разработчикам общий словарь. Когда кто-то упоминает «Factory Pattern» или «Observer Pattern», команда сразу понимает общий подход, о котором идёт речь.

3. **Повышенная сопровождаемость:**  
   - Применение известных паттернов делает код легче для понимания, поддержки и расширения со временем, поскольку структура ясна и соответствует лучшим практикам.

4. **Лучшая масштабируемость:**  
   - Паттерны помогают организовать код так, чтобы он был масштабируемым и мог легче выдерживать будущие изменения или новые функции.

5. **Разделение обязанностей:**  
   - Они поощряют разделять обязанности в коде, что снижает связность и повышает понятность роли каждого компонента.

6. **Более быстрая разработка:**  
   - Использование устоявшихся паттернов ускоряет разработку, предоставляя чертёж решения, позволяя разработчикам сосредоточиться на деталях реализации, а не на общей структуре.


#### Page Object Model
1. **Что такое Page Object Model?**
   - **Определение:**  
     Page Object Model (POM) — это паттерн в автоматизации тестирования, который отделяет представление страницы (её элементы и действия) от логики теста. Каждая страница приложения представлена классом или модулем, содержащим локаторы (селекторы) и методы (действия), взаимодействующие со страницей.
   - **Назначение:**  
     - Абстрагировать детали UI от тестового кода.
     - Сделать тесты более поддерживаемыми и читаемыми.

2. **Преимущества использования POM в автоматизации тестов:**
   - **Сопровождаемость:**  
     Когда UI меняется, необходимо обновить только объект страницы, а не все тесты.
   - **Переиспользуемость:**  
     Общие действия (например, вход в систему, заполнение форм) инкапсулированы в одном месте и могут переиспользоваться во множестве тестов.
   - **Читаемость:**  
     Тесты становятся чище и больше сосредоточены на логике проверки, так как низкоуровневые взаимодействия вынесены в объекты страниц.
   - **Масштабируемость:**  
     Позволяет строить модульный набор тестов, растущий вместе с приложением.

---

#### **B. Реализация POM**

1. **Создание классов/модулей страниц:**
   - Каждая страница представлена собственным JavaScript-файлом (или классом), который содержит селекторы и методы для этой страницы.
   - **Пример структуры каталогов:**
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

2. **Инкапсуляция элементов страницы и действий:**
   - **Пример: LoginPage.js**
     ```javascript
     // cypress/support/pages/LoginPage.js
     class LoginPage {
       // Определяем селекторы элементов
       
       usernameInput () => cy.get('[data-cy="login-username-input"]'),
       passwordInput () => cy.get('[data-cy="login-password-input"]'),
       submitButton () => cy.get('[data-cy="login-submit-button"]'),
       errorMessage () => cy.get('[data-cy="error-invalid"]'),
       successMessage () => cy.get('[data-cy="login-success-message"]')
       
       // Определяем действия
       login(username, password) {
         this.usernameInput().clear().type(username);
         this.passwordInput().clear().type(password);
         this.submitButton().click();
       }
     }

     export const loginPage = new LoginPage();
     ```

   - **Пример: RegistrationPage.js**
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

3. **Переиспользование объектов страниц в нескольких тестах:**
   - После определения вы можете импортировать эти объекты страниц в свои тестовые файлы, чтобы выполнять действия без дублирования логики селекторов.
   - **Пример в тестовом файле:**
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

#### Реализация POM с параметризованным конструктором

В некоторых приложениях на странице может быть несколько похожих виджетов (например, карточки товаров, виджеты панели), которые имеют одинаковый функционал, но различаются id или другим атрибутом. Вы можете использовать параметризованный конструктор в своем Page Object для обработки таких случаев.

**Пример: объект страницы для виджета**

Предположим, на панели есть несколько виджетов, каждый из которых показывает информацию о разных продуктах. Каждый виджет имеет уникальный id, и вам нужно взаимодействовать с определённым виджетом.

**HTML-пример (для виджета):**
```html
<div class="widget" data-testid="widget1">
  <h2 data-cy="widget-title">Widget Title</h2>
  <p data-cy="widget-description">This is a description.</p>
  <button data-cy="widget-action">Action</button>
</div>
```

**Параметризованный Page Object:**
```javascript
// cypress/support/pages/WidgetPage.js

class WidgetPage {
  constructor(widgetId) {
    // Контейнер виджета выбирается на основе переданного widgetId
    this.widgetSelector = `[data-test="${widgetId}"]`;
  }

  // Возвращает элемент контейнера виджета
  getContainer() {
    return cy.get(this.widgetSelector);
  }

  // Возвращает элемент заголовка внутри виджета
  getTitle() {
    return this.getContainer().find('[data-cy="widget-title"]');
  }

  // Возвращает элемент описания внутри виджета
  getDescription() {
    return this.getContainer().find('[data-cy="widget-description"]');
  }

  // Возвращает кнопку действия внутри виджета
  getActionButton() {
    return this.getContainer().find('[data-cy="widget-action"]');
  }

  // Действие: клик по кнопке действия виджета
  clickActionButton() {
    this.getActionButton().click();
  }
}

// Экспортируем фабричную функцию для создания нового экземпляра виджета по widgetId
export const getWidget = (widgetId) => new WidgetPage(widgetId);
```

**Использование в тесте:**
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
      widget.getTitle().should('contain', 'Widget Title');
      widget.getDescription().should('contain', 'This is a description.');
    });

    it('should perform an action when widget1 action button is clicked', () => {
      const widget = getWidget('widget1');
      widget.clickActionButton();
      // Добавьте проверки, связанные с действием, здесь
    });
  });
});
```

##### Другой пример — Корзина покупок
```javascript 

export default class CartItem {
  private index: number = 0
  constructor(index: number = 0) {
    // логика конструктора здесь
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
**Использование в тесте**
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

#### **C. Лучшие практики для POM**

1. **Держите объекты страниц чистыми и сфокусированными:**
   - Каждый объект страницы должен содержать только локаторы и действия, относящиеся к этой странице.
   - Избегайте смешивания не-связанных логик.

2. **Избегайте дублирования:**
   - Переиспользуйте селекторы и действия в тестах, определяя их в объектах страниц.
   - Если несколько страниц делят общие элементы или действия, рассмотрите создание базового класса страницы.

3. **Обеспечьте масштабируемость:**
   - Проектируйте объекты страниц так, чтобы их было легко расширять по мере роста приложения.
   - Используйте понятные, описательные имена методов, отражающие пользовательские действия (например, `login()`, `register()`, `fillForm()`).

4. **Сопровождаемость:**
   - Когда UI меняется, обновляйте только соответствующий объект страницы.
   - Держите тестовые файлы чистыми и сфокусированными на ассертах, а объекты страниц — на взаимодействиях.

5. **Используйте описательные соглашения об именовании:**
   - **describe() блоки:** Используйте название функции или страницы (например, «Тесты страницы входа»).
   - **it() блоки:** Используйте шаблон AAA (например, «должен успешно войти при корректных учетных данных»).

---

#### **D. Использование пользовательских команд Cypress вместе с POM**

- В то время как объекты страниц инкапсулируют специфичные для страниц взаимодействия, пользовательские команды могут инкапсулировать часто повторяющиеся действия на разных страницах.
- **Пример:** Если вход в систему — частое действие в нескольких наборах тестов, определите пользовательскую команду, которая вызывает метод `loginPage.login()`.
  ```javascript
  // В cypress/support/commands.js
  import { loginPage } from './pages/LoginPage';
  Cypress.Commands.add('login', (username, password) => {
    loginPage.login(username, password);
  });
  // Использование в тесте:
  cy.login('demoUser', 'demoPass');
  ```

---

#### **E. Структура тестов для проектов Cypress**

- **Организация каталогов:**  
  - **Fixtures:** Хранят внешние данные (например, JSON-файлы).
  - **Integration/E2E:** Размещайте файлы спецификаций тестов, организованные по функционалу.
  - **Plugins:** Настройка или расширение поведения Cypress.
  - **Support:** Пользовательские команды и файлы объектов страниц.
- **Последовательность:**  
  - Поддерживайте единообразное соглашение об именовании и структуре файлов в проекте.
- **Масштабируемость:**  
  - Организуйте тесты в логические группы, используя вложенные блоки `describe()`.
  - Используйте пользовательские команды и объекты страниц, чтобы снизить дублирование и облегчить поддержку.

---

### **Деятельность**

- **Создайте тест для примерного приложения:**  
  - Изучите приложение и предложите тесты
---

### **Ресурсы**

- **Документация Cypress по POM:**  
  [Page Object Model in Cypress](https://docs.cypress.io/guides/references/best-practices#Page-Object-Model)
- **Примерные проекты:**  
  Изучайте open-source проекты на GitHub, реализующие шаблон POM с Cypress.