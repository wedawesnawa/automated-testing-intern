export const deleteRiwayatPendidikanPegawai = () => {
    cy.get('table tbody tr')               
    .its('length')                        
    .then((length) => {
        const randomIndex = Cypress._.random(0, length - 1); 
        cy.get('#table_ModelPegawaiRiwayatPendidikan table tbody tr td div.list-icons')           
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
            .contains('Delete')           
            .click();                  
        });
    });
    cy.get('#mahas_modal_dialog').should('be.visible');
    cy.get('button.btn.btn-warning.mahas-modal-dialog-yes').click();
};