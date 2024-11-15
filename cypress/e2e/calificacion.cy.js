describe('Prueba de carga de archivo y calificación en Deeptruth', () => {
    beforeEach(() => {
        // Configurar la respuesta del servidor para evitar problemas de CORS
        cy.intercept('OPTIONS', '*', {
            statusCode: 200,
            headers: {
                'access-control-allow-origin': '*',
                'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'access-control-allow-headers': '*'
            }
        });
    });

    it('Debe permitir la calificación y el comentario', () => {
        // Visitar la página inicial
        cy.visit('https://deeptruh-detection-nvc4abqpb-epis.vercel.app/');
        
        // Navegar al escáner
        cy.contains('IR AL ESCÁNER').click();
        cy.url().should('include', '/scaner');
        cy.contains('Combate la desinformación').should('be.visible');
        
        // Interceptar la petición de carga de archivo
        cy.intercept('POST', 'https://apideep.sytes.net/api/face/consult').as('fileUpload');
        
        // Cargar archivo
        cy.get('input[type="file"]').attachFile('prueba.jpg');
        cy.contains('Escanear').click();
        
        // Esperar respuesta con timeout extendido
        cy.wait('@fileUpload', { timeout: 30000 });
        
        // Verificar redirección y resultados
        cy.url({ timeout: 10000 }).should('include', '/resultado');
        cy.contains('Resultado').should('be.visible');
        
        // Abrir modal de calificación
        cy.get('.flex .cursor-pointer').eq(4).click();
        cy.get('.fixed.inset-0').should('be.visible');
        
        // Escribir comentario
        cy.get('.fixed.inset-0 textarea').type('Muy buena precisión en la detección.');
        
        // Interceptar petición de calificación
        cy.intercept('POST', 'https://sql-bd-deeptruth-detection.onrender.com/backend//post-rating').as('ratingSubmit');
        
        // Enviar calificación
        cy.get('.fixed.inset-0 button').contains('Enviar').click();
    });
});
