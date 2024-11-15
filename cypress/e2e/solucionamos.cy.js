describe('Navegación a la pestaña Solucionamos', () => {
    it('debe cargar la página principal y navegar a Solucionamos', () => {
      // Visitar la página principal
      cy.visit('https://deeptruh-detection-9910lufeu-epis.vercel.app/');
      
      // Verificar que la página principal cargó correctamente
      cy.url().should('eq', 'https://deeptruh-detection-9910lufeu-epis.vercel.app/');
      cy.contains('¡Detecta Deepfakes y Protege tu Seguridad!').should('be.visible'); // Ajustar según texto distintivo de la página principal
      
      // Hacer clic en el enlace o botón para ir a "Solucionamos"
      cy.contains('Soluciones').click();
      
      // Verificar que la URL cambió a la sección "Solucionamos"
      cy.url().should('include', '/solucionamos');
      
      // Verificar que el contenido de la página "Solucionamos" se muestra correctamente
      cy.contains('Soluciones').should('be.visible'); // Ajustar según el contenido de la página "Solucionamos"
    });
  });
  