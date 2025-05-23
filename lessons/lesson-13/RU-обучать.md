## **Урок 13: Практическое использование TypeScript с Cypress**

### **Цели**

- Познакомить с TypeScript и его преимуществами в контексте тестирования с помощью Cypress.
- Настроить TypeScript в проекте Cypress.
- Писать и запускать тесты Cypress, используя TypeScript, применяя аннотации типов и интерфейсы.
- Изучить лучшие практики организации файлов TypeScript и поддержания типобезопасности в тестах.

---

### **Структура содержания**

#### **A. Введение в TypeScript**

1. **Что такое TypeScript?**
   - **Определение:**  
     TypeScript — это статически типизированное надмножество JavaScript, компилирующееся в обычный JavaScript. Он добавляет необязательные типы, интерфейсы и расширенные инструменты в JavaScript.
   - **Ключевые особенности:**
     - Статическая проверка типов: обнаружение ошибок на этапе компиляции.
     - Улучшенная поддержка IDE: расширенный IntelliSense, автодополнение и встроенная документация.
     - Современные возможности JavaScript: поддерживает возможности ES6/ES7 и выше с обратной совместимостью.

    ##### **1. Что означает "надмножество JavaScript"?**

    **Определение:**
    - Надмножество — это язык, включающий все возможности другого языка (в данном случае, JavaScript) и добавляющий к ним новые возможности.
      
    **Пояснение:**
    - **TypeScript — надмножество JavaScript:**  
      Это значит, что любой корректный JavaScript-код также является корректным кодом TypeScript. TypeScript добавляет новые возможности (например, статические типы, интерфейсы, перечисления), которые отсутствуют в обычном JavaScript.
    - **Зачем это нужно:**  
      Разработчики могут постепенно внедрять TypeScript, добавляя аннотации типов и другие функции в существующий код JavaScript без переписывания всего проекта с нуля.

    
    ##### **2. Что такое компилятор?**

    **Определение:**
    - Компилятор — это программа, которая переводит код, написанный на одном языке программирования (исходном языке), в другой язык (целевой язык). Для TypeScript компилятор (tsc) преобразует TypeScript-код в обычный JavaScript.

    **Пояснение:**
    - **Компилятор TypeScript (tsc):**  
      Он выполняет проверку типов и преобразует расширенный синтаксис TypeScript в стандартный JavaScript, который можно запускать в браузерах или Node.js.
    - **Роль в разработке:**  
      Компилятор помогает обнаруживать ошибки типов на этапе компиляции, повышая качество кода до его выполнения.


2. **Преимущества использования TypeScript с Cypress:**
   - **Улучшенное качество кода:**  
     Проверка типов помогает обнаруживать ошибки на ранних этапах разработки.
   - **Лучший опыт разработки:**  
     Богатый IntelliSense и автодополнение в редакторах, таких как VS Code, ускоряют написание тестов и снижают количество ошибок.
   - **Упрощённое сопровождение:**  
     Явные определения типов и интерфейсы делают код понятнее и упрощают рефакторинг.
   - **Масштабируемость:**  
     С ростом набора тестов строгая типизация помогает сохранять целостность и уменьшает количество ошибок во время выполнения.

---

#### **B. Настройка TypeScript в Cypress**

1. **Установка TypeScript и необходимых типов:**
   - **Команды для установки:**
     ```bash
     npm install --save-dev typescript @types/node @types/cypress
     ```
   - **Зачем нужны эти пакеты?**
     - `typescript`: Компилятор TypeScript.
     - `@types/node`: Определения типов для Node.js, необходимые для задач Cypress и API Node.
     - `@types/cypress`: Предоставляет определения типов для команд Cypress, обеспечивая IntelliSense и проверку типов.

2. **Настройка tsconfig.json для Cypress:**
   - Если в корне вашего проекта отсутствует `tsconfig.json`, создайте его.
   - **Пример tsconfig.json:**
     ```json
     {
       "compilerOptions": {
         "target": "esnext",
         "module": "esnext",
         "strict": true,
         "jsx": "preserve",
         "moduleResolution": "node",
         "esModuleInterop": true,
         "skipLibCheck": true,
         "forceConsistentCasingInFileNames": true,
         "types": ["cypress", "node"]
       },
       "include": ["**/*.ts", "**/*.tsx", "cypress/**/*.ts"],
       "exclude": ["node_modules"]
     }
     ```
   - **Пояснение:**
     - **`target`** и **`module`**: Обеспечивают генерацию современного JavaScript.
     - **`strict`**: Включает строгую проверку типов.
     - **`types`**: Подключает определения типов для Cypress и Node.
     - **`include`**: Гарантирует, что TypeScript будет компилировать ваши тестовые файлы в каталоге Cypress.

---

#### **C. Написание Cypress-тестов на TypeScript**

1. **Преобразование JavaScript-тестов в TypeScript:**
   - Измените расширение файла теста с `.js` на `.ts`.
   - Используйте аннотации типов, где это уместно. Например:
     ```typescript
     describe('User Login', () => {
       it('should log in successfully with valid credentials', () => {
         cy.visit('/login');
         cy.get('[data-testid="login-username-input"]').type('demoUser');
         cy.get('[data-testid="login-password-input"]').type('demoPass');
         cy.get('[data-testid="login-submit-button"]').click();
         cy.get('[data-testid="login-success-message"]').should('be.visible');
       });
     });
     ```
   - Обратите внимание, что команды Cypress продолжают работать без изменений благодаря определениям типов из `@types/cypress`.

2. **Использование аннотаций типов и интерфейсов:**
   - **Определение интерфейса:**  
     Используйте интерфейсы для описания структуры объектов данных, используемых в тестах.
     ```typescript
     interface User {
       username: string;
       email: string;
       password: string;
     }
     ```
   - **Использование интерфейса:**
     ```typescript
     const validUser: User = {
       username: 'demoUser',
       email: 'demo@example.com',
       password: 'demoPass'
     };

     describe('User Login with TypeScript', () => {
       it('should log in successfully using a User object', () => {
         cy.visit('/login');
         cy.get('[data-testid="login-username-input"]').type(validUser.username);
         cy.get('[data-testid="login-password-input"]').type(validUser.password);
         cy.get('[data-testid="login-submit-button"]').click();
         cy.get('[data-testid="login-success-message"]').should('be.visible');
       });
     });
     ```

     
    ##### **Различия между типами и интерфейсами**

    **Интерфейсы:**
    - **Назначение:**  
      Определяют структуру объекта. Используются в основном для описания того, какую структуру должен иметь объект.
    - **Особенности:**  
      - Могут расширяться (наследование).
      - Поддерживают слияние деклараций (declaration merging).
      - Идеальны для описания контрактов в коде.
    - **Пример:**
      ```typescript
      interface User {
        username: string;
        email: string;
        age?: number; // Необязательное свойство
      }
      ```

    **Типы:**
    - **Назначение:**  
      Псевдонимы типов могут описывать тип для объектов, примитивов, объединений, пересечений и т.д.
    - **Особенности:**  
      - Более гибкие, чем интерфейсы.
      - Могут описывать объединённые типы, пересечения или примитивы.
      - Не поддерживают слияние деклараций.
    - **Пример:**
      ```typescript
      type User = {
        username: string;
        email: string;
        age?: number;
      };

      type Response = User | null; // Пример объединённого типа
      ```

    **Когда использовать что:**  
    - Используйте **интерфейсы** для описания структуры объекта и возможности его расширения.  
    - Используйте **типы**, если нужна большая гибкость (например, объединения или сложные композиции типов).

    ##### **Что такое enum и его использование с Cypress**

    **Определение:**
    - **Enums (перечисления):**  
      Enums позволяют определять набор именованных констант. Это делает код более читаемым и поддерживаемым, создавая осмысленные имена для числовых или строковых значений.

    **Пример использования:**
    - В тесте Cypress можно использовать enum для представления разных ролей пользователя или состояний приложения.
      
    **Пример на TypeScript:**
    ```typescript
    enum UserRole {
      Admin = 'admin',
      User = 'user',
      Guest = 'guest'
    }

    // Использование в тесте или объекте страницы
    const currentUserRole: UserRole = UserRole.Admin;
    cy.log(`Current User Role: ${currentUserRole}`);
    ```

    **Преимущества:**  
    - Повышает читаемость, заменяя литеральные строки или числа осмысленными именами.
    - Благодаря статической типизации гарантирует, что будут использованы только допустимые значения.


    ##### **Что такое файлы с суффиксом .d.ts**

    **Определение:**
    - **.d.ts-файлы (файлы объявлений):**  
      Это файлы объявлений TypeScript, которые предоставляют информацию о типах для JavaScript-модулей, не имеющих собственных типов. Они помогают компилятору TypeScript узнать структуру используемых библиотек и API.

    **Использование:**
    - Обычно располагаются в папке `types` или рядом с пакетами, для которых нет собственных определений.
    - Объявляют интерфейсы, типы и модули без реализации.
      
    **Пример:**
    ```typescript
    // custom-types.d.ts
    declare module 'my-legacy-library' {
      export function doSomething(input: string): number;
    }
    ```

    **Преимущество:**  
    - Позволяет интегрировать обычные JavaScript-библиотеки в проект на TypeScript с полноценной типизацией и поддержкой IntelliSense.


3. **Использование IntelliSense и проверки типов:**
   - После внедрения TypeScript ваша IDE (например, VS Code) будет предоставлять автодополнение, подсказки и показ ошибок в реальном времени.
   - Это делает написание и отладку тестов эффективнее и снижает риск ошибок.

---

#### **D. Лучшие практики использования TypeScript в Cypress**

1. **Организация файлов TypeScript:**
   - Все тестовые файлы Cypress должны иметь расширение `.ts`.
   - Организуйте тесты по каталогам, например, `cypress/integration`, и убедитесь, что в `tsconfig.json` указаны эти пути.
   - Храните повторно используемые типы и интерфейсы в отдельном файле (например, `cypress/support/types.ts`).

2. **Поддержание типобезопасности:**
   - Всегда используйте строгий режим (`"strict": true`) в `tsconfig.json`.
   - Применяйте интерфейсы и аннотации типов для тестовых данных, объектов конфигурации и пользовательских команд.
   - Избегайте использования `any`, если это не абсолютно необходимо.

3. **Пишите понятный, модульный код:**
   - Разбивайте логику тестов на небольшие управляемые функции или пользовательские команды.
   - Используйте паттерн Arrange-Act-Assert (AAA) для структурирования тестов.

4. **Создание пользовательских команд на TypeScript:**
   - Определяйте пользовательские команды в файле TypeScript (например, `cypress/support/commands.ts`).
   - Указывайте типы параметров и возвращаемых значений для лучшей проверки типов и поддержки IntelliSense.
   - **Пример пользовательской команды TypeScript:**
     ```typescript
     // cypress/support/commands.ts
     declare namespace Cypress {
       interface Chainable {
         login(username: string, password: string): Chainable<Element>;
       }
     }

     Cypress.Commands.add('login', (username: string, password: string) => {
       cy.get('[data-testid="login-username-input"]').clear().type(username);
       cy.get('[data-testid="login-password-input"]').clear().type(password);
       return cy.get('[data-testid="login-submit-button"]').click();
     });
     ```

    
    **Определение возвращаемых типов**
    - Возвращаемые типы в TypeScript явно определяют тип значения, который будет возвращён функцией.

    **Использование:**
    - Указание возвращаемых типов помогает отловить ошибки, если реализация функции не соответствует объявленному результату.
      
    **Пример:**
    ```typescript
    function sum(a: number, b: number): number {
      return a + b;
    }

    const result: number = sum(5, 7);
    ```

     
    ##### **Что такое ```Chainable<void>``` и ```Chainable<Element>```**

    **Определение:**
    - В Cypress команды возвращают объект `Chainable`, что позволяет объединять несколько команд в цепочку.
      
    **Chainable<void>:**
    - Указывает, что команда возвращает chainable-объект, который не возвращает определённый элемент.  
    - Обычно для команд, выполняющих действие (например, клик), но не возвращающих DOM-элемент.
      
    **Пример:**
    ```typescript
    cy.get('[data-cy="login-button"]').click();
    // click() возвращает Chainable<void>, так как ничего не возвращает.
    ```

    **Chainable<Element>:**
    - Указывает, что команда возвращает chainable-объект, содержащий DOM-элемент(ы).  
    - Полезно, если нужно выполнить дальнейшие действия или проверки с выбранным элементом.
      
    **Пример:**
    ```typescript
    cy.get('[data-cy="login-username-input"]').should('be.visible');
    // get() возвращает Chainable<Element>, так как возвращает DOM-элемент.
    ```

    **Зачем это важно:**
    - Понимание этих возвращаемых типов помогает правильно строить цепочки команд и писать типобезопасные тесты с поддержкой IntelliSense.


     ### **6. Преимущества и недостатки использования TypeScript с Cypress**

    **Преимущества:**
    - **Раннее обнаружение ошибок:**  
      Проверка типов выявляет ошибки во время разработки до запуска тестов.
    - **Улучшенный опыт разработки:**  
      Богатый IntelliSense, автодополнение и встроенная документация упрощают написание тестов.
    - **Улучшенная поддерживаемость:**  
      Явные типы и интерфейсы делают код проще для понимания и рефакторинга.
    - **Масштабируемость:**  
      По мере роста набора тестов типобезопасность помогает управлять сложностью и предотвращать ошибки.

    **Недостатки:**
    - **Первоначальные затраты на настройку:**  
      Настройка TypeScript в существующем проекте требует времени и конфигурации.
    - **Кривая обучения:**  
      Разработчикам, не знакомым с TypeScript, потребуется освоить его концепции и синтаксис.
    - **Шаг компиляции:**  
      TypeScript добавляет дополнительный этап компиляции, что может слегка замедлить цикл обратной связи по сравнению с обычным JavaScript.
    - **Риск избыточной инженерии:**  
      Для очень небольших проектов дополнительные сложности TypeScript могут быть не оправданы.


---

#### **E. Практические задания**

1. **Настройте TypeScript в вашем Cypress-проекте:**
   - Инициализируйте проект на Vue или Vite (если ещё не создан).
   - Установите TypeScript и необходимые типы.
   - Создайте и настройте `tsconfig.json`, чтобы включить файлы Cypress.
   - Преобразуйте существующий тест на JavaScript в TypeScript.

2. **Напишите и запустите простой Cypress-тест на TypeScript:**
   - Создайте тестовый файл (например, `cypress/integration/login.spec.ts`), используя аннотации типов и интерфейсы.
   - Используйте пользовательские команды, написанные на TypeScript, для выполнения действия входа.
   - Запустите тест и понаблюдайте за работой IntelliSense и проверки типов.

3. **Рефакторинг существующих тестов:**
   - Найдите участки тестового кода, где можно добавить аннотации типов для большей ясности.
   - Замените все использования `any` на корректные интерфейсы или типы.

---

### **Возможные вопросы студентов и ответы**

1. **В:** *Что такое TypeScript и почему он полезен для тестов Cypress?*  
   **О:** TypeScript — это статически типизированное надмножество JavaScript, которое помогает обнаруживать ошибки на этапе компиляции. Он повышает качество кода, обеспечивает лучший IntelliSense и автодополнение, а также улучшает сопровождаемость и масштабируемость тестов за счёт типобезопасности.

2. **В:** *Обязательно ли переводить все мои Cypress-тесты на TypeScript?*  
   **О:** Нет, но использование TypeScript очень полезно, особенно по мере роста набора тестов. Можно начать с нескольких основных тестов и постепенно переводить остальные по мере освоения TypeScript.

3. **В:** *Как работают переменные окружения с TypeScript в Cypress?*  
   **О:** Переменные окружения доступны через `import.meta.env` в Vite. TypeScript рассматривает их как строки, если вы не предоставите собственные определения типов, поэтому важно преобразовывать их к нужным типам (например, использовать `Number()` для числовых значений).

4. **В:** *Каковы основные преимущества пользовательских команд в TypeScript?*  
   **О:** Пользовательские команды позволяют инкапсулировать повторяющиеся действия, сокращать дублирование кода и создавать более высокоуровневые абстракции. При написании на TypeScript они предоставляют типобезопасность, упрощая сопровождение и отладку тестов.

5. **В:** *Как организовать файлы TypeScript для тестирования Cypress?*  
   **О:** Обычная структура — хранить тестовые файлы в `cypress/integration` (с расширением `.ts`) и пользовательские команды, типы, объекты страниц — в `cypress/support`. Хорошо организованная структура каталогов способствует ясности и масштабируемости.

1. **В:** *Что означает, что TypeScript — это "надмножество" JavaScript?*  
   **О:** Это значит, что весь корректный JavaScript-код также является корректным TypeScript-кодом. TypeScript добавляет дополнительные возможности, такие как статические типы и интерфейсы, не нарушая совместимость с существующим JavaScript.

2. **В:** *Что такое компилятор и как он работает с TypeScript?*  
   **О:** Компилятор — это инструмент, который переводит код с одного языка на другой. Компилятор TypeScript (`tsc`) преобразует код TypeScript в обычный JavaScript, выполняя проверку типов и обеспечивая совместимость с браузерами или Node.js.

3. **В:** *В чём разница между типами и интерфейсами в TypeScript?*  
   **О:** И типы, и интерфейсы описывают структуру данных. Интерфейсы обычно применяются для описания объектов и поддерживают слияние деклараций, в то время как псевдонимы типов более гибки и могут описывать объединения, пересечения и даже примитивные типы. Используйте интерфейсы для объектов и типы для более сложных структур.

4. **В:** *Как работают enum в TypeScript и зачем их использовать в тестах Cypress?*  
   **О:** Enums позволяют определить набор именованных констант. Это улучшает читаемость и сопровождение, заменяя литералы осмысленными именами. В тестах Cypress enums можно использовать для управления кодами статусов, ролями пользователя или любым набором предопределённых значений.

5. **В:** *Что такое файлы .d.ts и почему они важны?*  
   **О:** Файлы объявлений (.d.ts) предоставляют информацию о типах для библиотек JavaScript, не имеющих встроенных определений TypeScript. Они помогают компилятору TypeScript понимать внешние модули, обеспечивая корректную проверку типов и поддержку IntelliSense.

6. **В:** *Каковы преимущества и недостатки использования TypeScript с Cypress?*  
   **О:** Преимущества включают раннее обнаружение ошибок, улучшенный опыт разработки и повышенную поддерживаемость за счёт типобезопасности. Недостатки — необходимость первоначальной настройки, кривая обучения для новых пользователей и дополнительный этап компиляции, который может немного замедлять обратную связь.

7. **В:** *Что такое возвращаемые типы в TypeScript и зачем их использовать?*  
   **О:** Возвращаемые типы явно определяют, какое значение будет возвращено функцией, обеспечивая соответствие ожиданий и фактической реализации. Это повышает ясность кода и помогает отлавливать ошибки на этапе компиляции.

8. **В:** *Что означает Chainable<void> и Chainable<Element> в Cypress?*  
   **О:** `Chainable<void>` указывает, что команда Cypress возвращает chainable-объект без DOM-элемента (например, для click-экшенов), а `Chainable<Element>` — что команда возвращает объект с DOM-элементом, с которым можно дальше взаимодействовать или делать проверки.

---

### **Ресурсы**

- **Документация TypeScript для Cypress:**  
  [Cypress TypeScript Support](https://docs.cypress.io/guides/tooling/typescript-support)
- **Официальная документация TypeScript:**  
  [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- **Примеры Cypress:**  
  Ищите открытые проекты на GitHub, демонстрирующие использование TypeScript с Cypress.
