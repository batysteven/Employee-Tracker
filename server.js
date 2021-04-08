const express = require('express');
const db = require('./db/database');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use apiRoutes
app.use(routes);

// Start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});