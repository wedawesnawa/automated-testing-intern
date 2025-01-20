export const createEmployee = () => {
    cy.contains('Pegawai').should('be.visible');
    cy.get('a[href="javascript:isetup_ModelPegawai.openModal(\'POST\')"]').click();
    // cy.get('div.list-icons a[data-action="plus"]', { timeout: 10000 }).should('be.visible').click();

    cy.get('#modal_ModelPegawai').should('be.visible');

    const specialCharacters = "!@#$%^&*()_+{}|:<>?-=[];',./";

    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    const randomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; 
    };

    cy.get('input[name="Nama"]').type(`Steven`); 
    cy.get('input[name="Email"]').type(`john@example.com`); 
    cy.get('input[name="TanggalLahir"]').type(randomDate(new Date(1970, 0, 1), new Date(2005, 0, 1))); 

    cy.get('input[name="TempatLahir"]').type(randomNumber(10)+`${specialCharacters}`); 
    cy.get('textarea[name="AlamatKTP"]').type(`Jl. KTP No. ${randomNumber(3)} ${specialCharacters}`); 
    cy.get('textarea[name="AlamatDomisili"]').type(`Jl. Domisili No. ${randomNumber(3)} ${specialCharacters}`);
    cy.get('input[name="NoKTP"]').type('123456789'); 
    cy.get('input[name="NoKK"]').type('123456789'); 
    cy.get('input[name="NoBPJSKesehatan"]').type('123456789'); 
    cy.get('input[name="NoBPJSTK"]').type('123456789'); 
    cy.get('input[name="NoNPWP"]').type('123456789'); 
    cy.get('input[name="NIP"]').type('123456789'); 
    cy.get('input[name="TanggalMulaiBekerja"]').type('2024-09-02');
    cy.get('input[name="TanggalSelesaiBekerja"]').type('2024-08-02');


    // cy.get('input[name="Nama"]').type(`John ${randomString(5)} ${specialCharacters}`); 
    // cy.get('input[name="Email"]').type(`${randomString(5)}@example.com`); 
    // cy.get('input[name="TanggalLahir"]').type(randomDate(new Date(1970, 0, 1), new Date(2005, 0, 1))); 

    // cy.get('input[name="TempatLahir"]').type(randomNumber(10)+`${specialCharacters}`); 
    // cy.get('textarea[name="AlamatKTP"]').type(`Jl. KTP No. ${randomNumber(3)} ${specialCharacters}`); 
    // cy.get('textarea[name="AlamatDomisili"]').type(`Jl. Domisili No. ${randomNumber(3)} ${specialCharacters}`);
    // cy.get('input[name="NoKTP"]').type(randomNumber(10)+`${specialCharacters}`); 
    // cy.get('input[name="NoKK"]').type(randomNumber(10)+`${randomString(5)}`); 
    // cy.get('input[name="NoBPJSKesehatan"]').type(randomNumber(10)+`${randomString(5)}`); 
    // cy.get('input[name="NoBPJSTK"]').type(randomNumber(10)+`${randomString(5)}`); 
    // cy.get('input[name="NoNPWP"]').type(randomNumber(10)+`${randomString(5)}`); 
    // cy.get('input[name="NIP"]').type(randomNumber(10)+`${randomString(5)}`); 
    // cy.get('input[name="TanggalMulaiBekerja"]').type(randomDate(new Date(2020, 0, 1), new Date()));
    // cy.get('input[name="TanggalSelesaiBekerja"]').type(randomDate(new Date(), new Date(2030, 11, 31)));


    // cy.get('input[name="Nama"]').type(`John ${randomString(5)}`); 
    // cy.get('input[name="Email"]').type(`${randomString(5)}@example.com`); 
    // cy.get('input[name="TanggalLahir"]').type(randomDate(new Date(1970, 0, 1), new Date(2005, 0, 1))); 

    // cy.get('input[name="TempatLahir"]').type(randomNumber(10)); 
    // cy.get('textarea[name="AlamatKTP"]').type(`Jl. KTP No. ${randomNumber(3)}`); 
    // cy.get('textarea[name="AlamatDomisili"]').type(`Jl. Domisili No. ${randomNumber(3)}`);
    // cy.get('input[name="NoKTP"]').type(randomNumber(10)+`${randomString(5)}`); 
    // cy.get('input[name="NoKK"]').type(randomNumber(10)+`${randomString(5)}`); 
    // cy.get('input[name="NoBPJSKesehatan"]').type(randomNumber(10)+`${randomString(5)}`); 
    // cy.get('input[name="NoBPJSTK"]').type(randomNumber(10)+`${randomString(5)}`); 
    // cy.get('input[name="NoNPWP"]').type(randomNumber(10)+`${randomString(5)}`); 
    // cy.get('input[name="NIP"]').type(randomNumber(10)+`${randomString(5)}`); 
    // cy.get('input[name="TanggalMulaiBekerja"]').type(randomDate(new Date(2020, 0, 1), new Date()));
    // cy.get('input[name="TanggalSelesaiBekerja"]').type(randomDate(new Date(), new Date(2030, 11, 31)));


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

    cy.get('#modal_ModelPegawai form').within(() => {
      cy.get('button[type="submit"]').first().click();
    });
};