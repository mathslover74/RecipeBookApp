import React, {useEffect, useState} from 'react'
import {storage} from "../firebase/index"


//default export
export default function ReactFireBaseImg() { 

  const [img, setImg] = useState(null)
  const [url, setUrl] = useState('')
  const [progress, setProgress] = useState(0)

  const handleChange = e  => {
    if (e.target.files[0]){
      setImg(e.target.files[0])
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${img.name}`).put(img);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress)
      },
      error => {
        console.log(error)
      },
      () => {
        storage
        .ref("images")
        .child(img.name)
        .getDownloadURL()
        .then(url => {
          console.log(url)
          setUrl(url)
        })
      }
    )
  };

  console.log("img: ", img)

  
  return(
    <>
    <div>Hello world</div>
    <progress value={progress} max='100' />
    <br/>

    <input type='file' onChange={handleChange} />
    <button onClick={handleUpload}Upload>Upload</button>
    <br/>
    <img src={setUrl || 'http://via.placeholder.com/300x400'} alt='firebase-img'/>
    {url}
    <br/>
    <img src={url || 'http://via.placeholder.com/300x400'} alt='firebase-img'/>
    
    </>
  )
} 