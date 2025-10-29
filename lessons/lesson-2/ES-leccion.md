## **Lección 2: Fundamentos de JavaScript para la Automatización de Pruebas**

### **1. Esquema del contenido**

#### **A. Introducción a JavaScript**
- **¿Qué es JavaScript?**
  - Un lenguaje de programación de alto nivel e interpretado.
  - Utilizado principalmente para agregar interactividad a las páginas web.
- **JavaScript en la automatización de pruebas:**
  - Importancia de dominar JavaScript para escribir pruebas con Cypress.
  - Cómo JavaScript se integra con Cypress para un scripting de pruebas fluido.

##### **¿Qué es JavaScript?**

**Definición:**
JavaScript es un lenguaje de programación de alto nivel e interpretado, utilizado principalmente para crear y controlar contenido dinámico en sitios web, habilitando funciones interactivas en las páginas web.

**Explicación detallada:**
- **Rol en el desarrollo web:**
  - JavaScript es esencial para agregar interactividad a los sitios web. Permite a los desarrolladores crear funciones como sliders, formularios, animaciones y mapas interactivos.
- **Ejecución del lado del cliente:**
  - Normalmente se ejecuta en el navegador del usuario, lo que permite interacciones en tiempo real sin necesidad de comunicarse continuamente con el servidor.
- **Versatilidad:**
  - Más allá del navegador, JavaScript también se usa del lado del servidor mediante entornos como Node.js, permitiendo el desarrollo full‑stack con un solo lenguaje.
- **Integración con HTML y CSS:**
  - Trabaja junto a HTML (estructura) y CSS (estilo) para crear experiencias web completas e interactivas.


##### **¿Por qué JavaScript es el lenguaje más amado y odiado?**

**Definición:**
JavaScript es reconocido por su versatilidad y uso generalizado, lo que lo convierte en el favorito de muchos desarrolladores. Sin embargo, su flexibilidad y peculiaridades también generan frustraciones, ganándose tanto amor como odio en la comunidad de programación.

**Explicación detallada:**
- **Por qué es el más amado:**
  - **Ubicuidad:** JavaScript es la columna vertebral de la web, ejecutándose en prácticamente todos los sitios.
  - **Versatilidad:** Puede usarse tanto para front‑end como para back‑end.
  - **Ecosistema rico:** Amplias bibliotecas y frameworks (p. ej., React, Angular, Vue.js) aumentan la productividad.
  - **Comunidad activa:** Una comunidad grande y colaborativa contribuye a mejoras continuas y abundantes recursos.
  - **Interactividad en tiempo real:** Permite crear interfaces de usuario dinámicas y responsivas.
  
- **Por qué es el más odiado:**
  - **Inconsistencias:** Peculiaridades del lenguaje, como la coerción de tipos y comportamientos inesperados, pueden causar errores y confusión.
  - **Tipado débil:** Al ser dinámicamente tipado, grandes bases de código pueden ser más difíciles de mantener y depurar.
  - **Diferencias entre navegadores:** Variaciones en cómo los navegadores interpretan JavaScript complican el desarrollo.
  - **Evolución rápida:** Actualizaciones y cambios frecuentes pueden resultar abrumadores.
  - **Complejidad asíncrona:** Gestionar operaciones asíncronas puede ser desafiante, especialmente para principiantes.


##### **¿Qué es un lenguaje de programación de alto nivel?**

**Definición:**
Un lenguaje de programación de alto nivel es aquel que abstrae la mayoría de los detalles del hardware, permitiendo escribir programas con sintaxis y conceptos legibles por humanos, en lugar de tratar directamente con código máquina.

**Explicación detallada:**
- **Abstracción:**
  - Los lenguajes de alto nivel ofrecen abstracciones como variables, bucles y funciones, facilitando escribir programas complejos sin preocuparse por operaciones de bajo nivel.
- **Facilidad de uso:**
  - Están diseñados para ser fáciles de leer y escribir, permitiendo enfocarse en la resolución de problemas más que en detalles intrincados del hardware.
- **Portabilidad:**
  - Los programas escritos en lenguajes de alto nivel suelen ejecutarse en distintos tipos de hardware con poca o ninguna modificación.
- **Ejemplos:**
  - JavaScript, Python, Java, C# y Ruby son lenguajes de alto nivel.
- **Comparación con lenguajes de bajo nivel:**
  - A diferencia de los lenguajes de bajo nivel (p. ej., Ensamblador), los de alto nivel gestionan automáticamente la memoria, las operaciones de E/S y otras tareas a nivel de sistema.

#### **¿Por qué JavaScript es bueno para escribir pruebas?**

**Definición:**
JavaScript es muy adecuado para escribir pruebas, especialmente para aplicaciones web, debido a su integración nativa con los navegadores, capacidades asíncronas y el rico ecosistema de frameworks de pruebas como Cypress.

**Explicación detallada:**
- **Integración nativa con el navegador:**
  - Como JavaScript se ejecuta en el navegador, puede interactuar directamente con elementos de la página, siendo ideal para pruebas end‑to‑end.
- **Manejo de asincronía:**
  - Su capacidad para manejar operaciones asíncronas sin problemas permite probar aplicaciones dinámicas que dependen de obtención de datos asíncrona e interacciones del usuario.
- **Ecosistema rico:**
  - Herramientas como Cypress, Jest y Mocha están construidas sobre JavaScript, ofreciendo funciones sólidas para escribir, ejecutar y gestionar pruebas.
- **Reutilización:**
  - Patrones y utilidades comunes de prueba pueden reutilizarse entre distintos suites, mejorando la eficiencia.
- **Comunidad y soporte:**
  - Una comunidad extensa asegura mejora continua, recursos abundantes y soporte para prácticas y herramientas de prueba.
- **Flexibilidad:**
  - Permite tanto pruebas unitarias como de integración, cubriendo diversas necesidades dentro del mismo lenguaje.


### Variables y tipos de datos
- **Variables:**
  - Declaración usando `var`, `let` y `const`.
  - Diferencias de alcance entre `var`, `let` y `const`.
  - Mejores prácticas para nombrar variables.
- **Tipos de datos:**
  - Tipos primitivos: `String`, `Number`, `Boolean`, `Null`, `Undefined`, `Symbol`.
  - Tipos complejos: `Object`, `Array`.
  - Comprender la coerción de tipos y la comprobación de tipos.

##### ¿Cuáles son las diferencias entre `var`, `let` y `const`?**

**Definición:**
`var`, `let` y `const` son palabras clave de JavaScript para declarar variables, cada una con distintas características de alcance y mutabilidad.

**Explicación detallada:**
- **`var`:**
  - **Ámbito de función:** Las variables declaradas con `var` tienen alcance dentro del bloque de la función más cercana.
  - **Elevación (hoisting):** Las declaraciones `var` se elevan al inicio de su alcance, lo que significa que pueden accederse antes de su declaración (aunque son `undefined` hasta asignarlas).
  - **Redeclaración y reasignación:** Pueden redeclararse y reasignarse dentro de su alcance.
  
- **`let`:**
  - **Ámbito de bloque:** `let` tiene alcance en el bloque delimitado por `{}`, como en bucles o condicionales.
  - **Sin inicialización al elevarse:** Aunque `let` se eleva, no se inicializa hasta que su definición se evalúa, lo que produce una "zona muerta temporal".
  - **Reasignación:** Puede reasignarse, pero no redeclararse en el mismo alcance.
  
- **`const`:**
  - **Ámbito de bloque:** Igual que `let`, `const` es de bloque.
  - **Sin inicialización al elevarse:** Como `let`, se eleva pero no se inicializa hasta su definición.
  - **Sin reasignación:** No puede reasignarse después de la asignación inicial. Sin embargo, si es un objeto o arreglo, sus propiedades o elementos sí pueden modificarse.
  - **Inmutabilidad:** Fomenta enlaces inmutables, promoviendo código más seguro y predecible.


##### **¿Qué son los tipos primitivos?**

**Definición:**
Los tipos primitivos son los tipos de datos más básicos en JavaScript que representan valores únicos e inmutables. No son objetos y no tienen métodos.

**Explicación detallada:**
- **Lista de tipos primitivos:**
  - **String:** Representa datos textuales (p. ej., `"Hello, World!"`).
  - **Number:** Representa números enteros y de punto flotante (p. ej., `42`, `3.14`).
  - **Boolean:** Representa valores lógicos (`true` o `false`).
  - **Undefined:** Variable declarada pero no asignada.
  - **Null:** Representa la ausencia intencional de cualquier valor de objeto.
  - **Symbol:** Representa un identificador único e inmutable (introducido en ES6).
  - **BigInt:** Representa enteros de precisión arbitraria (introducido en ES2020).
  
- **Características de los tipos primitivos:**
  - **Inmutables:** Una vez creado, un valor primitivo no puede alterarse. Las operaciones sobre primitivos generan nuevos valores.
  - **Basados en valor:** Las variables primitivas almacenan su valor real, no una referencia.
  
- **Ejemplos:**
  ```javascript
  let name = "Alice"; // String
  let age = 30; // Number
  let isStudent = true; // Boolean
  let unassigned; // Undefined
  let emptyValue = null; // Null
  let uniqueId = Symbol('id'); // Symbol
  let largeNumber = 9007199254740991n; // BigInt
  ```
- #### **Convenciones de nomenclatura**
  1. **Usa nombres descriptivos y significativos:**
    - **Claridad:** Elige nombres que describan claramente el propósito o valor de la variable.
      ```javascript
      let totalPrice = 100; // Propósito claro
      let tp = 100; // Vago y poco claro
      ```
    - **Evita la ambigüedad:** Evita nombres genéricos como `data` o `value` salvo que el contexto sea claro.
      ```javascript
      let userData = { name: "Alice", age: 25 }; // Claro
      let data = { name: "Alice", age: 25 }; // Vago
      ```

  2. **Sigue convenciones de nombres consistentes:**
    - **camelCase:** Comienza con minúscula y capitaliza la primera letra de cada palabra siguiente.
      ```javascript
      let firstName = "John";
      let totalAmount = 250;
      ```
    - **Evita snake_case o PascalCase:** Mantén camelCase para variables y funciones para ser consistente con los estándares de JavaScript.
      ```javascript
      // Preferido
      let userAge = 30;
      
      // No preferido
      let user_age = 30;
      let UserAge = 30;
      ```

  3. **Usa nombres pronunciables:**
    - **Facilidad de comunicación:** Elige nombres fáciles de pronunciar y discutir con el equipo.
      ```javascript
      let userEmail = "user@example.com"; // Fácil de pronunciar
      let u_e = "user@example.com"; // Difícil de pronunciar
      ```

  4. **Evita abreviaturas y siglas:**
    - **Palabras completas:** Úsalas para mejorar la claridad, salvo abreviaturas universalmente conocidas.
      ```javascript
      let maxHeight = 200; // Claro
      let mh = 200; // Poco claro
      
      let url = "https://example.com"; // Claro
      let u = "https://example.com"; // Poco claro
      ```

  5. **Usa sustantivos en singular para elementos únicos y en plural para colecciones:**
    - **Consistencia en colecciones:**
      ```javascript
      let user = { name: "Alice" }; // Elemento único
      let users = [{ name: "Alice" }, { name: "Bob" }]; // Colección
      ```

  6. **Evita palabras reservadas y caracteres especiales:**
    - **Palabras reservadas de JavaScript:** No uses palabras como `class`, `return`, `var`, etc., como nombres de variables.
      ```javascript
      // Evitar
      let class = "Mathematics"; // SyntaxError
      
      // Usar en su lugar
      let className = "Mathematics";
      ```
    - **Sin caracteres especiales:** Usa solo letras, números y guiones bajos (`_`). Evita espacios y caracteres especiales.
      ```javascript
      // Válido
      let firstName = "John";
      
      // Inválido
      let first-name = "John"; // SyntaxError
      ```

  7. **Indica el propósito de la variable con el contexto:**
    - **Pistas contextuales:** Usa prefijos o sufijos que indiquen el rol o tipo.
      ```javascript
      let isLoggedIn = true; // Indicador booleano
      let userCount = 50; // Conteo numérico
      let userList = ["Alice", "Bob"]; // Arreglo
      ```

  8. **Mantén nombres cortos pero significativos:**
    - **Equilibrio entre brevedad y claridad:** Deben ser descriptivos, pero no excesivamente largos.
      ```javascript
      let userProfile = { name: "Alice", age: 25 }; // Buen equilibrio
      let userProfileInformationDetails = { name: "Alice", age: 25 }; // Demasiado largo
      ```

  9. **Usa nombres consistentes para variables similares:**
    - **Uniformidad:** Mantén patrones consistentes para variables con propósitos similares.
      ```javascript
      let userName = "Alice";
      let adminName = "Bob";
      // Ambas usan el sufijo 'Name' para indicar su propósito
      ```

  10. **Evita usar números a menos que sea necesario:**
      - **Uso con significado:** Úsalos solo cuando aporten claridad.
        ```javascript
        let user2 = "Charlie"; // Evitar si es posible
        let alternateUser = "Charlie"; // Preferido
        ```


##### **¿Qué es `typeof`?**

**Definición:**
`typeof` es un operador de JavaScript que devuelve una cadena indicando el tipo del operando dado, ayudando a identificar tipos de datos durante la depuración y validación.

**Explicación detallada:**
- **Sintaxis básica:**
  ```javascript
  typeof operand
  ```
  - **Operando:** La variable o valor cuyo tipo deseas determinar.
  
- **Uso común:**
  ```javascript
  typeof "Hello"; // Devuelve: "string"
  typeof 42; // Devuelve: "number"
  typeof true; // Devuelve: "boolean"
  typeof undefined; // Devuelve: "undefined"
  typeof null; // Devuelve: "object" (una peculiaridad conocida en JavaScript)
  typeof { name: "Alice" }; // Devuelve: "object"
  typeof [1, 2, 3]; // Devuelve: "object"
  typeof function() {}; // Devuelve: "function"
  typeof Symbol('id'); // Devuelve: "symbol"
  typeof 10n; // Devuelve: "bigint"
  ```
  
- **Aplicaciones prácticas:**
  - **Verificación de tipos:**
    - Asegurar que las variables tengan los tipos esperados antes de operar.
    ```javascript
    if (typeof score === "number") {
      console.log("Score is a number");
    } else {
      console.log("Score is not a number");
    }
    ```
  - **Validar argumentos de funciones:**
    - Comprobar los tipos de los argumentos pasados a funciones.
    ```javascript
    function greet(name) {
      if (typeof name !== "string") {
        console.error("Name must be a string");
        return;
      }
      console.log("Hello, " + name + "!");
    }
    greet("Bob"); // Válido
    greet(123); // Registra error
    ```
  
- **Limitaciones y consideraciones:**
  - **`null` devuelve "object":**
    - A pesar de ser un tipo primitivo, `typeof null` devuelve `"object"`, lo que puede causar confusión.
  - **Arreglos y objetos:**
    - Tanto los arreglos como los objetos planos devuelven `"object"`. Para distinguirlos, usa comprobaciones adicionales como `Array.isArray()`.
    ```javascript
    typeof []; // Devuelve: "object"
    Array.isArray([]); // Devuelve: true
    typeof {}; // Devuelve: "object"
    Array.isArray({}); // Devuelve: false
    ```


#### **C. Operadores**
- **Operadores aritméticos:**
  - Suma (`+`), Resta (`-`), Multiplicación (`*`), División (`/`), Módulo (`%`).
- **Operadores de comparación:**
  - Igual (`==`), Estrictamente igual (`===`), Distinto (`!=`), Estrictamente distinto (`!==`), Mayor que (`>`), Menor que (`<`), Mayor o igual (`>=`), Menor o igual (`<=`).
- **Operadores lógicos:**
  - AND (`&&`), OR (`||`), NOT (`!`).
- **Operadores de asignación:**
  - Asignación simple (`=`), Asignación con suma (`+=`), Asignación con resta (`-=`), etc.
- **Operadores de incremento y decremento:**
  - `++`, `--`.

#### **D. Sintaxis básica y convenciones de código**
- **Escritura y ejecución de scripts JavaScript:**
  - Estructura de un archivo JavaScript.
  - Uso de `console.log` para la salida.
- **Comentarios:**
  - De una línea (`//`) y de múltiples líneas (`/* */`).
- **Sangría y legibilidad del código:**
  - Importancia de la sangría consistente.
  - Convenciones de nombres y buenas prácticas para escribir código limpio.

#### **E. Fundamentos de depuración**
- **Uso de `console.log` para depurar:**
  - Cómo imprimir variables y expresiones.
  - Escenarios comunes para usar `console.log`.
- **Introducción a las herramientas de desarrollador del navegador:**
  - Acceder a la consola.
  - Técnicas básicas de depuración usando puntos de ruptura y expresiones vigiladas.


##### **¿Qué es `console.log` y cómo podemos usarlo para depurar?**

**Definición:**
`console.log` es una función de JavaScript que envía información a la consola web, comúnmente usada para depurar mostrando valores de variables, mensajes o el flujo de ejecución.

**Explicación detallada:**
- **Uso básico:**
  - **Imprimir valores:**
    ```javascript
    let greeting = "¡Hola, mundo!";
    console.log(greeting); // Imprime: ¡Hola, mundo!
    ```
  - **Mostrar múltiples valores:**
    ```javascript
    let user = "Bob";
    let score = 85;
    console.log("Usuario:", user, "Puntuación:", score); // Imprime: Usuario: Bob Puntuación: 85
    ```
  - **Registrar objetos y arreglos:**
    ```javascript
    let user = { name: "Charlie", age: 25 };
    console.log(user); // Muestra el objeto user
    ```
  
- **Aplicaciones de depuración:**
  - **Rastrear el flujo de ejecución:**
    ```javascript
    function add(a, b) {
      console.log("Sumando:", a, b);
      return a + b;
    }
    add(5, 3); // Imprime: Sumando: 5 3
    ```
  - **Inspeccionar estados de variables:**
    ```javascript
    let total = 0;
    for (let i = 1; i <= 5; i++) {
      total += i;
      console.log("Después de sumar", i, "el total es", total);
    }
    // Imprime:
    // Después de sumar 1 el total es 1
    // Después de sumar 2 el total es 3
    // Después de sumar 3 el total es 6
    // Después de sumar 4 el total es 10
    // Después de sumar 5 el total es 15
    ```
  
- **Uso con herramientas de desarrollador:**
  - **Acceder a la consola:**
    - Abre las herramientas de desarrollador del navegador (normalmente con `F12` o `Ctrl+Shift+I`).
    - Ve a la pestaña "Console" para ver la salida de `console.log`.
  
- **Mejores prácticas:**
  - **Mensajes claros y descriptivos:**
    - Usa mensajes descriptivos para facilitar la comprensión.
    ```javascript
    console.log("Intento de inicio de sesión del usuario:", username);
    ```
  - **Eliminar o comentar logs en producción:**
    - Un exceso de registros puede saturar la consola y exponer información sensible.
  
- **Registro avanzado:**
  - **Agrupar registros:**
    ```javascript
    console.group("Detalles del usuario");
    console.log("Nombre:", user.name);
    console.log("Edad:", user.age);
    console.groupEnd();
    ```
  - **Estilizar registros:**
    ```javascript
    console.log("%cEste es un mensaje con estilo", "color: blue; font-size: 16px;");
    ```

---

#### **F. Ejemplos prácticos**
- **Programas simples en JavaScript:**
  - Crear y manipular variables.
  - Realizar operaciones aritméticas y lógicas.
  - Escribir funciones para tareas repetitivas.
- **Escenarios del mundo real:**
  - Ejemplos de cómo estos fundamentos de JavaScript se aplican al escribir pruebas con Cypress.

---

### **2. Actividades prácticas: ejercicios y sugerencias de funcionalidad web**

#### **A. Ejercicio de declaración de variables y alcance**
- **Ejercicio:**
  - Declara variables usando `var`, `let` y `const`.
  - Observa y compara sus alcances en distintos bloques (p. ej., dentro de bucles o condicionales).
- **Sugerencia de funcionalidad web:**
  - Crea una página HTML simple con JavaScript que declare variables en diferentes alcances y registre sus valores en la consola para entender el comportamiento del alcance.

#### **B. Ejercicio de tipos de datos y coerción de tipos**
- **Ejercicio:**
  - Asigna distintos tipos de datos a variables y usa `typeof` para identificarlos.
  - Realiza operaciones que demuestren coerción de tipos (p. ej., sumar una cadena a un número).
- **Sugerencia de funcionalidad web:**
  - Desarrolla un pequeño script que tome entrada del usuario desde un formulario y la procese usando distintos tipos de datos, mostrando coerción y verificación de tipos.

#### **C. Práctica de operadores**
- **Ejercicio:**
  - Escribe expresiones en JavaScript usando varios operadores aritméticos, de comparación, lógicos y de asignación.
  - Predice y verifica los resultados usando `console.log`.
- **Sugerencia de funcionalidad web:**
  - Implementa una calculadora básica en una página HTML que use JavaScript para realizar operaciones basadas en la entrada del usuario, utilizando diferentes operadores.

#### **D. Escritura y ejecución de scripts simples**
- **Ejercicio:**
  - Crea un archivo JavaScript que incluya declaraciones de variables, operaciones y funciones.
  - Ejecuta el script usando Node.js y observa la salida en la consola.
- **Sugerencia de funcionalidad web:**
  - Construye una aplicación simple de lista de tareas donde los usuarios puedan agregar y eliminar tareas, practicando la manipulación de variables e interacciones básicas con el DOM.

#### **E. Depuración con `console.log` y herramientas de desarrollador**
- **Ejercicio:**
  - Inserta sentencias `console.log` en diferentes partes de tu código para rastrear valores de variables y el flujo del programa.
  - Usa las herramientas de desarrollador del navegador para establecer puntos de ruptura e inspeccionar variables durante la ejecución.
- **Sugerencia de funcionalidad web:**
  - Mejora la aplicación de lista de tareas agregando sentencias de depuración para rastrear interacciones del usuario y cambios en los datos.

---

### **3. Preguntas potenciales de los estudiantes**

#### **A. Preguntas generales sobre JavaScript:**
1. **¿Cuál es la diferencia entre `var`, `let` y `const`?**
   - Entender el alcance y la posibilidad de reasignación.
2. **¿Por qué JavaScript es importante para la automatización de pruebas con Cypress?**
   - Su rol al escribir scripts de prueba e interactuar con aplicaciones web.
3. **¿Puedo usar JavaScript para realizar operaciones más complejas en pruebas de Cypress?**
   - Sí, JavaScript permite un scripting de pruebas flexible y potente.

#### **B. Variables y tipos de datos:**
1. **¿Por qué debería preferir `let` o `const` sobre `var`?**
   - Para evitar problemas de alcance y mejorar la confiabilidad del código.
2. **¿Cómo afecta la coerción de tipos a mis scripts de prueba?**
   - Puede conducir a resultados inesperados si no se gestiona adecuadamente.

#### **C. Operadores:**
1. **¿Cuándo debería usar `===` en lugar de `==`?**
   - Para asegurar que se comparen tanto el valor como el tipo, evitando problemas de coerción.
2. **¿Cómo pueden usarse eficazmente los operadores lógicos en condiciones de prueba?**
   - Para combinar múltiples condiciones y lograr aserciones más completas.

#### **D. Sintaxis básica y convenciones de código:**
1. **¿Cuáles son algunas buenas prácticas para nombrar variables en JavaScript?**
   - Usar nombres descriptivos y significativos, siguiendo la convención camelCase.
2. **¿Qué tan importante es la legibilidad del código en la automatización de pruebas?**
   - Extremadamente importante para mantener y escalar los suites de prueba.

#### **E. Fundamentos de depuración:**
1. **¿Cuáles son algunas técnicas comunes de depuración en JavaScript?**
   - Usar `console.log`, puntos de ruptura y expresiones vigiladas.
2. **¿Cómo puedo usar eficazmente las herramientas de desarrollador del navegador para depurar mis pruebas?**
   - Inspeccionando elementos, monitoreando la salida de la consola y recorriendo el código paso a paso.

#### **F. Aplicaciones prácticas:**
1. **¿Puedes dar un ejemplo de cómo se usan funciones de JavaScript en pruebas de Cypress?**
   - Las funciones pueden encapsular acciones repetitivas de prueba, haciendo los tests más modulares y mantenibles.
2. **¿Cómo se relacionan los arreglos y objetos de JavaScript con la gestión de datos de prueba en Cypress?**
   - Pueden usarse para almacenar y manipular datos de prueba de forma eficiente.

---

### **4. Materiales complementarios: recomendaciones**

#### **A. Documentación y guías oficiales:**
- **Conceptos básicos de JavaScript:**
  - [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- **Documentación de Cypress:**
  - [Cypress Getting Started](https://docs.cypress.io/guides/getting-started/installing-cypress)
- **Documentación de Node.js:**
  - [Node.js Official Docs](https://nodejs.org/en/docs/)

#### **B. Tutoriales interactivos y cursos:**
- **Codecademy:**
  - [Learn JavaScript](https://www.codecademy.com/learn/introduction-to-javascript)
- **FreeCodeCamp:**
  - [JavaScript Algorithms and Data Structures](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)
- **JavaScript.info:**
  - [The Modern JavaScript Tutorial](https://javascript.info/)

#### **C. Tutoriales en video:**
- **Traversy Media:**
  - [JavaScript Crash Course for Beginners](https://www.youtube.com/watch?v=hdI2bqOjy3c)
- **Academind:**
  - [JavaScript Basics](https://www.youtube.com/watch?v=W6NZfCO5SIk)
- **The Net Ninja:**
  - [JavaScript Tutorial for Beginners](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gcy4G1Nh5kOK0O0_NlZjNv)

#### **D. Plataformas de práctica:**
- **LeetCode:**
  - [JavaScript Challenges](https://leetcode.com/problemset/all/?language=JavaScript)
- **HackerRank:**
  - [JavaScript Practice](https://www.hackerrank.com/domains/tutorials/10-days-of-javascript)
- **Exercism:**
  - [JavaScript Track](https://exercism.io/tracks/javascript)

#### **E. Comunidad y soporte:**
- **Stack Overflow:**
  - [JavaScript Tag](https://stackoverflow.com/questions/tagged/javascript)
- **Reddit:**
  - [r/javascript](https://www.reddit.com/r/javascript/)
- **Comunidades en Discord:**
  - Únete a servidores de Discord enfocados en JavaScript o Cypress para asistencia y discusión en tiempo real.

#### **F. Lecturas adicionales:**
- **Libros:**
  - *Eloquent JavaScript* de Marijn Haverbeke ([Versión en línea](https://eloquentjavascript.net/))
  - *JavaScript: The Good Parts* de Douglas Crockford
- **Artículos:**
  - [JavaScript Basics](https://www.w3schools.com/js/js_intro.asp) de W3Schools
  - [Understanding JavaScript Variables](https://www.freecodecamp.org/news/variables-in-javascript/) de FreeCodeCamp

---

### **5. Desglose sugerido de la lección para 3 horas**

#### **Hora 1: Introducción a JavaScript (60 minutos)**
- **¿Qué es JavaScript? (15 minutos):**
  - Panorama general de JavaScript y su papel en el desarrollo web.
  - Importancia en la automatización de pruebas con Cypress.
- **JavaScript en la automatización de pruebas (15 minutos):**
  - Cómo se integra JavaScript con Cypress.
  - Beneficios de usar JavaScript para escribir pruebas.
- **Variables y tipos de datos (30 minutos):**
  - Explicación de `var`, `let`, `const`.
  - Visión general de los distintos tipos de datos.
  - Ejemplos y demostraciones rápidas.

#### **Hora 2: Operadores y sintaxis básica (60 minutos)**
- **Operadores (30 minutos):**
  - Explicación detallada de operadores aritméticos, de comparación, lógicos y de asignación.
  - Ejemplos prácticos usando diferentes operadores.
- **Sintaxis básica y convenciones de código (20 minutos):**
  - Escribir código JavaScript limpio y legible.
  - Importancia de los comentarios y la sangría adecuada.
- **Fundamentos de depuración (10 minutos):**
  - Uso de `console.log` para depurar.
  - Introducción a las herramientas de desarrollador del navegador para depurar.

#### **Hora 3: Actividades prácticas y preguntas (60 minutos)**
- **Ejercicios prácticos (40 minutos):**
  - **Declaración de variables y alcance:**
    - Los estudiantes declaran variables con `var`, `let` y `const` y observan diferencias de alcance.
  - **Tipos de datos y coerción de tipos:**
    - Asignar varios tipos de datos a variables y realizar operaciones para demostrar la coerción.
  - **Práctica de operadores:**
    - Escribir expresiones usando distintos operadores y predecir resultados.
- **Sesión de preguntas y respuestas (20 minutos):**
  - Atender dudas de los estudiantes.
  - Aclarar preguntas y reforzar conceptos clave de la lección.

---

### **6. Recomendaciones adicionales**

#### **A. Demostraciones interactivas:**
- **Live coding:**
  - Demostrar declaraciones de variables, operaciones y definiciones de funciones en tiempo real.
  - Mostrar cómo cambiar variables afecta la salida usando `console.log`.
- **Demostración de depuración:**
  - Recorrer un script simple y usar `console.log` para depurar problemas.
  - Introducir funciones básicas de las herramientas de desarrollador del navegador.

#### **B. Material visual atractivo:**
- **Diapositivas con fragmentos de código:**
  - Usa ejemplos claros y concisos para ilustrar conceptos.
- **Diagramas:**
  - Representaciones visuales del alcance de variables y tipos de datos.
- **Ejemplos en vivo:**
  - Mostrar escenarios reales donde los fundamentos de JavaScript se aplican a la automatización de pruebas con Cypress.

#### **C. Fomenta la participación:**
- **Programación en parejas:**
  - Haz que los estudiantes trabajen en parejas para resolver ejercicios, fomentando la colaboración.
- **Encuestas y cuestionarios en vivo:**
  - Usa sondeos rápidos o cuestionarios para evaluar la comprensión y mantener el interés.

#### **D. Proporciona instrucciones claras:**
- **Guías paso a paso:**
  - Ofrece instrucciones detalladas para cada actividad práctica para que todos puedan seguirlas.
- **Consejos de solución de problemas:**
  - Anticipa problemas comunes (p. ej., errores de sintaxis) y proporciona soluciones.

#### **E. Fomenta un entorno de apoyo:**
- **Anima a hacer preguntas:**
  - Crea un ambiente abierto donde los estudiantes se sientan cómodos pidiendo ayuda.
- **Proporciona ejemplos:**
  - Ofrece múltiples ejemplos para cada concepto para atender diferentes estilos de aprendizaje.