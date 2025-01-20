export const editRekeningPegawai = () => {
    cy.get('table tbody tr')               
    .its('length')                        
    .then((length) => {
        const randomIndex = Cypress._.random(0, length - 1); 
        cy.get('#table_ModelPegawaiRekening table tbody tr td div.list-icons')           
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
    cy.get('#modal_ModelPegawaiRekening').should('be.visible');
    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    cy.get('input[name="Nama"]').eq(4).clear().type(`John Rek-${randomString(5)}`);
    cy.get('span.select2[data-select2-id="12"]').should('exist').click();
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
    cy.get('input[name="NoRekening"]').clear().type(randomNumber(10));

    cy.get('input#Aktif').as('checkbox'); // Berikan alias pada checkbox untuk digunakan selanjutnya

    // Tentukan secara acak apakah akan memeriksa atau tidak
    const shouldCheck = Math.random() > 0.5; // 50% kemungkinan untuk memeriksa atau tidak
    const shouldCheckPrioritas = Math.random() > 0.8;

    if (shouldCheck) {
      // Memeriksa checkbox jika kondisi acak terpenuhi
      cy.get('@checkbox').check().should('be.checked');
    } else {
      // Pastikan checkbox tidak diperiksa jika kondisi acak tidak terpenuhi
      cy.get('@checkbox').uncheck().should('not.be.checked');
    }
    cy.get('input#Prioritas').as('checkboxPrioritas'); // Berikan alias pada checkbox untuk digunakan selanjutnya

    if (shouldCheckPrioritas) {
      // Memeriksa checkbox jika kondisi acak terpenuhi
      cy.get('@checkboxPrioritas').check().should('be.checked');
    } else {
      // Pastikan checkbox tidak diperiksa jika kondisi acak tidak terpenuhi
      cy.get('@checkboxPrioritas').uncheck().should('not.be.checked');
    }
    cy.get('#modal_ModelPegawaiRekening form').first().within(() => {
        cy.get('button[type="submit"]').first().click();
    });
};