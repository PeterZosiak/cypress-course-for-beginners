## **Lección 8: Manejo de aserciones y validaciones**

### **1. Esquema de contenido**

#### **A. Introducción a las aserciones**
- **Definición:**
  - Las aserciones son declaraciones en tu código de prueba que verifican si una determinada condición es verdadera. Son fundamentales para comprobar que el estado de la aplicación coincide con los resultados esperados.
- **Por qué importan las aserciones:**
  - **Detección de errores:** Ayudan a identificar rápidamente cuándo una aplicación no se comporta como se espera.
  - **Confiabilidad de las pruebas:** Garantizan que los cambios en el código no rompan la funcionalidad esperada.
  - **Documentación:** Funcionan como documentación viva de lo que la aplicación debe hacer.

#### **B. Aserciones de Cypress e integración con Chai**
- **Aserciones integradas de Cypress:**
  - Cypress utiliza Chai internamente para las aserciones.
- **Estilos de aserciones de Chai:**
  - **Should:** Aserciones encadenables usando `should()`.
  - **Expect:** Aserciones de estilo función usando `expect()`.
  - **Assert:** Estilo clásico de aserción usando `assert`.
- **Ejemplos:**
  - `cy.get(selector).should('be.visible')`
  - `expect(value).to.equal(expectedValue)`

**Definición:**
Chai es una biblioteca de aserciones popular para JavaScript que proporciona una variedad de estilos para escribir pruebas. Permite a los desarrolladores escribir pruebas legibles con aserciones claras y descriptivas.

**Cómo usar Chai:**
- **Integración con Cypress:**  
  Cypress incluye Chai listo para usar, por lo que puedes utilizar sus aserciones directamente en tus pruebas sin configuración adicional.
- **Estilos de aserción comunes en Chai:**
  - **Estilo Should:**  
    Utiliza un lenguaje encadenable para construir aserciones que se leen como lenguaje natural.
    ```javascript
    cy.get('[data-testid="login-button"]').should('be.visible');
    ```
  - **Estilo Expect:**  
    Utiliza llamadas de función para afirmar expectativas.
    ```javascript
    cy.get('[data-testid="login-button"]').then(($btn) => {
      expect($btn).to.be.visible;
    });
    ```
  - **Estilo Assert:**  
    Utiliza funciones de aserción clásicas.
    ```javascript
    cy.get('[data-testid="login-button"]').then(($btn) => {
      assert.isTrue($btn.is(':visible'), 'El botón de inicio de sesión es visible');
    });
    ```

    #### Aserciones más usadas en Cypress

    **1. `should('exist')`**
    Verifica que el elemento exista en el DOM.

    ```javascript
    cy.get('[data-testid="login-button"]').should('exist');
    ```
    **Cuándo usarlo:** Quieres comprobar que un elemento ha sido renderizado.
    ---

    **2. `should('be.visible')`**
    Verifica que el elemento sea **visible** para el usuario.

    ```javascript
    cy.get('[data-testid="modal"]').should('be.visible');
    ```
    **Cuándo usarlo:** Quieres asegurarte de que el usuario puede ver/interactuar con el elemento.

    ---
    **3. `should('not.exist')`** / `should('not.be.visible')`  
    Opuesto a lo anterior; ideal para probar la **eliminación u ocultación** de elementos.

    ```javascript
    cy.get('[data-testid="loading-spinner"]').should('not.exist');
    ```

    ---
    **4. `should('have.text', 'some text')`**
    Verifica el contenido de texto **exacto** dentro de un elemento.

    ```javascript
    cy.get('[data-testid="welcome-message"]').should('have.text', '¡Bienvenido de nuevo!');
    ```

    **Alternativa:**  
    Usa `contains()` para coincidencia parcial, o `.should('include.text', 'Bienvenido')`.

    ---
    **5. `should('include.text', 'partial text')`**
    Verifica que el elemento contenga una subcadena (no se requiere coincidencia exacta).

    ```javascript
    cy.get('.alert').should('include.text', 'Error');
    ```
    
    ---
    **6. `should('have.value', 'text')`**
    Verifica el valor de los campos de entrada.

    ```javascript
    cy.get('[data-testid="email-input"]').should('have.value', 'user@example.com');
    ```

    **Cuándo usarlo:** Quieres confirmar que un campo fue llenado correctamente.

    ---
    **7. `should('be.checked')` / `should('not.be.checked')`**
    Usado para casillas de verificación o botones de opción.

    ```javascript
    cy.get('#terms-checkbox').should('be.checked');
    ```

    ---
    **8. `should('be.disabled')` / `should('be.enabled')`**
    Asegura que los elementos de formulario estén activos/inactivos según lo esperado.

    ```javascript
    cy.get('[data-testid="submit-btn"]').should('be.disabled');
    ```

    ---
    **9. `should('have.class', 'class-name')`**
    Afirma que el elemento tiene una clase específica aplicada.

    ```javascript
    cy.get('button').should('have.class', 'active');
    ```

    ---
    **10. `should('have.attr', 'attribute', 'value')`**
    Afirma que un elemento tiene un atributo específico con un valor.

    ```javascript
    cy.get('a').should('have.attr', 'href', '/dashboard');
    ```

    También es útil para verificar la presencia de atributos `data-*` o `target`, `src`, `disabled`, etc.

    ----
    **11. `should('have.length', number)`**
    Verifica cuántos elementos devolvió `cy.get()`.

    ```javascript
    cy.get('.list-item').should('have.length', 5);
    ```

    **Cuándo usarlo:** Quieres comprobar si una lista contiene el número esperado de elementos.

    ---
    **12. `should('match', /regex/)`**
    Afirma que la cadena coincide con una expresión regular.

    ```javascript
    cy.get('[data-testid="email"]').invoke('text').should('match', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    ```


    Usa `expect()` dentro de un bloque `.then()` cuando trabajes con lógica o datos personalizados:

    ```javascript
    cy.get('#price').then(($el) => {
      const price = parseFloat($el.text().replace('€', ''));
      expect(price).to.be.lessThan(100);
    });
    ```


- **Estilo Should:**  
  - **Pros:**  
    - Muy legible y expresivo (por ejemplo, `should('be.visible')`).
    - Permite encadenar múltiples aserciones en una sintaxis natural y fluida.
    - Reintenta automáticamente las aserciones cuando se usa con comandos de Cypress.
  - **Contras:**  
    - Requiere extender prototipos de objetos, lo que puede no ser preferido en todos los entornos.
- **Estilo Expect:**  
  - **Pros:**  
    - Sintaxis clara basada en funciones que muchos desarrolladores consideran familiar.
    - No requiere extender prototipos.
  - **Contras:**  
    - Cuando se usa con comandos de Cypress, no reintenta automáticamente, ya que normalmente se usa dentro de un callback `.then()`.
- **Estilo Assert:**  
  - **Pros:**  
    - Más tradicional y directo, similar a aserciones en otros lenguajes.
  - **Contras:**  
    - Puede ser menos legible y requerir más código boilerplate.


#### **C. Métodos comunes de aserción en Cypress**
- **Visibilidad y existencia:**
  - `should('be.visible')`, `should('exist')`, `should('not.exist')`
- **Validación de contenido:**
  - `should('have.text', 'expected text')`
  - `should('contain', 'partial text')`
- **Comprobación de atributos:**
  - `should('have.attr', 'attributeName', 'value')`
- **Comprobación de CSS y estilos:**
  - `should('have.css', 'property', 'value')`
- **Comprobación de estado:**
  - `should('be.disabled')`, `should('be.enabled')`, `should('be.checked')`

#### **D. Aserciones avanzadas**
- **Múltiples aserciones:**
  - Encadena múltiples comandos `should()` para validaciones completas.
  - Ejemplo: Comprobar que un elemento es visible y contiene un texto específico.
- **Aserciones condicionales:**
  - Usa `.then()` para realizar aserciones basadas en contenido o condiciones dinámicas.
- **Aserciones personalizadas:**
  - Define lógica de aserción personalizada cuando las integradas no son suficientes.


##### **Múltiples aserciones y encadenamiento de aserciones**

**Encadenar aserciones con `should()`:**
- **Ejemplo:**
  ```javascript
  cy.get('[data-testid="username-input"]')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'Ingresa tu nombre de usuario')
    .and(($input) => {
      // Comprobación personalizada para asegurar que el input esté vacío por defecto
      expect($input.val()).to.equal('');
    });
  ```
- **Explicación:**  
  La cadena anterior:
  - Verifica que el elemento sea visible.
  - Comprueba que el atributo placeholder tenga el valor esperado.
  - Realiza una aserción personalizada para asegurar que el valor del input esté vacío.
  
**Múltiples aserciones en un solo comando:**
- Usar múltiples llamadas a `should()` o encadenar con `and()` te permite confirmar varias condiciones sobre el mismo elemento sin volver a consultar el DOM, lo cual es eficiente y mejora la legibilidad.


### **Por qué usar `should()` en lugar de `expect()` en Cypress**

- **Mecanismo de reintento automático:**
  - **`should()`** está integrado con la capacidad de reintento de Cypress. Si una aserción falla inicialmente debido a un estado temporal (como un elemento que se carga de forma asíncrona), Cypress volverá a intentar la aserción automáticamente hasta que pase o se alcance el tiempo de espera.
  - **`expect()`** se usa dentro de bloques `.then()`, por lo que se ejecuta solo una vez. Si el elemento no está en el estado esperado en ese momento, la prueba falla inmediatamente.
  
- **Encadenabilidad:**
  - `should()` permite encadenar múltiples aserciones sobre el mismo sujeto, reduciendo la necesidad de consultas repetidas al DOM y haciendo las pruebas más concisas.
  
- **Legibilidad:**
  - El estilo fluido y en lenguaje natural de `should()` hace que las aserciones de prueba sean fáciles de leer y comprender de un vistazo.

- **Consistencia con los comandos de Cypress:**
  - Usar `should()` directamente sobre los comandos de Cypress se integra sin problemas con la cola de comandos de Cypress, asegurando que las aserciones se reintenten junto con la ejecución de los comandos.

**Comparación de ejemplo:**

Usando **`should()`** (preferido):
```javascript
cy.get('[data-testid="submit-button"]')
  .should('be.visible')
  .and('not.be.disabled');
```

Usando **`expect()`** (menos ideal en el contexto de Cypress):
```javascript
cy.get('[data-testid="submit-button"]').then(($btn) => {
  expect($btn).to.be.visible;
  expect($btn).to.not.be.disabled;
});
```
- En el segundo ejemplo, si el botón no es visible inmediatamente, la prueba falla sin reintentos.


#### **E. Mejores prácticas para aserciones y validaciones**
- **Aserciones claras y descriptivas:**
  - Escribe aserciones que expliquen claramente lo que están comprobando.
  - Usa mensajes personalizados o registros adicionales si es necesario.
  - Escribe aserciones que indiquen claramente lo que esperas que ocurra.  
     _Ejemplo:_  
     ```javascript
     cy.get('[data-testid="error-message"]')
       .should('be.visible')
       .and('contain', 'Credenciales no válidas');
     ```
   - Evita aserciones ambiguas o demasiado complejas que mezclen múltiples comprobaciones sin una separación clara.

- **Pruebas granulares:**
  - Prueba una condición por aserción cuando sea posible. Esto ayuda a identificar fallos con precisión.
  - Prefiere probar una condición por aserción cuando sea posible para aislar problemas.  
     Sin embargo, cuando las condiciones están relacionadas (por ejemplo, visibilidad y contenido de un elemento), encadenar con `should()` es apropiado.
- **Evita aserciones superpuestas:**
  - Asegúrate de que las aserciones estén separadas lógicamente para evitar confusión al depurar fallos.
  - No afirmes la misma condición de múltiples formas dentro de un solo paso de prueba; en su lugar, asegúrate de que cada aserción tenga un propósito único.

- **Aprovecha la capacidad de reintento de Cypress:**
  - Cypress reintenta automáticamente las aserciones hasta que pasan o agotan el tiempo, así que escribe aserciones que sean resilientes a problemas de temporización.
- **Usa un encadenamiento adecuado:**
  - Encadena aserciones para reducir la redundancia de código y mejorar la legibilidad.

---

### **2. Ejemplos de código**

#### **A. Aserciones básicas usando `should`**

```javascript
// Verificar que el botón de inicio de sesión sea visible y esté habilitado
cy.get('[data-testid="login-button"]')
  .should('be.visible')
  .and('not.be.disabled');
```

#### **B. Afirmar el contenido de texto**

```javascript
// Comprobar si un mensaje de éxito contiene el texto esperado
cy.get('[data-testid="success-message"]')
  .should('be.visible')
  .and('contain', 'Inicio de sesión exitoso');
```

#### **C. Comprobación de atributos de elementos**

```javascript
// Verificar que un elemento de imagen tenga el atributo src correcto
cy.get('[data-testid="hero-image"]')
  .should('have.attr', 'src', 'images/hero.jpg');
```

#### **D. Uso de `expect` para aserciones**

```javascript
// Usando expect para aserciones basadas en variables
cy.get('[data-testid="user-count"]').then(($count) => {
  const countText = $count.text();
  expect(parseInt(countText)).to.be.greaterThan(0);
});
```

#### **E. Encadenar múltiples aserciones**

```javascript
// Encadenar aserciones para comprobar múltiples condiciones en un input de formulario
cy.get('[data-testid="username-input"]')
  .should('be.visible')
  .and('have.attr', 'placeholder', 'Ingresa tu nombre de usuario')
  .and(($input) => {
    // Aserción personalizada para comprobar que el input no esté vacío después de escribir
    expect($input.val()).to.not.be.empty;
  });
```

#### **F. Aserciones condicionales con `.then()`**

```javascript
// Usar .then() para afirmar condicionalmente basado en contenido dinámico
cy.get('[data-testid="error-message"]').then(($el) => {
  if ($el.is(':visible')) {
    expect($el).to.contain('Credenciales no válidas');
  } else {
    cy.log('El mensaje de error no es visible, es posible que la prueba haya pasado.');
  }
});
```

---

### **3. Preguntas potenciales de los estudiantes**

1. **¿Cuál es la diferencia entre `should` y `expect` en Cypress?**
   - **Respuesta:**  
     `should()` es un comando encadenable que reintenta automáticamente hasta que la aserción pase, mientras que `expect()` se usa para aserciones de una sola vez dentro de un bloque `.then()`.

2. **¿Cómo maneja Cypress las aserciones si los elementos tardan en cargarse?**
   - **Respuesta:**  
     Cypress reintenta automáticamente las aserciones hasta que pasen o hasta que se alcance el tiempo de espera predeterminado, manejando de forma adecuada los elementos asíncronos.

3. **¿Puedo escribir aserciones personalizadas en Cypress?**
   - **Respuesta:**  
     Sí, puedes escribir aserciones personalizadas dentro de bloques `.then()` para manejar lógica de validación compleja.

4. **¿Por qué debo evitar aserciones superpuestas?**
   - **Respuesta:**  
     Las aserciones superpuestas pueden dificultar identificar qué condición falló. Mantenerlas separadas facilita la depuración y el mantenimiento de las pruebas.

5. **¿Qué ocurre si una aserción falla?**
   - **Respuesta:**  
     Cypress detendrá la ejecución de la prueba y registrará un error, proporcionando detalles sobre el fallo, incluidas capturas y registros para depuración.

---

### **4. Recomendaciones adicionales**

- **Depuración interactiva:**
  - Anima a los estudiantes a usar el Test Runner interactivo de Cypress para observar cómo se reintentan las aserciones.
- **Ejercicios en grupo:**
  - Forma parejas para que escriban casos de prueba que incluyan múltiples aserciones y discutan la lógica detrás de cada una.
- **Revisión de documentación:**
  - Que los estudiantes exploren la [Documentación de Aserciones de Cypress](https://docs.cypress.io/guides/references/assertions) para profundizar su aprendizaje.