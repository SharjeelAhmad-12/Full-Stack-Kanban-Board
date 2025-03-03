require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const taskRoutes = require('./routes/task');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const port = 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Database Connected'))
  .catch(err => console.log('Database Connection Error:', err));

app.use("/api/task", taskRoutes);
app.use('/auth', authRouter);

app.use((err, _req, res, next) => {
    res.status(500).json({
        message: 'An error occurred!',
        error: err.message
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
