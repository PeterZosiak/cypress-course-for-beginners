## **Lección 9: Trabajo con fixtures y gestión de datos de prueba**

#### **A. Uso de fixtures**

##### **¿Por qué es importante la gestión de datos?**

1. **Consistencia y fiabilidad:**
   - **Datos de prueba centralizados:** Almacenar los datos de prueba en fixtures o archivos externos garantiza que las pruebas se ejecuten con conjuntos de datos consistentes y controlados. Esto reduce el riesgo de pruebas inestables debido a variaciones en los datos.
   - **Resultados reproducibles:** Con datos bien gestionados, cada ejecución de prueba es reproducible, lo que facilita diagnosticar problemas cuando fallan.

2. **Mantenibilidad:**
   - **Separación de datos y lógica:** Al desacoplar los datos de prueba del código de las pruebas, actualizar o modificar entradas se vuelve más sencillo sin alterar el código subyacente.
   - **Actualizaciones más fáciles:** Cuando cambian los modelos de datos de la aplicación, solo es necesario actualizar las fixtures o archivos de datos, no cada prueba que los utiliza.

3. **Escalabilidad:**
   - **Manejo de múltiples escenarios:** La gestión de datos permite parametrizar fácilmente las pruebas, para que la misma lógica se ejecute con distintos conjuntos de datos. Esto favorece las pruebas basadas en datos y ayuda a cubrir más casos límite.
   - **Organización de pruebas simplificada:** Los datos estructurados favorecen una mejor organización, permitiendo agrupar pruebas relacionadas y ejecutar subconjuntos según sea necesario.

4. **Eficiencia en la automatización:**
   - **Simulación (mock) de servicios externos:** Para pruebas de API, las fixtures ayudan a simular respuestas del backend, haciendo que las pruebas sean independientes de sistemas externos en vivo.
   - **Generación dinámica de datos:** Integrar herramientas como Faker permite generar datos únicos sobre la marcha, evitando conflictos (p. ej., cuentas de usuario duplicadas) y asegurando que cada prueba se ejecute en un contexto limpio.


1. **Creación de archivos de fixture (JSON):**
   - **Definición:**  
     Las fixtures son archivos de datos externos (comúnmente en formato JSON) que almacenan los datos de prueba por separado del código de las pruebas.
   - **Propósito:**  
     - Mantener los datos de prueba organizados y reutilizables.  
     - Facilitar el mantenimiento y las actualizaciones sin modificar los scripts de prueba.
   - **Fixture de ejemplo:**  
     Crea un archivo `users.json` en la carpeta `cypress/fixtures`:
     ```json
     [
       { "username": "demoUser", "password": "demoPass", "role": "admin" },
       { "username": "userOne", "password": "passOne", "role": "user" }
     ]
     ```

2. **Cargar datos de fixtures en las pruebas (cy.fixture()):**
   - **Uso:**  
     `cy.fixture()` carga datos de la fixture, que luego pueden usarse dentro de la prueba.
   - **Ejemplo:**
     ```javascript
     cy.fixture('users').then((users) => {
       // Usar los datos de la fixture (p. ej., iterar sobre usuarios para realizar pruebas de inicio de sesión)
       expect(users).to.have.length.above(0);
     });
     ```

3. **Estructurar fixtures para su reutilización:**
   - **Buenas prácticas:**  
     - Organiza las fixtures en archivos lógicos (p. ej., archivos separados para usuarios, productos, configuraciones).  
     - Usa nombres de archivo claros y descriptivos.  
     - Si los datos son jerárquicos, anida los objetos en consecuencia.
   - **Consejo:**  
     Estructura las fixtures para reflejar diferentes escenarios de prueba (datos válidos, inválidos, casos límite).

---


#### **B. Manejo dinámico de datos**

1. **Generar datos aleatorios para pruebas:**
   - **Propósito:**  
     - Probar cómo tu aplicación maneja entradas impredecibles o únicas.  
     - Evitar colisiones de datos en pruebas que puedan ejecutarse repetidamente.
   - **Enfoque:**  
     Usa funciones de JavaScript o bibliotecas (como Faker.js) para generar cadenas, números, fechas, etc., aleatorios.
   - **Ejemplo:**
     ```javascript
     function getRandomString(length) {
       const chars = 'abcdefghijklmnopqrstuvwxyz';
       let result = '';
       for (let i = 0; i < length; i++) {
         result += chars.charAt(Math.floor(Math.random() * chars.length));
       }
       return result;
     }

     const randomUsername = `user_${getRandomString(5)}`;
     cy.log(randomUsername);
     ```


### **¿Por qué es importante usar Faker?**

1. **Generación de datos de prueba únicos y realistas:**
   - **Evitar colisiones:**  
     - Faker genera datos aleatorios y realistas (p. ej., nombres, correos, direcciones), asegurando que las pruebas no tengan conflictos como nombres de usuario duplicados.
   - **Realismo:**  
     - Datos de prueba que imitan de cerca a los reales ayudan a simular escenarios de usuario con mayor precisión.

2. **Datos dinámicos para parametrización:**
   - **Pruebas basadas en datos:**  
     - Al integrar Faker, las pruebas pueden generar datos de entrada dinámicamente en cada ejecución, admitiendo escenarios donde se aplica la misma lógica con diferentes entradas.
   - **Escalabilidad:**  
     - A medida que crece tu suite de pruebas, Faker facilita generar grandes volúmenes de datos de prueba sin mantener manualmente extensos archivos estáticos.

3. **Mejor aislamiento de pruebas:**
   - **Ejecuciones de prueba independientes:**  
     - Con datos únicos generados sobre la marcha, es menos probable que las pruebas interfieran entre sí. Esto es especialmente importante en entornos de CI donde las pruebas pueden ejecutarse en paralelo.

4. **Facilidad de uso:**
   - **API sencilla:**  
     - La API de Faker es directa, lo que facilita generar varios tipos de datos con pocas líneas de código.
   - **Integración:**  
     - Funciona bien con Cypress; puedes llamar funciones de Faker en tus scripts de prueba para generar datos durante la ejecución.

**Ejemplo usando Faker:**

```javascript
// Instala faker con: npm install --save-dev @faker-js/faker
import { faker } from '@faker-js/faker';

const randomUsername = faker.internet.userName();
const randomEmail = faker.internet.email();

cy.log(`Nombre de usuario generado: ${randomUsername}`);
cy.log(`Correo electrónico generado: ${randomEmail}`);

// Usa estos valores en una prueba, por ejemplo, para crear un nuevo usuario.
cy.get('[data-testid="username-input"]').type(randomUsername);
cy.get('[data-testid="email-input"]').type(randomEmail);
```

2. **Parametrizar pruebas con diferentes conjuntos de datos:**
   - **Uso:**  
     Ejecuta la misma lógica de prueba con múltiples conjuntos de datos provenientes de fixtures o generados dinámicamente.
   - **Ejemplo:**  
     Itera sobre un arreglo de usuarios (desde una fixture) para ejecutar pruebas de inicio de sesión:
     ```javascript
     cy.fixture('users').then((users) => {
       users.forEach((user) => {
         cy.get('[data-testid="username-input"]').clear().type(user.username);
         cy.get('[data-testid="password-input"]').clear().type(user.password);
         cy.get('[data-testid="login-button"]').click();
         // Agrega aserciones aquí según los resultados esperados
       });
     });
     ```

---


### **2. Actividades prácticas**

1. **Creación y uso de fixtures:**
   - **Actividad:**  
     Crea un archivo JSON (p. ej., `users.json`) que contenga múltiples objetos de usuario.  
     Escribe una prueba de Cypress que cargue esta fixture y verifique que el arreglo de usuarios contenga datos válidos.

2. **Generación dinámica de datos:**
   - **Actividad:**  
     Escribe una función utilitaria que genere datos de usuario aleatorios (p. ej., nombre de usuario, correo).  
     Usa estos datos dinámicos en una prueba para crear un nuevo usuario y validar el proceso.

3. **Parametriza una prueba:**
   - **Actividad:**  
     Usa un archivo de fixture para ejecutar la misma prueba de inicio de sesión para múltiples usuarios.  
     Valida que la aplicación responda correctamente para cada escenario de usuario.

---

### **3. Recursos**

- **Documentación de fixtures de Cypress:**  
  [Cypress Fixtures](https://docs.cypress.io/api/commands/fixture)
- **Archivos de fixture de ejemplo y ejemplos de datos de prueba:**  
  Explora ejemplos en GitHub o en la documentación de Cypress para un uso práctico.
- **Bibliotecas de datos dinámicos:**  
  Considera usar bibliotecas como [Faker.js](https://www.npmjs.com/package/faker) para generar datos de prueba aleatorios.