const express = require('express');

const app = express();
const crudRouter = require('./Router/all.rouder');
const logger = (req,res,next)=>{
    let method = req.method;
    let url = req.url;

    next();
}

app.use(express.json());
app.use(logger)


app.use('/posts', crudRouter)

app.listen(8086,()=>{
    console.log("Server start");
})