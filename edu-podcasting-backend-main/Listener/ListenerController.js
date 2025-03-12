const express = require("express");
const ListenerSchema = require("./ListenerSchema");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const  CreatorPodcastSchema = require("../Creator/CreatorPodcastSchema");
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

const ListenerRegister = (req, res) => {
// console.log(req.body);
//  console.log(req.file);
  let image = req.file;
  let listener = new ListenerSchema({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    gender: req.body.gender,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    mobile: req.body.mobile,
    country: req.body.country,
    image: req.file,
  });
  listener
    .save()
    .then((response) => {
      res.json({
        status: 200,
        msg: "Successfully registered",
        data:response
      });
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.json({
          status: 409,
          msg: "Email Id Already Registered",
        });
      } else {
        console.log(err);
        res.json({
          status: 500,
          msg: "error",
        });
      }
    });
};

const ListenerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const listener = await ListenerSchema.findOne({ email: email });
    if (listener) {
      if (listener.password === password) {
        const token = jwt.sign(
          { email: listener.email, password: listener.password },
          "secret_key",
          { expiresIn: 86400 }
        );
        return res
          .status(200)
          .json({ message: "Login successful", token, id: listener._id });
      } else {
        return res.status(401).json({ message: "Password is incorrect" });
      }
    } else {
      return res.status(404).json({ message: "listener does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//View all Customers
  
const viewListeners=(req,res)=>{
  ListenerSchema.find().exec()
  .then(data=>{
    if(data.length>0){
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  }else{
    res.json({
      status:200,
      msg:"No Data obtained "
  })
  }
}).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Inserted",
        Error:err
    })
})

}

// view Customers finished


const editListenerById=(req,res)=>{

  ListenerSchema.findByIdAndUpdate({_id:req.body.id},{
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    dob: req.body.dob,
    gender: req.body.gender,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    mobile: req.body.mobile,
    country: req.body.country,
    image: req.file,
    })
.exec().then(data=>{
  res.json({
      status:200,
      msg:"Updated successfully"
  })
}).catch(err=>{
  res.json({
      status:500,
      msg:"Data not Updated",
      Error:err
  })
})
}
// view cust by id
const viewListenerById=(req,res)=>{
  
  ListenerSchema.findById({_id:req.body.id}).exec()
  .then(data=>{

    console.log(data);
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  
}).catch(err=>{
  console.log(err);
    res.json({
        status:500,
        msg:"No Data obtained",
        Error:err
    })
})

}

const deleteListenerById=(req,res)=>{
  ListenerSchema.findByIdAndDelete({_id:req.params.id}).exec()
  .then(data=>{
    console.log(data);
    res.json({
        status:200,
        msg:"Data removed successfully",
        data:data
    })
  
}).catch(err=>{
  console.log(err);
    res.json({
        status:500,
        msg:"No Data obtained",
        Error:err
    })
})

}
//forgotvPawd Customer by id
const forgotPwd=(req,res)=>{
console.log(req.body,'uuu');
     
  ListenerSchema.findOneAndUpdate({email:req.body.email},{
       password:req.body.password},{conformpassword:req.body.conformpassword
    })
.exec().then(data=>{
  if(data!=null)
  res.json({
      status:200,
      msg:"password Updated successfully"
  })
  else
  res.json({
    status:500,
    msg:"User Not Found"
   
})
}).catch(err=>{
  console.log(err);
  res.json({
      status:500,
      msg:"Data not Updated",
      Error:err
  })
})
}
const getAllPodcast=(req, res)=>{
  CreatorPodcastSchema.find({})
    .then(data=>{
  
      console.log(data);
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
}
module.exports = {
  upload,
  ListenerRegister,
  ListenerLogin,
  deleteListenerById,
  editListenerById,
  viewListenerById,
  forgotPwd,
  viewListeners,
  getAllPodcast
};
