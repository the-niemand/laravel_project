import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateImage, next , add} from './reducer'; // Import your action
import styles from '../css/img.module.css';
import addicon from '../imgs/add 1.png';
import profile from '../imgs/Group 27.png'
import { storage } from '../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'

const Image = () => {

  const [image , setImage] = useState(null)
  const [preview , setPreview] = useState(profile)

  const dispatch = useDispatch();


  const handlefile = (e) => {
    

    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile)
      setPreview(URL.createObjectURL(selectedFile));
      dispatch(updateImage(selectedFile));
      dispatch(add('image_name', selectedFile.name));
    }
    
  }

  
  const handleAddPhotoClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };

  const handlenext = () => {
    dispatch(next())
  }


  return (
    <div className={styles.ctn4}>
      <div className={styles.uploadingphoto}>


        <div className={styles.photo} style={{ backgroundImage: `url(${preview})` }}>
          <div className={styles.add}>
            <img src={addicon} alt="Upload" onClick={handleAddPhotoClick} />
            <input type="file" id="fileInput" accept="image/jpg, image/jpeg, image/png, image/svg" onChange={handlefile} />
          </div>
        </div>


        <button className={styles.addButton} onClick={handleAddPhotoClick}>
          Ajouter une photo
        </button>
      </div>
      <button className={styles.previewButton} onClick={handlenext}>
        Preview
      </button>
    </div>
  );
};

export default Image;
