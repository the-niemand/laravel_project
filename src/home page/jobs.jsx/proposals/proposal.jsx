import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../firebase';
import { ref, getDownloadURL } from "firebase/storage";
import Header from '../../../header/header'
import styles from './proposal.module.css'
import Load from '../../../imgs/Double Ring-1.8s-200px.gif'
import location from '../../../imgs/2072c440184fd842003e45ab24bfc7e4.png'
import clock from '../../../imgs/time.png'
import waiting from '../../../imgs/hourglass.png'
import accepted from '../../../imgs/accept.png'
import denied from '../../../imgs/delete.png'

const Proposals = () => {
     const navigate = useNavigate();
     const [client, setClient] = useState(null);
     const [loading, setLoading] = useState(true);
     const [jobs, setJobs] = useState(null);
     const [selectedTalented, setSelectedTalented] = useState(null);

     useEffect(() => {
          const clientData = JSON.parse(window.localStorage.getItem("client"));
          if (!clientData) {
               navigate('/Authentication/Login');
          } else {
               setClient(clientData);
               axios.get('http://127.0.0.1:8000/api/Getproposalsbyfreelancerid', {
                    params: {
                         Freelancer_id: parseInt(clientData.user_id)
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


     const handleTalentedClick = (talentedId) => {
          if (selectedTalented === talentedId) {
               setSelectedTalented(null);
          } else {
               setSelectedTalented(talentedId);
          }
     };


     const renderSwitch = (par) => {
          switch (par) {
               case 'Accepted':
                    return (<><img src={accepted} /><p style={{ fontSize: '13px' }}>Accepted</p></>);
               case 'Denied':
                    return (<><img src={denied} /><p style={{ fontSize: '13px' }}>Waiting</p></>);
               default:
                    return (<><img src={waiting} /><p style={{ fontSize: '13px' }}>Denied</p></>);
          }
     }


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
                                   <div className={styles.job_posted1} key={index} onClick={() => handleTalentedClick(index)} style={{ backgroundColor: `${elm.status == null ? '#FFA500' : elm.status == 'Accepted' ? 'green' : 'red'}`, opacity: "0.7" }} >
                                        <div className={styles.many_proposals_info}>
                                             <div className={styles.many_proposals}>
                                                  {renderSwitch(elm.status)}
                                             </div>
                                             <div className={styles.posted_job}>
                                                  <p className={styles.jobTitle} >{elm.title}</p>
                                                  <div className={styles.date_location}>
                                                       <div><img src={clock} alt="" srcset="" /><p className={styles.publishedDate}>posted {getTimeDifference(elm.updated_at)}</p></div>
                                                       <div><img src={location} alt="" srcset="" /><p className={styles.country}>{elm.target_country}</p></div>
                                                  </div>
                                             </div>
                                        </div>

                                        {selectedTalented === index && (
                                             <div className={styles.second_info}>
                                                  <p>duration : {elm.Duration} </p>
                                                  <p>targeted level :  {elm.level}</p>
                                                  
                                                  {elm.Jtype == 'Fix' ? (

                                                       <>
                                                            <p>job type : {elm.Jtype}</p>
                                                            <p>Price : {elm.price} $</p>
                                                       </>

                                                  ) : (<>
                                                       <p>job type : {elm.Jtype}</p>
                                                       <p>job time : {elm.Job_time}hr/week</p>
                                                       <p>Price : {elm.price} $/hr</p>
                                                  </>)}
                                                  <p>Job poster full name : {elm.first_name} {elm.last_name}</p>
                                                  <p>Job poster email : {elm.email}</p>
                                                  <p>Your are {elm.status} </p>
                                                  {elm.status == null && (
                                                       <>
                                                       <button>canceling</button>
                                                       </>
                                                  )}
                                             </div>
                                        )}
                                   </div>
                              )
                         })
                    )}

               </div>
          </div >
     )
}

export default Proposals
