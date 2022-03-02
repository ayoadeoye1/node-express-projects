import express from 'express';
import Registration from '../models/reg.js';
import bodeParser from 'body-parser';

const router = express.Router();

router.use(bodeParser.json());
router.use(bodeParser.urlencoded({extended: true}));

const midWare = async(req, res, next) =>{
    try{
        const regId = await req.params.id;
        if(!regId){
            return res.status(400).json({error: 'Oops... user _id does not exist'});
        }
        res.regId = regId;
        next();
    }catch (error){
        res.status(400).json({error: error.message });
    }
    
}

router.post('/registration', async(req, res)=>{
    const {name, age, address} = req.body;
    if(!name || !age || !address){
        return res.status(400).json({error: 'all input field are required'});
    }
    const dat = new Registration({name, age, address});
    let data = await dat.save();
    console.log(data)
    res.status(201).json({data});
})

router.get('/registration/:id', midWare, async(req, res)=>{
   try{
        if(!res.regId){
            return res.status(400).json({error: 'Oops... user _id does not exist'});
        }
        const reg = await Registration.find(); // === res.regId);
        const newReg = reg.find((param)=> param.id === res.regId);
        res.status(201).json(newReg);
   }catch (error) {
       console.log(error);
   }
})

router.get('/registration', async(req, res)=>{
    const reg = await Registration.find();
    res.status(201).json(reg);
})

router.patch('/registration/:id', midWare, async(req, res)=>{
    try {
        const pach = await Registration.find();
        let newPach = pach.find((val)=> val.id === res.regId);
        //const {name, age, address} = newPach;

        newPach.name = req.body.name;
        newPach.age = req.body.age;
        newPach.address = req.body.address;

        await newPach.save()

        res.status(201).json({success: `Updated successfully: ${newPach}`});
    } catch (error) {
       console.log(error);
    }
})

router.delete('/registration/:id', midWare, async(req, res)=>{
    try{
        const del = await Registration.find();
        const delReg = del.find((val) => val.id === res.regId);
        const doneDel = delReg.remove();
        if(doneDel){
            res.status(201).json({success: 'user deleted successfully'});
        }
    }catch (error) {
        console.log(error)
    }
})


export default router;