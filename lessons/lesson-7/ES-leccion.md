### **Lección 7: Interacción con elementos web y manejo de entradas de usuario**

## **1. Esquema del contenido**

### **A. Introducción**
- **Por qué la interacción con elementos web es importante:**
  - Verifica cómo los usuarios interactúan con elementos como botones, campos de entrada, casillas de verificación, menús desplegables, etc.
  - Garantiza que las aplicaciones web se comporten como se espera en respuesta a las entradas del usuario.


##### Por qué la interacción con elementos web es importante

**Explicación:**
- **Simulación del mundo real:**  
  Interactuar con elementos web simula cómo los usuarios reales interactúan con una aplicación web. Las pruebas automatizadas que replican clics, escritura y otras acciones ayudan a asegurar que la UI responda correctamente en cada escenario.

- **Validación del comportamiento de la UI:**  
  Confirma que las acciones del usuario (como enviar un formulario, seleccionar una opción o activar un modal) conducen a los cambios esperados en el DOM, como mostrar mensajes de error, actualizar contenido o navegar a una nueva página.

- **Detectar problemas de regresión:**  
  Las interacciones automatizadas pueden detectar regresiones de UI rápidamente. Si un desarrollador realiza un cambio que afecta cómo funciona un botón, las pruebas de interacción señalarán el problema de inmediato.

- **Pruebas de extremo a extremo:**  
  Las pruebas de interacción son críticas para las pruebas de extremo a extremo (E2E), donde se verifica el recorrido completo del usuario: desde cargar la página hasta realizar una secuencia de acciones y observar los resultados.


### **B. Selección de elementos en Cypress**
- **Selectores CSS (Metodología principal):**
  - Selectores básicos: `.class`, `#id`, `tag`.
  - Selectores complejos: `div > button`, `input[type="text"]`.
- **Uso de atributos `data-*`:**
  - Buena práctica para selectores estables en automatización:
    ```javascript
    cy.get('[data-testid="login-button"]');
    ```
- **Métodos de recorrido:**
  - Encontrar elementos hijos: `cy.get('div').find('button')`.
  - Navegar por la estructura del DOM: `.parent()`, `.children()`, `.next()`, `.prev()`.
- **Mejores prácticas:**
  - Usa atributos `data-*` para la estabilidad de las pruebas.
  - Evita selectores frágiles como `nth-child`.

  ##### cy.get() vs cy.find()
  **Diferencia clave:**  
  Usa `cy.get()` para consultar el DOM global. Usa `cy.find()` cuando necesites reducir la búsqueda a elementos dentro de un contenedor o contexto específico.

  **cy.get():**
  - **Uso:**  
    `cy.get()` se usa para seleccionar elementos del DOM completo usando un selector dado.
  - **Ejemplo:**
    ```javascript
    // Selecciona un elemento con un atributo data-testid en toda la página
    cy.get('[data-testid="login-form"]');
    ```

  **cy.find():**
  - **Uso:**  
    `cy.find()` se utiliza para buscar elementos descendientes dentro de un elemento previamente seleccionado.
  - **Ejemplo:**
    ```javascript
    // Primero, selecciona un elemento padre
    cy.get('[data-testid="login-form"]')
      // Luego encuentra un elemento input hijo dentro de ese formulario
      .find('[data-testid="username-input"]');
    ```

##### Por qué el atributo `data-testid` es mejor que los selectores ID o CLASS

**Explicación:**
- **Estabilidad ante cambios de UI:**  
  Los atributos `data-testid` están dedicados únicamente a las pruebas. Normalmente no se ven afectados por rediseños de CSS o refactorizaciones, a diferencia de los ID o clases, que pueden cambiar según los requisitos de diseño.

- **Separación de responsabilidades:**  
  Mantener los selectores de prueba separados de los selectores de estilo o estructura garantiza que las pruebas permanezcan robustas y no se rompan por actualizaciones visuales.

- **Descriptivo y revelador de la intención:**  
  Indican claramente que el atributo se usa para pruebas (por ejemplo, `data-testid="login-button"`), lo que hace que las pruebas sean más fáciles de entender y mantener.

- **Evitar conflictos:**  
  Los ID y las clases se usan para estilos y diseño, por lo que depender de ellos puede generar conflictos o comportamientos inesperados si esos selectores se reutilizan para otros fines.

**Ejemplo:**
```html
<!-- Usando data-testid para pruebas -->
<button data-testid="submit-button">Enviar</button>
```
```javascript
// Prueba de Cypress usando data-testid
cy.get('[data-testid="submit-button"]').click();
```

---

### **C. Acciones sobre elementos web**
1. **Hacer clic en elementos:**
   - Usa `cy.click()` para simular clics.
   - Ejemplo:
     ```javascript
     cy.get('[data-testid="submit-button"]').click();
     ```

2. **Escribir en campos de entrada:**
   - Usa `cy.type()` para simular escritura.
   - Ejemplo:
     ```javascript
     cy.get('[data-testid="username-input"]').type('testUser');
     ```
    - **Simular eventos de teclado:**
      - Usa `.type()` con teclas especiales como `{enter}`, `{backspace}`.
      - Ejemplo:
        ```javascript
        cy.get('[data-testid="search-input"]').type('Cypress{enter}');
        ```

3. **Limpiar campos de entrada:**
   - Usa `.clear()` para eliminar contenido.
   - Ejemplo:
     ```javascript
     cy.get('[data-testid="username-input"]').clear();
     ```

4. **Seleccionar opciones en menús desplegables:**
   - Usa `.select()` para elementos `<select>`.
   - Ejemplo:
     ```javascript
     cy.get('[data-testid="dropdown"]').select('Opción 1');
     ```

5. **Casillas de verificación y botones de opción:**
   - `.check()` para seleccionar, `.uncheck()` para deseleccionar casillas de verificación.
   - Ejemplo:
     ```javascript
     cy.get('[data-testid="accept-terms"]').check();
     ```

6. **Enviar formularios:**
   - Usa `.submit()` para simular el envío de formularios.
   - Ejemplo:
     ```javascript
     cy.get('[data-testid="login-form"]').submit();
     ```

7. **Pasar el cursor sobre elementos (hover):**
   - Cypress no tiene una acción específica de hover; usa `.trigger('mouseover')`.
   - Ejemplo:
     ```javascript
     cy.get('[data-testid="menu-item"]').trigger('mouseover');
     ```
---

### **D. Validando interacciones**
- **Aserciones:**
  - Confirma que las acciones resultan en el estado o comportamiento esperado.
  - Ejemplo:
    ```javascript
    cy.get('[data-testid="success-message"]')
      .should('be.visible')
      .and('contain', '¡Inicio de sesión exitoso!');
    ```
- **Encadenamiento de comandos:**
  - Combina acciones y aserciones para pruebas claras y concisas.
  - Ejemplo:
    ```javascript
    cy.get('[data-testid="submit-button"]')
      .click()
      .get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Credenciales no válidas');
    ```

---

### **E. Manejo avanzado de entradas**
- **Cargas de archivos:**
  - Usa `cy.selectFile()` para elementos de entrada de archivos.
  - Ejemplo:
    ```javascript
    cy.get('[data-testid="file-upload"]').selectFile('cypress/fixtures/sample.pdf');
    ```

- **Interacción con elementos deshabilitados:**
  - Valida o desencadena eventos en elementos deshabilitados:
    ```javascript
    cy.get('[data-testid="submit-button"]').should('be.disabled');
    ```

##### cy.trigger()

**Explicación:**
- **Propósito:**  
  `cy.trigger()` se utiliza para simular eventos que no tienen un comando dedicado en Cypress (como `mouseover`, `keydown`, etc.). Esto es útil para probar cómo reaccionan los elementos a interacciones de usuario personalizadas o complejas.

- **Ejemplo:**
  ```javascript
  // Dispara un evento mouseover en un elemento
  cy.get('[data-testid="menu-item"]').trigger('mouseover');
  ```

- **Cuándo usarlo:**  
  Usa `cy.trigger()` cuando necesites simular eventos más allá de las acciones estándar de clic o escritura—especialmente útil para probar cambios de UI dinámicos como tooltips o menús desplegables que aparecen al pasar el cursor.


##### cy.within()

**Explicación:**
- **Propósito:**  
  `cy.within()` limita los comandos de Cypress subsiguientes a un elemento específico. Esto es útil cuando quieres restringir el contexto de búsqueda a un contenedor particular, garantizando que tus selectores solo busquen dentro de ese contenedor.

- **Ejemplo:**
  ```javascript
  // Limita todos los comandos subsiguientes al elemento del formulario
  cy.get('[data-testid="login-form"]').within(() => {
    cy.get('[data-testid="username-input"]').type('testUser');
    cy.get('[data-testid="password-input"]').type('password123');
  });
  ```

- **Beneficios:**  
  - Aumenta la fiabilidad de las pruebas al evitar falsos positivos por elementos similares en otras partes de la página.
  - Simplifica los selectores al reducir el contexto de búsqueda.


##### Por qué usar el plugin Cypress Real Events (`cypress-real-events`) en lugar de los eventos nativos de Cypress

**Explicación:**
- **Limitaciones nativas:**  
  Los comandos integrados de Cypress (como `cy.click()`, `cy.type()`) funcionan bien para muchas interacciones, pero a veces no simulan completamente el comportamiento real del usuario. Por ejemplo, movimientos complejos del mouse o secuencias de eventos más matizadas pueden no activarse exactamente como lo harían en un navegador real.

- **Plugin Cypress Real Events:**
  - **Propósito:**  
    El plugin `cypress-real-events` envía eventos reales del navegador (p. ej., movimientos reales del mouse o eventos de teclado), lo que puede ser más representativo del comportamiento auténtico del usuario.
  - **Ventajas:**  
    - **Simulación más precisa:** Reproduce mejor el comportamiento de eventos nativos, especialmente para interacciones que requieren más que un simple clic.
    - **Mayor fiabilidad de las pruebas:** Ayuda en escenarios donde los eventos nativos de Cypress podrían no activar ciertos manejadores de eventos, como arrastrar y soltar o interacciones de hover complejas.
  - **Ejemplo:**
    ```javascript
    // Primero, instala el plugin:
    // npm install cypress-real-events --save-dev

    // En tu archivo de soporte de Cypress (p. ej., cypress/support/commands.js), importa el plugin:
    import 'cypress-real-events/support';

    // Luego, úsalo en una prueba:
    cy.get('[data-testid="drag-item"]').realMouseDown();
    cy.get('[data-testid="drop-zone"]').realMouseUp();
    ```

- **Cuándo usarlo:**  
  Usa el plugin de eventos reales cuando necesites simular una secuencia de eventos que imite estrechamente las interacciones del usuario—por ejemplo, arrastrar y soltar, efectos de hover con demoras o escenarios de movimiento complejo del mouse.


---

## **2. Actividades prácticas**

### **A. Ejercicio 1: Envío de formularios**
- **Objetivo:**
  - Crea un formulario de inicio de sesión con atributos `data-testid`.
  - Simula entradas del usuario (nombre de usuario, contraseña), haz clic en el botón de inicio de sesión y valida mensajes de éxito o error.
- **Sugerencia de funcionalidad web:**
  - Un formulario de inicio de sesión simple con validación.

### **B. Ejercicio 2: Interacción con menú desplegable y casilla de verificación**
- **Objetivo:**
  - Agrega un menú desplegable para seleccionar un rol de usuario y una casilla para aceptar los términos.
  - Valida que el formulario solo se envía cuando todos los campos están completos y la casilla está marcada.
- **Sugerencia de funcionalidad web:**
  - Un formulario que impide el envío hasta que se cumplan los criterios de validación.

### **C. Ejercicio 3: Simulación de eventos de teclado**
- **Objetivo:**
  - Crea una barra de búsqueda que filtre resultados dinámicamente a medida que el usuario escribe.
  - Prueba el comportamiento de la búsqueda usando `.type()` y `.clear()`.
- **Sugerencia de funcionalidad web:**
  - Una barra de búsqueda en tiempo real que muestre resultados coincidentes.

---

## **3. Preguntas potenciales de los estudiantes**

1. **¿Por qué debería usar atributos `data-*` en lugar de selectores CSS?**
   - **Respuesta:** Los selectores CSS pueden cambiar debido a actualizaciones de diseño, mientras que los atributos `data-*` son estables y están reservados para desarrolladores/pruebas, garantizando scripts de prueba confiables.

2. **¿Cómo puedo simular pasar el cursor sobre un elemento en Cypress?**
   - **Respuesta:** Usa `.trigger('mouseover')`, ya que Cypress no tiene un método dedicado para hover.

3. **¿Puedo interactuar con elementos que están ocultos o deshabilitados?**
   - **Respuesta:** Cypress impide interactuar con elementos ocultos o deshabilitados por defecto, pero puedes usar `.invoke('show')` o modificar atributos para simular interacciones.

4. **¿Cómo valido que un formulario funciona correctamente?**
   - **Respuesta:** Combina acciones (p. ej., escribir, hacer clic) con aserciones para confirmar resultados esperados como mostrar mensajes de éxito/error.

---

## **4. Materiales complementarios**

- **Documentación oficial:**
  - [Cypress Commands](https://docs.cypress.io/api/commands)
  - [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)

- **Videos y tutoriales:**
  - [Traversy Media: Cypress Crash Course](https://www.youtube.com/watch?v=pk4z4k8I8fU)
  - [The Net Ninja: Cypress Testing Tutorials](https://www.youtube.com/watch?v=zLtqULPDuE8)

- **Herramientas interactivas:**
  - Practica con herramientas como [TodoMVC](http://todomvc.com).

- **Sitios web para practicar automatización de pruebas**
  - [Advantage eshop demo](https://advantageonlineshopping.com)
  - [DemoBlaze eshop](https://www.demoblaze.com)
  - [Tools QA](https://demoqa.com)
  - [UI Test Automation Playground](http://uitestingplayground.com)
  - [Sauce Labs](https://www.saucedemo.com)
  - [Cypress Playground](https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html)
  - [Automation Exercise](https://automationexercise.com)
  - [Practice Test Automation Website for Web UI & API](https://practice.expandtesting.com)

---

### Desglose sugerido de la lección para 3 horas

#### **Hora 1: Fundamentos de selección e interacción con elementos (60 minutos)**
- Introducción a los selectores de elementos.
- Realizar acciones básicas como hacer clic y escribir.
- Actividad práctica: Completar y enviar un formulario.

#### **Hora 2: Interacciones avanzadas y manejo de entradas (60 minutos)**
- Manejo de menús desplegables, casillas de verificación y cargas de archivos.
- Simulación de eventos de teclado y manejo de elementos deshabilitados.
- Actividad práctica: Interacción con desplegable dinámico y barra de búsqueda.

#### **Hora 3: Validación de acciones del usuario (60 minutos)**
- Escribir aserciones para diferentes escenarios.
- Combinar acciones y aserciones en casos de prueba.
- Actividad práctica: Probar y validar el comportamiento del formulario según la entrada.