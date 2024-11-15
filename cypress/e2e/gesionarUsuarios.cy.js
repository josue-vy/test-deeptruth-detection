describe('Prueba de gestión de usuarios en Deeptruth', () => {
    it('debe iniciar sesión con correo y contraseña', () => {
        // Visitar la página de inicio
        cy.visit('https://deeptruh-detection-9910lufeu-epis.vercel.app/');
        
        // Iniciar sesión como administrador
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

        // Verificar que la pestaña "Gestionar Usuarios" sea visible y hacer clic
        cy.contains('Gestionar Usuarios').should('be.visible').click();

        // Esperar la redirección a la página de gestión de usuarios y verificar el contenido
        cy.url().should('include', '/gestionarUsuarios');
        cy.contains('GESTIONAR USUARIOS').should('be.visible');

        // Verificar que la lista de usuarios esté presente
        cy.get('.bg-gray-300.shadow-lg').should('have.length.at.least', 1); // Verifica que haya al menos un usuario
        cy.get('.bg-gray-300.shadow-lg').each(($user) => {
            cy.wrap($user).should('be.visible'); // Cada usuario debería ser visible
            cy.wrap($user).within(() => {
                cy.get('span').should('contain.text', 'Usuario'); // Verifica que contenga texto que indique el usuario
                cy.get('p').should('not.be.empty'); // Verifica que el comentario no esté vacío
            });
        });
    });
    describe('Funcionalidad de Generar Gráfico', () => {
        beforeEach(() => {
            // Visitar la página e iniciar sesión
            cy.visit('https://deeptruh-detection-9910lufeu-epis.vercel.app/');
            cy.get('button').contains('Iniciar Sesión').click();
            cy.get('#email').type('admin@gmail.com');
            cy.get('#password').type('123456');
            cy.get('form').within(() => {
              cy.get('button').contains('Iniciar Sesión').click();
            });
        
            // Navegar a la página de 'Gestionar Usuarios'
            cy.contains('Gestionar Usuarios').click();
            cy.url().should('include', '/gestionarUsuarios');
          });
        
          it('debe hacer clic en el botón "Generar gráfico"', () => {
            // Hacer clic en el botón "Generar gráfico"
            cy.contains('Generar gráfico').click();
        
            // Esperar un tiempo para que el gráfico se cargue (ajustar si es necesario)
            cy.wait(5000);
          });
        });
    });