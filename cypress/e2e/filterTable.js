export const filterTable = () => {
    cy.contains('Pegawai').should('be.visible');
    cy.get('a.list-icons-item[data-action="filter"]').first().click();

    cy.get('input#Filter[data-itable-filter="Filter"]').first()
    .type('John')
    .type('{enter}');

    // Asersi untuk memverifikasi hasil filter
    cy.get('table').should('contain', 'John');
};