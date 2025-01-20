export const hobiPegawai = () => {
    cy.contains('a.nav-link', 'Hobi').click();
    cy.wait(1000);
    cy.get('a[href="javascript:isetup_ModelPegawaiHobi.openModal(\'POST\')"]').click();
    cy.get('#modal_ModelPegawaiHobi').should('be.visible');

    const specialCharacters = "!@#$%^&*()_+{}|:<>?-=[];',./";
    const randomString = (length) => Math.random().toString(36).substring(2, length + 2);
    const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
    const randomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; 
    };

    cy.get('input[name="Nama"]').eq(2).type(`Hobiku ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} ${randomString(5)} Hobiku p6p9y 3gky6 zg11o cub4p wg3b3 prk11 jhu0g fwye5 h3f8a 85ofi jd9dr 4b13c j2sdp fvnmz 1x4a8 pa6je mxdhp nj0p2 g05ev bssn1 Hobiku p6p9y 3gky6 zg11o cub4p wg3b3 prk11 jhu0g fwye5 h3f8a 85ofi jd9dr 4b13c j2sdp fvnmz 1x4a8 pa6je mxdhp nj0p2 g05ev bssn1`);
    cy.get('#modal_ModelPegawaiHobi form').first().within(() => {
        cy.get('button[type="submit"]').first().click();
    });
};