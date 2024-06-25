import 'dotenv/config';
import './config/database.js';
import app from './config/server.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
