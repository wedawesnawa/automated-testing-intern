export const riwayatPelatihanPegawai = () => {
    cy.contains('a.nav-link', 'Riwayat Pelatihan').click();
    cy.wait(1000);
    cy.get('a[href="javascript:isetup_ModelPegawaiRiwayatPelatihan.openModal(\'POST\')"]').click();
    cy.get('#modal_ModelPegawaiRiwayatPelatihan').should('be.visible');

    const specialCharacters = "!@#$%^&*()_+{}|:<>?-=[];',./";
    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    const randomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; 
    };
    cy.get('input[name="Nama"]').eq(5).type(`Dojo Bersilat Lidah versi-${randomString(5)} ${specialCharacters}`);
    cy.get('input[name="Tempat"]').type(`Dojo-${randomString(5)}`);
    cy.get('input[name="TanggalAwalPelaksanaan"]').type(randomDate(new Date(2020, 0, 1), new Date()));
    cy.get('input[name="TanggalAkhirPelaksanaan"]').type(randomDate(new Date(), new Date(2030, 11, 31)));
    cy.get('input[name="LamaPelatihan"]').type(`${randomNumber(2)} Bulan ${specialCharacters}`);
    cy.get('input[name="JumlahJamPelajaran"]').type(randomNumber(2));
    cy.get('#modal_ModelPegawaiRiwayatPelatihan form').first().within(() => {
        cy.get('button[type="submit"]').first().click();
    });
};
