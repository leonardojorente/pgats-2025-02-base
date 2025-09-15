// Bibliotecas
const request = require('supertest');
const { expect } = require('chai');

// Testes
describe('Login tests', () => {
    describe('POST /login', () => {

        it('Login com sucesso', async () => {
            const respostaLogin = await request('http://localhost:3000/api')
                .post('/users/login')
                .send({
                    email: 'alice@email.com',
                    password: '123456'
                });
            
            expect(respostaLogin.status).to.equal(200);
            expect(respostaLogin.body).to.have.property('token')
        });

        it('Login com Falha', async () => {
            const respostaLogin = await request('http://localhost:3000/api')
                .post('/users/login')
                .send({
                    email: 'usuarioInvalido@email.com',
                    password: '123456'
                });
            
            expect(respostaLogin.status).to.equal(401);
            expect(respostaLogin.body).to.have.property('error', 'Credenciais inválidas')
        });
        
    })
})
