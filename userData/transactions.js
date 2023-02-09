const express = require("express");
const router = express.Router();
const User = require("../schemas/userSchema");
// if(!id){id }
router.get("/home",(req,res)=>{
    res.send("i am inside home");
})
router.post("/v1/tasks", async(req,res)=>{
    try{
        // console.log(req.body);
        const {title} = req.body;
        // console.log(title);
        if(!title){
            return res.send("no title found");
        }
        let id = 1;
        let x = await User.findOne().sort({id:-1});
        // console.log(x)
        if(x==null){id=1}
        else{
            id = x.id+1;

        }
// if(id==null){id = 1}
        // console.log(x,"x");
        // x =x+1;
        // if(!id){id = 1}
        // console.log(id);
        let user = await User.create({
            id,
            title,
            is_taskcompleted:true
        })
        res.status(201).json({
            id
        })

    }catch(err){
        return res.status(402).json({
            error:err.massege
        })
    }
})
router.get("/v1/tasks", async(req,res)=>{
    try{
        let user = await User.find()
        // const {id,title,is_taskcompleted} = user;
        res.status(200).json({
            user
        })

    }catch(err){
        return res.status(402).json({
            error:err.massege
        })
    }
})
router.get("/v1/tasks/:id", async(req,res)=>{
    try{
        const id = req.params;
        let user = await User.find(id);
        if(user.length ==0){
            return res.status(404).json({
                error:"There is no task at that id"
            })
        }
        // const {id,title,is_taskcompleted} = await user;
        res.status(200).json({
            user
        })

    }catch(err){
        return res.status(402).json({
            error:err.massege
        })
    }
})
router.delete("/v1/tasks/:id", async(req,res)=>{
    try{
        const id = req.params;
        let user = await User.find(id).deleteOne();
        console.log(user)
        // if(user.length ==0){
        //     return res.status(404).json({
        //         error:"There is no task at that id"
        //     })
        // }
        // const {id,title,is_taskcompleted} = await user;
        res.status(204).json({
            
        })

    }catch(err){
        return res.status(204).json({
            error:err.massege
        })
    }
})
router.put("/v1/tasks/:id", async(req,res)=>{
    try{
        const id = req.params;
        // console.log(req.body)
        const {title,is_taskcompleted} = req.body;
        let user = await User.findOne(id)
        console.log(is_taskcompleted)
        if(user==null){
            return res.status(404).json({
                error:"There is no task at that id"
            })
        }
         user = await User.updateOne(id,{$set:req.body})
        // const {id,title,is_taskcompleted} = user;
        // console.log(user)
        res.status(200).json({
            user
        })

    }catch(err){
        return res.status(402).json({
            error:err.massege
        })
    }
})

module.exports = router;