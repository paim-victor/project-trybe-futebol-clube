import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import teams from '../database/models/teamsModel';
import teamsMock from './teamsMock';

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {sinon.stub(teams, "findAll").resolves(teamsMock as teams[]);});
  after(() => { (teams.findAll as sinon.SinonStub).restore()});

  it('Testa o metodo GET', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams')

    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock)
    expect(chaiHttpResponse.status).to.be.equal(200)
  });
});