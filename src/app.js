const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const scenarioRoutes = require('./routes/scenarioRoutes');
const headTitleRoutes = require('./routes/headTitleRoutes');
const choiceRoutes = require('./routes/choiceRoutes');
const stepRoutes = require('./routes/stepRoutes');
const questionRoutes = require('./routes/questionRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api',scenarioRoutes);
app.use('/api/headTitles', headTitleRoutes);
app.use('/api/choices', choiceRoutes);
app.use('/api/steps', stepRoutes);
app.use('/api/questions', questionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
