## **Урок 12: Файлы конфигурации Cypress и переменные окружения**

### **Цели**

- Понять структуру и назначение файлов конфигурации Cypress.
- Научиться задавать глобальные настройки (например, baseUrl, параметры viewport) через `cypress.config.js`.
- Настраивать поведение Cypress с помощью параметров конфигурации.
- Использовать переменные окружения для управления конфиденциальными данными и переключения между разными окружениями (разработка, стейджинг, продакшн).
- Получать доступ к переменным окружения в тестах с помощью `Cypress.env()`.
- Применять лучшие практики для поддержания конфигураций в организованном, устойчивом и безопасном виде.

---

### **Структура урока**

#### **A. Файлы конфигурации Cypress**

1. **Обзор cypress.config.js:**
   - **Определение:**  
     Файл `cypress.config.js` (или `cypress.config.ts` при использовании TypeScript) — это центральное место, где вы определяете глобальные параметры для тестов Cypress. В новых версиях он заменил устаревший формат `cypress.json`.
   - **Назначение:**  
     - Конфигурирование того, как Cypress запускает тесты, включая установку глобальных значений по умолчанию.
     - Определение таких свойств, как `baseUrl`, размеры viewport, таймауты и др.
   - **Структура:**  
     Обычно экспортируется объект конфигурации. Пример:
     ```javascript
     const { defineConfig } = require('cypress');

     module.exports = defineConfig({
       e2e: {
         baseUrl: 'http://localhost:3000',
         viewportWidth: 1280,
         viewportHeight: 720,
         defaultCommandTimeout: 8000,
         supportFile: 'cypress/support/index.js',
         // Другие параметры конфигурации…
       },
       env: {
         // Здесь также можно задать переменные окружения
         apiUrl: 'https://api.example.com'
       }
     });
     ```

2. **Установка глобальных параметров:**
   - **baseUrl:**  
     - Задает корневой URL по умолчанию, чтобы вы могли использовать относительные пути в тестах.  
     `baseUrl` — это глобальный параметр конфигурации в Cypress, определяющий корневой URL вашего тестируемого приложения. Это значение используется как основа для всех относительных URL в ваших тестах.

    **Назначение и преимущества:**
    - **Упрощает навигацию:**  
      Вместо указания полного URL при каждом вызове `cy.visit()` вы можете использовать относительный путь. Например, если `baseUrl` задан как `http://localhost:3000`, то `cy.visit('/login')` автоматически интерпретируется как `http://localhost:3000/login`.
    - **Удобное переключение окружений:**  
      Централизованный URL позволяет быстро менять окружения разработки, стейджинга и продакшна без изменения отдельных тестов.
    - **Чистота кода тестов:**  
      Уменьшает дублирование и вероятность ошибок благодаря единому источнику правды для baseUrl приложения.

    **Пример:**
    ```javascript
    // cypress.config.js
    const { defineConfig } = require('cypress');

    module.exports = defineConfig({
      e2e: {
        baseUrl: 'http://localhost:3000',
        // ...другие параметры
      }
    });
    ```
   - **Параметры viewport:**  
     - Определяют размеры окна браузера при выполнении теста.
     - **Пример:**  
       ```javascript
       viewportWidth: 1280,
       viewportHeight: 720
       ```
   - **Таймауты:**  
     - Конфигурируют таймауты команд, ожидания ответов и других событий, связанных со временем.
     - **Пример:**  
       ```javascript
       defaultCommandTimeout: 8000,
       pageLoadTimeout: 60000
       ```
   - **Свойство watchForFileChanges**

      **Определение:**  
      `watchForFileChanges` — параметр, указывающий Cypress следить за изменениями файлов проекта и автоматически перезапускать тесты при их обнаружении.

      **Назначение и преимущества:**
      - **Эффективность в разработке:**  
        Ускоряет цикл разработки за счет автозапуска тестов при изменении кода.
      - **Авто-перезагрузка:**  
        Делает Test Runner более интерактивным и отзывчивым к изменениям в тестах.

      **Пример использования:**
      ```javascript
      module.exports = defineConfig({
        e2e: {
          watchForFileChanges: true, // Автоматический перезапуск тестов при изменении файлов
          // ...другие параметры
        }
      });
      ```

      *Примечание:* В CI-окружениях можно установить `watchForFileChanges` в `false`, чтобы избежать ненужных перезапусков.

   - **Свойство retries**
     Параметр `retries` определяет, сколько раз Cypress должен автоматически повторить тест в случае его сбоя до того, как считать его действительно проваленным. Это можно задать глобально или для конкретного теста.
 
     **Назначение и преимущества:**
     - **Обработка нестабильных тестов:**  
       Помогает бороться с асинхронностью или тайминговыми сбоями, особенно в сложных или нестабильных окружениях.
     - **Устойчивость тестов:**  
       Повторяя тесты, вы снижаете количество ложных "провалов" из-за временных проблем.
 
     **Пример использования:**
     ```javascript
     module.exports = defineConfig({
       e2e: {
         retries: {
           runMode: 2,  // Количество попыток при запуске тестов в headless режиме (CI)
           openMode: 0  // Нет повторов в интерактивном режиме
         },
         // ...другие параметры
       }
     });
     ```
 
     В файле теста можно также задать повторы для конкретного сьюта:
     ```javascript
     describe('Login Tests', { retries: { runMode: 2, openMode: 1 } }, () => {
       it('should log in successfully with valid credentials', () => {
         // Код теста…
       });
     });
     ```
   - **Другие глобальные настройки:**
     - `video`, `screenshotOnRunFailure` и др. для управления поведением записи во время выполнения тестов.
     - Указание `supportFile` для глобальных конфигураций и пользовательских команд.

3. **Настройка поведения Cypress через конфиг-файлы:**
   - Изменяйте или расширяйте стандартное поведение Cypress с помощью плагинов и пользовательских настроек.
   - Используйте папку `plugins` совместно с `cypress.config.js` для расширения возможностей.
   - **Пример:**  
     Интеграция плагина для изменения сетевого поведения или обработки загрузки файлов.

4. **"e2e": {} и "env": {}**

   **Секция `"e2e": {}`:**
   - **Назначение:**  
     Секция `"e2e"` в конфигурации Cypress служит для определения параметров и поведения, характерных для end-to-end (E2E) тестов. Включает свойства baseUrl, параметры viewport, таймауты и хуки для настройки событий Node.js.
   - **Использование:**  
     Эта секция объединяет все настройки, касающиеся выполнения E2E тестов Cypress.

   **Пример:**
   ```javascript
   module.exports = defineConfig({
     e2e: {
       baseUrl: 'http://localhost:3000',
       viewportWidth: 1280,
       viewportHeight: 720,
       defaultCommandTimeout: 8000,
       setupNodeEvents(on, config) {
         // Здесь добавляются пользовательские задачи и плагины
         return config;
       }
     }
   });
   ```
 
   **Секция `"env": {}`:**
   - **Назначение:**  
     Свойство `"env"` используется для определения переменных окружения, доступных во время выполнения тестов. Эти переменные позволяют управлять конфиденциальными данными (например, API-ключами) и параметрами, зависящими от окружения (разработка, стейджинг, продакшн).
   - **Использование:**  
     Получать переменные окружения в тестах можно с помощью `Cypress.env('variableName')`.

   **Пример:**
   ```javascript
   module.exports = defineConfig({
     e2e: {
       baseUrl: 'http://localhost:3000'
     },
     env: {
       apiUrl: 'https://api.dev.example.com',
       userRole: 'admin'
     }
   });
   ```
 
   В тесте:
   ```javascript
   describe('API Tests', () => {
     it('should fetch data from the correct API endpoint', () => {
       const apiUrl = Cypress.env('apiUrl');
       cy.request(`${apiUrl}/users`).then((response) => {
         expect(response.status).to.eq(200);
       });
     });
   });
   ```

---

#### **B. Переменные окружения в Cypress**

1. **Использование переменных окружения для конфиденциальных данных:**
   - **Определение:**  
     Переменные окружения позволяют вынести значения конфигурации, такие как API-ключи, URL-ы и учетные данные, за пределы кода тестов.
   - **Использование в `cypress.config.js`:**
     ```javascript
     env: {
       apiUrl: 'https://api.example.com',
       authToken: 'your-secret-token'
     }
     ```
   - **Почему важно:**  
     - Повышает уровень безопасности, предотвращая хардкод значимых данных.
     - Позволяет легко менять значения без изменения тестовых файлов.

2. **Управление разными окружениями (разработка, стейджинг, продакшн):**
   - **Подход:**  
     - Используйте отдельные конфигурационные файлы или параметры переменных окружения для каждого окружения.
     - Передавайте специфичные переменные окружения через командную строку при запуске Cypress.
   - **Пример:**  
     ```bash
     npx cypress run --env config=staging
     ```
   - **В файле конфигурации:**  
     Используйте условную логику на основе флага окружения для загрузки различных значений.
     ```javascript
     const config = process.env.CONFIG || 'development';

     module.exports = defineConfig({
       e2e: {
         baseUrl: config === 'production' ? 'https://prod.example.com' : 'http://localhost:3000',
         // Другие параметры…
       },
       env: {
         apiUrl: config === 'production' ? 'https://api.prod.example.com' : 'https://api.dev.example.com'
       }
     });
     ```
   - #### **Лучший способ доступа к независимым от окружения данным и конфигам**
      В папке cypress/config есть разные конфиг-файлы для каждого окружения:
        - cypress.test2.json
        - cypress.production.json
      В папке cypress/fixtures есть разные файлы данных для каждого окружения:
        - data.test2.json
        - data.production.json
      ```javascript 
        import { defineConfig } from 'cypress'
        import { rmdir, readFileSync } from 'fs'

        export default defineConfig({
          e2e: {
            setupNodeEvents(on, config) {

              const envName = config.env.name;
              const envconfig = readFileSync(`./cypress/config/cypress.${envName}.json`, 'utf-8');
              const configValues = JSON.parse(envconfig);

              const envdata = readFileSync(`./cypress/fixtures/data.${envName}.json`, 'utf-8');
              const dataValues = JSON.parse(envdata);

              config.env = { ...configValues, ...dataValues };
              return config;
            },
          },
        })
        ```
        ```json
        {
          "scripts": {
            "open:test2": "npx cypress open --env name=test2",
            "test:test2": "npx cypress run --browser chrome --env name=test2",
            "test:test2:record": "npx cypress run --browser chrome --env name=test2 --record",
            "test:test2:ci": "pnpm test:test2:record",
            "open:production": "npx cypress open --env name=production",
            "test:production": "npx cypress run --browser chrome --env name=production",
            "test:production:record": "npx cypress run --browser chrome --env name=production --record",
            "test:production:ci": "pnpm test:production:record"
          },
        }
        ```

3. **Доступ к переменным окружения в тестах:**
   - Используйте метод `Cypress.env()` для доступа к значениям, определенным в вашей конфигурации.
   - **Пример:**
     ```javascript
     describe('API Tests', () => {
       it('should fetch data from the API', () => {
         const apiUrl = Cypress.env('apiUrl');
         cy.request(`${apiUrl}/users`).then((response) => {
           expect(response.status).to.eq(200);
         });
       });
     });
     ```

#### **Использование `setupNodeEvents` в конфигурации Cypress (`cypress.config.js`)**

##### **Что такое `setupNodeEvents`?**
- **Определение:**  
  Функция `setupNodeEvents` в `cypress.config.js` позволяет регистрировать обработчики событий, расширять возможности Cypress или выполнять задачи, требующие выполнения на стороне Node.js.
- **Назначение:**  
  - Расширяет поведение Cypress во время выполнения тестов.
  - Позволяет выполнять операции с файлами, взаимодействовать с базой данных, делать API-запросы или логировать.
  - Определять **пользовательские задачи Cypress** для взаимодействия между тестовым кодом (в браузере) и Node.js (на сервере).

---

##### **Пример: `setupNodeEvents` с пользовательской задачей логирования**

Этот пример определяет задачу, которая выводит сообщения в консоль во время выполнения тестов.

###### **cypress.config.js**
```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,

    setupNodeEvents(on, config) {
      // Добавляем свою задачу для логирования сообщений из браузера в терминал
      on('task', {
        logMessage(message) {
          console.log('LOG FROM CYPRESS:', message);
          return null; // Задачи должны возвращать значение или null
        }
      });

      return config; // Важно вернуть объект config
    }
  }
});
```

###### **Использование в тесте (логирование сообщений в терминал)**
```javascript
describe('Logging Example', () => {
  it('should log a message from Cypress to the terminal', () => {
    cy.task('logMessage', 'This is a custom log from Cypress');
  });
});
```

**Ожидаемый вывод в терминале:**
```
LOG FROM CYPRESS: This is a custom log from Cypress
```

---

#### **Понимание `on('task')` в Cypress**

##### **Что такое `on('task')`?**
- Функция `on('task', { ... })` в `setupNodeEvents` позволяет Cypress **выполнять Node.js код** внутри теста.
- Задачи могут выполнять:
  - **Операции с файлами** (например, чтение/запись файлов).
  - **Запросы к базе данных** (например, к MongoDB, PostgreSQL).
  - **API взаимодействия** (например, вызов внешнего API).
  - **Логирование** (отправка логов в терминал).


#### **Практические примеры использования `on('task')`**

##### **1. Запись в файл**
Иногда нужно сохранить результаты теста или логи в файл.

##### **cypress.config.js**
```javascript
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        writeFile({ filename, content }) {
          fs.writeFileSync(filename, content);
          return null;
        }
      });

      return config;
    }
  }
});
```

##### **Использование в тесте**
```javascript
describe('Write File Example', () => {
  it('should write test data to a file', () => {
    cy.task('writeFile', {
      filename: 'cypress/logs/test-output.txt',
      content: 'Test executed successfully at ' + new Date()
    });
  });
});
```

##### **2. Чтение из файла**
Если нужно проверить содержимое файла.

##### **cypress.config.js**
```javascript
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        readFile({ filename }) {
          return fs.readFileSync(filename, 'utf8');
        }
      });

      return config;
    }
  }
});
```

##### **Использование в тесте**
```javascript
describe('Read File Example', () => {
  it('should read content from a file', () => {
    cy.task('readFile', { filename: 'cypress/logs/test-output.txt' }).then((content) => {
      expect(content).to.contain('Test executed successfully');
    });
  });
});
```

---

##### **3. Генерация случайных данных с помощью Faker.js**
Если требуется сгенерировать случайные тестовые данные для регистрации пользователя.

##### **cypress.config.js**
```javascript
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        generateRandomUser() {
          return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password()
          };
        }
      });

      return config;
    }
  }
});
```

##### **Использование в тесте**
```javascript
describe('User Registration with Faker.js', () => {
  it('should create a new user with random data', () => {
    cy.task('generateRandomUser').then((user) => {
      cy.log(`Generated User: ${user.username}, ${user.email}`);
    });
  });
});
```

#### **Экспериментальные параметры Cypress в `cypress.config.js`**

В Cypress есть ряд экспериментальных функций, которые можно включить через конфигурацию.

##### **Популярные экспериментальные функции**
1. **`experimentalSessionAndOrigin`** (Отслеживание сессий пользователя между тестами)
2. **`experimentalModifyObstructiveThirdPartyCode`** (Обработка сторонних скриптов, мешающих тестам)
3. **`experimentalWebKitSupport`** (Поддержка тестирования в браузере WebKit)
4. **`experimentalStudio`** (Автоматическая запись и генерация тестов)

##### **Пример конфиг-файла с экспериментальными функциями**
```javascript
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    experimentalSessionAndOrigin: true, // Отслеживание сессий между тестами
    experimentalModifyObstructiveThirdPartyCode: true, // Обработка сторонних скриптов
    experimentalWebKitSupport: true, // Поддержка WebKit
    experimentalStudio: true, // Cypress Studio для записи тестов

    setupNodeEvents(on, config) {
      on('task', {
        logMessage(message) {
          console.log('LOG:', message);
          return null;
        }
      });

      return config;
    }
  }
});
```

---

#### **C. Лучшие практики для конфигурации и переменных окружения**

1. **Организованность и безопасность конфигурации:**
   - **Централизация:**  
     Храните все глобальные параметры в одном месте (например, `cypress.config.js`) для облегчения поддержки.
   - **Изоляция конфиденциальных данных:**  
     Сохраняйте такие данные, как API-ключи, в переменных окружения, а не напрямую в тестах.
   - **Контроль версий:**  
     Убедитесь, что файлы конфигурации находятся под управлением систем контроля версий, но внедрение конфиденциальных значений должно происходить через механизмы типа CI/CD secrets.

2. **Избегайте хардкода:**
   - **Используйте переменные окружения:**  
     Заменяйте жестко прописанные URL-ы, токены и другие константы на переменные окружения.
   - **Переиспользуемые переменные:**  
     Используйте переменные в конфиг-файле, чтобы изменения приходилось вносить только в одном месте.
   - **Пример:**
     ```javascript
     // Не используйте жестко прописанное значение:
     cy.visit('http://localhost:3000/login');

     // Вместо этого используйте:
     cy.visit('/');
     // Где baseUrl определяется в файле конфигурации.
     ```

3. **Документирование и комментарии:**
   - Документируйте настройки и переменные окружения, чтобы команда понимала их назначение и способ использования.
   - Оставляйте понятные комментарии в `cypress.config.js`, объясняя каждую настройку.

---

### **D. Практические задания**

1. **Настройка параметров Cypress через cypress.config.js:**
   - **Задание:**  
     Пошаговая настройка базового файла `cypress.config.js`.
   - **Практика:**  
     Настройте `baseUrl`, параметры viewport и таймауты, изменяйте их и наблюдайте, как это влияет на выполнение тестов.

2. **Использование переменных окружения:**
   - **Задание:**  
     Настройте переменные окружения в конфиге для разных окружений — development, staging, production.
   - **Практика:**  
     Реализуйте условную логику для смены `baseUrl` и `apiUrl` в зависимости от флага окружения. Запустите тесты в разных режимах и убедитесь, что применяются корректные настройки.

3. **Доступ к переменным окружения в тестах:**
   - **Задание:**  
     Напишите простой Cypress-тест, получающий данные из API с использованием переменной окружения для URL-а.
   - **Практика:**  
     Используйте `Cypress.env('apiUrl')` в тесте, затем выполните логирование или проверку ответа.

4. **Смоделированное переключение окружения:**
   - **Задание:**  
     Продемонстрируйте запуск тестов с разными конфигурациями окружения через командную строку.
   - **Практика:**  
     Воспользуйтесь командой типа `npx cypress run --env config=production`, чтобы показать, как тесты ведут себя по-разному в зависимости от выбранного окружения.

---

### **E. Функциональность и конфигурация Cypress-команд**

- **Использование Cypress-команд:**  
  Обсудите, как Cypress-команды (например, `cy.visit()`, `cy.get()`) автоматически используют параметры, заданные в `cypress.config.js`. Например, вызов `cy.visit('/')` будет использовать baseUrl из вашей конфигурации.
- **Интеграция пользовательских команд:**  
  Кратко упомяните, что можно создавать собственные команды, которые также используют переменные окружения и настройки конфигурации, обеспечивая гибкость и удобство тестов.

---

### **F. Обсуждение и вопросы**

**Возможные вопросы студентов:**

1. **В:** *Что делать, если мне нужно часто менять base URL?*  
   **О:** Используйте настройку `baseUrl` в вашем файле `cypress.config.js`. Это централизует настройку, позволяя менять только один файл — все тесты с `cy.visit('/')` будут использовать новый URL.

2. **В:** *Как безопасно хранить конфиденциальные данные, такие как API-ключи?*  
   **О:** Храните такие значения в переменных окружения вашей конфигурации или во внешних секрет-хранилищах (например, механизм CI/CD). Для доступа используйте `Cypress.env()`.

3. **В:** *Можно ли использовать разные настройки конфигурации для разных запусков тестов?*  
   **О:** Да, вы можете передавать переменные окружения через командную строку (`npx cypress run --env config=staging`) или условно загружать разные настройки в файле конфигурации.

4. **В:** *Почему важно держать файлы конфигурации под контролем версий?*  
   **О:** Это обеспечивает единообразие настроек, удобство отслеживания изменений и гарантирует одинаковое тестовое окружение для всей команды.

5. **В:** *Как понять, что мои переменные окружения доступны в тестах?*  
   **О:** Логируйте их в тесте через `cy.log(Cypress.env('apiUrl'))` или проверяйте поставленным значением.

6. **В:** *Зачем нужен `setupNodeEvents` в Cypress?*  
    **О:** Эта функция необходима для расширения возможностей Cypress, регистрации событий, создания пользовательских задач и изменения поведения тестов.

7. **В:** *Чем полезен `on('task')`?*  
   **О:** Обеспечивает связь между Cypress (в браузере) и Node.js (на сервере). Полезен для логирования, работы с файлами, API-запросов и генерации динамических данных.

8. **В:** *Можно ли использовать переменные окружения внутри `setupNodeEvents`?*  
   **О:** Да, используйте вместе `process.env` и передавайте значения через `Cypress.env()`.

9. **В:** *Что произойдет, если задача не возвращает значение?* 
   **О:** Cypress требует, чтобы задача возвращала либо какое-то значение, либо явно `null`.

10. **В:** *Являются ли экспериментальные функции Cypress стабильными?*  
    **О:** Не всегда, они находятся в разработке и могут измениться. Перед использованием на продакшне проверьте актуальную документацию.

1. **В:** *Зачем нам нужен `baseUrl`?*  
   **О:** Позволяет использовать относительные пути в тестах (например, `cy.visit('/login')`), а не хардкодить полный URL. Это облегчает поддержку и переключение между окружениями.

2. **В:** *Для чего предназначена секция `"env": {}`?*  
   **О:** Она содержит переменные окружения, на которые можно ссылаться через `Cypress.env()` в тестах. Используется для выноса конфид. данных и значений, меняющихся между окружениями (например, API endpoints, креденшелы).

3. **В:** *Как помогает свойство `numTestsKeptInMemory` при отладке?*  
   **О:** Ограничивает количество сохранённых в памяти снимков тестов для "time-travel" отладки без перерасхода памяти.

4. **В:** *Что делает параметр `watchForFileChanges`?*  
   **О:** Указывает Cypress автоматически перезапускать тесты при изменении файлов, полезно во время разработки. В CI обычно выключается (`false`), чтобы избежать лишних запусков.

5. **В:** *Зачем использовать параметр `retries`?*  
   **О:** Он позволяет автоматически перезапускать неустойчивые тесты несколько раз до того, как они будут считаться проваленными, снижая число ложных негативных результатов.

6. **В:** *Что такое экспериментальные функции, например, `experimentalSessionAndOrigin`?*  
   **О:** Это новые возможности, которые ещё находятся в тестировании. Могут повышать гибкость (например, сессии), но не всегда стабильны.

7. **В:** *Для чего нужны `setupNodeEvents` и функция `on('task')`?*  
   **О:** `setupNodeEvents` позволяет регистрировать обработчики Node.js для расширения Cypress, а `on('task')` — выполнять Node.js код (например, логирование или работу с файлами), что невозможно делать только в браузере.

---

### **Дополнительные материалы**

- **Руководство по конфигурации Cypress:**  
  [Документация по конфигурации Cypress](https://docs.cypress.io/guides/references/configuration)
- **Примеры использования переменных окружения:**  
  Ищите примеры и туториалы по использованию переменных окружения в Cypress на GitHub и официальном блоге Cypress.