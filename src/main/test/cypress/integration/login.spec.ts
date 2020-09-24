describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should start with correct state', () => {
    cy.getByTestId('email').should('have.attr', 'readonly')
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.text', '🔴')
    cy.getByTestId('password').should('have.attr', 'readonly')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.text', '🔴')
    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
