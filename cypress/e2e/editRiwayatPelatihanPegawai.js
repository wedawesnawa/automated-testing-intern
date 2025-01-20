export const editRiwayatPelatihanPegawai = () => {
    cy.get('table tbody tr')               
    .its('length')                        
    .then((length) => {
        const randomIndex = Cypress._.random(0, length - 1); 
        cy.get('#table_ModelPegawaiRiwayatPelatihan table tbody tr td div.list-icons')           
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
    cy.get('#modal_ModelPegawaiRiwayatPelatihan').should('be.visible');
    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    const randomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; 
    };
    cy.get('input[name="Nama"]').eq(5).clear().type(`Dojo Bersilat Lidah versi-${randomString(5)}`);
    cy.get('input[name="Tempat"]').clear().type(`Dojo-${randomString(5)}`);
    cy.get('input[name="TanggalAwalPelaksanaan"]').clear().type(randomDate(new Date(2020, 0, 1), new Date()));
    cy.get('input[name="TanggalAkhirPelaksanaan"]').clear().type(randomDate(new Date(), new Date(2030, 11, 31)));
    cy.get('input[name="LamaPelatihan"]').clear().type(`${randomNumber(2)} Bulan`);
    cy.get('input[name="JumlahJamPelajaran"]').clear().type(randomNumber(2));
    cy.get('#modal_ModelPegawaiRiwayatPelatihan form').first().within(() => {
        cy.get('button[type="submit"]').first().click();
    });
};