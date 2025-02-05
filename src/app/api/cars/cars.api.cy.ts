describe('GET /api/cars', () => {
  it('should return valid car data structure', () => {
    cy.request('http://localhost:3000/api/cars').then((response) => {
      expect(response.status).to.equal(200);

      const data = response.body;

      expect(data).to.have.keys([
        'count',
        'cars',
        'page',
        'totalPages',
        'totalItems',
      ]);
    });
  });
});
