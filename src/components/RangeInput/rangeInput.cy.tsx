// RangeInput.cy.tsx
import RangeInput from './RangeInput';

const defaultProps = {
  min: 10,
  max: 100,
  absoluteMin: 0,
  absoluteMax: 200,
  minLabel: 'Minimum Value',
  maxLabel: 'Maximum Value',
  submitLabel: 'Apply Filter',
};

describe('RangeInput Component', () => {
  beforeEach(() => {
    const onSubmit = cy.spy().as('mockSubmit');

    cy.mount(<RangeInput {...defaultProps} onSubmit={onSubmit} />);
  });
  it('should render with initial values and labels', () => {
    cy.getByTestId('range-input-min').should('have.value', defaultProps.min);
    cy.getByTestId('range-input-max').should('have.value', defaultProps.max);
    cy.contains('label', defaultProps.minLabel).should('exist');
    cy.contains('label', defaultProps.maxLabel).should('exist');
    cy.contains('button', defaultProps.submitLabel).should('exist');
  });

  it('should submit valid values', () => {
    const newMin = 20;

    const newMax = 150;

    cy.getByTestId('range-input-min').clear().type(newMin.toString());
    cy.getByTestId('range-input-max').clear().type(newMax.toString());
    cy.contains('button', defaultProps.submitLabel).click();

    cy.get('@mockSubmit').should('have.been.calledOnceWith', newMin, newMax);
  });

  it('should prevent submission with negative min value', () => {
    cy.getByTestId('range-input-min').clear().type('-5');
    cy.contains('button', defaultProps.submitLabel).click();
    cy.get('@mockSubmit').should('not.have.been.called');
  });

  it('should prevent submission with negative max value', () => {
    cy.getByTestId('range-input-max').clear().type('-10');
    cy.contains('button', defaultProps.submitLabel).click();
    cy.get('@mockSubmit').should('not.have.been.called');
  });

  it('should prevent submission with empty min value', () => {
    cy.getByTestId('range-input-min').clear();
    cy.contains('button', defaultProps.submitLabel).click();
    cy.get('@mockSubmit').should('not.have.been.called');
  });

  it('should prevent submission with empty max value', () => {
    cy.getByTestId('range-input-max').clear();
    cy.contains('button', defaultProps.submitLabel).click();
    cy.get('@mockSubmit').should('not.have.been.called');
  });

  it('should enforce absolute minimum and maximum values', () => {
    cy.getByTestId('range-input-min')
      .clear()
      .type((defaultProps.absoluteMin - 10).toString())
      .should('have.value', defaultProps.absoluteMin - 10)
      .then(() => {
        cy.contains('button', defaultProps.submitLabel).click();
        cy.get('@mockSubmit').should('not.have.been.called');
      });

    cy.getByTestId('range-input-max')
      .clear()
      .type((defaultProps.absoluteMax + 10).toString())
      .should('have.value', defaultProps.absoluteMax + 10)
      .then(() => {
        cy.contains('button', defaultProps.submitLabel).click();
        cy.get('@mockSubmit').should('not.have.been.called');
      });
  });

  it('should update values when props change', () => {
    const updatedProps = {
      ...defaultProps,
      min: 25,
      max: 175,
      onSubmit: cy.spy().as('mockSubmit'),
    };

    cy.mount(<RangeInput {...updatedProps} />);

    cy.get('input[name="min"]').should('have.value', updatedProps.min);
    cy.get('input[name="max"]').should('have.value', updatedProps.max);
  });
});
