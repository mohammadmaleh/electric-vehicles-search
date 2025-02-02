import CarCard from './CarCard';
import { carsMock } from '@/app/mocks/cars.mock';

const mockedCar = carsMock[0];

describe('CarCard Component', () => {
  beforeEach(() => {
    cy.mount(<CarCard car={mockedCar} />);
  });

  it('should render the component with all details', () => {
    cy.getByTestId('car-card').should('exist');
    cy.getByTestId('carousel').should('exist');

    cy.getByTestId('car-name')
      .should('contain', 'Tesla Model S')
      .and('contain', '(2020)');

    cy.getByTestId('car-price')
      .should('contain', '$79,999')
      .find('span.text-blue-600')
      .should('exist');

    cy.getByTestId('car-range').should('contain', '610 km');
    cy.getByTestId('car-location').should('contain', 'Berlin');
  });
});
