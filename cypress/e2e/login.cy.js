describe('Pruebas de Autenticación en Deeptruth Detection', () => {
  beforeEach(() => {
    cy.visit('https://deeptruh-detection-nvc4abqpb-epis.vercel.app/');
    cy.wait(1000);
  });

  it('debería cargar la página del proyecto', () => {
    cy.contains('¡Detecta Deepfakes y Protege tu Seguridad!');
    cy.wait(1000);
  });
  it('debería iniciar sesión con Google (mock)', () => {
    cy.intercept('GET', '**/identitytoolkit.googleapis.com/v1/projects*', {
      statusCode: 200,
      body: { idToken: 'fake-id-token' }
    }).as('googleAuth');
    cy.get('button').contains('Iniciar Sesión').click();
    cy.wait(1000);
    cy.get('button').contains('Iniciar Sesión con Google').click();
    cy.wait('@googleAuth');
    cy.wait(1000);
    cy.contains('Cerrar Sesión').should('be.visible');
    cy.wait(1000);
  });
  it('debería iniciar sesión con correo y contraseña', () => {
    cy.get('button').contains('Iniciar Sesión').click();
    cy.wait(1000);
    cy.get('form').should('be.visible');
    cy.get('#email').type('admin@gmail.com');
    cy.wait(500);
    cy.get('#password').type('123456');
    cy.wait(500);
    cy.get('form').within(() => {
      cy.get('button').contains('Iniciar Sesión').click();
    });

    cy.wait(1000);
  });

  it('debería cerrar sesión correctamente', () => {
    cy.get('button').contains('Iniciar Sesión').click();
    cy.wait(1000);
    cy.get('#email').type('admin@gmail.com');
    cy.wait(500);
    cy.get('#password').type('123456');
    cy.wait(500);
    cy.get('form').within(() => {
      cy.get('button').contains('Iniciar Sesión').click();
    });

    cy.contains('Detecta Deepfakes y Protege tu Seguridad').should('be.visible');
    cy.wait(1000);
    cy.get('button').contains('Cerrar Sesión').click();
    cy.wait(1000);
    cy.get('button').contains('Iniciar Sesión').should('be.visible');
    cy.wait(1000);
  });
});
