const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const CreatorSchema = require("./CreatorSchema");


const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

const CreatorRegister = (req, res) => { 
  let image = req.file;
  let creators = new CreatorSchema({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    gender: req.body.gender,
    street: req.body.street,
    city: req.body.city,
    pincode: req.body.pincode,
    mobile: req.body.mobile,
    country: req.body.country,
    image: req.file,
  });
  creators
    .save()
    .then((response) => {
      res.json({
        status: 200,
        msg: "Succesfully registered",
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

const CreatorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const creators = await CreatorSchema.findOne({ email: email });
    if (creators) {
      if (creators.password === password) {
        const token = jwt.sign(
          { email: creators.email, password: creators.password },
          "secret_key",
          { expiresIn: 86400 }
        );
        return res
          .status(200)
          .json({ message: "Login successful", token, id: creators._id, creatorname: creators.firstname
});
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


  
const viewCreators=(req,res)=>{
  CreatorSchema.find().exec()
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


const editCreatorById=(req,res)=>{
    
  CreatorSchema.findByIdAndUpdate({_id:req.body.id},{
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
const viewCreatorById=(req,res)=>{
  CreatorSchema.findById({_id:req.body.id}).exec()
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

const deleteCreatorById=(req,res)=>{
  CreatorSchema.findByIdAndDelete({_id:req.params.id}).exec()
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
const forgotPwdCreator=(req,res)=>{

     
  CreatorSchema.findOneAndUpdate({email:req.body.email},{
       password:req.body.password
    })
.exec().then(data=>{
  if(data!=null)
  res.json({
      status:200,
      msg:"Updated successfully"
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




module.exports = {
  upload,
  CreatorRegister,
  CreatorLogin,
  deleteCreatorById,
  editCreatorById,
  viewCreatorById,
  forgotPwdCreator,
  viewCreators,
};
