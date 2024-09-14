import express, { json, urlencoded, Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PORT } from './config';
import { EventRouter } from './routers/event.router';  // pastikan path benar
import authRoutes from './routers/auth.routes';
import { authMiddleware, roleMiddleware } from './middlewares/auth.middleware';

export default class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        console.error('Error : ', err.stack);
        res.status(500).send('Error !');
      } else {
        next();
      }
    });
  }

  private routes(): void {
    const eventRouter = new EventRouter();  // Instantiate EventRouter

    // Public route
    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, This is my API`);
    });

    // Protecting the /api/events route using authMiddleware
    this.app.use('/api/events', authMiddleware, eventRouter.getRouter());  // Use getRouter()

    // Example for protected routes with roleMiddleware
    this.app.get(
      '/api/customer-area',
      authMiddleware,
      roleMiddleware(['CUSTOMER']),
      (req: Request, res: Response) => {
        res.send('Welcome Customer');
      }
    );

    this.app.get(
      '/api/organizer-area',
      authMiddleware,
      roleMiddleware(['ORGANIZER']),
      (req: Request, res: Response) => {
        res.send('Welcome Organizer');
      }
    );
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`[API] local:   http://localhost:${PORT}/api`);
    });
  }
}
