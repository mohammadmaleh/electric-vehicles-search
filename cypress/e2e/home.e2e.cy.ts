describe('Car Marketplace Tests', () => {
  const apiUrl = '/api/cars';

  beforeEach(() => {
    cy.intercept('GET', apiUrl, { fixture: 'cars.json' }).as('getCars');
    cy.visit(
      '/?page=1&search=&minPrice=0&maxPrice=1000000&minYear=1980&maxYear=2025&sortBy=newest',
    );
  });

  describe('Homepage Functionality', () => {
    it('should load with default parameters', () => {
      cy.url()
        .should('include', 'page=1')
        .and('include', 'minPrice=0')
        .and('include', 'maxPrice=1000000')
        .and('include', 'minYear=1980')
        .and('include', 'maxYear=2025')
        .and('include', 'sortBy=newest');

      cy.get('[data-testid="pagination-text"]').should(
        'contain',
        'Showing 10 of 49',
      );
    });

    it('should perform search', () => {
      cy.intercept('GET', '/?page=1&search=bmw', {
        fixture: 'bmw-cars.json',
      }).as('search');
      cy.getByTestId('search-input').type('bmw');
      cy.getByTestId('search-button').click();

      cy.url().should('include', 'search=bmw');
      cy.getByTestId('car-card').should('have.length', 3);
    });

    it('should filter by year', () => {
      cy.getByTestId('range-input-min-year').clear().type('2015');
      cy.getByTestId('range-input-max-year').clear().type('2020');
      cy.getByTestId('range-input-submit-year').click();

      cy.url().should('include', 'minYear=2015&maxYear=2020');
    });

    it('should filter by price', () => {
      cy.intercept('GET', `${apiUrl}*`).as('filter');
      cy.getByTestId('range-input-min-price').clear().type('20000');
      cy.getByTestId('range-input-max-price').clear().type('50000');
      cy.getByTestId('range-input-submit-price').click();

      cy.url().should('include', 'minPrice=20000&maxPrice=50000');
    });
  });
});
