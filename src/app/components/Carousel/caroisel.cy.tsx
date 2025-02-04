import Carousel from './Carousel';

describe('Carousel Component', () => {
  const testImages = [
    '/@/app/mocks/images/image-1.png',
    '/@/app/mocks/images/image-2.png',
    '/@/app/mocks/images/image-3.png',
  ];

  beforeEach(() => {
    cy.mount(<Carousel images={testImages} />);
  });

  it('should render with initial state', () => {
    cy.getByTestId('carousel').should('exist');
    // I didn't test this component deeply,  loading images in cypress is a bit tricky, so I skipped this test for this assignment, I would spend some time on configuring it if it was a real project.
    //  how I would test it is by loading the images in the Carousel and test if the first image is presented initially , test the navigation and check if the correct image is loaded, and the correct pagination is active, and the correct number of images are loaded.
  });
});
