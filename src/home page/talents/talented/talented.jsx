import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../../header/header';
import styles from './talented.module.css';
import Load from '../../../imgs/Double Ring-1.8s-200px.gif';
import { storage } from '../../../firebase';
import { ref, getDownloadURL } from "firebase/storage";

const Talented = () => {
     const { params } = useParams();
     const navigate = useNavigate();
     const [loading, setLoading] = useState(true);
     const [talented, setTalents] = useState(true);
     const [image, setImage] = useState(null);

     useEffect(() => {
          const clientData = JSON.parse(window.localStorage.getItem("client"));
          if (!clientData) {
               navigate('/Authentication/Login');
          } else {
               axios.get(`http://127.0.0.1:8000/api/GetTalent/${params}`)
                    .then((response) => {
                         setTalents(response.data);
                         setLoading(false);
                    })
                    .catch((error) => {
                         console.log(error);
                         setLoading(false);
                    });

               const imageRef = ref(storage, `image/${talented.profile_photo}`);
               getDownloadURL(imageRef)
                    .then((url) => {
                         setImage(url);
                    })
                    .catch((error) => {
                         console.error("Error retrieving image:", error);
                    })
                    .finally(() => {
                         setLoading(false);
                    });
          }
     }, [params, navigate, talented.profile_photo]);

     if (loading) {
          return (
               <div className={styles.bodyforload}>
                    <img src={Load} alt="Loading" width="80" />
               </div>
          );
     }

     return (
          <div className={styles.body}>
               <Header />
               <section>
                    <div className={styles.jobcontainer}>
                         {image && <div className={styles.photo_div}>
                              <img src={image} alt="Profile" />
                         </div>}
                         <h1>{talented.first_name} {talented.last_name} </h1>
                         <h4>{talented.role}</h4>
                         <p>email: {talented.email}</p>
                         <p>country from : {talented.country}</p>
                         <p>hourly rate : {talented.hourly_rate}hr(s)/week</p>
                         <p>level : {talented.level}</p>
                         {talented.languages && JSON.parse(talented.languages).map((elm, index) => (
                              <p key={index}>Speaking : {elm.language} {elm.type}</p>
                         ))}
                         <p>skills : {talented.skills && JSON.parse(talented.skills).join(", ")}</p>
                         <p>{talented.bio}</p>
                         <p>{talented.experience}</p>

                         <Link to='/Homepage/find-talents'>
                              <div className={styles.back_btn}>
                                   <button>
                                        back
                                   </button>
                              </div>
                         </Link>
                    </div>
               </section>
          </div>
     );
}

export default Talented;
