import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import matchesModel from '../database/models/matchesModel';
import matchesMock  from './machesMock';

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/matches', () => {

  let response: Response;

  before(async () => {sinon.stub(matchesModel, "findAll").resolves(matchesMock as unknown as matchesModel[]);});

  after(() => {(matchesModel.findAll as sinon.SinonStub).restore();})

  it('Testa o metodo GET para todas partidas', async () => {
    response = await chai.request(app).get('/matches')
    expect(response.body).to.be.deep.equal(matchesMock)
    expect(response.status).to.be.equal(200)
  });

  it('Testa o metodo GET com inProgress, se retorna um array', async () => {
    response = await chai.request(app).get('/matches?inProgress=true')
    expect(response.body).to.be.an('array')
    expect(response.status).to.be.equal(200)
  });
});