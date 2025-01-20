export const editRiwayatPendidikanPegawai = () => {
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
            .contains('Edit')           
            .click();                   
        });
    });
    cy.get('#modal_ModelPegawaiRiwayatPendidikan').should('be.visible');
    cy.wait(3000);
    cy.get('span.select2[data-select2-id="8"]').should('exist').click();
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
    cy.get('span.select2[data-select2-id="10"]').should('exist').click();
    cy.wait(3000);
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

    cy.get('select#DariTahun').as('yearDropdown'); // Gunakan alias untuk kemudahan

    // Dapatkan semua opsi yang ada di dropdown
    cy.get('@yearDropdown').find('option').then(($options) => {
      // Pilih opsi secara acak
      const randomIndex = Math.floor(Math.random() * $options.length);
      const randomValue = $options[randomIndex].value;

      // Pilih opsi berdasarkan nilai acak
      cy.get('@yearDropdown').select(randomValue);

      // Verifikasi bahwa opsi yang dipilih benar
      cy.get('@yearDropdown').should('have.value', randomValue);
    });

    cy.get('select#SampaiTahun').as('yearDropdown1'); // Gunakan alias untuk kemudahan

    // Dapatkan semua opsi yang ada di dropdown
    cy.get('@yearDropdown1').find('option').then(($options) => {
      // Pilih opsi secara acak
      const randomIndex = Math.floor(Math.random() * $options.length);
      const randomValue = $options[randomIndex].value;

      // Pilih opsi berdasarkan nilai acak
      cy.get('@yearDropdown1').select(randomValue);

      // Verifikasi bahwa opsi yang dipilih benar
      cy.get('@yearDropdown1').should('have.value', randomValue);
    });
    cy.get('#modal_ModelPegawaiRiwayatPendidikan form').first().within(() => {
        cy.get('button[type="submit"]').first().click();
    });
};