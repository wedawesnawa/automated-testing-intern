export const rekeningPegawai = () => {
    cy.contains('a.nav-link', 'Rekening').click();
    cy.wait(1000);
    cy.get('a[href="javascript:isetup_ModelPegawaiRekening.openModal(\'POST\')"]').click();
    cy.get('#modal_ModelPegawaiRekening').should('be.visible');

    const specialCharacters = "!@#$%^&*()_+{}|:<>?-=[];',./";
    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    const randomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; 
    };

    // cy.get('input[name="Nama"]').eq(4).type(`John`);
    // cy.get('span.select2[data-select2-id="12"]').should('exist').click();
    // cy.get('ul.select2-results__options', { timeout: 10000 }).should('be.visible');
    // cy.get('ul.select2-results__options li.select2-results__option').should('have.length.greaterThan', 1)
    // .then(($options) => {
    //     if ($options.length === 0) {
    //         throw new Error('No options found');
    //     }
    //     const numOptions = $options.length;
    //     const randomIndex = Math.floor(Math.random() * numOptions);
    //     cy.wrap($options[randomIndex]).click();
    // });
    // cy.get('input[name="NoRekening"]').type(`123456789`);


    cy.get('input[name="Nama"]').eq(4).type(`John Rek-${randomString(5)} ${specialCharacters}${randomNumber(12)}`);
    cy.get('span.select2[data-select2-id="12"]').should('exist').click();
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
    cy.get('input[name="NoRekening"]').type(`${randomNumber(10)}${specialCharacters}${randomString(12)}`);

    cy.get('input#Aktif').as('checkbox'); // Berikan alias pada checkbox untuk digunakan selanjutnya

    // Tentukan secara acak apakah akan memeriksa atau tidak
    const shouldCheck = Math.random() > 0.5; // 50% kemungkinan untuk memeriksa atau tidak
    const shouldCheckPrioritas = Math.random() > 0.4;

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
