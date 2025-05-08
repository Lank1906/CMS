import dotenv from 'dotenv';
import cors from 'cors';
import accountRouter from './src/routers/Accounts.js';
import contractRoutes from './src/routers/ContractDetails.js';
import contractRouter from './src/routers/Contracts.js';
import projectRouter from './src/routers/Projects.js';
import express from 'express';
import authRouters from './src/routers/authRoutes.js';
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use('/api', authRouters);
app.use('/api/accounts', accountRouter);
app.use('/api/contract-detail', contractRoutes);

app.use('/api/contracts', contractRouter);
app.use('/api/projects', projectRouter);
app.listen(PORT, () => {
  process.stdout.write(`Server is running at http://localhost:${PORT}\n`);
});
