export const sertifikasiPegawai = () => {
    cy.contains('a.nav-link', 'Jenis Sertifikasi').click();
    cy.wait(1000);
    cy.get('a.list-icons-item[data-action="plus"]').first().click();
    cy.get('#modal_ModelPegawaiSertifikasi').should('be.visible');
    
    const specialCharacters = "!@#$%^&*()_+{}|:<>?-=[];',./";
    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    const randomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; 
    };
    const maxCharString = randomString(256);

    // cy.get('input[name="Nama"]').eq(0).type(`Sertifikat PKL 1`);
    // cy.get('input[name="NoSertifikasi"]').eq(0).type(`123456789`);
    // cy.get('input[name="Tanggal"]').eq(0).type(randomDate(new Date(2020, 0, 1), new Date()));
    // cy.get('input[name="BerlakuSampai"]').eq(0).type(randomDate(new Date(), new Date(2030, 11, 31)));

    cy.get('input[name="Nama"]').eq(0).type(`Sertifikat PKL ${maxCharString}${specialCharacters}`);
    cy.get('input[name="NoSertifikasi"]').eq(0).type(`${randomString(10)} ${specialCharacters}`);
    cy.get('input[name="Tanggal"]').eq(0).type(randomDate(new Date(2020, 0, 1), new Date()));
    cy.get('input[name="BerlakuSampai"]').eq(0).type(randomDate(new Date(), new Date(2030, 11, 31)));

    cy.get('span.select2[data-select2-id="2"]').should('exist').click();
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