const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3001;
const sync_database = require('./config/sync_database');
const { errorHandling, errorLogger } = require('./middlewares/error_handling');
require('dotenv').config()

sync_database();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
})

app.use('/api/user', require('./routes/users.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/post', require('./routes/posts.routes'))
// Error handling
app.use(errorLogger)
app.use(errorHandling)

// 404
app.use((req, res, next) => {
    res.status(404).json({
        "message": "Path Not found"
    })
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})