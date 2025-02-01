describe('GET /api/cars', () => {
  it.only('should return valid car data structure', () => {
    cy.request('http://localhost:3000/api/cars').then((response) => {
      expect(response.status).to.equal(200);

      const data = response.body.data;

      expect(data).to.have.keys(['count', 'data']);
    });
  });
});
