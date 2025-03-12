import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingNav from "./Components/Listener/LandingNav";
import ListenerLogin from "./Components/Listener/ListenerLogin";
import LandingPage from "./Pages/Listener/LandingPage";
import Footer from "./Pages/Listener/Footer";
import ListenerRegister from "./Components/Listener/ListenerRegister";
import ForgotPassword from "./Components/Listener/ForgotPassword";
import ListenerEdit from "./Components/Listener/ListenerProfileEdit";
import CreatorProfileEdit from './Components/Creator/CreatorProfileEdit';
import CreatorLogin from './Components/Creator/CreatorLogin';
import CreatorRegister from './Components/Creator/CreatorRegistration';
import AdminLandingPage from "./Components/Admin/AdminLandingPage";
import ListenerWhishlist from "./Components/Listener/ListenerWhishlist";
import ListenerProfile from "./Components/Listener/ListenerProfile";
import ListenerSubscription from "./Components/Listener/ListenerSubscription";
import CreatorHome from "./Components/Creator/CreatorHome";
import ListenerNav from "./Components/Listener/ListenerNav";
import CreatorNavbar from "./Components/Creator/CreatorNavbar";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminSidebar from "./Components/Admin/AdminSidebar";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ListenerHome from "./Components/Listener/ListenerHome";
import CreatorForgot from "./Components/Creator/CreatorForgot";
import CreatorProfile from "./Components/Creator/CreatorProfile";
import CreatorUploadPage from "./Components/Creator/CreatorUploadPage";
import CreatorUploadPoadcastEdit from "./Components/Creator/CreatorUploadPoadcastEdit";
import CreatorEpisodeAdd from "./Components/Creator/CreatorEpisodeAdd";
import CreatorSubscription from "./Components/Creator/CreatorSubscription";
import CreatorPodcastList from "./Components/Creator/CreatorPodcastList";

function App() {

  const url='http://localhost:4000/'

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/landingnav" element={<LandingNav/>} />
        <Route path="/listenernav" element={<ListenerNav url={url} />} />
        <Route path="/creatornav" element={<CreatorNavbar url={url} />} />

        
        <Route path="/" element={[<LandingNav props={{value:"listenerlanding"}}/>,<LandingPage />,<Footer />]} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/sidebar" element={<AdminSidebar/>}/>
      
        <Route path="/listenerlogin" element={[<LandingNav props={{value:"listenerlanding"}} />,<ListenerLogin />,<Footer />]} />
        <Route path='/listenerregister' element={[<LandingNav props={{value:"listenerlanding"}}/>,<ListenerRegister/>,<Footer />]}/>
        <Route path='/listeneredit' element={[<ListenerNav url={url}/>,<ListenerEdit url={url} />,<Footer />]}/>

        <Route path="/listenerhome" element={[<ListenerNav url={url}/>,<ListenerHome props={{role:"listenerhome"}}/>,<CreatorPodcastList data={{url: url, role: 'listener'}} />,<Footer />]}/>
        <Route path="/forgotpassword" element={[<ListenerNav url={url} />,<ForgotPassword />,<Footer />]} />
        <Route path='/listenerWhishlist' element={[<ListenerNav url={url} />,<ListenerWhishlist/>,<Footer />]}/>
        <Route path='/listenerProfile' element={[<ListenerNav url={url} />,<ListenerProfile url={url} />,<Footer />]}/>
        <Route path='/listenersubscription' element={[<ListenerNav url={url} />,<ListenerSubscription data={{url: url, role: 'listener'}}/>,<Footer />]}/>

        <Route path="/creatorlogin" element={[<LandingNav props={{value:"creatorlanding"}} />,<CreatorLogin/>,<Footer />]} />
        <Route path='/creatorregister' element={[<LandingNav  props={{value:"creatorlanding"}}/>,<CreatorRegister/>,<Footer />]}/>
        <Route path='/creatorhome' element={[<CreatorNavbar url={url} />,<CreatorHome/>,<Footer />]}/>
        <Route path='/creatorsubscription' element={[<CreatorNavbar url={url} />,<CreatorSubscription/>,<Footer />]}/>
        <Route path='/creatorprofile' element={[<CreatorNavbar url={url} />,<CreatorProfile  url={url} />,<CreatorPodcastList data={{url: url, role: 'creator'}} />,<Footer />]}/>
        <Route path="/creatorforgotpassword" element={[<CreatorNavbar url={url} />,<CreatorForgot />,<Footer />]} />

        <Route path='/creatorredit' element={[<CreatorNavbar url={url} />,<CreatorProfileEdit/>,<Footer />]}/>
        <Route path='/creatorupload' element={<CreatorUploadPage/>}/>
        <Route path='/creatoruploadedit' element={<CreatorUploadPoadcastEdit/>}/>
        <Route path='/creatorepisodadd/:id' element={<CreatorEpisodeAdd/>}/>
        <Route path='/creatorpodcastlist' element={[<CreatorPodcastList data={{url: url, role: 'creator'}} />]}/>

        <Route path="/adminhome" element={<AdminLandingPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
