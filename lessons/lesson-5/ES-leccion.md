## **Lección 5: Introducción al DOM: propiedades, métodos y el objeto global `window`**

### **1. Esquema de contenidos**

#### **A. Introducción al DOM (Modelo de Objetos del Documento)**
- **¿Qué es el DOM?**
  - Definición y propósito.
  - Representación de la página web como una estructura en árbol.
- **Acceso a elementos del DOM:**
  - `document.getElementById()`.
  - `document.querySelector()` y `document.querySelectorAll()`.
- **Manipulación de elementos del DOM:**
  - Cambiar contenido (`innerText`, `innerHTML`).
  - Modificar atributos (`setAttribute()`, `getAttribute()`).
  - Agregar y eliminar clases (`classList.add()`, `classList.remove()`).
- **Gestión de eventos:**
  - Agregar escuchadores de eventos (`addEventListener()`).
  - Eventos comunes (click, input, submit).


##### ¿Qué es el DOM?

**Definición:**
El Modelo de Objetos del Documento (DOM) es una interfaz de programación que representa la estructura de un documento HTML o XML como un árbol de objetos. Cada elemento, atributo y fragmento de texto se convierte en un objeto, lo que permite a los desarrolladores manipular programáticamente la estructura, el estilo y el contenido de la página.

**Características clave:**
- **Estructura en forma de árbol:** El documento se representa como un árbol jerárquico de nodos.
- **Interfaz de scripting:** JavaScript puede interactuar con los nodos del DOM para cambiar lo que se muestra en el navegador.
- **Actualizaciones dinámicas:** Modificar elementos, atributos y contenido al vuelo sin recargar toda la página.

**Casos de uso en automatización de pruebas:**
- Seleccionar elementos para verificar su presencia, atributos o texto.
- Simular acciones del usuario (clics, tecleo) en elementos del DOM.
- Afirmar que los elementos aparecen o desaparecen según lo esperado tras ciertas acciones.


##### Gestión de eventos en el DOM

**Definición:**
La gestión de eventos se refiere al proceso de detectar y responder a interacciones del usuario o eventos impulsados por el navegador en la página web. Los eventos pueden incluir clics, pulsaciones de teclas, envíos de formularios, movimientos del ratón u otras acciones del usuario.

**Características clave:**
- **Escuchadores de eventos:** Funciones que se ejecutan en respuesta a eventos específicos.
- **Comportamiento asíncrono:** Los eventos ocurren de forma asíncrona, disparados por la interacción del usuario o acciones temporizadas.
- **Control sobre la interacción del usuario:** Permite a desarrolladores (y testers) simular y verificar cómo responde la aplicación a la entrada del usuario.

**Casos de uso en automatización de pruebas:**
- Probar interacciones de la UI, asegurando que al hacer clic en un botón se dispare el comportamiento correcto.
- Validar la lógica de envío de formularios o el manejo de errores.
- Confirmar que los eventos de teclado resultan en los cambios esperados en pantalla.

#### **B. Propiedades y métodos del DOM**

**¿Qué son las propiedades de los elementos del DOM?**  
Cuando una página web se carga en un navegador, este crea un Modelo de Objetos del Documento (DOM) que representa la estructura de la página como un árbol de objetos. Cada elemento HTML en la página se convierte en un objeto de elemento del DOM que tiene propiedades y métodos a los que puedes acceder y manipular usando JavaScript.

- **Propiedades de los elementos del DOM:**
  - `innerText`, `textContent`, `innerHTML`: Acceder o modificar el texto y el contenido HTML de un elemento.
  - `value`: Para elementos de formulario como input, acceder o establecer el valor introducido por el usuario.
  - `style`: Acceder a propiedades CSS en línea.
  - `classList`: Agregar, eliminar o alternar clases CSS sin modificar directamente cadenas HTML.
- **Métodos comunes del DOM:**
  - **Métodos de selección:**
    - `document.getElementById('id')`: Selecciona un elemento por ID.
    - `document.querySelector('selector')`: Selecciona el primer elemento que coincide con un selector CSS.
    - `document.querySelectorAll('selector')`: Selecciona todos los elementos que coinciden con un selector CSS, devolviendo un NodeList.
  - **Atributos personalizados:**
    - `data-*`: Los atributos son personalizados y permiten almacenar información adicional sobre un elemento sin afectar su presentación o comportamiento por defecto. Son especialmente útiles en JavaScript como forma de asignar contexto o configuración adicional a los elementos.
    - Los atributos de datos son increíblemente potentes en automatización de pruebas. Al asignar atributos data-cy, data-test o data-testid, creas selectores estables y resistentes a cambios en la UI. Estos atributos no son visibles para los usuarios y pueden cambiarse sin afectar el diseño o estilo de la UI. Los scripts de prueba pueden seleccionar elementos de forma fiable usando, por ejemplo, cy.get('[data-test="login-button"]') en Cypress.
  
  - **Métodos de manipulación:**
    - `element.appendChild(node)`: Agrega un nuevo nodo hijo a un elemento.
    - `element.removeChild(node)`: Elimina un nodo hijo.
    - `element.setAttribute('name', 'value')`: Establece o cambia un atributo en un elemento.
    - `element.removeAttribute('name')`: Elimina un atributo.
  - **Gestión de eventos (mención breve):**
    - `element.addEventListener('event', callback)`: Adjunta escuchadores de eventos a elementos del DOM.
  - **Uso de estructuras de control y de datos:**
    - Bucles y condiciones para actualizar dinámicamente elementos del DOM (p. ej., iterar sobre un array de datos para crear una lista de elementos).
    - Objetos para almacenar selectores o referencias del DOM para su reutilización.
    - Se puede obtener data en formato JSON para rellenar elementos, actualizando el DOM al vuelo.


1. **`innerText` / `textContent`:**
   - **Propósito:** Acceder o cambiar el contenido de texto de un elemento.
   - **Ejemplo:**
     ```javascript
     const heading = document.getElementById('main-title');
     console.log(heading.innerText); // Lee el texto mostrado del encabezado
     heading.innerText = "¡Bienvenido al panel!";
     ```
   - **Diferencia:** `innerText` respeta el estilo y elementos ocultos; `textContent` muestra todo el texto, incluidos elementos ocultos y saltos de línea.

2. **`innerHTML`:**
   - **Propósito:** Acceder o cambiar el marcado HTML dentro de un elemento.
   - **Ejemplo:**
     ```javascript
     const container = document.querySelector('#content');
     container.innerHTML = "<p>¡Nuevo párrafo!</p>"; // Inyecta código HTML
     ```
   - **Precaución:** Usar `innerHTML` con datos no confiables puede exponer tu página a riesgos de seguridad como XSS (Cross-Site Scripting).

3. **`value`:**
   - **Propósito:** Para elementos de formulario (inputs, textareas), `value` obtiene o establece el valor introducido por el usuario.
   - **Ejemplo:**
     ```javascript
     const input = document.getElementById('username');
     input.value = "testUser";
     ```

4. **`classList`:**
   - **Propósito:** Gestionar las clases CSS del elemento sin manipular manualmente la cadena del atributo `class`.
   - **Ejemplo:**
     ```javascript
     const button = document.querySelector('.btn');
     button.classList.add('active');
     button.classList.remove('disabled');
     button.classList.toggle('hidden');
     ```

5. **`style`:**
   - **Propósito:** Acceder o cambiar estilos CSS en línea de un elemento.
   - **Ejemplo:**
     ```javascript
     const box = document.querySelector('.box');
     box.style.backgroundColor = "blue";
     box.style.color = "white";
     ```
   - **Nota:** Generalmente es mejor manipular clases y usar CSS externo en lugar de establecer estilos en línea, por mantenibilidad.

##### Acceso a elementos del DOM

**Selección de elementos:**
```html
<!-- index.html -->
<div id="container">
  <h1 class="title">¡Hola, mundo!</h1>
  <button id="clickMeBtn">Haz clic en mí</button>
</div>
```

```javascript
// JavaScript
const container = document.getElementById("container");
const title = document.querySelector(".title");
const button = document.querySelector("#clickMeBtn");
```

**Buenas prácticas:**
- Usa `document.getElementById()` al seleccionar por ID por rendimiento.
- Usa `document.querySelector()` y `document.querySelectorAll()` para selectores complejos o flexibles.
- Mantén IDs y nombres de clase descriptivos para facilitar la comprensión de los selectores.

##### Manipulación de elementos del DOM

**Cambiar contenido:**
```javascript
title.innerText = "¡Bienvenido a la página de prueba!";
```

**Modificar atributos:**
```javascript
button.setAttribute("disabled", "true");
console.log(button.getAttribute("id")); // "clickMeBtn"
```

**Modificar clases:**
```javascript
title.classList.add("highlight");
title.classList.remove("old-class");
```

**Buenas prácticas:**
- Minimiza la manipulación directa del DOM almacenando en caché referencias a elementos.
- Usa clases y CSS para cambios de estilo en lugar de estilos en línea.
- Agrupa u organiza las operaciones del DOM para reducir la sobrecarga de rendimiento.

##### Gestión de eventos

**Agregar escuchadores de eventos:**
```javascript
button.addEventListener("click", function () {
  console.log("¡Se hizo clic en el botón!");
  container.innerHTML += "<p>¡Botón pulsado!</p>";
});
```

**Buenas prácticas:**
- Usa gestión de eventos no intrusiva (es decir, `addEventListener`) en lugar de atributos `onclick` en línea.
- Nombra las funciones manejadoras de eventos de forma descriptiva:
  
```javascript
function handleButtonClick(event) {
  console.log("Botón clicado:", event.target);
}

button.addEventListener("click", handleButtonClick);
```

- Elimina los escuchadores de eventos cuando ya no sean necesarios para evitar fugas de memoria:
  
```javascript
button.removeEventListener("click", handleButtonClick);
```


#### **B. El objeto global `window`**
**Definición:**  
En los navegadores web, el objeto `window` es el objeto global que representa la ventana del navegador que contiene tu página web. Todas las variables, funciones y objetos globales se convierten en propiedades de `window`.

- **¿Qué es el objeto `window`?**
  - El objeto `window` es el objeto global en el entorno del navegador.
  - Representa la ventana del navegador y proporciona métodos y propiedades para controlarla.
- **Propiedades y métodos clave de `window`:**
  - **Propiedades:**
    - `window.document`: Se refiere al DOM de la página actual.
    - `window.location`: Información sobre la URL actual y navegación.
    - `window.history`: Acceso al historial de sesión del navegador.
    - `window.localStorage` y `window.sessionStorage`: Almacenar y recuperar datos en el navegador.
  - **Métodos:**
    - `window.alert('message')`: Muestra un cuadro de alerta.
    - `window.confirm('message')`: Muestra un cuadro de confirmación, devolviendo true o false.
    - `window.setTimeout(callback, milliseconds)`: Retrasa la ejecución del código.
    - `window.setInterval(callback, milliseconds)`: Ejecuta código periódicamente.
  - **Ámbito global implícito:**
    - Las variables declaradas al nivel superior (sin `let`, `const` o `var` en código antiguo) pueden convertirse en propiedades de `window`, una práctica que debe evitarse.
    - Entender el alcance (de lecciones anteriores) ayuda a evitar la contaminación del espacio de nombres global.


**Puntos clave sobre `window`:**  
- **Ámbito global:** Las variables declaradas globalmente (sin `let`, `const` o `var` en código antiguo) podrían convertirse en propiedades de `window`. Las mejores prácticas modernas desaconsejan depender de este comportamiento.
- **Acceso al documento y a APIs del navegador:**  
  - `window.document` te da el DOM de la página actual.  
  - `window.location` proporciona info y métodos para la URL actual.  
  - `window.history` permite navegar en el historial de sesión del navegador.  
  - `window.alert()`, `window.confirm()`, `window.prompt()` muestran diálogos.  
  - `window.setTimeout()` y `window.setInterval()` programan la ejecución de código.

**Ejemplo:**
```javascript
console.log(window.location.href); // Registra la URL de la página actual
window.alert("¡Bienvenido al sitio!");
```

**Mejor práctica:**  
Evita adjuntar datos innecesarios a `window`. Mantén las variables con ámbito de funciones o módulos para prevenir la contaminación del espacio de nombres global.

#### **D. Mejores prácticas para trabajar con el DOM y `window`**
- **Mantenibilidad del código:**
  - Almacena referencias a elementos de acceso frecuente en variables.
  - Usa nombres de variables descriptivos para referencias del DOM y evita “cadenas mágicas”.
- **Consideraciones de rendimiento:**
  - Minimiza manipulaciones innecesarias del DOM: agrupa cambios o usa técnicas para limitar reflows y repaints.
  - Reutiliza arrays, objetos y datos JSON para generar o actualizar el DOM en lugar de codificar elementos de forma rígida.
- **Seguridad y validación de datos:**
  - Evita establecer `innerHTML` con datos no confiables (riesgo de XSS).
  - Valida JSON y la entrada del usuario antes de inyectarla en el DOM.
- **Uso de estructuras de control:**
  - Usa bucles y condiciones para actualizar dinámicamente el DOM según acciones del usuario o datos obtenidos de APIs.
  - Por ejemplo, si tienes un array JSON de objetos de producto, puedes iterarlos para crear elementos del DOM para cada producto.

#### **E. Ejemplos prácticos**

1. **Acceder y actualizar el contenido de un elemento:**
   ```javascript
   const title = document.getElementById('page-title');
   title.innerText = "¡Bienvenido al panel!";
   ```

2. **Modificar atributos y clases de un elemento:**
   ```javascript
   const loginButton = document.querySelector('#login-btn');
   loginButton.setAttribute('disabled', 'true');

   const mainHeader = document.querySelector('h1');
   mainHeader.classList.add('highlighted');
   mainHeader.classList.remove('old-class');
   ```

3. **Crear y adjuntar elementos dinámicamente:**
   ```javascript
   const userList = document.getElementById('user-list');
   const users = [
     { name: "Alice", role: "administrador" },
     { name: "Bob", role: "usuario" },
     { name: "Charlie", role: "moderador" }
   ];

   users.forEach(user => {
     const li = document.createElement('li');
     li.innerText = `${user.name} (${user.role})`;
     userList.appendChild(li);
   });
   ```

4. **Obtener datos JSON y actualizar el DOM:**
   
**¿Qué es `fetch()`?**  
`fetch()` es una función integrada de JavaScript (parte de la Fetch API) que te permite hacer solicitudes de red, como recuperar datos desde una URL. Devuelve una Promesa, lo que facilita manejar operaciones asíncronas sin bloquear el hilo principal.

   ```javascript
   fetch('users.json')
     .then(response => response.json())
     .then(data => {
       const userContainer = document.querySelector('#user-container');
       data.forEach(user => {
         const div = document.createElement('div');
         div.innerText = `${user.name} - ${user.email}`;
         userContainer.appendChild(div);
       });
     });
   ```


  5. **setTimeout**
  **¿Qué es `setTimeout()`?**  
`setTimeout()` es una función proporcionada por el navegador (a través de `window`) que permite ejecutar una función específica después de un retraso establecido (en milisegundos).

**Sintaxis:**
```javascript
window.setTimeout(() => {
  console.log("Este mensaje aparece después de 2 segundos");
}, 2000);
```

**Parámetros:**
1. **Función de devolución de llamada (Callback):** La función que quieres ejecutar después del retraso.
2. **Retraso (milisegundos):** El tiempo a esperar antes de llamar al callback. 1000 ms = 1 segundo.

**Comportamiento:**
- El callback no se ejecuta hasta después del retraso especificado.
- El código no se bloquea; programa el callback y continúa ejecutando el resto del script. Cuando el tiempo expira, se ejecuta la función callback.

**Casos de uso en automatización de pruebas:**
- **Simular tiempos de espera del usuario:** Si quieres probar cómo se comporta la UI después de un retraso (como que un spinner de carga desaparezca tras unos segundos).
- **Programar verificaciones asíncronas:** Ejecutar un fragmento de código tras un retraso para verificar si se cumple alguna condición en el DOM.

**Detener el temporizador:**
- Puedes asignar `setTimeout()` a una variable y usar `clearTimeout()` para cancelarlo si es necesario.
  ```javascript
  const timeoutId = setTimeout(() => {
    console.log("¿Aparecerá este mensaje?");
  }, 5000);

  // Cancelar el temporizador antes de que se dispare
  clearTimeout(timeoutId);
  ```
   
**Importancia de JSON en la automatización de pruebas:**  
JSON (JavaScript Object Notation) es un formato de datos ligero que es fácil de leer y escribir tanto para humanos como para máquinas. Es independiente del lenguaje y se usa ampliamente para la comunicación entre clientes y servidores. En automatización de pruebas:

1. **Fixtures y datos de prueba:**  
   Puedes almacenar entradas de prueba y resultados esperados en archivos JSON. Esto separa los datos de la lógica de prueba, facilitando la actualización, el mantenimiento y la reutilización de escenarios.

2. **Pruebas de API:**  
   Al probar aplicaciones que se comunican con backends (APIs), las respuestas suelen estar en JSON. Analizar respuestas JSON y afirmar que los datos devueltos coinciden con las expectativas es sencillo.

3. **Simulación de respuestas (Mocking):**  
   En pruebas automatizadas, puedes servir datos JSON predefinidos como respuestas simuladas. Esto garantiza pruebas deterministas sin depender de servicios externos.

**Análisis y manejo de JSON:**
- **Método `response.json()`:**  
  Tras llamar a `fetch()`, a menudo conviertes la respuesta bruta a JSON:
  ```javascript
  fetch('users.json')
    .then(response => response.json()) // analizar JSON desde la respuesta
    .then(data => {
      console.log(data);
      // data ahora es un objeto/array de JavaScript que puedes iterar, afirmar o manipular
    });
  ```

#### ¿Qué es `then` en la función `fetch()`?

**Explicación:**
`then()` es un método disponible en las Promesas. Cuando llamas a `fetch()`, devuelve una Promesa. El método `then()` define lo que debe suceder cuando esa Promesa se resuelve (es decir, cuando la operación asíncrona se completa con éxito).

- **Primer `.then()`:** A menudo se usa para manejar la respuesta bruta de `fetch()` y convertirla a un formato utilizable (como JSON).
- **Segundo `.then()`:** Una vez que tienes los datos analizados, puedes encadenar otro `then()` para procesar esos datos (p. ej., actualizar el DOM, ejecutar aserciones, etc.).

**Ejemplo:**
```javascript
fetch('users.json')
  .then(response => response.json())    // Convierte el cuerpo de la respuesta a JSON
  .then(data => {
    console.log(data);                  // Usa los datos analizados aquí
  })
  .catch(error => console.error(error));
```

**Punto clave:**  
- **`then()`** es cómo encadenas operaciones en un flujo asíncrono. Cada `then()` devuelve una nueva Promesa, permitiéndote continuar la cadena.
- **`catch()`** se usa para manejar errores si alguna parte de la cadena falla.


5. **Uso del objeto `window`:**
   ```javascript
   console.log(window.location.href); // URL de la página actual
   window.setTimeout(() => {
     alert("¡Se acabó el tiempo!");
   }, 2000);
   ```

#### **F. Conexión con lecciones anteriores**
- **Arrays y objetos:**
  - Usa arrays para almacenar listas de datos y recórrerlos para crear elementos del DOM dinámicamente.
  - Usa objetos para guardar selectores o referencias del DOM y facilitar la manipulación.
- **JSON e interacciones con APIs:**
  - Obtén datos JSON y utilízalos para rellenar elementos en la página.
- **Estructuras de control:**
  - Usa sentencias `if/else`, bucles y condiciones lógicas para decidir cómo y cuándo actualizar el DOM, manejar ciertas entradas del usuario o modificar propiedades de `window`.
- **Combinando conceptos:**
  - Todo lo aprendido—variables, funciones, arrays, objetos, JSON, manipulación del DOM, gestión de eventos—ahora puede integrarse para construir experiencias web interactivas y dinámicas.

---

### **2. Actividades prácticas: ejercicios y sugerencias de funcionalidad web**

#### **A. Ejercicio: interactuando con el DOM en pruebas**
- **Ejercicio:**
  - Crea una página HTML con varios elementos como botones, campos de entrada y contenedores.
  - Escribe pruebas de Cypress que:
    - Seleccionen e interactúen con elementos del DOM usando selectores.
    - Aserten la presencia y el contenido de elementos.
    - Simulen interacciones del usuario como clics y envíos de formularios.
  - **Ejemplo:**
    ```html
    <!-- index.html -->
    <!DOCTYPE html>
    <html>
    <head>
      <title>Prueba de interacción con el DOM</title>
    </head>
    <body>
      <h1 id="title">Bienvenido a la página de prueba</h1>
      <button id="changeTitle">Cambiar título</button>
      <input type="text" id="username" placeholder="Introduce el nombre de usuario" />
      <button id="submitForm">Enviar</button>
      <div id="output"></div>

      <script>
        document.getElementById('changeTitle').addEventListener('click', () => {
          document.getElementById('title').innerText = '¡Título cambiado!';
        });

        document.getElementById('submitForm').addEventListener('click', () => {
          const username = document.getElementById('username').value;
          document.getElementById('output').innerText = `¡Hola, ${username}!`;
        });
      </script>
    </body>
    </html>
    ```

    ```javascript
    // Prueba de Cypress
    describe('Prueba de interacción con el DOM', () => {
      beforeEach(() => {
        cy.visit('/index.html');
      });

      it('Cambia el título cuando se hace clic en el botón', () => {
        cy.get('#changeTitle').click();
        cy.get('#title').should('have.text', '¡Título cambiado!');
      });

      it('Envía el formulario y muestra el saludo', () => {
        cy.get('#username').type('TestUser');
        cy.get('#submitForm').click();
        cy.get('#output').should('have.text', '¡Hola, TestUser!');
      });
    });
    ```

- **Sugerencia de funcionalidad web:**
  - Desarrolla una página web dinámica donde los usuarios puedan:
    - Cambiar el título de la página al hacer clic en un botón.
    - Enviar un formulario con su nombre de usuario y ver un saludo personalizado.
  - Escribe pruebas de Cypress para automatizar y verificar estas interacciones.


#### **B. Ejercicio: actualización de contenido del DOM**
- **Ejercicio:**
  - Crea una página sencilla con un título, un párrafo y un botón.
  - Escribe código JavaScript para:
    - Cambiar el texto del título usando `innerText` cuando la página cargue.
    - Actualizar el texto del párrafo cuando se haga clic en el botón.
  - **Sugerencia de funcionalidad web:**
    - Una página de “Bienvenida” que muestre un mensaje genérico inicialmente y personalice el saludo cuando el usuario haga clic en un botón.

#### **C. Ejercicio: creación dinámica de listas desde JSON**
- **Ejercicio:**
  - Crea un archivo JSON (`products.json`) con un array de objetos de producto (`name`, `price`, `category`).
  - Usa `fetch()` para cargar los datos JSON.
  - Crea dinámicamente una lista de productos en la página web, mostrando el nombre y el precio de cada producto.
  - **Sugerencia de funcionalidad web:**
    - Una página de listado de productos que obtiene datos y los renderiza en una tabla o lista, actualizándose cuando cambian los datos.

#### **D. Ejercicio: uso de métodos de `window`**
- **Ejercicio:**
  - Muestra una alerta tras 2 segundos usando `window.setTimeout()`.
  - Registra la URL de la página actual usando `window.location.href`.
  - Implementa un botón “Recargar” que use `window.location.reload()` para refrescar la página.
  - **Sugerencia de funcionalidad web:**
    - Una página con una notificación temporizada y un botón para recargar, demostrando manipulaciones con `window`.

---

### **3. Preguntas potenciales de los estudiantes**

1. **¿Cuál es la diferencia entre `document.getElementById()` y `document.querySelector()`?**
   - **Respuesta:**  
     `document.getElementById()` selecciona un elemento por su ID único y generalmente es más rápido. `document.querySelector()` permite seleccionar elementos usando cualquier selector CSS, ofreciendo más flexibilidad.

2. **¿Cómo puedo modificar el contenido de un elemento del DOM usando JavaScript?**
   - **Respuesta:**  
     Puedes modificar el contenido usando propiedades como `innerText`, `innerHTML` o `textContent`. Por ejemplo:
     ```javascript
     document.getElementById('title').innerText = 'Nuevo título';
     ```

3. **¿Cuándo debo usar `innerText` vs. `innerHTML`?**  
   **Respuesta:**  
   - `innerText` establece u obtiene el texto legible por humanos dentro de un elemento, ignorando etiquetas HTML.
   - `innerHTML` te permite agregar o modificar HTML directamente. Úsalo con precaución para evitar riesgos de seguridad como XSS.

4. **¿Cómo evito la contaminación de variables globales con el objeto `window`?**  
   **Respuesta:**  
   - Declara siempre variables con `let` o `const` dentro de funciones o bloques.
   - Usa módulos o closures para mantener las variables con ámbito local.
   - No dependas de adjuntar datos a `window`; almacénalos en objetos o módulos en su lugar.

5. **¿Cuál es la diferencia entre `document.getElementById()` y `document.querySelector()`?**  
   **Respuesta:**  
   - `getElementById()` selecciona un elemento por su ID único y devuelve un único elemento.
   - `querySelector()` usa selectores CSS, puede seleccionar cualquier elemento que coincida con el selector y devuelve la primera coincidencia.
   - `querySelector()` es más flexible, pero `getElementById()` es más rápido para una búsqueda por ID.

6. **¿Puedo iterar sobre colecciones de elementos del DOM como si fueran arrays?**  
   **Respuesta:**  
   - `querySelectorAll()` devuelve un NodeList, que se puede iterar usando `forEach()`.
   - También puedes convertir NodeLists o HTMLCollections a arrays usando `Array.from()` y luego usar métodos de array.

---

### **4. Materiales complementarios: recomendaciones**

#### **A. Documentación oficial y guías:**
- [MDN Web Docs - Introducción al DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN Web Docs - Objeto Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)
- [MDN Web Docs - Manipulación del DOM](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)

#### **B. Tutoriales y artículos:**
- **W3Schools DOM Tutorial:** [https://www.w3schools.com/js/js_htmldom.asp](https://www.w3schools.com/js/js_htmldom.asp)
- **JavaScript.info DOM Tutorial:** [https://javascript.info/document](https://javascript.info/document)

#### **C. Plataformas de aprendizaje interactivas:**
- **FreeCodeCamp:** Ejercicios sobre manipulación del DOM y gestión de eventos.
- **Codecademy:** Lecciones interactivas sobre trabajo con el DOM.

#### **D. Tutoriales en video:**
- **Traversy Media en YouTube:** Videos sobre fundamentos de manipulación del DOM.
- **The Net Ninja:** Tutoriales del DOM, explicando propiedades, métodos y uso del objeto `window`.

#### **E. Plataformas de práctica:**
- Crea pequeñas páginas de demostración para experimentar con diferentes métodos del DOM.
- Usa archivos JSON como fuentes de datos y renderiza dinámicamente elementos de UI basados en los datos obtenidos.

#### **F. Comunidad y soporte:**
- **Stack Overflow** y **Reddit** (`r/javascript`): Excelentes recursos para preguntas específicas relacionadas con el DOM.
- **Comunidades de Discord:** Únete a canales enfocados en JavaScript o front-end para discutir retos del DOM.

---

### **5. Sugerencia de desglose de la lección para 3 horas**

#### **Hora 1: Propiedades y métodos del DOM (60 minutos)**
- **Repaso de conceptos del DOM (10 minutos):**
  - Revisar la estructura del DOM y cómo JavaScript ve la página web.
- **Propiedades y métodos del DOM (40 minutos):**
  - `innerText`, `innerHTML`, `textContent`.
  - `classList` y `style`.
  - Creación, modificación y eliminación de elementos.
- **Preguntas rápidas (10 minutos):**
  - Abordar dudas inmediatas.

#### **Hora 2: El objeto global Window e integraciones (60 minutos)**
- **Explorando `window` (20 minutos):**
  - `window.document`, `window.location`, `window.history`.
  - Acciones temporizadas (`setTimeout`, `setInterval`).
- **Integración práctica con datos (20 minutos):**
  - Obtener datos JSON y actualizar elementos del DOM.
  - Usar bucles y condiciones para decidir qué mostrar.
- **Preguntas rápidas (10 minutos):**
  - Aclarar incertidumbres.
- **Descanso (10 minutos):**
  - Pausa breve.

#### **Hora 3: Actividades prácticas y mejores prácticas (60 minutos)**
- **Ejercicios prácticos (40 minutos):**
  - Actualizar texto y atributos.
  - Crear listas desde arrays o JSON.
  - Usar métodos de `window` para mostrar alertas o recargar la página.
- **Revisión y preguntas (20 minutos):**
  - Recapitular conceptos y mejores prácticas.
  - Animar a los estudiantes a experimentar y probar manipulaciones del DOM más complejas.

---

### **6. Recomendaciones adicionales**

#### **A. Demostraciones interactivas:**
- Muestra ejemplos de código en vivo:
  - Obtener un archivo JSON y mostrar los datos en la página.
  - Actualizar clases de elementos al hacer clic en botones.
  - Mostrar una alerta temporizada usando `setTimeout()`.

#### **B. Visuales atractivos:**
- Usa diagramas para mostrar el árbol del DOM.
- Diagramas de flujo para visualizar cómo los datos fluyen de JSON a elementos del DOM.
- Destaca cómo `window` se sitúa en el nivel superior del entorno del navegador.

#### **C. Fomenta la participación:**
- Pide a los estudiantes que encuentren y registren `window.location.href`.
- Que creen y eliminen elementos sobre la marcha.
- Permíteles intentar seleccionar elementos usando diferentes métodos y propiedades.

#### **D. Proporciona instrucciones claras:**
- Mini tareas paso a paso, por ejemplo: “Cambia el texto del encabezado y agrega un nuevo párrafo debajo.”
- Consejos de solución de problemas para errores comunes (p. ej., seleccionar el ID equivocado, errores tipográficos en un selector).

#### **E. Fomenta un entorno de apoyo:**
- Anima a los estudiantes a compartir sus fragmentos de código.
- Ofrécete a revisar y dar feedback sobre sus enfoques.