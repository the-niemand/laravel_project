import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { storage } from '../../../firebase';
import { ref, getDownloadURL } from "firebase/storage";
import Header from '../../../header/header'
import styles from './post_precise.module.css'
import Load from '../../../imgs/Double Ring-1.8s-200px.gif'
import location from '../../../imgs/maps-and-flags (1).png'
import clock from '../../../imgs/time (1).png'

const Postedjob = () => {
     const navigate = useNavigate();
     const [client, setClient] = useState(null);
     const [loading, setLoading] = useState(true);
     const [selectedTalented, setSelectedTalented] = useState(null);
     const [data, setData] = useState(null);
     const [job, setJob] = useState(null);

     const { index } = useParams();



     useEffect(() => {
          const clientData = JSON.parse(window.localStorage.getItem("client"));
          if (!clientData) {
               navigate('/Authentication/Login');
          } else {
               setClient(clientData);
               axios.get('http://127.0.0.1:8000/api/Getjobsproposals', {
                    params: {
                         job_post_id: parseInt(index)
                    }
               }).then((response) => {
                    setLoading(false);
                    setData(response.data);
                    setJob(response.data[0])
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




     if (loading) {
          return <div className={styles.bodyforload}>
               <img src={Load} alt="this slowpoke moves" width="80" />
          </div>
     }

     const deletejobpost = async (job_post_id) => {
          const isConfirmed = window.confirm("Are you sure you want to delete this post?");
          if (isConfirmed) {
               try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/Deletepostjob`, {
                         params: {
                              job_post_id: parseInt(job_post_id)
                         }
                    });
                    navigate('/Homepage/find-talents/posted-jobs')
                    console.log(response.data);
               } catch (error) {
                    console.error('Error fetching jobs:', error);
               }
          }
     }

     const handleTalentedClick = (talentedId) => {
          if (selectedTalented === talentedId) {
               setSelectedTalented(null);
          } else {
               setSelectedTalented(talentedId);
          }
     };



     const handleaccept = async (jop_application_id) => {
          try {
               const response = await axios.get(`http://127.0.0.1:8000/api/Setstatus`, {
                    params: {
                         status: 'Accepted', // Pass 'Accepted' for accept
                         jop_application_id: parseInt(jop_application_id)
                    }
               });
               console.log(response.data);
          } catch (error) {
               console.error('Error fetching jobs:', error);
          }
     }

     const handledeclined = async (jop_application_id) => {

          const isConfirmed = window.confirm("Are you sure you want to delete this post?");
          if (isConfirmed) {
               try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/Setstatus`, {
                         params: {
                              status: 'Declined', // Pass 'Declined' for decline
                              jop_application_id: parseInt(jop_application_id)
                         }
                    });
                    console.log(response.data);
               } catch (error) {
                    console.error('Error fetching jobs:', error);
               }
          }
     }









     return (
          <div className={styles.body}>
               <Header />
               <div className={styles.this_section}>
                    <h1>your post job</h1>
                    <div className={styles.jobcontainer}>
                         {job && (
                              <div>
                                   <p className={styles.created_at}>posted {getTimeDifference(job.updated_at)} </p>
                                   <p className={styles.Title}>{job.title}</p>
                                   <p className={styles.payment}>{job.Jtype} price-Est. Budget: {job.Jtype === 'Fix' ? (`${job.price}$`) : (`${job.price}$/hr`)}</p>
                                   <p className={styles.Description}>
                                        {job.description}
                                   </p>
                                   <div className={styles.skills_needed}>
                                        {job.skills_required && JSON.parse(job.skills_required).map((skill, index) => (
                                             <div className={styles.skillsElm} key={index}>
                                                  {skill}
                                             </div>
                                        ))}
                                   </div>
                                   <p className={styles.level}>level : {job.level}</p>
                                   <p className={styles.duration}>duration :  {job.duration}</p>
                                   <p className={styles.Hirer}>{`Hirer : ${job.first_name} ${job.last_name}`}</p>
                                   <p className={styles.Hirer_email}> Hirer email : {job.email}</p>
                                   <div className={styles.lbtn}>
                                        <button className={styles.apply} onClick={() => { deletejobpost(job.job_post_id) }}>Delete post</button>
                                   </div>
                              </div>
                         )}
                    </div>
                    <h1>Talents propose to it</h1>
                    <div className={styles.jobcontainer}>
                         {data && data[0].job_application_id == null ? (
                              <h3 style={{ color: 'red' }}>No proposals found</h3>
                         ) : (
                              data.map((elm, index) => (
                                   elm.status !== 'Declined' && (
                                        <div key={index} className={styles.talented} onClick={() => handleTalentedClick(index)} style={{ border: elm.status === 'Accepted' ? '3px solid green' : 'initial' }}>
                                             <p>{elm.first_name} {elm.last_name}</p>
                                             <p>{elm.role}</p>
                                             <p>{elm.email}</p>
                                             <p>status: {elm.status == null ? 'waiting' : elm.status}</p>
                                             <div className={styles.skills_needed}>
                                                  {elm.skills && JSON.parse(elm.skills).map((skill, index) => (
                                                       <div className={styles.skillsElm} key={index}>
                                                            {skill}
                                                       </div>
                                                  ))}
                                             </div>
                                             {selectedTalented === index && elm.status !== 'Accepted' && (
                                                  <div className={styles.proposal_text}>
                                                       <p className={styles.Description}>
                                                            {elm.proposal}
                                                       </p>
                                                       <div className={styles.buttons}>
                                                            <button className={styles.Accept} onClick={() => handleaccept(elm.job_application_id)}>Accept</button>
                                                            <button className={styles.Decline} onClick={() => handledeclined(elm.job_application_id)}>Decline</button>
                                                       </div>
                                                  </div>
                                             )}
                                        </div>
                                   )
                              ))
                         )}
                    </div>
               </div>
          </div >
     );
}

export default Postedjob 