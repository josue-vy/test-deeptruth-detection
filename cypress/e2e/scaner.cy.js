describe('Prueba de carga de archivo en Deeptruth', () => {
    it('Debe navegar al escáner y cargar un archivo', () => {
      // 1. Visita la página principal
      cy.visit('https://deeptruh-detection-cwzzw0dzn-epis.vercel.app/');
  
      // 2. Haz clic en el botón "IR AL ESCÁNER"
      cy.contains('IR AL ESCÁNER').click();
  
      // 3. Verifica que se abrió la página de escaneo
      cy.url().should('include', '/scaner');
      cy.contains('Combate la desinformación').should('be.visible');
  
      // 4. Configura el interceptor antes de cargar el archivo
      cy.intercept('POST', '**/api/face/consult').as('fileUpload');
  
      // 5. Selecciona el botón de cargar archivos y sube un archivo
      cy.get('input[type="file"]').attachFile('prueba.jpg'); // Asegúrate de que el archivo esté en `cypress/fixtures`
  
      // 6. Haz clic en el botón de "Escanear" para iniciar el proceso
      cy.contains('Escanear').click();
  
      // 7. Espera a que la solicitud se complete
      cy.wait('@fileUpload');
  
      // 8. Espera unos segundos y verifica que la URL cambie a '/resultado'
      cy.wait(2000); // Espera extra opcional
      cy.url({ timeout: 10000 }).should('include', '/resultado');
  
      // 9. Verifica que el contenido esperado en la página de resultado sea visible
      cy.contains('Resultado').should('be.visible'); // Ajusta según el contenido esperado
    });
    describe('Prueba de carga de archivo no permitido en Deeptruth', () => {
        it('Debe mostrar un mensaje de error al cargar un archivo PDF o RAR', () => {
          // 1. Visita la página principal
          cy.visit('https://deeptruh-detection-cwzzw0dzn-epis.vercel.app/');
      
          // 2. Haz clic en el botón "IR AL ESCÁNER"
          cy.contains('IR AL ESCÁNER').click();
      
          // 3. Verifica que se abrió la página de escaneo
          cy.url().should('include', '/scaner');
          cy.contains('Combate la desinformación').should('be.visible');
      
          // 4. Selecciona el botón de cargar archivos e intenta subir un archivo PDF
          cy.get('input[type="file"]').attachFile('pruebapdf.pdf'); // Asegúrate de que el archivo esté en `cypress/fixtures`
      
          // 5. Haz clic en el botón de "Escanear" para intentar iniciar el proceso
      
          // 6. Verifica que aparece un mensaje de error o que no se permite subir el archivo
          cy.contains('Solo se permiten archivos de imagen (JPEG, JPG, PNG, WebP)').should('be.visible'); // Ajusta según el mensaje de error esperado
        });
      
        it('Debe mostrar un mensaje de error al cargar un archivo RAR', () => {
          // 1. Visita la página principal
          cy.visit('https://deeptruh-detection-cwzzw0dzn-epis.vercel.app/');
      
          // 2. Haz clic en el botón "IR AL ESCÁNER"
          cy.contains('IR AL ESCÁNER').click();
      
          // 3. Verifica que se abrió la página de escaneo
          cy.url().should('include', '/scaner');
          cy.contains('Combate la desinformación').should('be.visible');
      
          // 4. Selecciona el botón de cargar archivos e intenta subir un archivo RAR
          cy.get('input[type="file"]').attachFile('RO.rar'); // Asegúrate de que el archivo esté en `cypress/fixtures`
      
          // 5. Haz clic en el botón de "Escanear" para intentar iniciar el proceso
      
          // 6. Verifica que aparece un mensaje de error o que no se permite subir el archivo
          cy.contains('Solo se permiten archivos de imagen (JPEG, JPG, PNG, WebP)').should('be.visible'); // Ajusta según el mensaje de error esperado
        });
      });
      
  });
  