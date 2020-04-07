describe('Search and add a product to cart on Sportsdirect', () => {

    afterEach(() => {
        cy.closePopupIfVisible(); // custom command from support/commands.js, needed for closing advertisement popup
    });

    it('Navigates to Sportsdirect and close the advert', () => {

        cy.visit('/'); // base URL in cypress.json config    
        cy.get('#Body')
            .should('be.visible');
    });

    it('Obtains the name of a last product in the carousel', function () {
        /* 
        we are looking for the last product name in the carousel
        because for some reason first item produces no results when searching for it on sportsdirect page
        even though that product actually exists
        */
        cy.get('#carousel-example-generic2 span.imageTitle')
            .last() 
            .invoke('text')
            .as('item_name');
    });

    it('Searches for the name we obtained from the carousel and clicks on the result', function () {
        cy.log(`Searching for: ${this.item_name}`);
        cy.get('#txtSearch')
            .should('be.visible')
            .type(this.item_name);
        cy.get('#cmdSearch')
            .click();

        cy.log('Selecting the first product from the search results');
        cy.get('#productlistcontainer li a')
            .first()
            .click();
    });

    it('Selects first available color and size and adds to the cart', function () {
        cy.log('Selecting the first available color from the list');
        cy.get('.ColourImagesWrap li')
            .not('greyOut')
            .first()
            .find('a')
            .click();

        cy.log('Selecting the first available size from the list');
        cy.get('.sizeButtons li')
            .not('greyOut')
            .first()
            .find('a')
            .click();

        cy.get('.addtoBagWrap .addToBag')
            .click();

        cy.get('#divBagItems')
            .should('be.visible');

        cy.log('Check whether the bag quantity is greater than zero');
        cy.get('#bagQuantity')
            .invoke('text')
            .then((value) => {
            expect(parseInt(value)).to.be.greaterThan(0);
        })
    });

});