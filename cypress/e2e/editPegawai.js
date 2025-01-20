export const editPegawai = () => {
    cy.get('table tbody tr')                // Select all rows in the table body
    .its('length')                        // Get the number of rows
    .then((length) => {
        const randomIndex = Cypress._.random(0, length - 1); // Generate a random index
        cy.get('table tbody tr')           // Select all rows again
        .eq(randomIndex)                 // Select the row at the random index
        .find('div.dropdown')            // Find the dropdown within that row
        .within(() => {
            cy.get('a.list-icons-item')   // Find the dropdown toggle link
            .click()                   // Click the dropdown toggle
            cy.get('a.dropdown-item')     // Find the dropdown items within the dropdown
            .contains('Edit')          // Find the "Edit" button by text
            .click();                  // Click the Edit button
        });
    });
    cy.get('#modal_ModelPegawai').should('be.visible');
    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    const randomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; 
    };

    cy.get('input[name="Nama"]').clear().type(`Steven ${randomString(5)}`); 
    cy.get('input[name="Email"]').clear().type(`Steven${randomString(5)}@example.com`); 
    cy.get('input[name="TanggalLahir"]').type(randomDate(new Date(1970, 0, 1), new Date(2005, 0, 1))); 

    cy.get('input[name="TempatLahir"]').clear().type(randomString(6)); 
    cy.get('textarea[name="AlamatKTP"]').clear().type(`Jl. Cinta No. ${randomNumber(3)}`); 
    cy.get('textarea[name="AlamatDomisili"]').clear().type(`Jl. Cinta No. ${randomNumber(3)}`);
    cy.get('input[name="NoKTP"]').clear().type(randomNumber(10)); 
    cy.get('input[name="NoKK"]').clear().type(randomNumber(10)); 
    cy.get('input[name="NoBPJSKesehatan"]').clear().type(randomNumber(12)); 
    cy.get('input[name="NoBPJSTK"]').clear().type(randomNumber(12)); 
    cy.get('input[name="NoNPWP"]').clear().type(randomNumber(12)); 
    cy.get('input[name="NIP"]').clear().type(randomNumber(9)); 
    // cy.get('input[name="TanggalMulaiBekerja"]').clear().type(randomDate(new Date(2020, 0, 1), new Date()));
    cy.get('input[name="TanggalSelesaiBekerja"]').clear().type(randomDate(new Date(), new Date(2030, 11, 31)));

    const statusOptions = ['Belum Kawin', 'Kawin'];
    const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    cy.get('select[name="StatusPerkawinan"]').select(randomStatus); 

    const statusOptionGender = ['Laki-laki', 'Perempuan'];
    const randomStatusGender = statusOptionGender[Math.floor(Math.random() * statusOptionGender.length)];
    cy.get('select[name="JenisKelamin"]').select(randomStatusGender); 

    // Simplify the Select2 dropdown interactions
    const select2Selectors = [
      'span.select2[data-select2-id="2"]',
      'span.select2[data-select2-id="8"]',
      'span.select2[data-select2-id="4"]',
      'span.select2[data-select2-id="10"]',
      'span.select2[data-select2-id="6"]',
      'span.select2[data-select2-id="12"]'
    ];

    select2Selectors.forEach(selector => {
      cy.get(selector).click();
      cy.wait(1000);
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
    });
    cy.get('#modal_ModelPegawai form').first().within(() => {
        cy.get('button[type="submit"]').first().click();
    });
    
};
