export const editKeluargaPegawai = () => {
    cy.contains('Pegawai Keluarga').should('be.visible');
    cy.get('table tbody tr')               
    .its('length')                        
    .then((length) => {
        const randomIndex = Cypress._.random(0, length - 1); 
        cy.get('#table_ModelPegawaiKeluarga table tbody tr td div.list-icons')           
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
    cy.get('#modal_ModelPegawaiKeluarga').should('be.visible');
    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    const randomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; 
    };

    cy.get('input[name="Nama"]').eq(1).clear().type(`Saudaranya John ${randomString(5)}`);
    cy.get('textarea[name="AlamatDomisili"]').clear().type(`Jl. Domisili No. ${randomNumber(3)}`);
    cy.get('input[name="NoBPJS"]').clear().type(randomNumber(12)); 
    cy.get('input[name="NoBPJSTK"]').clear().type(randomNumber(12));
    const statusOptionGender = ['Laki-laki', 'Perempuan'];
    const randomStatusGender = statusOptionGender[Math.floor(Math.random() * statusOptionGender.length)];
    cy.get('select[name="JenisKelamin"]').select(randomStatusGender);  

    cy.get('span.select2[data-select2-id="4"]').should('exist').click();
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

    cy.get('input.form-check-input.mahas-formula').then($checkbox => {
    if ($checkbox.is(':checked')) {
        // If the checkbox is checked, uncheck it
        cy.wrap($checkbox).uncheck();
    } else {
        // If the checkbox is unchecked, check it
        cy.wrap($checkbox).check();
    }
    });
    cy.get('table.table-detail tbody tr').each(($row) => {
    // Check if the row contains a delete button
    if ($row.find('button.btn-danger').length > 0) {
        // Click the delete button within this row
        cy.wrap($row).find('button.btn-danger').click();
    }
    });
    cy.get('button').filter('[onclick="itable_detail.openModal()"]').click();
    cy.get('#modalLookup_jeniskontak').should('be.visible');
    cy.get('#modalLookup_jeniskontak table.table tbody td').filter((index, element) => {
      return Cypress.$(element).text().includes('Phone');
    }).first().click();
    cy.contains('button', 'OK').click();
    cy.get('table.table.table-bordered.table-xs.table-striped.table-detail.table-column.mahas-formula')
      .within(() => {
        cy.get('input.form-control.mahas-formula[data-name="Nama"]').clear().type(`Saudaranya John ${randomString(5)}`);
        
      });
    cy.get('#modal_ModelPegawaiKeluarga form').first().within(() => {
        cy.get('button[type="submit"]').first().click();
    });
    
};