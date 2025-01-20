export const riwayatPendidikanPegawai = () => {
    cy.contains('a.nav-link', 'Riwayat Pendidikan').click();
    cy.wait(1000);
    cy.get('a[href="javascript:isetup_ModelPegawaiRiwayatPendidikan.openModal(\'POST\')"]').click();
    cy.get('#modal_ModelPegawaiRiwayatPendidikan').should('be.visible');

    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    const randomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; 
    };
    
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
