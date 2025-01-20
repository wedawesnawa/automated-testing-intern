export const editJenisKontrakPegawai = () => {
    // cy.contains('Pegawai Jenis Kontak').should('be.visible');
    cy.get('table tbody tr')               
    .its('length')                        
    .then((length) => {
        const randomIndex = Cypress._.random(0, length - 1); 
        cy.get('#table_ModelPegawaiJenisKontak table tbody tr td div.list-icons')           
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
    cy.get('#modal_ModelPegawaiJenisKontak').should('be.visible');
    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    cy.get('span.select2[data-select2-id="6"]').should('exist').click();
    cy.wait(2000);
    cy.get('ul.select2-results__options', { timeout: 10000 }).should('be.visible');
    cy.get('ul.select2-results__options li.select2-results__option').should('have.length.greaterThan', 1)
    .then(($options) => {
        if ($options.length === 0) {
            throw new Error('No options found');
        }
        const numOptions = $options.length;
        const randomIndex = Math.floor(Math.random() * numOptions);
        cy.wrap($options[randomIndex]).click();
    });
    cy.get('input[name="Nama"]').eq(3).clear().type(`Sanata system v-${randomString(5)}`);
    cy.get('#modal_ModelPegawaiJenisKontak form').first().within(() => {
        cy.get('button[type="submit"]').first().click();
    });
};