const express = require('express');
const res = require('express/lib/response');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const dotenv = require('dotenv');
const notFound = require ('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
dotenv.config({path:'./routes/.env'});

//middleware
app.use(express.static('./public'));
app.use(express.json());

//routes

app.use(errorHandlerMiddleware);
app.use('/api/v1/tasks',tasks);

const port = 3000;

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port: ${port}...`));
    } catch (error) {
        console.log(error);
    }
}
start();
