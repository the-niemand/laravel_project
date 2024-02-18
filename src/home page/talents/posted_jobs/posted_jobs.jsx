import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../firebase';
import { ref, getDownloadURL } from "firebase/storage";
import Header from '../../../header/header'
import styles from './posted_jobs.module.css'
import Load from '../../../imgs/Double Ring-1.8s-200px.gif'
import location from '../../../imgs/maps-and-flags (1).png'
import clock from '../../../imgs/time (1).png'

const Postedjobs = () => {
     const navigate = useNavigate();
     const [image, setImage] = useState(null);
     const [client, setClient] = useState(null);
     const [loading, setLoading] = useState(true);
     const [jobs, setJobs] = useState(null);

     useEffect(() => {
          const clientData = JSON.parse(window.localStorage.getItem("client"));
          if (!clientData) {
               navigate('/Authentication/Login');
          } else {
               setClient(clientData);
               axios.get('http://127.0.0.1:8000/api/Getjobspostedbyhirer', {
                    params: {
                         Hirer_id: parseInt(clientData.user_id)
                    }
               }).then((response) => {
                    setLoading(false);
                    setJobs(response.data);
                    console.log(response.data);
               }).catch((error) => {
                    console.error("Error fetching jobs:", error);
                    setLoading(false);
               });
          }
     }, []);


     const getTimeDifference = (timestamp) => {
          const now = new Date();
          const postTime = new Date(timestamp);
          const timeDiff = now - postTime;

          // Convert milliseconds to minutes
          const minutes = Math.floor(timeDiff / (1000 * 60));

          if (minutes < 1) {
               return "just now";
          } else if (minutes === 1) {
               return "1 minute ago";
          } else if (minutes < 60) {
               return `${minutes} minutes ago`;
          } else if (minutes < 1440) {
               const hours = Math.floor(minutes / 60);
               return `${hours} hours ago`;
          } else {
               const days = Math.floor(minutes / 1440);
               return `${days} days ago`;
          }
     }



     const handleDivClick = (index) => {
          navigate(`/Homepage/find-talents/posted-jobs/${index}`)
     };


     if (loading) {
          return <div className={styles.bodyforload}>
               <img src={Load} alt="this slowpoke moves" width="80" />
          </div>
     }

     return (
          <div className={styles.body}>
               <Header />
               <div className={styles.this_section}>

                    {jobs && (
                         jobs.map((elm, index) => {
                              return (
                                   <div className={styles.job_posted1} key={index} onClick={() => handleDivClick(elm.job_post_id)}>
                                        <div className={styles.many_proposals}>
                                             <p>{elm.proposal_count}</p>
                                        </div>
                                        <div className={styles.posted_job}>
                                             <p className={styles.jobTitle}>{elm.title}</p>
                                             <div className={styles.date_location}>
                                                  <div><img src={clock} alt="" srcset="" /><p className={styles.publishedDate}>posted {getTimeDifference(elm.updated_at)}</p></div>
                                                  <div><img src={location} alt="" srcset="" /><p className={styles.country}>{elm.target_country}</p></div>
                                             </div>
                                        </div>
                                   </div>
                              )
                         })
                    )}

               </div>
          </div >
     )
}

export default Postedjobs
