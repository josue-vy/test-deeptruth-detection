describe('Prueba de carga de archivo en Deeptruth', () => {
    it('Debe cargar un archivo y mostrar el resultado', () => {
      cy.visit('https://deeptruh-detection-nvc4abqpb-epis.vercel.app/');
  
      cy.contains('IR AL ESCÁNER').click();
      cy.url().should('include', '/scaner');
      cy.contains('Combate la desinformación').should('be.visible');
      cy.intercept('POST', '**/api/face/consult').as('fileUpload');
      cy.get('input[type="file"]').attachFile('prueba.jpg');
      cy.contains('Escanear').click();
      cy.wait('@fileUpload');
      cy.wait(2000);
      cy.url({ timeout: 10000 }).should('include', '/resultado');
      cy.contains('Resultado').should('be.visible');
    });
});
      