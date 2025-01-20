export const editSertifikasiPegawai = () => {
    cy.contains('Pegawai Sertifikasi').should('be.visible');
    cy.get('table tbody tr')               
    .its('length')                        
    .then((length) => {
        const randomIndex = Cypress._.random(0, length - 1); 
        cy.get('table tbody tr td div.list-icons')           
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
    
    cy.get('#modal_ModelPegawaiSertifikasi').should('be.visible');
    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    const randomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; 
    };
    cy.get('input[name="Nama"]').first().clear().type(`Sertifikat PKL ${randomString(5)}`);
    cy.get('input[name="NoSertifikasi"]').clear().type(randomNumber(10));
    cy.get('input[name="Tanggal"]').eq(0).type(randomDate(new Date(2020, 0, 1), new Date()));
    cy.get('input[name="BerlakuSampai"]').eq(0).type(randomDate(new Date(), new Date(2030, 11, 31)));
    cy.get('span.select2[data-select2-id="2"]').should('exist').click();
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
    cy.get('#modal_ModelPegawaiSertifikasi form').first().within(() => {
        cy.get('button[type="submit"]').first().click();
    });
};  