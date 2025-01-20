export const editHobiPegawai = () => {
    cy.contains('Pegawai Hobi').should('be.visible');
    cy.get('table tbody tr')               
    .its('length')                        
    .then((length) => {
        const randomIndex = Cypress._.random(0, length - 1); 
        cy.get('#table_ModelPegawaiHobi table tbody tr td div.list-icons')           
        .first()               
        .find('div.dropdown')            
        .within(() => {
            //  cy.get('a.list-icons-item')
            // .scrollIntoView() // Scroll the element into view
            // .should('be.visible') // Check that it's visible
            // .click();      
            // cy.get('a.list-icons-item').invoke('css', 'overflow', 'visible'); // Temporarily modify the CSS
            cy.get('a.list-icons-item')
            .click();   
            cy.get('a.dropdown-item')    
            .contains('Edit')           
            .click();                   
        });
    });
    cy.get('#modal_ModelPegawaiHobi').should('be.visible');
    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    cy.get('input[name="Nama"]').eq(2).clear().type(`Hobiku ${randomString(5)}`);
    cy.get('#modal_ModelPegawaiHobi form').first().within(() => {
        cy.get('button[type="submit"]').first().click();
    });
};