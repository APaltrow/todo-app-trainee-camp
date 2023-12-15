import 'module-alias/register';
import express from 'express';
import dotenv from 'dotenv';

import { DEFAULT_PORT } from '@constants';

const app = express();

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
