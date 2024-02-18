import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import styles from '../css/preview.module.css';
import { Photo } from './preview component/photo/photo';
import edit from '../imgs/pencil (1) 1.png';
import close from '../imgs/close.png';
import add from '../imgs/add 1.png';
import { next } from './reducer'
import { useEffect } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'




const Preview = () => {

     // #################################

     const client = useSelector((state) => state.client);
     const imageData = useSelector((state) => state.imageData);
     const [role, setrole] = useState(client.role)
     const [bio, setbio] = useState(client.bio)
     const [hourly, sethourly] = useState(client.hourly_rate)
     const [languages, setLanguages] = useState(client.languages || []);
     const [skills, setskills] = useState(client.Skills || [])
     const [experience, setexperience] = useState(client.Experience)
     const dispatch = useDispatch()


     const sendDataToAPI = async () => {

          try {
               const dataToSend = {
                    first_name: client.first_name,
                    last_name: client.last_name,
                    email: client.email,
                    type: client.type,
                    password: client.password,
                    country: client.country,
                    role: role,
                    bio: bio,
                    hourly_rate: hourly,
                    languages: languages,
                    skills: skills,
                    experience: experience,
                    level: 'Beginner',
                    profile_photo: client.image_name,
               };


               const response = await axios.post('http://127.0.0.1:8000/api/Signup', dataToSend);

               console.log('Data sent successfully:', response.data, dataToSend);
               window.localStorage.setItem("client", JSON.stringify(dataToSend));

               const imageRef = ref(storage, `image/${client.image_name}`)

               uploadBytes(imageRef, imageData).then((snaphshot) => {
                    getDownloadURL(snaphshot.ref).then((response) => {
                         console.log(response)
                    })
               })


               dispatch(next());
          } catch (error) {
               console.error('Error sending data:', error);
          }
     };


     //    ##############################


     const handlingrole = () => {
          setrole(prompt('saisir ton role professionel '))
     }
     const handlingbio = () => {
          setbio(prompt('saisir ton biography'))
     }
     const handlinghourly = () => {
          sethourly(prompt('saisir ton taux horaire'))
     }
     const handlingexperience = () => {
          setexperience(prompt('saisir ton experience'))
     }

     const addingskill = () => {
          const newskill = prompt('saisir ton comportement')
          const tabskills = [...skills, newskill]
          setskills(tabskills)
     }
     const addinglanguage = () => {
          const language = prompt('Enter the language');
          const proficiency = prompt('Enter the proficiency level (basic, intermediate, advanced, or fluent)');
          const newlanguage = {
               language: language,
               type: proficiency
          };
          const tablanguage = [...languages, newlanguage];
          setLanguages(tablanguage);
     };


     const deletelanguage = (index) => {
          const newLanguages = [...languages];
          newLanguages.splice(index, 1);
          setLanguages(newLanguages);
     };

     const deleteskill = (index) => {
          const newSkills = [...skills];
          newSkills.splice(index, 1);
          setskills(newSkills);
     };

     // useEffect(() => {
     //      console.log(client)
     // }, [])
     return (
          <div className={styles.ctn5}>
               <h1>Preview du profile</h1>
               <Photo />
               <div className={styles.otherdata}>
                    <div className={styles.div_role}>
                         <p className={styles.role}>{role}</p>
                         <div className={styles.edit} onClick={handlingrole} >
                              <img src={edit} alt="Edit" />
                         </div>
                    </div>
                    <div className={styles.div_bio}>
                         <div className={styles.lab}>
                              <p>BIO</p>
                              <div className={styles.edit} onClick={handlingbio} >
                                   <img src={edit} alt="Edit" />
                              </div>
                         </div>
                         <p className={styles.data}>{bio}</p>
                    </div>
                    <div className={styles.div_hourlyrate}>
                         <div className={styles.lab}>
                              <p>${hourly}/hr</p>
                              <div className={styles.edit} onClick={handlinghourly} >
                                   <img src={edit} alt="Edit" />
                              </div>
                         </div>
                         <p className={styles.metadata}>taux horaire</p>
                    </div>

                    {/* # the language section       # */}
                    <div className={styles.lab}>
                         <p>Languages</p>
                         <div className={styles.edit} >
                              <img src={edit} alt="Edit" />
                         </div>
                    </div>
                    <div className={styles.div_language}>

                         {languages.map((elm, index) => (
                              <div className={styles.landata} key={index}>
                                   <div>{elm.language}</div>
                                   <div>{elm.type}</div>
                                   <button className={styles.deletebtn} onClick={() => deletelanguage(index)}>
                                        Delete
                                   </button>
                              </div>
                         ))}
                         <div className={styles.addinglanguage}>
                              <img src={add} className={styles.addicon} onClick={addinglanguage} />
                         </div>
                    </div>


                    {/* end */}
                    <div className={styles.div_skills}>
                         <div className={styles.lab}><p>Skills</p>
                              <div className={styles.edit} >
                                   <img src={edit} alt="Edit" />
                              </div>
                         </div>
                         <div className={styles.skillsdata}>
                              {skills.map((skl, index) => {
                                   return (
                                        <div className={styles.sklelm} key={index} >{skl}<img src={close} alt="" onClick={() => { deleteskill(index) }} /></div>
                                   )
                              })}
                              <div className={styles.addingskill} >
                                   <img src={add} className={styles.addicon} onClick={addingskill} />
                              </div>
                         </div>
                    </div>
                    <div className={styles.div_exp}>
                         <div className={styles.lab}>
                              <p>Experience</p>
                              <div className={styles.edit} onClick={handlingexperience} >
                                   <img src={edit} alt="Edit" />
                              </div>
                         </div>
                         <p className={styles.data}>{experience}</p>
                    </div>
               </div>
               <div className={styles.btn}>
                    <button onClick={sendDataToAPI}>
                         créer mon compte
                    </button>
               </div>
          </div>
     );
};

export default Preview;


