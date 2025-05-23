## **Урок 10: Структурирование тестовых наборов и тест-кейсов**

### **Цели**
- Организовывать тесты, используя лучшие практики для удобства поддержки и масштабируемости.
- Используйте команды Cypress для построения чистого, переиспользуемого тестового кода.
- Реализовывать корректные процедуры подготовки (setup) и очистки (teardown).
- Использовать теги и соглашения об именовании для категоризации тестов и выборочного выполнения.

---

### **Структура Контента**

#### **A. Организация тестов**
- **Использование блоков `describe()` и `it()`:**
  - **Блок `describe()`:**  
    Используется для группировки связанных тестов в тестовый набор (suite). Помогает логически структурировать тесты по функционалу или особенностям.
    - **Пример:**
      ```javascript
      describe('Функционал входа', () => {
        // Тест-кейсы, связанные с функционалом входа, размещаются здесь.
      });
      ```
  - **Блок `it()`:**  
    Определяет отдельный тест-кейс, проверяющий конкретное поведение.
    - **Пример:**
      ```javascript
      it('должен успешно войти с правильными учетными данными', () => {
        // Шаги и проверки теста.
      });
      ```
- **Группировка связанных тестов:**
  - Организуйте тесты по пользовательским сценариям (например, вход, регистрация, дашборд) или по функциям.
  - Используйте вложенные блоки `describe()`, чтобы создавать подгруппы для более детальной структуры.

##### **Пример вложенных describe() блоков**

Вложенные describe-блоки помогают лучше структурировать и группировать тесты, особенно при работе с комплексными пользовательскими сценариями или различными аспектами одной функции.

**Пример:**
```javascript
describe('Аккаунт пользователя', () => {
  describe('Функционал входа', () => {
    it('должен успешно войти с правильными учетными данными', () => {
      // Логика теста на вход
    });

    it('должен показать ошибку при неправильных данных', () => {
      // Логика теста для случая с ошибкой
    });
  });

  describe('Функционал регистрации', () => {
    it('должен зарегистрировать пользователя с корректными данными', () => {
      // Логика теста на регистрацию
    });

    it('должен показать ошибки для обязательных полей', () => {
      // Логика теста проверки валидации
    });
  });
});
```

##### **Корректные соглашения об именовании для describe() и it()**

**Соглашения об именовании** должны быть понятными, описательными и следовать единому стилю. Хорошей практикой будет использование естественного языка для описания тестируемой функции и ожидаемого результата.

- **Имена блоков describe():**  
  Используйте существительное или название функции, чтобы четко идентифицировать объект тестирования.
  
  **Примеры:**
  - `describe('Функционал входа', () => { ... })`
  - `describe('Регистрация пользователя', () => { ... })`
  - `describe('Операции с корзиной', () => { ... })`

- **Имена блоков it():**  
  Используйте предложение или фразу, которая формулирует ожидаемое поведение. По возможности придерживайтесь паттерна Arrange-Act-Assert (AAA) в именах тестов.
  
  **Примеры:**
  - `it('должен показать приветственное сообщение при успешном входе', () => { ... })`
  - `it('должен показать ошибку, если обязательные поля не заполнены при регистрации', () => { ... })`
  - `it('должен добавить товар в корзину и корректно обновить итоговую сумму', () => { ... })`

##### **Использование AAA (Arrange-Act-Assert) в тестах и именах тестов**

**Структура AAA:**  
Паттерн AAA делит тесты на три четкие фазы:

- **Arrange:** Подготовка тестовой ситуации, инициализация данных, подготовка окружения.
- **Act:** Выполнение действия, которое требуется протестировать.
- **Assert:** Проверка того, что результат соответствует ожиданиям.

**В именах тестов:**  
Упоминание фаз AAA в названии теста помогает яснее отразить его назначение:
- **Пример имени теста:**  
  `it('подготавливает корректные данные для входа, отправляет форму, и проверяет отображение приветствия', () => { ... })`

**Пример теста с использованием AAA:**
```javascript
it('должен успешно войти с правильными учетными данными', () => {
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

#### **B. Методы подготовки и очистки**
- **Обзор хуков:**
  - **Хук `before()`:**  
    Выполняется один раз перед всеми тестами в блоке `describe()`.
  - **Хук `beforeEach()`:**  
    Выполняется перед каждым отдельным тестом; полезен для сброса состояния или перехода к странице перед тестом.
  - **Хук `after()`:**  
    Выполняется один раз после всех тестов в блоке `describe()`, часто используется для очистки.
  - **Хук `afterEach()`:**  
    Выполняется после каждого теста; удобен для сброса изменений в тесте.
- **Практическое применение:**
  - **Предусловия:**  
    Подготовка данных или вход пользователя до запуска тестов.
  - **Очистка:**  
    Сброс данных или очистка session storage для изоляции тестов.
  - **Пример:**
    ```javascript
    describe('Вход пользователя', () => {
      before(() => {
        // Выполняется один раз перед всеми тестами
        cy.log('Стартует тестовый набор Входа');
      });

      beforeEach(() => {
        // Переход на страницу входа перед каждым тестом
        cy.visit('/login');
      });

      afterEach(() => {
        // Очистка cookies или local storage, если нужно
        cy.clearCookies();
      });

      after(() => {
        cy.log('Тестовый набор Входа завершён');
      });
      
      it('должен успешно войти с правильными учетными данными', () => {
        // Код теста
      });
    });
    ```

#### **C. Тегирование и категоризация тестов**
- **Использование соглашений об именовании:**
  - Добавляйте префиксы или суффиксы к названиям, чтобы определить категорию теста (например, `@smoke`, `@regression`, `@login`).
  - **Пример:**
    ```javascript
    describe('Вход пользователя @smoke', () => { ... });
    ```
- **Плагины Cypress для тегирования:**
  - **Cypress-Grep:**  
    Этот плагин позволяет фильтровать тесты по тегам во время выполнения.
    - **Установка:**  
      ```bash
      npm install cypress-grep --save-dev
      ```
    - **Использование:**  
      Запустить тесты с определённым тегом:
      ```bash
      npx cypress run --env grep=@login
      ```
  - **Пользовательское тегирование:**  
    Для дополнительной организации используйте комментарии или собственные метаданные.

#### **D. Функциональность пользовательских команд в Cypress**
- **Встроенные команды Cypress:**
  - Такие команды как `cy.visit()`, `cy.get()`, `cy.click()`, `cy.type()` и другие используются для взаимодействия с приложением.
  - **Пример:**
    ```javascript
    cy.visit('/login');
    cy.get('[data-testid="username-input"]').type('demoUser');
    cy.get('[data-testid="password-input"]').type('demoPass');
    cy.get('[data-testid="login-button"]').click();
    ```

- **Пользовательские команды:**

  ##### **Пользовательские команды в Cypress**

  **Что такое пользовательские команды?**  
  Это функции, которые вы определяете самостоятельно (обычно в файле `cypress/support/commands.js`), чтобы инкапсулировать повторяющиеся действия или сложную логику. Они помогают сокращать дублирование кода, упрощать тесты и повышать переиспользуемость.

  **Преимущества:**
  - **Переиспользуемость:**  
    Однократно написанную команду можно применять в нескольких тестах.
  - **Читаемость:**  
    Пользовательские команды создают более высокоуровневые абстракции, делая тесты понятнее.
  - **Удобство поддержки:**  
    Изменения в общей логике нужно вносить только в одном месте.

  **Недостатки:**
  - **Избыточная абстракция:**  
    Чрезмерное использование или слишком общие команды могут затруднить отладку тестов.
  - **Скрытая логика:**  
    Если команда скрывает слишком много деталей, может быть непонятно, что именно происходит в тесте.

  **Пример определения пользовательских команд:**

  В **cypress/support/commands.js**:
  ```javascript
  // Пользовательская команда для входа
  Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-testid="username-input"]').clear().type(username);
    cy.get('[data-testid="password-input"]').clear().type(password);
    cy.get('[data-testid="login-button"]').click();
  });

  // Пользовательская команда для регистрации
  Cypress.Commands.add('registerUser', (user) => {
    cy.get('[data-testid="reg-username-input"]').clear().type(user.username);
    cy.get('[data-testid="reg-email-input"]').clear().type(user.email);
    cy.get('[data-testid="reg-password-input"]').clear().type(user.password);
    cy.get('[data-testid="reg-submit-button"]').click();
  });
  ```

  **Использование в тестах:**
  ```javascript
  describe('Аутентификация пользователя', () => {
    it('должен успешно войти', () => {
      // Использование пользовательской команды login
      cy.login('demoUser', 'demoPass');
      cy.get('[data-testid="login-success-message"]').should('be.visible');
    });

    it('должен зарегистрировать нового пользователя', () => {
      const user = {
        username: 'newUser',
        email: 'newuser@example.com',
        password: 'newPassword123'
      };

      // Использование пользовательской команды регистрации
      cy.registerUser(user);
      cy.get('[data-testid="reg-success-message"]').should('be.visible');
    });
  });
  ```

  **Дополнительные преимущества пользовательских команд:**
  - **Инкапсуляция:**  
    Инкапсулируют общие взаимодействия с интерфейсом, уменьшая дублирование кода.
  - **Абстракция:**  
    Позволяют абстрагироваться от низкоуровневых команд и сосредоточиться на бизнес-логике теста.
  - **Упрощённое обслуживание:**  
    При изменении приложения достаточно изменить команду, а не все тесты, использующие её логику.

  - Расширяйте функциональность Cypress, добавляя пользовательские команды в файл `cypress/support/commands.js`.
  - **Пример:**
    ```javascript
    // В cypress/support/commands.js
    Cypress.Commands.add('login', (username, password) => {
      cy.get('[data-testid="username-input"]').type(username);
      cy.get('[data-testid="password-input"]').type(password);
      cy.get('[data-testid="login-button"]').click();
    });
    // Использование в тестах:
    cy.login('demoUser', 'demoPass');
    ```
- **Лучшие практики:**
  - Делайте пользовательские команды понятными и удобными для поддержки.
  - Используйте их для сокращения повторяющегося кода и централизации логики.
  - Убедитесь, что назначение каждой команды понятно любому, кто читает тест.

#### **E. Структура тестового проекта Cypress**

**Лучшие практики:**

- **Структура каталогов:**
  - **cypress/fixtures:** Хранит внешние файлы с данными для тестов (JSON и пр.).
  - **cypress/e2e:** Содержит все файлы тест-кейсов, сгруппированные по функционалу (например, login.spec.js, registration.spec.js).
  - **cypress/plugins:** Включает плагины или модификации стандартного поведения Cypress.
  - **cypress/support:**  
    - **commands.js:** Здесь определяются пользовательские команды.
    - **index.js:** Глобальные настройки и конфигурация Cypress-тестов.
  
- **Организация тестов:**
  - Группируйте тесты по функциональным областям или модулям с помощью `describe()`.
  - Для подфункциональностей используйте вложенные describe().
  - Используйте последовательные соглашения об именовании файлов тестов (например, login.spec.js для тестов входа).
  
- **Конфигурация окружения:**
  - Управляйте настройками проекта (baseUrl, тайм-ауты, переменные окружения) с помощью cypress.config.js.
  - Разделяйте тесты для разных сред по соглашениям об именовании или с помощью плагинов, например, Cypress-grep.
  
- **Поддерживаемость и переиспользуемость:**
  - Используйте пользовательские команды для снижения дублирования.
  - Храните тестовые данные во внешних файлах (fixtures), чтобы тесты были чистыми и фокусированными.
  - Следуйте паттерну AAA (Arrange-Act-Assert) для ясной структуры тестов.

- **Пример структуры каталогов:**
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

### **Практические задания**

1. **Структурируйте тесты с помощью `describe()` и `it()`:**
   - Создайте пример тестового набора для функции входа.
   - Разделите тесты по отдельным блокам (например, успешный и неуспешный вход).
   
2. **Реализуйте хуки подготовки и очистки:**
   - Напишите тесты, использующие `before()`, `beforeEach()`, `after()`, `afterEach()` для управления состоянием.
   - Пример: вести логирование или переходить на страницу входа до каждого теста.

3. **Тегируйте и фильтруйте тесты:**
   - Используйте теги или соглашения (например, `@smoke`, `@regression`) в названиях тестов.
   - Настройте и продемонстрируйте запуск тестов с плагином Cypress-grep.
   
4. **Пользовательские команды:**
   - Создайте собственную команду (например, `cy.login()`) и используйте её в нескольких тестах.
   - Рефакторите существующий код тестов для использования этой команды.

---

### **Ресурсы**

- **Документация Cypress:**
  - [Cypress: структура тестов](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests)
  - [Cypress: команды](https://docs.cypress.io/api/commands)
- **Примеры тестовых наборов:**
  - Ищите образцовые проекты на GitHub с хорошо структурированными Cypress-тестами.
- **Плагин Cypress-Grep:**
  - [Cypress-Grep на GitHub](https://github.com/cypress-io/cypress-grep)
