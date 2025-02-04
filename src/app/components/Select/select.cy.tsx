import Select from './Select';
import { carSortOptions } from '@/app/static/car.consts';

describe('SortButton Component', () => {
  beforeEach(() => {
    const onChangeSpy = cy.stub().as('onChangeSpy');

    cy.mount(
      <Select
        options={carSortOptions}
        currentSort="price-asc"
        onChange={onChangeSpy}
      />,
    );
  });

  it('should render with initial state', () => {
    cy.getByTestId('sort-button').should('contain', 'Price: Low to High');
    cy.getByTestId('select-icon').should('not.have.class', 'rotate-180');
  });

  it('should toggle dropdown visibility', () => {
    cy.getByTestId('sort-button').click();

    cy.getByTestId(`option-${carSortOptions[0].value}`).should('be.visible');

    cy.getByTestId('sort-button').click();
    cy.getByTestId(`option-${carSortOptions[0].value}`).should('not.exist');
  });

  it('should select options and update state', () => {
    carSortOptions.forEach((option) => {
      cy.getByTestId('sort-button').click();

      cy.getByTestId(`option-${option.value}`)
        .click()
        .then(() => {
          cy.get('@onChangeSpy').should('have.been.calledWith', option.value);
        });
    });
  });
});
