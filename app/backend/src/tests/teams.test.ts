import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import teams from '../database/models/teamsModel';
import teamsMock from './teamsMock';
import teamIdMock from './teamIdMock';

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', () => {
  let chaiHttpResponse: Response;

  beforeEach (async () => {sinon.stub(teams, "findAll").resolves(teamsMock as teams[]);});
  afterEach (() => { (teams.findAll as sinon.SinonStub).restore()});

  it('Testa o metodo GET para todos os times', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams')

    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock)
    expect(chaiHttpResponse.status).to.be.equal(200)
  });

  beforeEach (async () => {sinon.stub(teams, "findOne").resolves(teamIdMock as teams);});
  afterEach (() => { (teams.findOne as sinon.SinonStub).restore()});

  it('Testa o metodo GET por id do time', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/2')

    expect(chaiHttpResponse.body).to.be.deep.equal(teamIdMock)
    expect(chaiHttpResponse.status).to.be.equal(200)
  });
});