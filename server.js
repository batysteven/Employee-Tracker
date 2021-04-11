const express = require('express');
const db = require('./db/database');
const routes = require('./routes');
const employeeTracker = require('./index');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use apiRoutes
app.use(routes);

// Default response for any other request(Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    employeeTracker;
});

