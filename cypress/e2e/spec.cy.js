import { createEmployee } from './createEmployee';
import { filterTable } from './filterTable';
import { detailPegawai } from './detailPegawai';
import { editPegawai } from './editPegawai';
import { templateGajiPegawai } from './templateGajiPegawai';

describe('Modal Interaction and Form Submission Test', () => {
  before(() => {
    cy.request({
      method: 'POST',
      url: 'yourURL',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: {
        username: 'YourUsername',
        password: 'YourPassword'
      },
      form: true 
    }).then((response) => {
      const token = response.body.token;
      cy.visit('YourURL');
      cy.get('input[name="Input.Username"]').type('YourUsername');
      cy.get('input[name="Input.Password"]').type('YourPassword');
      cy.get('button[type="submit"]').first().click();
      cy.wait(2000);
      cy.get('ul.nav-sidebar a.nav-link').contains('Pegawai').click();
      cy.url().should('include', '/Pegawai');
    });
  });
  it('should filter the table', () => {
    filterTable();
    cy.wait(2000);
    createEmployee();
    cy.wait(2000);
    editPegawai();
    cy.wait(2000);
    templateGajiPegawai();
    cy.wait(2000);
    detailPegawai();
  
  });
});
