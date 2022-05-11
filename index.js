import express from 'express';
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// routes

app.get('/', (req, res) => {
    console.log('test log');
    res.send('Hello from the Homepage');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`);
});