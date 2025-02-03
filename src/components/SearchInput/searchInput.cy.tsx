// searchInput.cy.tsx
import SearchInput from './SearchInput';
import { sanitizeInput } from '@/app/utils/security.utils';

const defaultProps = {
  searchTerm: '',
  placeholder: 'Search...',
  buttonText: 'Search',
  autoFocus: false,
};

describe('SearchInput Component', () => {
  it('should render with default props', () => {
    const mockOnSearch = cy.spy().as('onSearch');

    cy.mount(<SearchInput onSearch={mockOnSearch} {...defaultProps} />);
    cy.getByTestId('search-input')
      .should('exist')
      .and('have.attr', 'placeholder', 'Search...');

    cy.getByTestId('search-button').should('contain.text', 'Search');
  });

  it('should submit cleaned input on button click', () => {
    const mockOnSearch = cy.spy().as('onSearch');

    cy.mount(<SearchInput onSearch={mockOnSearch} {...defaultProps} />);

    const testInput = 'Test<script>alert()</script>';

    const cleanedInput = sanitizeInput(testInput);

    cy.getByTestId('search-input').type(testInput);

    cy.getByTestId('search-button')
      .click()
      .then(() => {
        expect(mockOnSearch).to.have.been.calledWith(cleanedInput);
      });
  });

  it('should submit on Enter key press', () => {
    const mockOnSearch = cy.spy().as('onSearch');

    cy.mount(<SearchInput onSearch={mockOnSearch} {...defaultProps} />);

    const testInput = 'Another Test';

    cy.getByTestId('search-input')
      .type(testInput)
      .type('{enter}')
      .then(() => {
        expect(mockOnSearch).to.have.been.calledWith(testInput.trim());
      });
  });

  it('should handle empty string submission', () => {
    const mockOnSearch = cy.spy().as('onSearch');

    cy.mount(<SearchInput onSearch={mockOnSearch} {...defaultProps} />);

    cy.getByTestId('search-button')
      .click()
      .then(() => {
        expect(mockOnSearch).to.have.been.calledWith('');
      });
  });

  it('should auto-focus when autoFocus prop is true', () => {
    const mockOnSearch = cy.spy().as('onSearch');

    cy.mount(
      <SearchInput
        onSearch={mockOnSearch}
        {...{ ...defaultProps, autoFocus: true }}
      />,
    );

    cy.getByTestId('search-input').should('be.focused');
  });

  it('should not auto-focus when autoFocus prop is false', () => {
    const mockOnSearch = cy.spy().as('onSearch');

    cy.mount(<SearchInput onSearch={mockOnSearch} {...defaultProps} />);

    cy.getByTestId('search-input').should('not.be.focused');
  });

  it('should update button text based on prop', () => {
    const mockOnSearch = cy.spy().as('onSearch');

    cy.mount(
      <SearchInput
        onSearch={mockOnSearch}
        {...{ ...defaultProps, buttonText: 'Find' }}
      />,
    );

    cy.getByTestId('search-button').should('contain.text', 'Find');
  });

  it('should sanitize malicious input', () => {
    const mockOnSearch = cy.spy().as('onSearch');

    cy.mount(<SearchInput onSearch={mockOnSearch} {...defaultProps} />);

    // eslint-disable-next-line quotes
    const dangerousInput = "'; DROP TABLE users;--";

    const safeInput = sanitizeInput(dangerousInput);

    cy.getByTestId('search-input').type(dangerousInput);

    cy.getByTestId('search-button')
      .click()
      .then(() => {
        expect(mockOnSearch).to.have.been.calledWith(safeInput);
        expect(safeInput).to.not.include('DROP TABLE');
      });
  });

  it('should sync with searchTerm prop updates', () => {
    const initialTerm = 'initial';

    const updatedTerm = 'updated';

    const mockOnSearch = cy.spy().as('onSearch');

    cy.mount(
      <SearchInput
        onSearch={mockOnSearch}
        {...{ ...defaultProps, searchTerm: initialTerm }}
      />,
    );

    cy.getByTestId('search-input').should('have.value', initialTerm);

    cy.mount(<SearchInput onSearch={mockOnSearch} searchTerm={updatedTerm} />);

    cy.getByTestId('search-input').should('have.value', updatedTerm);
  });
});
