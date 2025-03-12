//Soumya on 21/02

const demoAudioSchema= require("./DemoAudioSchema");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage }).single("file");

const addDemo=(req,res)=>{
   let date=new Date()

    let demo = new demoAudioSchema({
      
      description: req.body.description,
      creatorId: req.body.creatorId,
      date:date,
      audio:req.file
      
    });
    demo
      .save()
      .then((response) => {
        res.json({
          status: 200,
          msg: "demo audio uploaded Succesfully",
          data:response
        });
      })
      .catch((err) => {
        if (err.code == 11000) {
          res.json({
            status: 409,
            msg: "already uploaded",
          });
        }
         else {
          console.log(err);
          res.json({
            status: 500,
            msg: "error",
          });
        }
      });
  }


  

  const viewDemoById=(req,res)=>{
   
    demoAudioSchema.findById({_id:req.body.id})
    .then(data=>{
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
  

  const viewDemoByCreatorId=(req,res)=>{
   
    demoAudioSchema.findById({creatorid:req.body.id})
    .then(data=>{
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
  const editDemoById=(req,res)=>{
    let date =new Date()
    demoAudioSchema.findByIdAndUpdate({_id:req.body.id},{
        description: req.body.description,
        creatorId: req.body.creatorId,
        date:date,
        audio:req.file

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
  const getAllDemo=(req,res)=>{
    demoAudioSchema.find({creatorId:req.body.id})
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

  module.exports={addDemo,
    viewDemoById,
    getAllDemo,
    editDemoById,
    viewDemoByCreatorId,
  upload}