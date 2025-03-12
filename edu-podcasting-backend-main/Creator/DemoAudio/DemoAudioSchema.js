
//Soumya on 21/02

const mongoose = require("mongoose");

const DemoaudioSchema = mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "creators",
    unique: true,
    required: true,

    dropDups: true
  },
  
  description: {
    type: String,
    required: true,
  },
  date:{
    type:Date
  },
  audio:{
    type:Object,
    required:true
  }
  
});
module.exports = mongoose.model("demoaudios", DemoaudioSchema);
