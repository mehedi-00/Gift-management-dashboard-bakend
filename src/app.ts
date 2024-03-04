import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import { glovalErrorHandler } from './app/middlewares/globalErrorHandler';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

/* application Routes */

app.use('/api', router);
// gloval error handler
app.use(glovalErrorHandler);

app.use(notFound);

export default app;
