const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const sync_database = require('./config/sync_database');

sync_database();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})