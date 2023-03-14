import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import router  from './src/routes/router.js';

const app = express();
const PORT = 4000

app.use(express.json());
app.use(cors());
app.use(router);

mongoose.connect("mongodb://0.0.0.0:27017/Troology", { useNewUrlParser: true })
    .then(() => {
        console.log(`DB CONNECTED SUCCESFULLY`)
    })
    .catch(() => {
        console.log("Error in Database Connection")
    })


app.listen(PORT, () => {
    console.log(`Nodejs with Express started in PORT ${PORT}!!!`);
})

app.post('/', async (req, res) => {
    res.status(200).send("Hello World")
})
