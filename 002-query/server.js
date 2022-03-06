import express from "express";
import user from './users.js';

const app = express();

app.get('/query', (req,res)=>{
    const {search, limit, page, skip} = req.query;
    let data = [...user];

    if(search){
        data = data.filter((val)=>{
            return val.username.startsWith(search);
        })
    }

    // this can be used to get specific amount of user only
    // if(limit){
    //     data = data.slice(0, Number(limit))
    // }

    // this skip the index of array based on user input, it does not affect number of element that will showcase though, but it do affect the index.
    if(skip){
        data = data.splice(Number(skip));
    }

    if(limit<1){
        res.json({success: false, data: []});
    }

    // this can be used to get specific amount of user base on page from which is to be selected and the limit value is the number of element per page.
    if(page && limit){
        const start = (page - 1) * limit;
        const stop = page * limit;
        data = data.slice(Number(start), Number(stop));
    }

    res.json({success: true, data: data});
})

app.listen(8000, ()=>{
    console.log('listening on port 8000');
})
