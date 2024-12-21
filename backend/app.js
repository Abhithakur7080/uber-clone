import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { swaggerSpec, swaggerUi } from './swagger.js'; // Import Swagger configuration

//router imports
import userRouter from './routes/user.routes.js';
import captainRouter from './routes/captain.routes.js';

//app setup
const app = express();

//cors setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "http://localhost:5173",
    credentials: true,
  })
);

//middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

//default router
app.get('/', (req, res) => {
    res.send('This is a default route api_domain for Uber clone <br><a href="/api-docs">API Documentation</a>');
});

// Swagger setup
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//routes setup  
app.use('/api/v1/user', userRouter);
app.use("/api/v1/captain", captainRouter);

export default app;
