## **Урок 18: Cypress Dashboard, Звітування та Безперервна Інтеграція й Доставка (CI/CD)**

### **Мета**

- **Cypress Dashboard:**  
  Зрозуміти функціональні можливості та переваги Cypress Dashboard для керування й моніторингу запуску тестів.

- **Звітування:**  
  Навчитися генерувати, налаштовувати та інтерпретувати звіти й метрики тестування Cypress.

- **Інтеграція CI/CD:**  
  Інтегрувати тести Cypress в автоматизовані робочі процеси з використанням популярних інструментів CI/CD (таких як GitHub Actions, GitLab CI або Jenkins), щоб тести запускалися при кожному коміті та розгортанні коду.

---

### **Структура Змісту**

#### **A. Cypress Dashboard**

1. **Огляд можливостей Cypress Dashboard:**
Веб-сервіс від Cypress.io для керування і візуалізації запусків тестів.
Доступний для open-source та комерційного використання.

Зареєструйтеся на [https://dashboard.cypress.io](https://dashboard.cypress.io)

   
   - **Моніторинг у реальному часі:**  
     Перегляд статусу тестів, відео, скріншотів та логів у реальному часі.
   - **Історія тестів та аналітика:**  
     Аналізуйте динаміку результатів, дивіться історію запусків, відстежуйте продуктивність.
   - **Відлагодження помилок:**  
     Доступ до моментальних знімків та деталізованих логів для швидкого виявлення збоїв.
   - **Співпраця:**  
     Ділення результатами тестів з учасниками команди, інтеграція з системами трекінгу задач.

2. **Переваги для управління тестами та звітування:**
   - **Централізований перегляд:**  
     Всі запуски тестів та їхні деталі зберігаються на одній панелі.
   - **Автоматичне збереження відео/скріншотів:**  
     Полегшує налагодження періодичних помилок.
   - **Покращене звітування:**  
     Візуалізація продуктивності тестів та тенденцій.
   - **Командна співпраця:**  
     Сприяє обміну інсайтами та історичними даними з зацікавленими сторонами.

3. **Налаштування інтеграції Cypress Dashboard:**
   - **Створення облікового запису:**  
     Зареєструйтесь на [Cypress Dashboard](https://dashboard.cypress.io/).
   - **Налаштування проекту:**  
     Додайте ідентифікатор проекту до вашої конфігурації Cypress.
     ```json
     // приклад cypress.config.js:
     module.exports = defineConfig({
       e2e: {
         // ... інші налаштування
         projectId: 'your-project-id', // Надано в Cypress Dashboard
       }
     });
     ```
   - **Завантаження результатів:**  
     Використовуйте CLI команду `npx cypress run --record --key <record-key>`, щоб завантажити результати тестів.

   - **Додати до команди тестування:**
      ```json
      "scripts": {
        "test:cloud": "cypress run --record --key YOUR_PROJECT_KEY"
      }
      ```

---

#### **B. Звітування**

1. **Генерація звітів тестів:**
- Допомагає виявляти закономірності збоїв.
- Документує якість і надійність тестів.
- Корисно для командної комунікації та CI-дешбордів.
- Скріншоти й відеозаписи автоматично зберігаються при збої (`videos/`, `screenshots/`).

   - **Вбудоване звітування:**  
     Cypress надає базове звітування в CLI зі статистикою по пройдених, провалених і пропущених тестах.
   - **Користувацькі репортери:**  
     Плагіни, такі як `cypress-mochawesome-reporter`, можуть генерувати більш детальні HTML-звіти.
     ```bash
     npm install cypress-mochawesome-reporter --save-dev
     ```
     Далі налаштуйте у конфігураційному файлі Cypress:
     ```javascript
     module.exports = defineConfig({
      reporter: 'cypress-mochawesome-reporter',
      reporterOptions: {
        charts: true,
        embeddedScreenshots: true,
        inlineAssets: true,
      },
       e2e: {
          setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
          }
       }
     });
     ```
     Додайте у cypress/support/e2e.js
     ```
     import 'cypress-mochawesome-reporter/register'
     ```

2. **Налаштування виводу звітів:**
   - Налаштовуйте заголовок звіту, тему, шляхи збереження за допомогою параметрів reporterOptions.
   - Аналізуйте метрики, наприклад, тривалість тестів, кількість повторних спроб, логи помилок.

3. **Аналіз результатів і метрик:**
   - Перегляньте скріншоти та відеозаписи, надані Dashboard.
   - Використовуйте деталізовані логи та знімки для виявлення точок збоїв і падіння продуктивності.

---

#### **C. Безперервна інтеграція (CI) та Безперервна доставка (CD)**

- **CI (Continuous Integration):** Автоматично тестувати й перевіряти зміни у коді.
- **CD (Continuous Delivery/Deployment):** Автоматично випускати код в тестові або продуктивні середовища.

###### 🔹 Популярні інструменти CI:
- GitHub Actions ✅
- GitLab CI
- Jenkins
- CircleCI
- Bitbucket Pipelines
- Azure DevOps


1. **Вступ до поняття CI/CD:**
   - **CI (Continuous Integration):**  
     Автоматизація процесу збирання і тестування коду при кожному коміті.
   - **CD (Continuous Delivery):**  
     Автоматизація розгортання, щоб зміни коду швидко та надійно потрапляли у продуктив.

2. **Налаштування запуску тестів Cypress у CI/CD пайплайнах:**
   - **Приклад для GitHub Actions:**
    ```yaml
    name: Cypress E2E Tests

    on:
      push:
        branches: [main, master]
      pull_request:
        branches: [main, master]
      workflow_dispatch:
        inputs:
          spec:
            description: 'Spec file(s) to run (optional, runs all if empty)'
            required: false
            default: ''
            type: string
          browser:
            description: 'Browser to run tests against'
            required: false
            default: 'chrome'
            type: string

    jobs:
      cypress-run:
        name: Run Cypress tests on ${{ matrix.browser }}
        runs-on: ubuntu-latest
        strategy:
          fail-fast: false
          matrix:
            browser: [chrome, firefox, edge]
        steps:
          - name: Checkout code
            uses: actions/checkout@v4

          - name: Setup Node.js
            uses: actions/setup-node@v4
            with:
              node-version: '18'
              cache: npm

          - name: Install dependencies
            run: npm ci

          - name: Verify Cypress binary
            run: npx cypress verify

          - name: Run Cypress tests
            uses: cypress-io/github-action@v6
            with:
              browser: ${{ matrix.browser }}
              spec: ${{ github.event.inputs.spec }}
              record: true
              group: 'E2E on ${{ matrix.browser }}'
              tag: ${{ github.event_name }}
              parallel: false
            env:
              CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
              GITHUB_TOKEN:        ${{ secrets.GITHUB_TOKEN }}

          - name: Upload screenshots on failure
            if: failure()
            uses: actions/upload-artifact@v4
            with:
              name: screenshots-${{ matrix.browser }}
              path: cypress/screenshots

          - name: Upload videos on failure
            if: failure()
            uses: actions/upload-artifact@v4
            with:
              name: videos-${{ matrix.browser }}
              path: cypress/videos
      
    ```

   - **Автоматизація виконання тестів:**  
     Налаштуйте, щоб CI/CD пайплайни запускали тести автоматично при комітах, pull request чи деплої.

4. **Сповіщення й алерти:**
   - Інтегруйте Slack, email або інші месенджери для оповіщення команди про збої тестів.
   - Використовуйте Dashboard для розсилки сповіщень зацікавленим сторонам про проблеми збірки.

5. **Кращі практики у CI/CD:**
   - Надійно зберігайте змінні середовища та секрети (використовуйте шифровані сховища CI/CD платформ).
   - Забезпечуйте однаковість середовища тестування за допомогою Docker або контейнерів, якщо потрібно.
   - Оптимізуйте виконання тестів шляхом паралелізації й використання кешування там, де це можливо.

---

#### **D. Практичні вправи**

1. **Налаштуйте Cypress Dashboard:**
   - Створіть акаунт у Cypress Dashboard та налаштуйте проект із наданим project ID.
   - Запустіть тести з прапором record для завантаження результатів у Dashboard.

2. **Налаштуйте CI-пайплайн:**
   - Використовуйте GitHub Actions (або інший CI-інструмент) для налаштування workflow, який автоматично запускає тести Cypress при push і pull request.
   - Попрактикуйтесь у запуску пайплайна й перегляді згенерованих звітів.

3. **Генеруйте та інтерпретуйте звіти:**
   - Налаштуйте користувацький репортер (наприклад, `cypress-mochawesome-reporter`) та згенеруйте HTML-звіти.
   - Аналізуйте звіти для виявлення нестабільних тестів, проблем із продуктивністю та трендів помилок.

4. **Симуляція реального сценарію:**
   - Використовуйте `cy.intercept()` для заглушення мережевих запитів та симуляції різних відповідей з бекенду.
   - Поєднуйте UI-тести з API-тестами, перевіряючи, що інтерфейс відображає дані згідно з відповідями API.

5. **Сповіщення у CI/CD:**
   - Налаштуйте сповіщення (наприклад, через Slack) у CI-пайплайні, щоб отримувати алерти про невдале проходження тестів.
   - Обговоріть, як автоматизовані сповіщення покращують реакцію команди на проблеми.

---

#### **E. Ресурси**

- **Документація Cypress Dashboard:**  
  [Cypress Dashboard](https://docs.cypress.io/guides/dashboard)
- **Плагіни для звітів Cypress:**  
  - [cypress-mochawesome-reporter](https://github.com/adamgruber/cypress-mochawesome-reporter)
- **Гайди для інтеграції CI/CD:**  
  - GitHub Actions: [GitHub Actions для Cypress](https://docs.cypress.io/guides/guides/continuous-integration)
  - GitLab CI: [Cypress з GitLab CI](https://docs.cypress.io/guides/guides/gitlab-ci)
  - Jenkins: [Використання Cypress з Jenkins](https://docs.cypress.io/guides/guides/jenkins)
- **Приклади спільноти:**  
  Шукайте на GitHub репозиторії, що використовують Cypress із CI/CD, для додаткових прикладів та натхнення.

---

### **Можливі питання студентів і відповіді**

1. **Q:** *Яка основна перевага використання Cypress Dashboard?*  
   **A:** Cypress Dashboard централізує результати запусків тестів, дає відеозворотний зв'язок та скріншоти у реальному часі, а також допомагає у дебагу збоїв завдяки доступу до деталізованих логів та історичних даних.

2. **Q:** *Як я можу налаштувати звіти в Cypress?*  
   **A:** Ви можете використовувати користувацькі репортери, такі як `cypress-mochawesome-reporter`, для генерації детальних HTML-звітів. Ці репортери налаштовуються через параметри конфігураційного файлу Cypress, що дозволяє змінювати формат і місце збереження звітів.

3. **Q:** *Що таке CI/CD і чому це важливо для автоматизації тестування?*  
   **A:** CI/CD — це 'Безперервна Інтеграція' і 'Безперервна Доставка'. Це автоматизує процеси збірки, тестування та розгортання коду, забезпечуючи автоматичну валідацію змін і їх швидке впровадження. Інтеграція тестів Cypress в CI/CD допомагає швидко виявляти проблеми і гарантує якість кожного релізу.

4. **Q:** *Як працюють змінні середовища та секрети у пайплайнах CI/CD?*  
   **A:** Платформи CI/CD забезпечують безпечне зберігання змінних середовища і секретів. Ці значення підставляються у процесі збірки і тестування, тому чутливі дані (як-от API-ключі) не потрібно жорстко вписувати у тести.

6. **Q:** *Які переваги інтеграції Cypress у CI/CD pipeline?*  
   **A:** Автоматизація тестових запусків при кожному коміті чи деплої, швидкий зворотний зв'язок з коду, покращена співпраця і раннє виявлення помилок — основні переваги. Також це забезпечує безперервний контроль якості під час усього життєвого циклу розробки.
