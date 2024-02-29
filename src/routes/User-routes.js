const router = require("express").Router();
let User = require("../models/User");

router.route("/").post((req,res)=>{
    
    const role = req.body.role;
    const userID = req.body.userID;
    const name = req.body.name;
    const email=req.body.email;
    const password = req.body.password;
    const type = req.body.type;
  
    
    const newUser =new User({
        role,
        userID,
        name,
        email,
        password,
        type
    })
    newUser.save().then(()=>{
        res.status(201).send(newUser)
    }).catch((err)=>{
       
    })
})

router.route("/").get((req,res)=>{
    User.find().then((user)=>{
        res.json(user)
    }).catch((err)=>{
      
    })
})


router.route("/:id").put(async (req,res) => {
    let userId = req.params.id;
    const name = req.body.name;
    const email=req.body.email;
    const password = req.body.password;
    const type = req.body.type;
  

    const updateUSer = {
        name,
        email,
        password,
        type
    }
    const update = await  User.findByIdAndUpdate(userId, updateUSer)
    .then(() => {
        res.status(200).send({status: "User updated"})
    }).catch((err) =>{
        
        res.status(500).send({status: "Error with updating data", error: err.messege});
    })
})

router.route("/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await User.findByIdAndDelete(userId)
    .then(() =>{
        res.status(200).send({status: "User deleted"});
    }).catch((errr) => {
      
        res.status(500).send({status: "Error with delete Appointment", error: err.messege});
    })
})



router.route("/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await User.findById(userId)
    .then((users) => {
        res.status(200).send({status: "user fetched", users})
    }).catch(() => {
      
        res.status(500).send({status: "Error with get user",error: err.messege});
    })
})

module.exports = router;