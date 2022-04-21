const express = require('express');
const dotenv = require('dotenv');
const create = require('./controllers');
dotenv.config({path: 'scripts/finageCL-Adapter/config.env'});

const app = express();
app.use(express.json()); 

app.post('/', (req, res) => {
    console.log('POST Data: ', req.body)
    if(req.body.data.method == 'quote') {
        create.quoteRequest(req.body, (status, result) => {
            console.log('Result: ', result)
            res.status(status).json(result)
        })
    }
    if(req.body.data.method == 'history') {
        create.historyRequest(req.body, (status, result) => {
            console.log('Result: ', result)
            res.status(status).json(result)
        })
    }
})

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Ready at port ${port}...`);
});

