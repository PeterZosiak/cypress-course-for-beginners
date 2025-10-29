## **Lección 3: Estructuras de control y funciones en JavaScript**
    
### **1. Esquema del contenido**
    
#### **A. Introducción a las estructuras de control**
- **¿Qué son las estructuras de control?**
  - Mecanismos que controlan el flujo de ejecución en un programa.
  - Permiten a los desarrolladores dictar el orden en que se ejecuta el código según condiciones o iteraciones.
- **Tipos de estructuras de control:**
  - **Sentencias condicionales:** `if`, `else if`, `else`, `switch`.
  - **Bucles:** `for`, `while`, `do...while`, `for...of`, `for...in`.


##### **¿Qué son las estructuras de control?**

**Definición:**
Las estructuras de control son construcciones de programación que dictan el flujo de ejecución dentro de un programa. Determinan el orden en que se ejecutan las sentencias, permitiendo a los desarrolladores implementar la toma de decisiones y tareas repetitivas en su código.

**Explicación detallada:**
- **Propósito:** Las estructuras de control permiten crear programas dinámicos y flexibles al permitir que el código responda de manera diferente según diversas condiciones o repitiendo ciertas operaciones múltiples veces.
  
- **Tipos de estructuras de control:**
  1. **Sentencias condicionales:** Ejecutan diferentes bloques de código según si una condición es verdadera o falsa.
  2. **Bucles:** Repiten un bloque de código múltiples veces mientras una condición especificada siga siendo verdadera.

- **Importancia en la programación:**
  - **Toma de decisiones:** Permite que los programas tomen decisiones y ejecuten código de forma selectiva.
  - **Repetición:** Facilita la ejecución de tareas repetitivas sin código redundante.
  - **Eficiencia:** Mejora la eficiencia y legibilidad del código al reducir la duplicación y manejar lógica compleja de forma concisa.

**Representación visual:**
- **Diagramas de flujo:** A menudo se usan para visualizar estructuras de control, mostrando el flujo de ejecución según condiciones e iteraciones.


#### **B. Sentencias condicionales**
- **Sentencia `if`:**
  - Ejecuta un bloque de código si una condición especificada es verdadera.
  - Sintaxis y uso básico.
  - Escenarios de ejemplo en automatización de pruebas.
- **Sentencias `else if` y `else`:**
  - Proporcionan condiciones adicionales y opciones de respaldo.
  - Mejora la toma de decisiones en scripts.
- **Sentencia `switch`:**
  - Evalúa una expresión frente a múltiples casos.
  - Simplifica múltiples comprobaciones condicionales.

##### **Sentencias condicionales**

**Definición:**
Las sentencias condicionales son estructuras de control que ejecutan bloques específicos de código según si una condición dada evalúa a verdadero o falso.

**Explicación detallada:**
- **Tipos de sentencias condicionales:**
  1. **Sentencia `if`:**
     - **Propósito:** Ejecuta un bloque de código si una condición especificada es verdadera.
     - **Sintaxis:**
       ```javascript
       if (condition) {
         // código a ejecutar si la condición es verdadera
       }
       ```
     - **Ejemplo:**
       ```javascript
       let score = 85;
       if (score >= 80) {
         console.log("¡Buen trabajo!");
       }
       ```

  2. **Sentencia `else if`:**
     - **Propósito:** Proporciona condiciones adicionales si la condición `if` previa es falsa.
     - **Sintaxis:**
       ```javascript
       if (condition1) {
         // código si condition1 es verdadera
       } else if (condition2) {
         // código si condition2 es verdadera
       }
       ```
     - **Ejemplo:**
       ```javascript
       let score = 75;
       if (score >= 90) {
         console.log("¡Excelente!");
       } else if (score >= 80) {
         console.log("¡Buen trabajo!");
       }
       ```

  3. **Sentencia `else`:**
     - **Propósito:** Ejecuta un bloque de código si todas las condiciones anteriores son falsas.
     - **Sintaxis:**
       ```javascript
       if (condition1) {
         // código si condition1 es verdadera
       } else if (condition2) {
         // código si condition2 es verdadera
       } else {
         // código si todas las condiciones son falsas
       }
       ```
     - **Ejemplo:**
       ```javascript
       let score = 55;
       if (score >= 90) {
         console.log("¡Excelente!");
       } else if (score >= 80) {
         console.log("¡Buen trabajo!");
       } else {
         console.log("¡Sigue intentándolo!");
       }
       ```

  4. **Sentencia `switch`:**
     - **Propósito:** Evalúa una expresión frente a múltiples valores de caso y ejecuta los bloques de código correspondientes.
     - **Sintaxis:**
       ```javascript
       switch (expression) {
         case value1:
           // código a ejecutar si expression === value1
           break;
         case value2:
           // código a ejecutar si expression === value2
           break;
         default:
           // código a ejecutar si la expresión no coincide con ningún caso
       }
       ```
     - **Ejemplo:**
       ```javascript
       let day = "Monday";
       switch (day) {
         case "Monday":
           console.log("¡Inicio de la semana laboral!");
           break;
         case "Friday":
           console.log("¡Fin de la semana laboral!");
           break;
         default:
           console.log("Días a mitad de semana.");
       }
       ```

**Casos de uso en automatización de pruebas:**
- **Comportamiento dinámico de pruebas:** Ajustar pasos de prueba según estados variables de la aplicación o entradas del usuario.
- **Manejo de errores:** Ejecutar diferentes acciones cuando las pruebas pasan o fallan bajo ciertas condiciones.

    
#### **C. Bucles**
- **Bucle `for`:**
  - Itera un número especificado de veces.
  - Sintaxis y ejemplos prácticos.
- **Bucle `while`:**
  - Continúa ejecutándose mientras una condición siga siendo verdadera.
  - Casos de uso en automatización de pruebas.
- **Bucle `do...while`:**
  - Similar a `while` pero garantiza al menos una ejecución.
- **Bucles `for...of` y `for...in`:**
  - Iteración sobre objetos iterables (arrays, strings) y propiedades de objetos, respectivamente.

##### **Bucles**

**Definición:**
Los bucles son estructuras de control que ejecutan repetidamente un bloque de código mientras una condición especificada siga siendo verdadera.

**Explicación detallada:**
- **Tipos de bucles:**
  1. **Bucle `for`:**
     - **Propósito:** Ejecuta un bloque de código un número predeterminado de veces.
     - **Sintaxis:**
       ```javascript
       for (initialization; condition; increment) {
         // código a ejecutar
       }
       ```
     - **Ejemplo:**
       ```javascript
       for (let i = 0; i < 5; i++) {
         console.log("Iteración:", i);
       }
       ```

  2. **Bucle `while`:**
     - **Propósito:** Continúa ejecutando un bloque de código mientras la condición sea verdadera.
     - **Sintaxis:**
       ```javascript
       while (condition) {
         // código a ejecutar
       }
       ```
     - **Ejemplo:**
       ```javascript
       let i = 0;
       while (i < 5) {
         console.log("Iteración:", i);
         i++;
       }
       ```

  3. **Bucle `do...while`:**
     - **Propósito:** Ejecuta un bloque de código una vez antes de comprobar la condición y luego repite mientras la condición sea verdadera.
     - **Sintaxis:**
       ```javascript
       do {
         // código a ejecutar
       } while (condition);
       ```
     - **Ejemplo:**
       ```javascript
       let i = 0;
       do {
         console.log("Iteración:", i);
         i++;
       } while (i < 5);
       ```

  4. **Bucle `for...of`:**
     - **Propósito:** Itera sobre objetos iterables (como arrays, strings) y accede a sus valores.
     - **Sintaxis:**
       ```javascript
       for (const element of iterable) {
         // código a ejecutar
       }
       ```
     - **Ejemplo:**
       ```javascript
       const fruits = ["Apple", "Banana", "Cherry"];
       for (const fruit of fruits) {
         console.log("Fruta:", fruit);
       }
       ```

  5. **Bucle `for...in`:**
     - **Propósito:** Itera sobre las propiedades enumerables de un objeto.
     - **Sintaxis:**
       ```javascript
       for (const key in object) {
         // código a ejecutar
       }
       ```
     - **Ejemplo:**
       ```javascript
       const user = { name: "Alice", age: 25, role: "Tester" };
       for (const key in user) {
         console.log(key + ":", user[key]);
       }
       ```

**Casos de uso en automatización de pruebas:**
- **Pruebas basadas en datos:** Iterar sobre arrays de datos de prueba para ejecutar casos repetitivos con diferentes entradas.
- **Operaciones por lotes:** Ejecutar una serie de pasos de prueba múltiples veces bajo condiciones o configuraciones variables.


#### **D. Introducción a las funciones**
  **Definición:**  
  Una **función** es un bloque de código reutilizable que realiza una tarea específica. Te permite encapsular lógica bajo un nombre, para poder llamarla (ejecutarla) cuando la necesites, sin repetir el mismo código una y otra vez.

  Piénsalo como una **receta**: una vez escrita, puedes cocinar el plato múltiples veces sin reescribir los pasos.

- **¿Qué son las funciones?**
  - Bloques de código reutilizables diseñados para realizar tareas específicas.
  - Mejoran la modularidad y la organización del código.
- **Declaraciones de función vs. expresiones:**
  - Diferencias en sintaxis y comportamiento de elevación (hoisting).
  - Cuándo usar cada tipo.
- **Parámetros y valores de retorno:**
  - Pasar datos a las funciones y recuperar resultados.
- **Ámbito y closures:**
  - Comprender la accesibilidad de variables dentro de las funciones.
  - Introducción a los closures y su importancia.


  ##### **Estructura de una función (Sintaxis)**

  ```javascript
  function functionName(parameter1, parameter2) {
    // Bloque de código
    return result;
  }
  ```

  ---

  ##### **Parámetros y argumentos**

  - **Parámetros** son marcadores de posición usados al definir una función.
  - **Argumentos** son los valores reales que pasas al llamar a la función.

  ```javascript
  function greetUser(name) {
    console.log("¡Hola, " + name + "!");
  }

  greetUser("Anna"); // Salida: ¡Hola, Anna!
  ```

  ---

  ##### **Valores de retorno**

  Una función puede devolver un resultado usando la palabra clave `return`.

  ```javascript
  function multiply(a, b) {
    return a * b;
  }

  let result = multiply(3, 4); // result = 12
  console.log(result);         // Salida: 12
  ```

  Si no se usa `return`, la función devuelve `undefined`.

  ---

  ##### **Ejemplos simples**

  ✅ **Sumar dos números**
  ```javascript
  function add(x, y) {
    return x + y;
  }

  console.log(add(5, 7)); // Salida: 12
  ```

  ✅ **Comprobar si un número es par**
  ```javascript
  function isEven(num) {
    return num % 2 === 0;
  }

  console.log(isEven(4)); // Salida: true
  console.log(isEven(9)); // Salida: false
  ```

  ✅ **Mostrar información del usuario**
  ```javascript
  function showUserInfo(name, age) {
    console.log(`Nombre: ${name}, Edad: ${age}`);
  }

  showUserInfo("Lucas", 29); // Salida: Nombre: Lucas, Edad: 29
  ```

  ##### **Declaración de función vs. expresión**

  🔹 **Declaración de función**  
  Disponible **antes** de ser definida en el código (debido al hoisting):

  ```javascript
  sayHi();

  function sayHi() {
    console.log("¡Hola!");
  }
  ```

  🔹 **Expresión de función**  
  Asignada a una variable—**no se eleva (no es hoisted)**, por lo que debe definirse primero:

  ```javascript
  const sayBye = function() {
    console.log("¡Adiós!");
  };

  sayBye();
  ```

  ---

  ##### **Bonus: funciones flecha**

  Las funciones flecha son una forma más corta de escribir expresiones de función:

  ```javascript
  const greet = (name) => {
    return `¡Hola, ${name}!`;
  };

  console.log(greet("Sarah"));
  ```

---

##### **Ámbito y closures**

**Definición:**
- **Ámbito:** La accesibilidad de variables y funciones en diferentes partes del código durante la ejecución.
- **Closures:** Una característica de JavaScript donde una función interna tiene acceso a las variables del ámbito de su función externa, incluso después de que la función externa ha terminado de ejecutarse.

**Explicación detallada:**

###### **A. Ámbito:**
1. **Ámbito global:**
   - **Definición:** Las variables declaradas fuera de cualquier función o bloque están en el ámbito global y son accesibles en cualquier parte del código.
   - **Ejemplo:**
     ```javascript
     var globalVar = "¡Soy global!";
     function displayGlobal() {
       console.log(globalVar); // Accesible
     }
     displayGlobal(); // Muestra: ¡Soy global!
     console.log(globalVar); // Accesible
     ```

2. **Ámbito de función:**
   - **Definición:** Las variables declaradas dentro de una función son accesibles solo dentro de esa función y sus funciones anidadas (internas).
   - **Ejemplo:**
     ```javascript
     function outerFunction() {
       var functionVar = "¡Estoy dentro de una función!";
       function innerFunction() {
         console.log(functionVar); // Accesible
       }
       innerFunction();
       console.log(functionVar); // Accesible
     }
     outerFunction();
     console.log(functionVar); // ReferenceError: functionVar is not defined
     ```

3. **Ámbito de bloque:**
   - **Definición:** Las variables declaradas dentro de un bloque (`{}`) usando `let` o `const` son accesibles solo dentro de ese bloque.
   - **Ejemplo:**
     ```javascript
     if (true) {
       let blockVar = "¡Estoy dentro de un bloque!";
       console.log(blockVar); // Accesible
     }
     console.log(blockVar); // ReferenceError: blockVar is not defined
     ```

###### **B. Closures:**
1. **Definición:**
   - Un closure se crea cuando una función interna conserva acceso a las variables de su función externa incluso después de que la función externa ha completado su ejecución.

2. **Ejemplo:**
   ```javascript
   function outerFunction() {
     let outerVar = "¡Vengo del ámbito externo!";
     
     function innerFunction() {
       console.log(outerVar); // Accediendo a outerVar
     }
     
     return innerFunction;
   }
   
   const myInnerFunction = outerFunction();
   myInnerFunction(); // Muestra: ¡Vengo del ámbito externo!
   ```

3. **Casos de uso en automatización de pruebas:**
   - **Variables privadas:** Encapsular variables que no deberían ser accesibles globalmente.
   - **Fábricas de funciones:** Crear funciones especializadas con parámetros o comportamientos preconfigurados.

4. **Beneficios:**
   - **Privacidad de datos:** Mantiene ciertas variables ocultas del ámbito global, evitando modificaciones no deseadas.
   - **Funcionalidad mejorada:** Permite crear funciones más versátiles y flexibles que pueden mantener estado a través de múltiples invocaciones.

**Representación visual:**
- **Diagrama de closure:** Ilustra cómo una función interna conserva acceso a las variables de la función externa incluso después de que esta se haya ejecutado.

    
#### **E. Mejores prácticas para estructuras de control y funciones**
- **Legibilidad y mantenibilidad:**
  - Escribir estructuras de control claras y comprensibles.
  - Mantener las funciones enfocadas y con un solo propósito.
- **Evitar anidamiento profundo:**
  - Estrategias para prevenir indentación y complejidad excesivas.
- **Convenciones de nombres:**
  - Nombres descriptivos para funciones y variables que transmitan intención.
- **Principio DRY (Don't Repeat Yourself):**
  - Reducir la duplicación de código aprovechando funciones y bucles de manera eficaz.



##### **Ejemplos de código para "Mejores prácticas para estructuras de control y funciones"**

Implementar buenas prácticas asegura que tu código sea limpio, mantenible y eficiente. A continuación, algunos ejemplos de código que demuestran estas prácticas en el contexto de estructuras de control y funciones.

##### **A. Legibilidad y mantenibilidad**

**Mala práctica: anidamiento profundo**
```javascript
if (isUserLoggedIn) {
  if (user.hasPermission) {
    if (user.isActive) {
      performSensitiveOperation();
    }
  }
}
```

**Buena práctica: retornos tempranos para reducir anidamiento**
```javascript
function performOperation(user) {
  if (!user.isLoggedIn) return;
  if (!user.hasPermission) return;
  if (!user.isActive) return;
  
  performSensitiveOperation();
}
```

##### **B. Mantener funciones enfocadas y de un solo propósito**

**Mala práctica: función que hace múltiples tareas**
```javascript
function processUserData(user) {
  // Validar usuario
  if (!user.email) {
    console.log("Usuario inválido");
    return;
  }
  
  // Guardar usuario en la base de datos
  database.save(user);
  
  // Enviar correo de bienvenida
  emailService.sendWelcomeEmail(user.email);
}
```

**Buena práctica: funciones separadas para cada tarea**
```javascript
function validateUser(user) {
  if (!user.email) {
    console.log("Usuario inválido");
    return false;
  }
  return true;
}

function saveUser(user) {
  database.save(user);
}

function sendWelcomeEmail(user) {
  emailService.sendWelcomeEmail(user.email);
}

function processUserData(user) {
  if (!validateUser(user)) return;
  saveUser(user);
  sendWelcomeEmail(user);
}
```

##### **C. Evitar anidamiento profundo con cláusulas de guarda**

**Mala práctica: múltiples niveles de condiciones**
```javascript
function checkAccess(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasAccess) {
        grantAccess();
      }
    }
  }
}
```

**Buena práctica: usar cláusulas de guarda**
```javascript
function checkAccess(user) {
  if (!user) return;
  if (!user.isActive) return;
  if (!user.hasAccess) return;
  
  grantAccess();
}
```

##### **D. Usar convenciones de nombres descriptivas**

**Mala práctica: nombres vagos de variables y funciones**
```javascript
function doIt(a, b) {
  if (a > b) {
    return a;
  } else {
    return b;
  }
}

let x = doIt(5, 10);
```

**Buena práctica: nombres descriptivos**
```javascript
function getHigherValue(firstValue, secondValue) {
  if (firstValue > secondValue) {
    return firstValue;
  } else {
    return secondValue;
  }
}

let higherScore = getHigherValue(5, 10);

```

#### **F. Ejemplos prácticos**
- **Implementar lógica condicional en pruebas:**
  - Usar sentencias `if` para manejar diferentes escenarios de prueba.
- **Iterar sobre datos de prueba:**
  - Iterar sobre arrays de entradas de prueba para realizar pruebas basadas en datos.
- **Crear funciones utilitarias:**
  - Escribir funciones para encapsular acciones de prueba repetitivas, mejorando la reutilización.





### **E. Cómo las estructuras de control dirigen el flujo de un programa**

**Escenario de ejemplo: Autenticación de usuario**

Imagina que estás escribiendo un script de prueba para verificar la autenticación de usuario en una aplicación web. Las estructuras de control ayudan a determinar el flujo según diferentes entradas del usuario y estados del sistema.

**Ejemplo de código:**
```javascript
function authenticateUser(username, password) {
  if (!username || !password) {
    console.log("Se requieren nombre de usuario y contraseña.");
    return;
  }

  if (password.length < 6) {
    console.log("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  // Simular autenticación del lado del servidor
  let isAuthenticated = serverAuthenticate(username, password);

  if (isAuthenticated) {
    console.log("¡Usuario autenticado con éxito!");
    // Proceder a otorgar acceso
  } else {
    console.log("Autenticación fallida. Por favor, verifica tus credenciales.");
    // Pedir al usuario que vuelva a intentar o restablezca la contraseña
  }
}

// Función simulada de autenticación del servidor
function serverAuthenticate(username, password) {
  // Para la demostración, cualquier contraseña "password123" se autentica correctamente
  return password === "password123";
}

// Casos de prueba
authenticateUser("testUser", "password123"); // Autenticación exitosa
authenticateUser("testUser", "pass");        // Contraseña demasiado corta
authenticateUser("", "password123");         // Falta nombre de usuario
authenticateUser("testUser", "wrongPass");   // Autenticación fallida
```

**Explicación:**
1. **Comprobaciones iniciales:**
   - Usa sentencias `if` para verificar que se proporcionen tanto el nombre de usuario como la contraseña.
   - Asegura que la contraseña cumpla con los requisitos mínimos de longitud.

2. **Lógica de autenticación:**
   - Llama a `serverAuthenticate` para simular la validación del lado del servidor.
   - Basándose en el resultado, usa otra sentencia `if` para determinar si otorgar acceso o pedir al usuario que intente nuevamente.

3. **Control de flujo:**
   - Dependiendo de las condiciones, el programa dirige el flujo a diferentes bloques de código, asegurando que solo los usuarios válidos y autenticados obtengan acceso.

**Resultado:**
- Demuestra cómo las sentencias `if` y `else` controlan la ejecución del programa según condiciones variables, garantizando procesos de autenticación robustos y seguros.


#### **Ilustraciones y ejemplos reales**

##### **Ilustrar cómo las estructuras de control dirigen el flujo de un programa**

**Escenario de ejemplo: Pruebas automatizadas de envío de formularios**

Imagina que estás escribiendo una prueba de Cypress para automatizar el envío de un formulario de registro de usuario. Las estructuras de control ayudan a gestionar diferentes escenarios de prueba según las entradas del usuario y las respuestas de la aplicación.

**Ejemplo de código:**
```javascript
describe('Formulario de registro de usuario', () => {
  it('Envía el formulario con datos válidos', () => {
    cy.visit('/register');

    // Rellenar el formulario
    cy.get('#username').type('testUser');
    cy.get('#email').type('testuser@example.com');
    cy.get('#password').type('SecurePass123');

    // Comprobación condicional: asegurar que el botón Enviar esté habilitado
    cy.get('#submit').then(($btn) => {
      if (!$btn.is(':disabled')) {
        cy.wrap($btn).click();
      } else {
        throw new Error('El botón Enviar está deshabilitado');
      }
    });

    // Verificar registro exitoso
    cy.contains('¡Registro exitoso!').should('be.visible');
  });

  it('Muestra error con correo inválido', () => {
    cy.visit('/register');

    // Rellenar el formulario con correo inválido
    cy.get('#username').type('testUser');
    cy.get('#email').type('invalid-email');
    cy.get('#password').type('SecurePass123');

    // Intentar enviar el formulario
    cy.get('#submit').click();

    // Comprobación condicional: mostrar mensaje de error si el correo es inválido
    cy.get('.error-message').then(($msg) => {
      if ($msg.is(':visible')) {
        cy.wrap($msg).should('contain', 'Dirección de correo electrónico no válida');
      } else {
        throw new Error('No se mostró el mensaje de error para el correo electrónico no válido');
      }
    });
  });
});
```

**Explicación:**
1. **Sentencias condicionales (`if`):**
   - Antes de hacer clic en el botón de envío, la prueba verifica si el botón no está deshabilitado.
   - Si el botón está habilitado, procede a hacer clic; de lo contrario, lanza un error.

2. **Estructuras de bucle:**
   - Aunque no se muestra explícitamente aquí, los bucles pueden usarse para iterar a través de múltiples casos de prueba o conjuntos de datos, mejorando la cobertura de las pruebas.

3. **Control de flujo:**
   - Dependiendo de la entrada del usuario (correo válido o inválido), la prueba verifica el registro exitoso o comprueba los mensajes de error apropiados, dirigiendo el flujo en consecuencia.

**Resultado:**
- Demuestra cómo las sentencias `if` controlan la ejecución de pruebas según condiciones dinámicas, asegurando que las pruebas respondan adecuadamente a diferentes entradas del usuario y estados de la aplicación.

---
    
### **2. Actividades prácticas: Ejercicios y sugerencias de funcionalidad web**
    
#### **A. Ejercicio de sentencias condicionales**
- **Ejercicio:**
  - Escribe una función de JavaScript que tome la puntuación de un usuario como entrada y asigne una calificación según criterios predefinidos usando `if`, `else if` y `else`.
  - **Ejemplo:**
    ```javascript
    function assignGrade(score) {
      if (score >= 90) {
        return 'A';
      } else if (score >= 80) {
        return 'B';
      } else if (score >= 70) {
        return 'C';
      } else if (score >= 60) {
        return 'D';
      } else {
        return 'F';
      }
    }
    ```
- **Sugerencia de funcionalidad web:**
  - Crea un formulario HTML simple donde los usuarios puedan introducir su puntuación y, al enviarlo, la función de JavaScript calcule y muestre la calificación correspondiente.

#### **B. Ejercicio de iteración sobre arrays**
- **Ejercicio:**
  - Escribe una función de JavaScript que tome un array de números y devuelva un nuevo array que contenga solo los números pares utilizando un bucle `for`.
  - **Ejemplo:**
    ```javascript
    function filterEvenNumbers(numbers) {
      let evenNumbers = [];
      for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
          evenNumbers.push(numbers[i]);
        }
      }
      return evenNumbers;
    }
    ```
- **Sugerencia de funcionalidad web:**
  - Desarrolla una pequeña aplicación web donde los usuarios puedan introducir una lista de números y la aplicación muestre la lista filtrada de números pares usando la función de JavaScript.

#### **C. Ejercicio de creación y uso de funciones**
- **Ejercicio:**
  - Escribe una función de JavaScript que tome dos números como parámetros y devuelva su suma. Luego, usa esta función dentro de un bucle para calcular la suma total de un array de pares de números.
  - **Ejemplo:**
    ```javascript
    function add(a, b) {
      return a + b;
    }

    let pairs = [[1, 2], [3, 4], [5, 6]];
    let totalSum = 0;
    for (let i = 0; i < pairs.length; i++) {
      totalSum += add(pairs[i][0], pairs[i][1]);
    }
    console.log(totalSum); // Muestra: 21
    ```
- **Sugerencia de funcionalidad web:**
  - Implementa una función en una página web donde los usuarios puedan introducir múltiples pares de números, y la aplicación calcule y muestre la suma total usando la función `add` dentro de un bucle.

#### **D. Ejercicio de ámbito y closures**
- **Ejercicio:**
  - Demuestra el concepto de ámbito escribiendo una función dentro de otra función y mostrando cómo son accesibles las variables.
  - **Ejemplo:**
    ```javascript
    function outerFunction() {
      let outerVariable = '¡Estoy afuera!';
      
      function innerFunction() {
        let innerVariable = '¡Estoy adentro!';
        console.log(outerVariable); // Accesible
        console.log(innerVariable); // Accesible
      }
      
      innerFunction();
      console.log(innerVariable); // ReferenceError: innerVariable is not defined
    }

    outerFunction();
    ```
- **Sugerencia de funcionalidad web:**
  - Crea un ejemplo interactivo en una página web que ilustre el ámbito de variables permitiendo a los usuarios ver qué variables son accesibles dentro de diferentes ámbitos de funciones.

---
    
### **3. Posibles preguntas de estudiantes**
    
#### **A. Estructuras de control:**
1. **¿Cuál es la diferencia entre las sentencias `if` y `switch`?**
   - **Respuesta:**  
     Aunque ambas se usan para la ejecución condicional, las sentencias `if` son más versátiles y pueden manejar una gama más amplia de condiciones, incluidas expresiones complejas. Las sentencias `switch` son más concisas cuando se trabaja con múltiples valores discretos de una sola variable o expresión.

2. **¿Cuándo debería usar un bucle `while` en lugar de un bucle `for`?**
   - **Respuesta:**  
     Usa un bucle `while` cuando el número de iteraciones no se conoce de antemano y depende de que se cumpla una condición durante la ejecución. Los bucles `for` son más adecuados cuando el número de iteraciones está predeterminado o puede determinarse fácilmente.

#### **B. Funciones:**
1. **¿Cuál es la diferencia entre una declaración de función y una expresión de función?**
   - **Respuesta:**  
     Las declaraciones de función se elevan (hoisting), lo que significa que se cargan en memoria durante la fase de compilación y pueden llamarse antes de su declaración real en el código. Las expresiones de función no se elevan de la misma manera y no pueden invocarse antes de ser definidas.

2. **¿Se pueden pasar funciones como argumentos a otras funciones?**
   - **Respuesta:**  
     Sí, en JavaScript, las funciones son ciudadanos de primera clase y pueden pasarse como argumentos a otras funciones, devolverse desde funciones y asignarse a variables.

#### **C. Bucles:**
1. **¿Cuál es la diferencia entre los bucles `for...of` y `for...in`?**
   - **Respuesta:**  
     `for...of` se usa para iterar sobre los valores de un objeto iterable (como arrays, strings), mientras que `for...in` se usa para iterar sobre las propiedades enumerables de un objeto.

2. **¿Cómo puedo evitar un bucle infinito en mi código?**
   - **Respuesta:**  
     Asegúrate de que la condición de terminación del bucle se cumpla eventualmente. Gestiona cuidadosamente los contadores y las condiciones del bucle para evitar escenarios donde el bucle continúe indefinidamente.

#### **D. Mejores prácticas:**
1. **¿Por qué es importante mantener funciones enfocadas y de un solo propósito?**
   - **Respuesta:**  
     Las funciones que realizan una sola tarea son más fáciles de entender, probar, depurar y mantener. Promueven la reutilización de código y reducen la complejidad de cada función.

2. **¿Qué significa el principio DRY (Don't Repeat Yourself) en el contexto de escribir funciones?**
   - **Respuesta:**  
     DRY anima a los desarrolladores a evitar la duplicación de código abstrayendo código repetitivo en funciones reutilizables. Esto hace que la base de código sea más limpia y fácil de mantener.

---
    
### **4. Materiales complementarios: Recomendaciones**
    
#### **A. Documentación oficial y guías:**
- **Flujo de control en JavaScript:**
  - [MDN Control Flow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- **Funciones en JavaScript:**
  - [MDN Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- **Bucles en JavaScript:**
  - [MDN Loop Statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
    
#### **B. Tutoriales y artículos:**
- **Estructuras de control en JavaScript:**
  - [W3Schools JavaScript Control Structures](https://www.w3schools.com/js/js_if_else.asp)
- **Entendiendo las funciones en JavaScript:**
  - [FreeCodeCamp Functions](https://www.freecodecamp.org/news/javascript-functions-explained/)
- **Bucles en JavaScript:**
  - [JavaScript Loops Explained](https://www.programiz.com/javascript/for-loop)
    
#### **C. Plataformas de aprendizaje interactivas:**
- **Codecademy:**
  - [Learn JavaScript Control Flow](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-control-flow)
- **FreeCodeCamp:**
  - [JavaScript Control Structures](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/)
- **JavaScript.info:**
  - [JavaScript Control Flow](https://javascript.info/ifelse)
    
#### **D. Tutoriales en video:**
- **Traversy Media:**
  - [JavaScript Control Flow Tutorial](https://www.youtube.com/watch?v=IsG4vegnf10)
- **The Net Ninja:**
  - [JavaScript Functions Tutorial](https://www.youtube.com/watch?v=Y8KqKUxm_8c)
- **Academind:**
  - [JavaScript for Beginners: Functions and Control Flow](https://www.youtube.com/watch?v=PkZNo7MFNFg)
    
#### **E. Plataformas de práctica:**
- **HackerRank:**
  - [JavaScript Control Structures Challenges](https://www.hackerrank.com/domains/tutorials/10-days-of-javascript)
- **LeetCode:**
  - [JavaScript Functions Problems](https://leetcode.com/problemset/all/?search=javascript%20functions)
- **Exercism:**
  - [JavaScript Track - Functions](https://exercism.io/tracks/javascript/exercises)
    
#### **F. Comunidad y soporte:**
- **Stack Overflow:**
  - [JavaScript Control Structures](https://stackoverflow.com/questions/tagged/javascript+control-flow)
  - [JavaScript Functions](https://stackoverflow.com/questions/tagged/javascript+functions)
- **Reddit:**
  - [r/javascript](https://www.reddit.com/r/javascript/)
- **Comunidades en Discord:**
  - Únete a servidores de Discord enfocados en JavaScript para asistencia y discusión en tiempo real.
    
---
    
### **5. Propuesta de desglose de la lección para 3 horas**
    
#### **Hora 1: Introducción a las estructuras de control (60 minutos)**
- **¿Qué son las estructuras de control? (15 minutos):**
  - Visión general de cómo las estructuras de control gestionan el flujo de ejecución.
- **Sentencias condicionales (30 minutos):**
  - Explicación detallada de `if`, `else if`, `else` y `switch`.
  - Ejemplos prácticos relevantes para la automatización de pruebas.
- **Descanso (5 minutos)**
    
#### **Hora 2: Bucles y funciones (60 minutos)**
- **Bucles (25 minutos):**
  - Explicación de diferentes tipos de bucles: `for`, `while`, `do...while`, `for...of`, `for...in`.
  - Casos de uso en pruebas con Cypress, como iterar sobre datos de prueba.
- **Introducción a las funciones (25 minutos):**
  - Declaraciones de función vs. expresiones.
  - Parámetros, valores de retorno y ámbito.
- **Descanso (5 minutos)**
    
#### **Hora 3: Actividades prácticas y preguntas (60 minutos)**
- **Ejercicios prácticos (40 minutos):**
  - **Sentencias condicionales:**
    - Crear una función de asignación de calificaciones usando `if...else if...else`.
  - **Bucles:**
    - Escribir un bucle para filtrar números pares de un array.
  - **Funciones:**
    - Desarrollar una función utilitaria para realizar acciones de prueba repetitivas.
- **Sesión de preguntas y respuestas (20 minutos):**
  - Atender cualquier pregunta de los estudiantes.
  - Aclarar dudas y reforzar los conceptos clave cubiertos en la lección.
    
---
    
### **6. Recomendaciones adicionales**
    
#### **A. Demostraciones interactivas:**
- **Live Coding:**
  - Demostrar en tiempo real cómo escribir sentencias `if...else` y bucles.
  - Mostrar cómo definir e invocar funciones, destacando el ámbito y los parámetros.
- **Depuración con `console.log`:**
  - Usar `console.log` dentro de estructuras de control y funciones para rastrear el flujo de ejecución y los valores de variables.
    
#### **B. Visuales atractivos:**
- **Diagramas de flujo:**
  - Usar diagramas de flujo para ilustrar cómo las estructuras de control dirigen el flujo de un programa.
- **Fragmentos de código:**
  - Presentar ejemplos de código claros y concisos en diapositivas para demostrar conceptos.
- **Diagramas:**
  - Representaciones visuales del ámbito de funciones y la accesibilidad de variables.
    
#### **C. Fomentar la participación:**
- **Programación en parejas:**
  - Hacer que los estudiantes trabajen en parejas para resolver ejercicios, promoviendo la colaboración y el aprendizaje entre pares.
- **Encuestas y cuestionarios en vivo:**
  - Incorporar cuestionarios rápidos para evaluar la comprensión y mantener alta la participación.
    
#### **D. Proporcionar instrucciones claras:**
- **Guías paso a paso:**
  - Ofrecer instrucciones detalladas para cada actividad práctica para asegurar que todos los estudiantes puedan seguirlas.
- **Consejos de resolución de problemas:**
  - Anticipar problemas comunes (por ejemplo, errores de sintaxis en bucles o funciones) y proporcionar soluciones.
    
#### **E. Fomentar un entorno de apoyo:**
- **Animar a hacer preguntas:**
  - Crear un ambiente abierto donde los estudiantes se sientan cómodos pidiendo ayuda.
- **Proporcionar múltiples ejemplos:**
  - Ofrecer varios ejemplos para cada concepto con el fin de atender diferentes estilos de aprendizaje y reforzar la comprensión.