describe('Delete account flow', () => {
    it('should complete 3 modal without any error', () => {
        //visit web
        cy.visit('http://localhost:1234');
        //select workspace1
        cy.contains("Workspace: Lightning strike").closest('div')
        .children().find('select').select('Ryan Lynch')
        //wait 1 sec before select workspace2
        cy.wait(1000)
        //select workspace2
        cy.contains("Workspace: Time machine").closest('div')
        .children().find('select').select('Edward Bayer')
        //click next button
        cy.get('button').click() 
        //check first box
        cy.contains("I do not understand how to use this.").children('input').check() 
        //wait 0.5 sec before select workspace2
        cy.wait(500)
        //click next button
        cy.get('button').contains('Next').click()
        //fill ross@example.com to ConfirmModal
        cy.get('input[type="text"]').type('ross@example.com')
        //checked checkbox I understand the consequences.
        cy.contains("I understand the consequences.").children('input').check() 
        //click button Delete my account
        cy.get('button').contains('Delete my account').click()
      });  
  });