import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/routes.js';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import notFound from './middleware/notfound.js';

const app: Application = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    })
);


app.use('/api/v1', router);

app.get('/', (_req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Welcome to task basic server',
  });
});


app.use(globalErrorHandler);
app.use(notFound);

export default app;
