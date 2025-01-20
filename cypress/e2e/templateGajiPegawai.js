export const templateGajiPegawai = () => {
    cy.get('table tbody tr')                // Select all rows in the table body
    .its('length')                        // Get the number of rows
    .then((length) => {
        const randomIndex = Cypress._.random(0, length - 1); // Generate a random index
        cy.get('table tbody tr')           // Select all rows again
        .eq(randomIndex)                 // Select the row at the random index
        .find('div.dropdown')            // Find the dropdown within that row
        .within(() => {
            cy.get('a.list-icons-item')   // Find the dropdown toggle link
            .click()                   // Click the dropdown toggle
            cy.get('a.dropdown-item')     // Find the dropdown items within the dropdown
            .contains('Template Gaji')          // Find the "Edit" button by text
            .click();                  // Click the Edit button
        });
    });
    cy.get('button').filter('[onclick="itable_detail.openModal()"]').click();
    cy.get('#modalLookup_jenisdetailslipgaji').should('be.visible');
    cy.get('table.table-lookup-multiple tbody td')
    .then($cells => {

        const randomIndex = Math.floor(Math.random() * $cells.length);
        cy.wrap($cells[randomIndex]).click();
    });


    cy.get('table.table-lookup-multiple tbody td')
    .then($cells => {

        const numberOfClicks = 2; 
        const indexes = [];

        while (indexes.length < numberOfClicks) {
        const randomIndex = Math.floor(Math.random() * $cells.length);
        if (!indexes.includes(randomIndex)) {
            indexes.push(randomIndex);
        }
        }

        indexes.forEach(index => {
        cy.wrap($cells[index]).click();
        });
    });
    cy.contains('button', 'OK').click();
    cy.wait(1000); // Sesuaikan waktu tunggu jika diperlukan

    // Ambil semua baris di tabel
    cy.get('table.table.table-bordered.table-xs.table-striped.table-detail.table-column.mahas-formula tbody tr')
    .each(($row, index) => {
    // Ambil input di baris yang sesuai
    cy.wrap($row).find('input.text-right.form-control.mahas-currency.mahas-formula').should('be.visible')
        .then(($input) => {
        // Generate a random number for input value
        const randomNumber = (length) => Math.random().toString().substring(2, length + 2);
        // Ensure that the input field is a single element before typing
        if ($input.length === 1) {
            cy.wrap($input).type(randomNumber(5));
        } else {
            throw new Error('Expected single input element, but found ' + $input.length);
        }
        });
    });
    cy.get('#modal_ModelTemplateSlipGaji form').within(() => {
        cy.get('button[type="submit"]').click();
    });

};