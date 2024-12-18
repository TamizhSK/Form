const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const EmpRoutes = require('./routes/EmpRoutes');

const app = express();
app.use(cors());
app.use(express.json());

db.sync().then(() => console.log('Database connected'));

app.use('/api/employees', EmpRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
