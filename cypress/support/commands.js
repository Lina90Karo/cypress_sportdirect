Cypress.Commands.add("closePopupIfVisible", () => {
    cy.get('#advertPopup').then(($advert_popup) => {
        if ($advert_popup.is(':visible')) {
            cy.get('#advertPopup button.close').click();
        }
    });
});
