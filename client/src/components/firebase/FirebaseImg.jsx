import React, {useEffect, useState} from 'react'
import {storage} from "../firebase/index"


//default export
export default function ReactFireBaseImg() { 

  const [img, setImg] = useState(null)
  const [url, setUrl] = useState()
  const [previewImg, setPreviewImg] = useState('');
  const [progress, setProgress] = useState(0)


  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result)
        
      }
      reader.readAsDataURL(img);
    }else {
      setPreviewImg(null)
    }
  },[img])

  const handleChange = e  => {
    if (e.target.files[0]){
      setImg(e.target.files[0])
    }
  }

  const handleUpload = () => {
    const time = new Date().getTime()
   
    const uploadTask = storage.ref(`images/${time}${img.name}`).put(img);
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
        .child(`${time}${img.name}`)
        .getDownloadURL()
        .then(url => {
          console.log(url)
          setUrl(url)
        })
      }
    )
  };
  console.log("img: ", img)

  const deleteImg = () => {
    const storageRef = storage.ref() 
    const imgRef = storageRef.child('images/1623059860275Lays_chips.jpeg');

    imgRef.delete().then(()=>{
      console.log('file deleted')
    }).catch((err) => {
      console.log(err)
    })

  }

  
  return(
    <>
    <div>Hello world</div>
    <progress value={progress} max='100' />
    <br/>

<form>
  <p>
   Hello
  </p>
  { previewImg ? (
    <img src={previewImg} style = {{width:'200px'}, {height:'200px'}} />
  ): (
    <img src='http://via.placeholder.com/200x200'/>
  )}

</form>



    <br/>
    <input type='file' accept='image/*' onChange={handleChange} />
    <button onClick={handleUpload}Upload>Upload</button>
    <br/>
    <img src={setUrl || 'http://via.placeholder.com/300x400'} alt='firebase-img'/>
    {url}
    <br/>
    <img src={url || 'http://via.placeholder.com/300x400'} alt='firebase-img'/>

   <button onClick={deleteImg}>Delete Image</button> 
    </>
  )
} 