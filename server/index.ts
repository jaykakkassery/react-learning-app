import express from 'express';
import { hotelsRouter } from './routes/hotels';

const app = express();
const PORT = 3001;

// Middleware — parses incoming JSON request bodies
app.use(express.json());

// Mount the hotels router at /api/hotels
// All routes defined in hotelsRouter are now accessible under /api/hotels
app.use('/api/hotels', hotelsRouter);

// A simple health-check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/hotels`);
});
