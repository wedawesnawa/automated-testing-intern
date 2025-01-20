export const jenisKontrakPegawai = () => {
    cy.contains('a.nav-link', 'Kontak Pegawai').click();
    cy.wait(1000);
    cy.get('a[href="javascript:isetup_ModelPegawaiJenisKontak.openModal(\'POST\')"]').click();
    cy.get('#modal_ModelPegawaiJenisKontak').should('be.visible');

    const specialCharacters = "!@#$%^&*()_+{}|:<>?-=[];',./";
    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    const randomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; 
    };

    cy.get('span.select2[data-select2-id="6"]').should('exist').click();
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
    cy.get('input[name="Nama"]').eq(3).type(`Sanata system v-${randomString(5)} ${specialCharacters}`);
    cy.get('#modal_ModelPegawaiJenisKontak form').first().within(() => {
        cy.get('button[type="submit"]').first().click();
    });
};