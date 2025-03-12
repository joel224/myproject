const CreatorPodcastSchema= require("./CreatorPodcastSchema");
const multer = require("multer");
const DemoAudioSchema = require("./DemoAudio/DemoAudioSchema");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

const multipleUpload = multer({ storage: storage }).array("files",2);

const creatorUploadPodcast=async(req,res)=>{ 
  console.log('test')
console.log(req.file)
console.log(req.files)
    let creatorsPodcast = new CreatorPodcastSchema({
      creatorname:req.body.creatorname,
      podcastname: req.body.podcastname,
      description: req.body.description,
      price:req.body.price,
      coverimage: req.files[0],
      audio: req.files[1],
      creatorId: req.body.creatorId
    });
    creatorsPodcast
      .save()
      .then((response) => {
        res.json({
          status: 200,
          msg: "Podcast uploaded Succesfully",
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
          // console.log(err);
          res.json({
            status: 500,
            msg: "error",
          });
        }
      });
  }


  

  const viewCreatorPodcastById=(req,res)=>{
    console.log(req.body)
    CreatorPodcastSchema.findById({_id:req.body.id})
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
  
  const editCreatorPodcastById=(req,res)=>{
    
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
  const getAllPodcastByCreator=(req,res)=>{
    console.log('msncbhdv');
    CreatorPodcastSchema.find({creatorId:req.body.id})
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

  module.exports={creatorUploadPodcast,multipleUpload,viewCreatorPodcastById,editCreatorPodcastById,getAllPodcastByCreator}