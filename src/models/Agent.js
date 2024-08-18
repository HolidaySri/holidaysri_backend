const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;


const AgentSchema = new Schema({

    role: {
        type: String,
        default: "agent",
      },
    
    subrole: {
        type: String,
      },
    
    name: {
        type: String,
        
      },

    nic: {
        type: String, 
      },

    passport:{
        type: String, 
    },
    
    email: {
        type: String,
      
      },
    
   
    contactNumber: {
        type: Number,
       
      },
    
    password: {
        type: String,
       
      },

      
    promoCode: {
        type: String,
      
      },

      image : {
        type: String,
      
  },
  country: {
        type: String,
      },
    
      resetPasswordToken : String,
      resetPasswordExpire : Date,
    
      
    })
//pre save runs before save data on Mongodb
AgentSchema.pre("save", async function (next) {
      //checking whether the password isModified
      if (!this.isModified("password")) {
        next();
      }
    
      //hash password before passing it to db save query through the model
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt); //this.password reffers to password that contains within request object
    
      next();
    });

//to compare hashed passwords in login scenarios
AgentSchema.methods.matchPasswords = async function (password) {
      return await bcrypt.compare(password, this.password); //password refers to user providing one and this.password refers to one that get from db
    };

AgentSchema.methods.getSignedToken = function () {
      return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
    };


const Agent = mongoose.model("Agent", AgentSchema);
module.exports = Agent;