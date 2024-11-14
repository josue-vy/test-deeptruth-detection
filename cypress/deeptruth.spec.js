describe('Prueba de Deeptruth Detection', () => {
    it('debería cargar la página del proyecto', () => {
      cy.visit('https://deeptruh-detection-cwzzw0dzn-epis.vercel.app/');
      cy.contains('hola');
    });
  });
  