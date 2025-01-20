export const riwayatKesehatanPegawai = () => {
    cy.contains('a.nav-link', 'Riwayat Kesehatan').click();
    cy.wait(1000);
    cy.get('a[href="javascript:isetup_ModelPegawaiRiwayatKesehatan.openModal(\'POST\')"]').click();
    cy.get('#modal_ModelPegawaiRiwayatKesehatan').should('be.visible');

    const specialCharacters = "!@#$%^&*()_+{}|:<>?-=[];',./";
    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    const randomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; 
    };
    // cy.get('input[name="Nomor"]').eq(0).type(`KP/11/11`);
    // cy.get('input[name="Tanggal"]').eq(1).type('2024-08-02');



    cy.get('input[name="Nomor"]').eq(0).type(`KP/${randomNumber(4)}/${randomNumber(3)}/${specialCharacters}`);
    cy.get('input[name="Tanggal"]').eq(1).type(randomDate(new Date(2020, 0, 1), new Date()));

    cy.get('#modal_ModelPegawaiRiwayatKesehatan form').first().within(() => {
        cy.get('button[type="submit"]').first().click();
    });
};