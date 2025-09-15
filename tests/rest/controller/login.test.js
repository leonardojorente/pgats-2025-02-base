// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicação
const app = require('../../../rest/app');

// Mock
const userService = require('../../../src/services/userService');

// Testes
describe('Mock Login tests', () => {
    describe('POST /login', () => {

        it('Mocked Login com Falha de email', async () => {
            // Mocar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(userService, 'authenticate');
            transferServiceMock.throws(new Error('Mensagem para login com email errado'));
            
            const respostaLogin = await request(app)
                .post('/api/users/login')
                .send({
                    email: 'usuarioInvalido@email.com',
                    password: '123456'
                });
            
            expect(respostaLogin.status).to.equal(500);
            expect(respostaLogin.body).to.have.property('error', 'Mensagem para login com email errado')

            // Reseto o Mock
            sinon.restore();
        });

        it('Mocked Login com sucesso', async () => {
            // Mocar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(userService, 'authenticate');
            transferServiceMock.returns({ id: 1, name: 'Usuário de Teste'});
            
            const respostaLogin = await request(app)
                .post('/api/users/login')
                .send({
                    email: 'alice@email.com',
                    password: '123456'
                });
            
            expect(respostaLogin.status).to.equal(200);
            expect(respostaLogin.body).to.have.property('name', 'Usuário de Teste')

            // Reseto o Mock
            sinon.restore();
        });        
    })
})