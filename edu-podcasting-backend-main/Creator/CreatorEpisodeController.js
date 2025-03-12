const CreatorEpisodeSchema = require("./CreatorEpisodeSchema");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

const multipleUpload = multer({ storage: storage }).single("files");

const CreatorEpisode=async(req,res)=>{ 

    let CreatorEpisode = new CreatorEpisodeSchema({
        episodetitle:req.body.episodeTitle,
        episodecount: req.body.episodeCount,
        podcastId: req.body.podcastId,
        audio: req.file
    });
    CreatorEpisode
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
          console.log(err);
          res.json({
            status: 500,
            msg: "error",
          });
        }
      });
  }

module.exports={CreatorEpisode, multipleUpload}