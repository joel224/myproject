const express = require("express");
const router = express.Router();

const listener=require('./Listener/ListenerController')
const creator=require('./Creator/CreatorController')
const creatorpodcast=require('./Creator/CreatorPodcastController')
const admin=require('./Admin/AdminControl')
const subscriptionController=require('./Listener/Subscriptions/subscriptionController')
const DemoAudioController=require('./Creator/DemoAudio/DemoAudioController')
const episode=require('./Creator/CreatorEpisodeController')


//Listeners
router.post('/listenerLogin',listener.ListenerLogin)
router.post('/listenerregister',listener.upload,listener.ListenerRegister)
router.post('/editListenerById',listener.upload,listener.editListenerById)
router.post('/viewListenerById',listener.viewListenerById)
router.post('/deleteListenerById/:id',listener.deleteListenerById)
router.post('/listenerforgotpassword',listener.forgotPwd)
router.post('/viewListeners',listener.viewListeners)
router.post('/getAllpodcast',listener.getAllPodcast)


//Creators
router.post('/creatorLogin',creator.CreatorLogin)
router.post('/CreatorRegister',creator.upload,creator.CreatorRegister)
router.post('/editCreatorById',creator.upload,creator.editCreatorById)
router.post('/viewCreatorById',creator.viewCreatorById)
router.post('/creator_upload_podcast',creatorpodcast.multipleUpload,creatorpodcast.creatorUploadPodcast)
router.post('/getPodcastByID',creatorpodcast.viewCreatorPodcastById)
router.post('/creator_edit_upload_podcast',creatorpodcast.multipleUpload,creatorpodcast.editCreatorPodcastById)
router.post('/getAllPodcastByCreator',creatorpodcast.getAllPodcastByCreator)
router.post('/deleteCreatorById/:id',creator.deleteCreatorById)
router.post('/forgotPwdCreator',creator.forgotPwdCreator)
router.post('/viewCreators',creator.viewCreators)


// episode
router.post('/uploadepisode',episode.multipleUpload, episode.CreatorEpisode)


//admin
router.post('/admin_login',admin.adiminLogin)



//Subsription routes
//Done By Soumya

router.post('/subscribeCreator/:id',subscriptionController.subscribeCreator)
router.post('/viewSubscriptionByCreatorId/:id',subscriptionController.viewSubscriptionByCreatorId)
router.post('/viewSubscriptionById/:id',subscriptionController.viewSubscriptionById)
router.post('/updatePayment/:id',subscriptionController.updatePayment)
router.post('/viewSubscriptionByListenerId/:id',subscriptionController.viewSubscriptionByListenerId)

//demo routes
//Done By Soumya
router.post('/addDemo',DemoAudioController.upload,DemoAudioController.addDemo)
router.post('/viewDemoByCreatorId',DemoAudioController.viewDemoByCreatorId)
router.post('/viewDemoById',DemoAudioController.viewDemoById)
router.post('/editDemoById',DemoAudioController.upload,DemoAudioController.editDemoById)


module.exports=router