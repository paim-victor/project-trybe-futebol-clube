import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';
import leaderboardRouter from './routes/leaderboardRouter';
import matchesRouter from './routes/matchesRouter';
import teamsRouter from './routes/teamsRouter';
import loginRouter from './routes/usersRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    dotenv.config({ path: path.resolve(__dirname, '../.env') });
    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/teams', teamsRouter);
    this.app.use('/team/:id', teamsRouter);
    this.app.use('/login', loginRouter);
    this.app.use('/matches', matchesRouter);
    this.app.use('/leaderboard', leaderboardRouter);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
