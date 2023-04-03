import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import Users from '../database/models/usersModel';
import { usersMock, userLogin, invalidPass, invalidEmail } from './usersMock';

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  let response: Response;

  before (async () => {sinon.stub(Users, "findOne").resolves(usersMock as Users);});
  after (() => { (Users.findOne as sinon.SinonStub).restore()});

  it('Testa o metodo Post para logar com sucesso', async () => {
    response = await chai.request(app).post('/login').send(userLogin);
    expect(response.body).to.have.property('token')
    expect(response.status).to.be.equal(200)
  });

  // it('Testa se ao inserir uma senha invalida, é possivel logar', async () => {
  //   response = await chai.request(app).post('/login').send(invalidPass)
  //   expect(response.status).to.be.equal(401);
  //   expect(response.body.message).to.be.equal('Password invalid');
  // });

  // it('Testa se ao inserir um email invalido, é possivel logar', async () => {
  //   response = await chai.request(app).post('/login').send(invalidEmail)
  //   expect(response.status).to.be.equal(401);
  //   expect(response.body.message).to.be.equal('Email invalid');
  // });
});