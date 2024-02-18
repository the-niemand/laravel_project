import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../header/header';
import styles from './applytojob.module.css';
import Load from '../../../imgs/Double Ring-1.8s-200px.gif';
import paper from '../../../imgs/paper-clip (1).png';

const Applytojob = () => {
     const { index } = useParams();
     const navigate = useNavigate();
     const [client, setClient] = useState(JSON.parse(window.localStorage.getItem("client")));
     const [loading, setLoading] = useState(true);
     const [files, setFiles] = useState([]);
     const [proposal, setProposal] = useState('');
     const [job, setJob] = useState(null);
     const [next, setNext] = useState(false);
     const [error, setError] = useState(null);

     useEffect(() => {
          const clientData = JSON.parse(window.localStorage.getItem("client"));
          if (!clientData) {
               navigate('/Authentication/Login');
          } else {
               setClient(clientData);
               setLoading(false);
          }
          axios.get(`http://127.0.0.1:8000/api/Getjobs/${index}`)
               .then((response) => {
                    setJob(response.data);
               })
               .catch((error) => {
                    setError(error);
               });

     }, []);

     const Sendproposal = async () => {
          const dataToSend = {
               proposal: proposal,
               files: JSON.stringify(files),
               Hirer_id: job.Hirer_id, // Assuming Hirer_id is obtained from the job object
               Freelancer_id: client.user_id,
               job_post_id: parseInt(index), // Parse index to an integer
          };
          console.log(dataToSend);

          try {
               const dataToSend = {
                    proposal: proposal,
                    files: JSON.stringify(files),
                    Hirer_id: parseInt(job.Hirer_id),
                    Freelancer_id: parseInt(client.user_id),
                    job_post_id: parseInt(index),
               };

               const response = await axios.post('http://127.0.0.1:8000/api/Jobproposal', dataToSend);
               console.log('Data sent successfully:', response.data, dataToSend);
               navigate('/Homepage/find-works');
          } catch (error) {
               console.error('Error sending data:', error);
          }
     };


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
     };

     const handlefile = (e) => {
          if (e.target.files && e.target.files[0]) {
               const selectedFile = e.target.files[0].name;
               setFiles(prevFiles => [...prevFiles, selectedFile]);
          }
     };

     const handlefileadd = () => {
          const fileInput = document.getElementById('fileInput');
          fileInput.click();
     };

     const handlingskills = () => {
          if (job && typeof job.skills_required === 'string') {
               return JSON.parse(job.skills_required);
          }
          return []; // Return an empty array if skills are not available
     };

     const jobs_data = job && (
          <>
               <p className={styles.created_at}>posted {getTimeDifference(job.updated_at)}</p>
               <p className={styles.Title}>{job.title}</p>
               <p className={styles.payment}>Fixed price-Est. Budget: {job.price}</p>
               <p className={styles.Description}>{job.description}</p>
               <div className={styles.skills_needed}>
                    {handlingskills().map((skill, index) => (
                         <div className={styles.skillsElm} key={index}>
                              {skill}
                         </div>
                    ))}
               </div>
               <p className={styles.level}>level : {job.level}</p>
               <p className={styles.duration}>duration : {job.Duration}</p>
               <div className={styles.lbtn}>
                    <button className={styles.apply} onClick={() => { setNext(true) }}>Apply this job</button>
               </div>
          </>
     );

     const jobs_apply = (
          <>
               <p className={styles.Title}> Job Proposal </p>
               <textarea name="" id="" cols="30" rows="15" className={styles.proposal_input} placeholder='Job proposal text' onChange={(e) => { setProposal(e.target.value) }}></textarea>
               <div className={styles.addfile}>
                    <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handlefile} />
                    {files.length > 0 && (
                         files.map((elm, index) => {
                              return <p key={index} style={{ margin: '20px' }}>{elm}</p>;
                         })
                    )}
                    <div className={styles.paperimg}>
                         <img src={paper} alt="" onClick={handlefileadd} />
                    </div>
               </div>
               <div className={styles.lbtn}>
                    <button className={styles.apply} onClick={Sendproposal} >Send Proposal</button>
               </div>
          </>
     );

     if (loading) {
          return (
               <div className={styles.bodyforload}>
                    <img src={Load} alt="this slowpoke moves" width="80" />
               </div>
          );
     }

     if (error) {
          return <div>Error: {error.message}</div>;
     }

     return (
          client && (
               <div className={styles.body}>
                    <Header />
                    <section>
                         <div className={styles.jobcontainer}>
                              {!next ? jobs_data : jobs_apply}
                         </div>
                    </section>
               </div>
          )
     );
}

export default Applytojob;
