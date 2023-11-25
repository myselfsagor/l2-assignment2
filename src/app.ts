import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { userRoutes } from './app/modules/user/user.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes

app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

export default app;
