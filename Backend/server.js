const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Basic health endpoint
app.get('/', (req, res) => {
  res.json({ message: '🚀 AI Code Copilot Backend is running!' });
});

// Routes
try {
  const projectRoutes = require('./Routes/projectRoutes');
  app.use('/api/projects', projectRoutes);
} catch (err) {
  console.error('Failed to load project routes:', err && err.message ? err.message : err);
}

// Use environment PORT with a safe default
const PORT = process.env.PORT || 5000;

// startup logging
console.log('Starting backend server setup...');
console.log('NODE_ENV=', process.env.NODE_ENV);
console.log('PORT=', PORT);
// Log presence (not values) of important env vars to help debugging without leaking secrets
console.log('DATABASE_URL present=', !!process.env.DATABASE_URL);
console.log('OPENAI_API_KEY present=', !!process.env.OPENAI_API_KEY);

const server = app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

server.on('error', (err) => {
  console.error('Server error:', err && err.message ? err.message : err);
  // don't crash silently
  process.exitCode = 1;
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err && err.stack ? err.stack : err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // optional: process.exit(1)
});
