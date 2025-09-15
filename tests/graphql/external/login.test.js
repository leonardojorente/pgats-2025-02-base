// Bibliotecas
const request = require('supertest');
const { expect, use } = require('chai');

// Testes
describe('Login Tests', () => {
    describe('POST /login', () => {
    const loginUser = require('../../fixtures/requisicoes/graphql/login-user.json');

        it('Login com sucesso', async () => {
            const respostaLogin = await request('http://localhost:4000')
                .post('/graphql')
                .send(loginUser);

            expect(respostaLogin.status).to.equal(200);
            expect(respostaLogin.body.data.login).to.have.property('token');
        })

        it('Login com Falha', async () => {
            let wrongLoginUser = loginUser;
            loginUser.variables.email = 'invalidUser@email.com';

            const respostaLogin = await request('http://localhost:4000')
                .post('/graphql')
                .send(wrongLoginUser);

            expect(respostaLogin.status).to.equal(200);
            expect(respostaLogin.body.errors[0]).to.have.property('message', 'Credenciais inválidas')
        })        
    })
})