describe('Prueba de carga de archivo en Deeptruth', () => {
    it('Debe navegar al escáner y cargar un archivo', () => {
      cy.visit('https://deeptruh-detection-nvc4abqpb-epis.vercel.app/');
      cy.contains('IR AL ESCÁNER').click();
      cy.url().should('include', '/scaner');
      cy.contains('Combate la desinformación').should('be.visible');
      cy.intercept('POST', '**/api/face/consult').as('fileUpload');
      cy.get('input[type="file"]').attachFile('prueba.jpg');
      cy.contains('Escanear').click();
      cy.wait('@fileUpload');
    });
    describe('Prueba de carga de archivo no permitido en Deeptruth', () => {
        it('Debe mostrar un mensaje de error al cargar un archivo PDF', () => {
          cy.visit('https://deeptruh-detection-nvc4abqpb-epis.vercel.app/');     
          cy.contains('IR AL ESCÁNER').click();    
          cy.url().should('include', '/scaner');
          cy.contains('Combate la desinformación').should('be.visible');    
          cy.get('input[type="file"]').attachFile('pruebapdf.pdf');   
          cy.contains('Solo se permiten archivos de imagen (JPEG, JPG, PNG, WebP)').should('be.visible');
        });
      
        it('Debe mostrar un mensaje de error al cargar un archivo RAR', () => {
          cy.visit('https://deeptruh-detection-nvc4abqpb-epis.vercel.app/');  
          cy.contains('IR AL ESCÁNER').click();
          cy.url().should('include', '/scaner');
          cy.contains('Combate la desinformación').should('be.visible');
          cy.get('input[type="file"]').attachFile('RO.rar');
          cy.contains('Solo se permiten archivos de imagen (JPEG, JPG, PNG, WebP)').should('be.visible');
        });
      });
      
  });
  