export const keluargaPegawai = () => {
    cy.contains('a.nav-link', 'Keluarga').click();
    cy.wait(1000);
    cy.get('a[data-action="plus"]').eq(1).click();
    cy.get('#modal_ModelPegawaiKeluarga').should('be.visible');

    const specialCharacters = "!@#$%^&*()_+{}|:<>?-=[];',./";
    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    const randomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; 
    };

    cy.get('input[name="Nama"]').eq(1).type(`Saudaranya John ${randomNumber(5)} ${specialCharacters}`);
    cy.get('textarea[name="AlamatDomisili"]').type(`Jl. Domisili No. ${randomNumber(3)}`);
    cy.get('input[name="NoBPJS"]').type(`${randomString(12)} ${specialCharacters}`); 
    cy.get('input[name="NoBPJSTK"]').type(`${randomString(12)} ${specialCharacters}`);
    const statusOptionGender = ['Laki-laki', 'Perempuan'];
    const randomStatusGender = statusOptionGender[Math.floor(Math.random() * statusOptionGender.length)];
    cy.get('select[name="JenisKelamin"]').select(randomStatusGender);  

    cy.get('span.select2[data-select2-id="4"]').should('exist').click();
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

    cy.get('input.form-check-input.mahas-formula').filter(':not(:checked)').then($uncheckedCheckboxes => {
      const randomIndex = Math.floor(Math.random() * $uncheckedCheckboxes.length);
      cy.wrap($uncheckedCheckboxes.get(randomIndex)).check();
    });
    cy.get('button').filter('[onclick="itable_detail.openModal()"]').click();
    cy.get('#modalLookup_jeniskontak').should('be.visible');
    cy.get('table.table tbody td').filter((index, element) => {
      return Cypress.$(element).text().includes('Phone');
    }).first().click();
    cy.contains('button', 'OK').click();
    cy.get('table.table.table-bordered.table-xs.table-striped.table-detail.table-column.mahas-formula')
      .within(() => {
        cy.get('input.form-control.mahas-formula[data-name="Nama"]').type(`Saudaranya John ${randomString(5)}`);
        
      });
    cy.get('#modal_ModelPegawaiKeluarga form').first().within(() => {
        cy.get('button[type="submit"]').first().click();
    });
    
};