## **Lesson 6: Instalación y Configuración de Cypress**

### **1. Contenido del Temario**

#### **A. Introducción a la Instalación de Cypress**
- **Por qué importa la instalación:**
  - Antes de escribir pruebas con Cypress, el entorno debe estar correctamente configurado para garantizar compatibilidad y una ejecución fluida.
- **Requisitos previos para la instalación:**
  - Node.js instalado en el sistema.
  - Conocimientos básicos de gestores de paquetes como `npm` o `yarn`.


1. **Node.js instalado:**
   - Cypress requiere Node.js para gestionar su instalación y dependencias.
   - Instala Node.js desde el sitio oficial: [https://nodejs.org/](https://nodejs.org/).
   - Verifica la instalación usando:
     ```bash
     node -v
     npm -v
     ```

2. **Un gestor de paquetes:**
   - Node.js incluye `npm` (Node Package Manager) por defecto. Alternativamente, puedes usar `yarn`, `pnpm` u otros.

3. **Un proyecto JavaScript inicializado:**
   - Tu proyecto debe tener un archivo `package.json`, que se crea usando `npm init` o `yarn init`. Este archivo rastrea dependencias como Cypress y otros metadatos del proyecto.

4. **Conocimientos básicos de la línea de comandos:**
   - Necesitarás ejecutar comandos en la terminal para instalar y ejecutar Cypress.

##### **¿Qué es npm y cómo funciona?**

**¿Qué es npm?**
- `npm` (Node Package Manager) es una herramienta que viene con Node.js y se usa para gestionar paquetes y dependencias de JavaScript.
- Ayuda a los desarrolladores a:
  - Instalar bibliotecas y herramientas.
  - Compartir sus propias bibliotecas con la comunidad.
  - Gestionar dependencias específicas del proyecto o globales.

**Cómo funciona npm:**
1. **Instalación de paquetes:**
   - Instalar un paquete localmente (específico del proyecto):
     ```bash
     npm install package-name
     ```
   - Instalar un paquete globalmente (accesible en todos los proyectos):
     ```bash
     npm install -g package-name
     ```

2. **Gestión de dependencias:**
   - Los paquetes instalados se listan en `package.json` bajo las secciones `dependencies` o `devDependencies`.

3. **Automatización con scripts:**
   - `npm` puede ejecutar scripts personalizados definidos en `package.json`:
     ```json
     {
       "scripts": {
         "start": "node app.js",
         "test": "cypress open"
       }
     }
     ```
   - Ejecutar un script:
     ```bash
     npm run test
     ```

---

### **Diferencia entre npm, yarn, bum y pnpm**

| Feature             | **npm**                      | **yarn**                     | **bun**                     | **pnpm**                       |
|---------------------|------------------------------|------------------------------|-----------------------------|--------------------------------|
| **Velocidad**       | Moderada                    | Más rápido que npm           | El más rápido               | Más rápido que npm/yarn        |
| **Uso de espacio en disco** | Alto (paquetes duplicados) | Moderado                    | Eficiente                   | Bajo (usa hard links para evitar duplicación) |
| **Árbol de dependencias** | Árbol plano             | Árbol plano                  | Árbol plano                 | Árbol jerárquico (mejor aislamiento) |
| **Modo sin conexión** | Limitado                  | Soportado                    | Soportado                   | Soportado                      |
| **Adopción**        | Ampliamente usado           | Popular en proyectos grandes | Nuevo (en crecimiento)      | Adopción creciente en empresas |
| **Mejor caso de uso** | General                   | Proyectos grandes o críticos en rendimiento | Flujos de desarrollo rápidos | Proyectos que necesitan almacenamiento eficiente |


#### **B. Proceso de instalación paso a paso**
1. **Inicializa el proyecto:**
   - Crea una nueva carpeta de proyecto.
   - Ejecuta `npm init` o `yarn init` para inicializar un archivo `package.json`.
2. **Instala Cypress:**
   - Usa el comando `npm install cypress --save-dev` o `yarn add cypress --dev`.
3. **Verifica la instalación:**
   - Ejecuta `npx cypress open` o `yarn cypress open` para abrir el Test Runner de Cypress.


##### **¿Qué es `npm init`?**

**Propósito:**
`npm init` inicializa un nuevo proyecto de Node.js creando un archivo `package.json`, que sirve como archivo de configuración para gestionar dependencias y scripts del proyecto.

**Cómo funciona:**
1. Ejecuta `npm init` en el directorio de tu proyecto:
   ```bash
   npm init
   ```
2. Responde a las preguntas (nombre del proyecto, versión, descripción, etc.) o sáltalas usando la bandera `-y` para valores por defecto:
   ```bash
   npm init -y
   ```
3. Se creará un archivo `package.json` que contiene metadatos como:
   ```json
   {
     "name": "my-project",
     "version": "1.0.0",
     "scripts": {},
     "dependencies": {},
     "devDependencies": {}
   }
   ```


#### **C. Vista general de la estructura de carpetas de Cypress**
- **Directorios por defecto:**
  - `cypress/fixtures`: Almacena archivos JSON para datos de prueba.
  - `cypress/e2e`: Escribe aquí los archivos de prueba.
  - `cypress/plugins`: Extiende la funcionalidad de Cypress.
  - `cypress/support`: Agrega utilidades reutilizables y configuraciones globales.
- **Propósito de cada directorio:**
  - **`fixtures`:** Centraliza datos simulados para pruebas.
  - **`integration`:** Organiza casos de prueba por característica o funcionalidad.
  - **`support`:** Personaliza comandos y configura el comportamiento global.


##### **Propósito de las carpetas de Cypress**

1. **`fixtures`:**
   - Almacena datos simulados en formato JSON.
   - Usado para simular respuestas de API o proporcionar entradas de prueba.
   - Ejemplo: `cypress/fixtures/users.json`
     ```json
     [
       { "id": 1, "name": "Alice", "role": "admin" },
       { "id": 2, "name": "Bob", "role": "user" }
     ]
     ```
   - Acceso en pruebas:
     ```javascript
     cy.fixture('users').then((users) => {
       cy.log(users[0].name); // Registra "Alice"
     });
     ```

2. **`e2e` (o `integration` en versiones antiguas):**
   - Almacena los archivos de prueba reales, normalmente organizados por característica o funcionalidad.
   - Ejemplo:
     ```
     cypress/integration/login.spec.js
     cypress/integration/dashboard.spec.js
     ```

3. **`plugins`:**
   - Extiende la funcionalidad de Cypress, como modificar el comportamiento del navegador o configurar plugins.
   - Ejemplo:
     ```javascript
     module.exports = (on, config) => {
       // Modificar la configuración o configurar listeners de eventos
     };
     ```

4. **`support`:**
   - Contiene código reutilizable como comandos personalizados o configuraciones globales.
   - Ejemplo: Agregar un comando personalizado para inicio de sesión en `cypress/support/commands.js`:
     ```javascript
     Cypress.Commands.add('login', (username, password) => {
       cy.get('[data-testid="username"]').type(username);
       cy.get('[data-testid="password"]').type(password);
       cy.get('[data-testid="login-button"]').click();
     });
     ```


#### **D. Archivos de configuración**
- **Resumen de `cypress.config.js`:**
  - Configura URL base, tamaño de viewport, timeouts y más.
  - Ejemplo:
    ```javascript
    const { defineConfig } = require('cypress');

    module.exports = defineConfig({
      e2e: {
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
        defaultCommandTimeout: 8000,
        supportFile: 'cypress/support/index.js',
      },
    });
    ```

##### **¿Qué es `baseUrl` en el contexto de Cypress?**

**Definición:**
`baseUrl` es una propiedad de configuración en `cypress.config.js` que establece una URL raíz por defecto para la aplicación bajo prueba. Simplifica el código de pruebas al evitar especificar repetidamente la URL completa en los comandos `cy.visit()`.

**Ejemplo:**
- En `cypress.config.js`:
  ```javascript
  module.exports = {
    e2e: {
      baseUrl: 'http://localhost:3000',
    },
  };
  ```
- Uso en pruebas:
  ```javascript
  cy.visit('/login'); // Se resuelve como 'http://localhost:3000/login'
  ```

**Beneficios:**
- Reduce la redundancia en los archivos de prueba.
- Facilita actualizar las pruebas si cambia la URL raíz (p. ej., al pasar de `localhost` a un servidor de staging).


- **Configuración de variables de entorno:**
  - Usa `env` en el archivo de configuración para datos sensibles o valores reutilizables.
  - Ejemplo:
    ```javascript
    module.exports = defineConfig({
      env: {
        apiUrl: 'https://api.example.com',
      },
    });
    ```
  - Accede a ellas en las pruebas usando `Cypress.env('apiUrl')`.


### **Propiedad `env` en `cypress.config.js`**

**Definición:**
La propiedad `env` en `cypress.config.js` almacena variables específicas del entorno, como endpoints de API, credenciales o flags. Estos valores se pueden acceder en las pruebas usando `Cypress.env()`.

**Ejemplo:**
- En `cypress.config.js`:
  ```javascript
  module.exports = {
    e2e: {
      env: {
        apiUrl: 'https://api.example.com',
        userRole: 'admin',
      },
    },
  };
  ```
- Uso en pruebas:
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

**Beneficios:**
- Centraliza valores específicos del entorno, facilitando su actualización.
- Mantiene datos sensibles (p. ej., claves de API) fuera del código de pruebas.


#### **E. Ejecución de pruebas con Cypress**
- **Modo abierto (UI):**
  - Usa `npx cypress open` para lanzar la interfaz del Test Runner.
- **Modo headless (sin interfaz):**
  - Usa `npx cypress run` para ejecutar pruebas en la terminal.
  - Útil para pipelines de CI/CD.
- **Comando de ejemplo:**
  ```bash
  npx cypress run --spec cypress/integration/login.spec.js
  ```

  
**`npx`** es una herramienta que viene con `npm` (a partir de la versión 5.2.0) y se usa para ejecutar paquetes de Node.js directamente desde la línea de comandos sin instalarlos globalmente. Permite ejecutar los binarios de paquetes que están instalados localmente en tu proyecto o que se obtienen directamente del registro de npm.


##### **¿Por qué usar `npx`?**

1. **Ejecución temporal:**
   - Con `npx`, puedes ejecutar un paquete temporalmente sin instalarlo permanentemente en tu sistema.
   - Por ejemplo:
     ```bash
     npx create-react-app my-app
     ```
     Esto ejecuta el paquete `create-react-app` sin requerir una instalación global.

2. **Evitar instalaciones globales:**
   - En lugar de instalar un paquete globalmente (p. ej., `npm install -g some-package`), `npx` obtiene y ejecuta el paquete directamente.
   - Esto mantiene limpio tu entorno global y evita conflictos de versiones.

3. **Ejecutar paquetes instalados localmente:**
   - Si un paquete está instalado localmente en tu proyecto (`node_modules`), `npx` lo ejecuta automáticamente sin necesidad de referenciar la ruta completa.
   - Ejemplo:
     ```bash
     npx cypress open
     ```
     Esto ejecuta Cypress desde tu carpeta local `node_modules` si ya está instalado.

4. **Ejecución de una versión específica:**
   - Puedes especificar una versión concreta de un paquete para ejecutar:
     ```bash
     npx some-package@1.2.3
     ```

5. **Herramientas de scaffolding y generadores:**
   - `npx` se usa comúnmente para ejecutar herramientas que generan nuevos proyectos o archivos de configuración sin instalar la herramienta globalmente.
   - Ejemplo:
     ```bash
     npx eslint --init
     ```


### **¿Cómo funciona `npx`?**
- Cuando ejecutas un comando usando `npx`:
  1. Verifica si el paquete existe localmente en tu `node_modules`.
  2. Si el paquete no se encuentra localmente, lo descarga temporalmente y lo ejecuta.
  3. Una vez ejecutado, limpia eliminando los archivos temporales (si se obtuvieron).

---

### **Cuándo usar `npx` vs `npm`**

| **Feature**              | **`npm`**                                   | **`npx`**                                |
|--------------------------|---------------------------------------------|------------------------------------------|
| **Instalación**          | Instala un paquete local o globalmente.     | Ejecuta un paquete sin instalación.      |
| **Uso**                  | Requiere instalar primero el paquete.       | No necesita instalar; ejecuta directamente. |
| **Paquetes globales**    | A menudo se usa para gestionar herramientas globales. | Reemplaza la necesidad de instalaciones globales. |
| **Uso puntual**          | No es adecuado sin instalación.             | Perfecto para ejecuciones puntuales.     |

---

### **Ejemplos de uso de `npx`**

1. **Ejecutar Cypress sin instalarlo globalmente:**
   ```bash
   npx cypress open
   ```

2. **Generar una nueva app de React:**
   ```bash
   npx create-react-app my-app
   ```

3. **Ejecutar lint sin instalar ESLint globalmente:**
   ```bash
   npx eslint myfile.js
   ```

4. **Ejecutar versiones específicas de paquetes:**
   ```bash
   npx some-package@2.0.0
   ```

5. **Ejecución temporal para probar:**
   - Ejecuta `npx cowsay` como ejemplo divertido:
     ```bash
     npx cowsay "Hello, World!"
     ```
`npx` es una herramienta versátil que simplifica la ejecución de paquetes y ayuda a evitar saturar tu sistema con instalaciones globales innecesarias, lo que la hace ideal para desarrolladores que trabajan frecuentemente con herramientas y frameworks de JavaScript.


#### **F. Mejores prácticas para la configuración**
- **Mantén Cypress actualizado:**
  - Actualiza regularmente Cypress para acceder a nuevas funciones y correcciones de errores.
- **Usa control de versiones para archivos de configuración:**
  - Rastrea cambios en `cypress.config.js` y otros archivos de configuración.
- **Crea una URL base:**
  - Define una URL base en el archivo de configuración para simplificar comandos como `cy.visit()`.

---

### **2. Actividades prácticas**

#### **A. Ejercicio de instalación de Cypress**
- **Objetivo:**
  - Guiar a los estudiantes en la instalación de Cypress en su entorno.
- **Pasos:**
  1. Instalar Node.js si aún no está instalado.
  2. Inicializar un nuevo proyecto con `npm init`.
  3. Instalar Cypress usando `npm install cypress --save-dev`.
  4. Ejecutar `npx cypress open` y explorar la estructura de carpetas por defecto.
- **Resultado:**
  - Los estudiantes deberían ver abrirse correctamente el Test Runner de Cypress.

#### **B. Ejercicio de configuración del archivo**
- **Objetivo:**
  - Editar el archivo `cypress.config.js` para agregar una URL base y ajustes de viewport.
- **Pasos:**
  1. Abrir `cypress.config.js`.
  2. Agregar lo siguiente:
     ```javascript
     module.exports = {
       e2e: {
         baseUrl: 'http://localhost:3000',
         viewportWidth: 1366,
         viewportHeight: 768,
       },
     };
     ```
  3. Guardar el archivo y volver a ejecutar `npx cypress open`.
- **Resultado:**
  - Los estudiantes deberían poder navegar a la URL base ejecutando `cy.visit('/')` en sus pruebas.

---

### **3. Preguntas potenciales de los estudiantes**

1. **¿Qué sucede si no tengo Node.js instalado?**
   - **Respuesta:** Cypress requiere que Node.js esté instalado, ya que se gestiona usando npm (Node Package Manager). Los estudiantes deben descargar e instalar Node.js antes de continuar.

2. **¿Necesito instalar Cypress globalmente?**
   - **Respuesta:** No, normalmente Cypress se instala localmente dentro de un proyecto para una mejor gestión de versiones y reproducibilidad.

3. **¿Cuál es la diferencia entre el modo abierto de Cypress y el modo headless?**
   - **Respuesta:** El modo abierto lanza el Test Runner interactivo de Cypress, permitiendo ver visualmente la ejecución de las pruebas. El modo headless ejecuta las pruebas en la terminal sin abrir la interfaz, adecuado para pipelines de automatización.

4. **¿Por qué debería usar una URL base en la configuración?**
   - **Respuesta:** Configurar una URL base simplifica los comandos de prueba. En lugar de escribir `cy.visit('http://localhost:3000/login')`, puedes escribir `cy.visit('/login')`.

5. **¿Puedo usar Cypress con proyectos existentes?**
   - **Respuesta:** Sí, se puede agregar Cypress a cualquier proyecto JavaScript instalándolo como una dependencia de desarrollo.

---

### **4. Material complementario**

#### **A. Documentación oficial:**
- [Guía de instalación de Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)
- [Configuración de Cypress](https://docs.cypress.io/guides/references/configuration)

#### **B. Tutoriales y artículos:**
- [Estructura de carpetas de Cypress y configuración](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests)
- [Guía para principiantes para instalar Cypress](https://blog.testproject.io/2021/01/05/getting-started-with-cypress/)

#### **C. Videos:**
- **Traversy Media:** Cypress Crash Course
- **The Net Ninja:** Getting Started with Cypress Testing

#### **D. Plataformas de práctica:**
- Configura Cypress en una aplicación simple de TodoMVC o en una demo en línea como `http://todomvc.com`.

---

### **5. Sugerencia de desglose de la lección para 3 horas**

#### **Hora 1: Introducción e instalación (60 minutos)**
- **Instalar Cypress (30 minutos):**
  - Guiar a los estudiantes paso a paso durante la instalación.
  - Verificar la configuración con `npx cypress open`.
- **Resumen de la estructura de carpetas (20 minutos):**
  - Explicar el propósito de cada carpeta.
  - Indicar dónde escribir pruebas y almacenar datos simulados.
- **Preguntas y respuestas (10 minutos):**
  - Resolver dudas relacionadas con la instalación.

#### **Hora 2: Configuración de Cypress (60 minutos)**
- **Creación y edición de `cypress.config.js` (30 minutos):**
  - Configurar URL base, tamaño de viewport y variables de entorno personalizadas.
  - Discutir la importancia de los archivos de configuración.
- **Actividad práctica (20 minutos):**
  - Editar el archivo de configuración y ejecutar el Test Runner para confirmar los cambios.
- **Preguntas y respuestas (10 minutos):**
  - Aclarar dudas relacionadas con la configuración.

#### **Hora 3: Ejecución de pruebas con Cypress (60 minutos)**
- **Modos abierto y headless (20 minutos):**
  - Demostrar ambos modos y explicar sus casos de uso.
- **Exploración de pruebas de ejemplo (30 minutos):**
  - Ejecutar las pruebas de ejemplo por defecto en Cypress para mostrar funcionalidades integradas.
  - Discutir cómo estructurar pruebas personalizadas en la carpeta `integration`.
- **Resumen y preguntas y respuestas (10 minutos):**
  - Repasar los pasos de instalación y configuración.
  - Responder preguntas finales y preparar a los estudiantes para la siguiente lección.

---

### **6. Recomendaciones adicionales**

#### **Demostraciones interactivas:**
- Mostrar a los estudiantes cómo solucionar problemas comunes de instalación (p. ej., permisos, falta de Node.js).
- Demostrar ediciones en vivo de `cypress.config.js` y sus efectos inmediatos.

#### **Fomentar la participación:**
- Hacer que los estudiantes instalen Cypress de forma independiente y se ayuden entre sí con problemas de configuración.
- Permitir que los estudiantes experimenten con ajustes de configuración como timeouts y tamaños de viewport.

#### **Proporcionar instrucciones claras:**
- Comandos paso a paso para la instalación y configuración.
- Consejos para organizar la carpeta `integration` para casos de prueba escalables.

#### **Enfocarse en la practicidad:**
- Usar ejemplos cercanos, como configurar una URL base para una aplicación de ejemplo.
- Explicar cómo una configuración adecuada impacta la mantenibilidad y escalabilidad de los proyectos de automatización de pruebas.