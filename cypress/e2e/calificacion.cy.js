describe('Prueba de carga de archivo y calificación en Deeptruth', () => {
    it('Debe permitir la calificación y el comentario', () => {
        cy.visit('https://deeptruh-detection-nvc4abqpb-epis.vercel.app/');
        cy.contains('IR AL ESCÁNER').click();
        cy.url().should('include', '/scaner');
        cy.contains('Combate la desinformación').should('be.visible');
        cy.intercept('POST', '**/api/face/consult').as('fileUpload');
        cy.get('input[type="file"]').attachFile('prueba.jpg');
        cy.contains('Escanear').click();
        cy.wait('@fileUpload');
        cy.url({ timeout: 10000 }).should('include', '/resultado');
        cy.contains('Resultado').should('be.visible');
        cy.get('.flex .cursor-pointer').eq(4).click();
        cy.get('.fixed.inset-0').should('be.visible');
        cy.get('.fixed.inset-0 textarea').type('Muy buena precisión en la detección.');
        cy.intercept('POST', '**/api/ratings').as('ratingSubmit');
        cy.get('.fixed.inset-0 button').contains('Enviar').click();
        cy.get('.fixed.inset-0').should('not.exist');
        cy.contains('¡Comentario enviado correctamente!').should('be.visible');
    });
});
