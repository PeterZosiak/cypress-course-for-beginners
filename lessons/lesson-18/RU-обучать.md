## **Урок 18: Cypress Dashboard, Отчётность и Непрерывная Интеграция и Доставка (CI/CD)**

### **Цели**

- **Cypress Dashboard:**  
  Понять функции и преимущества Cypress Dashboard для управления и мониторинга прогонов тестов.

- **Отчётность:**  
  Научиться генерировать, настраивать и интерпретировать отчёты и метрики Cypress.

- **Интеграция CI/CD:**  
  Интегрировать Cypress тесты в автоматизированные пайплайны с использованием популярных CI/CD-инструментов (таких как GitHub Actions, GitLab CI или Jenkins), чтобы тесты запускались при каждом коммите и выкладке кода.

---

### **Структура содержания**

#### **A. Cypress Dashboard**

1. **Обзор функций Cypress Dashboard:**
Веб-сервис от Cypress.io для управления и визуализации прогонов тестов.
Доступен как для open-source, так и для коммерческого использования.

Зарегистрируйтесь на [https://dashboard.cypress.io](https://dashboard.cypress.io)

   
   - **Мониторинг в реальном времени:**  
     Просмотр статуса запусков, видео, скриншотов и логов в реальном времени.
   - **История тестов и аналитика:**  
     Анализ тенденций, просмотр подробной истории запусков и отслеживание производительности.
   - **Отладка ошибок:**  
     Доступ к снапшотам "time-travel" и подробным логам для быстрого выявления сбоев.
   - **Совместная работа:**  
     Делиться результатами тестов с командой и интегрировать с системами трекинга багов.

2. **Преимущества для управления тестами и отчетности:**
   - **Централизованный просмотр:**  
     Все прогоны и их детали хранятся на одной панели.
   - **Автоматическое снятие видео/скриншотов:**  
     Упрощает отладку нестабильных ошибок.
   - **Улучшенная отчетность:**  
     Визуализация производительности тестов и тенденций.
   - **Командная работа:**  
     Упрощает обмен результатами и историей для заинтересованных сторон.

3. **Настройка интеграции Cypress Dashboard:**
   - **Создание аккаунта:**  
     Зарегистрируйтесь на [Cypress Dashboard](https://dashboard.cypress.io/).
   - **Настройка проекта:**  
     Добавьте свой project ID в конфигурацию Cypress.
     ```json
     // Пример фрагмента cypress.config.js:
     module.exports = defineConfig({
       e2e: {
         // ... другие настройки
         projectId: 'your-project-id', // предоставляется Cypress Dashboard
       }
     });
     ```
   - **Загрузка результатов:**  
     Используйте команду CLI `npx cypress run --record --key <record-key>` для загрузки результатов тестов.

   - **Добавьте в тестовую команду:**
      ```json
      "scripts": {
        "test:cloud": "cypress run --record --key YOUR_PROJECT_KEY"
      }
      ```

---

#### **B. Отчётность**

1. **Генерация тестовых отчетов:**
- Помогает выявить закономерности в сбоях.
- Документирует качество и надёжность тестов.
- Полезно для командной коммуникации и CI dashboard.
- Скриншоты и видео автоматически сохраняются при неудаче (`videos/`, `screenshots/`).

   - **Встроенная отчетность:**  
     Cypress предоставляет базовый отчёт в CLI, включая информацию о пройденных, проваленных и пропущенных тестах.
   - **Пользовательские отчётчики:**  
     Плагины, такие как `cypress-mochawesome-reporter`, позволяют генерировать подробные HTML-отчеты.
     ```bash
     npm install cypress-mochawesome-reporter --save-dev
     ```
     Затем настройте в конфигурации Cypress:
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
     Добавьте в cypress/support/e2e.js
     ```
     import 'cypress-mochawesome-reporter/register'
     ```

2. **Настройка вывода отчетов:**
   - Настраивайте заголовок отчёта, тему и путь вывода через опции reporter.
   - Анализируйте метрики такие как продолжительность теста, количество повторений и логи ошибок для получения инсайтов.

3. **Анализ результатов и метрик тестирования:**
   - Просмотрите скриншоты и видео, предоставленные Dashboard.
   - Используйте подробные логи и снапшоты для поиска причин ошибок и узких мест в производительности.

---

#### **C. Непрерывная Интеграция (CI) и Непрерывная Доставка (CD)**

- **CI (Continuous Integration):** Автоматически тестировать и валидировать изменения кода.
- **CD (Continuous Delivery/Deployment):** Автоматически выкладывать код на тестовые или продуктивные среды.

###### 🔹 Популярные CI-инструменты:
- GitHub Actions ✅
- GitLab CI
- Jenkins
- CircleCI
- Bitbucket Pipelines
- Azure DevOps


1. **Введение в CI/CD концепции:**
   - **CI (Непрерывная Интеграция):**  
     Автоматизация процесса сборки и тестирования кода при каждом коммите.
   - **CD (Непрерывная Доставка):**  
     Автоматизация процесса выкладки, чтобы изменения быстро и стабильно попадали в production.

2. **Настройка запуска Cypress тестов в CI/CD пайплайнах:**
   - **Пример GitHub Actions:**
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

   - **Автоматизация выполнения тестов:**  
     Настройте ваши CI/CD пайплайны для автоматического запуска тестов при коммитах, pull request и деплоях.

4. **Уведомления и оповещения:**
   - Интегрируйте со Slack, электронкой или другими мессенджерами для оповещения команды о сбоях.
   - Используйте уведомления Dashboard для информирования заинтересованных лиц о проблемах сборки.

5. **Лучшие практики в CI/CD:**
   - Безопасно хранить переменные окружения и секреты (использовать зашифрованное хранилище платформ CI/CD).
   - Для стабильности тестовой среды используйте Docker или контейнеризацию.
   - Оптимизируйте выполнение тестов с помощью параллельного запуска и кэширования.

---

#### **D. Практические задания**

1. **Настройка Cypress Dashboard:**
   - Зарегистрируйтесь в Cypress Dashboard и настройте свой проект с полученным project ID.
   - Запускайте тесты с флагом record для выгрузки результатов в Dashboard.

2. **Настройка CI пайплайна:**
   - Используйте GitHub Actions (или другой инструмент CI) для настройки workflow, который автоматически запускает Cypress тесты при push и pull request.
   - Попрактикуйтесь в запуске пайплайна и анализе сформированных отчётов.

3. **Генерация и анализ отчетов:**
   - Настройте пользовательский отчётчик (например, `cypress-mochawesome-reporter`) и сгенерируйте HTML-отчет.
   - Проанализируйте отчёты для выявления нестабильных тестов, проблем с производительностью и тенденций ошибок.

4. **Симуляция реального сценария:**
   - Используйте `cy.intercept()` для подмены сетевых запросов и имитации различных ответов от backend.
   - Совмещайте UI-тесты с API-тестами, проверяя, что UI показывает данные, соответствующие ответам API.

5. **Уведомления в CI/CD:**
   - Настройте оповещения (например, через Slack) в вашем CI-пайплайне, чтобы получать уведомления о неудачных тестах.
   - Обсудите, как автоматизированная система уведомлений ускоряет реакцию команды на проблемы.

---

#### **E. Ресурсы**

- **Документация Cypress Dashboard:**  
  [Cypress Dashboard](https://docs.cypress.io/guides/dashboard)
- **Плагины Cypress для отчетности:**  
  - [cypress-mochawesome-reporter](https://github.com/adamgruber/cypress-mochawesome-reporter)
- **Гайды по интеграции CI/CD:**  
  - GitHub Actions: [GitHub Actions for Cypress](https://docs.cypress.io/guides/guides/continuous-integration)
  - GitLab CI: [Cypress with GitLab CI](https://docs.cypress.io/guides/guides/gitlab-ci)
  - Jenkins: [Using Cypress with Jenkins](https://docs.cypress.io/guides/guides/jenkins)
- **Примеры сообщества:**  
  Ищите на GitHub репозитории, использующие Cypress и CI/CD пайплайны, для получения примеров и вдохновения.

---

### **Возможные вопросы и ответы студентов**

1. **Q:** *В чём основное преимущество Cypress Dashboard?*  
   **A:** Cypress Dashboard централизует результаты прогонов, предоставляет видео и скриншоты в реальном времени и облегчает отладку, предоставляя подробные логи и историю.

2. **Q:** *Как кастомизировать тестовые отчёты в Cypress?*  
   **A:** Вы можете использовать пользовательские отчётчики, такие как `cypress-mochawesome-reporter`, чтобы генерировать подробные HTML-отчёты. Кастомизация доступна через опции в конфигурационном файле Cypress (формат отчёта, место вывода и др.).

3. **Q:** *Что такое CI/CD и почему это важно для автоматизации тестирования?*  
   **A:** CI/CD — это Непрерывная Интеграция и Доставка. Это автоматизация процессов сборки, тестирования и выкладки, что гарантирует проверку кода и быструю доставку. Интеграция Cypress в пайплайны CI/CD позволяет заранее находить ошибки и поддерживать высокое качество релизов.

4. **Q:** *Как работают переменные среды и секреты в CI/CD пайплайнах?*  
   **A:** В CI/CD-платформах есть безопасные способы управления переменными среды и секретами — они внедряются в сборку и тесты, чтобы, например, API-ключи не попадали в открытый доступ и код.

6. **Q:** *В чём преимущества интеграции Cypress тестов в CI/CD пайплайн?*  
   **A:** Автоматизация запусков при каждом коммите или деплое, быстрое получение обратной связи, улучшенное взаимодействие в команде и возможность быстро обнаруживать ошибки. Это обеспечивает постоянный контроль качества на протяжении всего процесса разработки.