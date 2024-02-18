import React, { useState } from 'react';
import { updateImage  , add} from '../../reducer';
import styles from './photo.module.css'
import { useDispatch, useSelector } from 'react-redux';
import edit from '../../../imgs/pencil (1) 1.png';
import profile from '../../../imgs/Group 27.png'

export const Photo = () => {
     const imageData = useSelector((state) => state.imageData);
     const urlimage = URL.createObjectURL(imageData)
     const [preview, setPreview] = useState(imageData ? urlimage : profile);
     const dispatch = useDispatch();

     const handleChange = (e) => {
          if (e.target.files && e.target.files[0]) {
               const selectedFile = e.target.files[0];
               console.log(selectedFile.name );
               console.log(imageData);
               console.log(urlimage);
               
               dispatch(add('image_name', selectedFile.name));
               setPreview(URL.createObjectURL(selectedFile));
               dispatch(updateImage(selectedFile));
          }
     };



     return (

          <div className={styles.photo} style={{ backgroundImage: `url(${preview})` }}>
               <label className={styles.add}>
                    <img src={edit} alt="Upload" />
                    <input
                         type="file"
                         id="fileInput"
                         accept="image/jpg, image/jpeg, image/png, image/svg"
                         onChange={handleChange}
                    />
               </label>
          </div>


     )
}
