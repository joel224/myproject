import React, { useState,useEffect } from "react";
import "./creatoruploadpodcast.css";
import axiosInstance from "../../Baseurl";
import { useNavigate } from "react-router-dom";

function CreatorUploadPage() {
  const [CreatorPodcast, setCreatorPodcast] = useState({
    podcastname: "",
    description: "",
    price:"",
    coverimage: "",
    audio:""
  });
  const navigate=useNavigate()

  const creatorPodcastChange = (e) => {
    // console.log(e.target.value);
    // console.log(e.target.name);
    setCreatorPodcast({
      ...CreatorPodcast,
      [e.target.name]:
       ( e.target.name === "image" || e.target.name === "audio" )
          ? e.target.files
            ? e.target.files[0]
            : null
          : e.target.value,
    });
    // console.log(CreatorPodcast);
  };

  const UploadImage = async (e) => {
    e.preventDefault();
    let data = new FormData();
    for (let key in CreatorPodcast) {
      if( key != "image" && key != "audio"){
        data.append(key, CreatorPodcast[key]);
      }
    }
    data.append('creatorname',localStorage.getItem("creatorname") );
    data.append('files',CreatorPodcast.image);
    data.append('files',CreatorPodcast.audio);
    data.append('creatorId',localStorage.getItem('creatorid'));
     
    console.log(CreatorPodcast);
    console.log(data.get('files'),"data");

    
    axiosInstance
      .post("/creator_upload_podcast", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response, "y");
        alert(response.data.msg);
        navigate('/creatorprofile')
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
  };
  const handleback=()=>{
    navigate('/creatorprofile')
  }

const creatorname=localStorage.getItem('creatorname')

  useEffect(() => {
    if (localStorage.getItem("creatorid") !== null) {
      navigate("/creatorupload");
    } else {
      navigate("/");
    }
  }, []);

    return (
    <div className="podcast_upload">
      <div className="container">
        <h4 className="text-center">Upload Podcast</h4>
        <div className="row">
          <div className="col">
            <label className="Creator_Name_label" for="">
              Creator Name
            </label>
            <input
            value={creatorname}
              name="creatorname"
              type="text"
              class="form-control"
              id="Creator_Name"
              onChange={creatorPodcastChange}
              disabled
            ></input>
            <label className="Creator_Name_label" for="">
              Podcast Name
            </label>
            <input
              type="text"
              class="form-control"
              id="podcast_Name"
              placeholder="Title"
              onChange={creatorPodcastChange}
              name="podcastname"
            ></input>
            <label className="Creator_Name_label" for="">
              Description
            </label>
            <textarea
              name="description"
              class="form-control"
              id="description"
              rows={4}
              cols={40}
              onChange={creatorPodcastChange}
            />
           
          </div>
          <div className="col">
          <label className="Creator_Name_label" for="">
          price
         </label>
         <input
           type="text"
           class="form-control"
           id="price"
           placeholder="price"
           onChange={creatorPodcastChange}
           name="price"
         ></input>

            <label className="Creator_Name_label" for="">
              Cover Image
            </label>
            <input
              type="file"
              class="form-control"
              id="coverimg"
              placeholder=""
              name="image"
              onChange={creatorPodcastChange}
            ></input>
        
          
            <label className="Creator_Name_label" for="">
             Demo Audio
            </label>
            <input
              type="file"
              class="form-control"
              id="audio"
              placeholder=""
              name="audio"
              onChange={creatorPodcastChange}
            ></input>
          </div>
        </div>
        <button className="btn btn-light ms-5 px-5" onClick={UploadImage}>
          Upload
        </button>
        <button type="reset" onClick={handleback} className="btn btn-secondary ms-4 px-5">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CreatorUploadPage;
