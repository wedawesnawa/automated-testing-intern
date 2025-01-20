export const editRiwayatKesehatanPegawai = () => {
    cy.contains('Pegawai Riwayat Kesehatan').should('be.visible');
    cy.get('table tbody tr')               
    .its('length')                        
    .then((length) => {
        const randomIndex = Cypress._.random(0, length - 1); 
        cy.get('#table_ModelPegawaiRiwayatKesehatan table tbody tr td div.list-icons')           
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
    cy.get('#modal_ModelPegawaiRiwayatKesehatan').should('be.visible');
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    const randomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; 
    };

    cy.get('input[name="Nomor"]').eq(0).clear().type(`KP/${randomNumber(4)}/${randomNumber(3)}`);
    cy.get('input[name="Tanggal"]').eq(1).clear().type(randomDate(new Date(2020, 0, 1), new Date()));

    cy.get('#modal_ModelPegawaiRiwayatKesehatan form').first().within(() => {
        cy.get('button[type="submit"]').first().click();
    });
};