import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import Users from '../database/models/usersModel';
import { usersMock, userLogin } from './usersMock';

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  let chaiHttpResponse: Response;

  beforeEach (async () => {sinon.stub(Users, "findOne").resolves(usersMock as Users);});
  afterEach (() => { (Users.findOne as sinon.SinonStub).restore()});

  it('Testa o metodo Post para logar com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).get('/login').send(userLogin);

    expect(chaiHttpResponse.body).to.be.deep.equal('token')
    expect(chaiHttpResponse.status).to.be.equal(200)
  });
});