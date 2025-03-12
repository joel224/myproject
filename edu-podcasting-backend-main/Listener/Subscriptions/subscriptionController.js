

// Done By Soumya on 20/02

let subscription=require('./subscriptionSchema')
const subscribeCreator=(req,res)=>{
    console.log(req.body);
   // console.log(req.files);
   // res.send("tha")
 
   // let image = req.file;

   let subscription = new subscription({
    listenerid:req.params.listenerid,
     creatorid: req.body.creatorid,
     date: req.body.date
     
   });
   subscription
   
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


 

 const viewSubscriptionById=(req,res)=>{
   
   subscription.findById({_id:req.params.id}).populate('listenerid').populate('creatorid').exec()
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
 
 const viewSubscriptionByListenerId=(req,res)=>{
   
    subscription.find({listenerid:req.params.id}).populate('creatorid')
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
 const viewSubscriptionByCreatorId=(req,res)=>{
   console.log('msncbhdv');
   subscription.find({creatorId:req.params.id}).populate('listenerid').exec()
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

 const updatePayment=(req,res)=>{
   
    subscription.findByIdAndUpdate({_id:req.params.id},{paymentstatus:true})
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

 module.exports={
    subscribeCreator,
    viewSubscriptionByCreatorId,
    viewSubscriptionById,
    viewSubscriptionByListenerId,
    updatePayment
 }