import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { storage } from '../../firebase';
import { ref, getDownloadURL } from "firebase/storage";
import Header from '../../header/header'
import styles from '../css/talents.module.css'
import Filter from './talentscomponent/filter'
import Profile from '../jobs.jsx/jobscomponent/profile'
import SearchFeed from './talentscomponent/searchfeed'
import Load from '../../imgs/Double Ring-1.8s-200px.gif'
import addpost from '../../imgs/plus.png'
import { Link } from 'react-router-dom';
import axios from 'axios';


const Talents = () => {
     const navigate = useNavigate();
     const { parms } = useParams();
     const [image, setImage] = useState(null);
     const [client, setClient] = useState(null);
     const [loading, setLoading] = useState(true);
     const [talents, setTalents] = useState(true);



     const [level, setLevel] = useState(null);
     const [Pinput, setPinput] = useState(null);
     const [from, setFrom] = useState(null);
     const [more, setMore] = useState(null);


     useEffect(() => {
          const clientData = JSON.parse(window.localStorage.getItem("client"));
          if (clientData) {
               setClient(clientData);
               const imageRef = ref(storage, `image/${clientData.profile_photo}`);
               getDownloadURL(imageRef)
                    .then((url) => {
                         setImage(url);
                         setLoading(false);
                    })
                    .catch((error) => {
                         console.error("Error retrieving image:", error);
                         setLoading(false);
                    });

               if (clientData.skills) {

                    axios.get('http://127.0.0.1:8000/api/Gettalentsbyuserskills', {
                         params: {
                              skills: JSON.parse(clientData.skills)
                         }
                    }).then((response) => {

                         setTalents(response.data[0])
                         console.log(response.data[0]);
                         setLoading(false);

                    }).catch((error) => {
                         console.error("Error fetching jobs:", error);
                         setLoading(false);
                    });
               } else {
                    console.warn("Client skills not found.");
                    setLoading(false);
               }
          } else {
               if (parms) {
                    const datasend = [];
                    datasend.push(parms)

                    axios.get('http://127.0.0.1:8000/api/Gettalentsbyuserskills', {
                         params: {
                              skills: datasend
                         }
                    }).then((response) => {

                         setTalents(response.data[0]);
                         setLoading(false);
                    }).catch((error) => {
                         console.error("Error fetching jobs:", error);
                    });

                    setLoading(false)

               }
          }
     }, []);







     if (loading) {
          return <div className={styles.bodyforload}>
               <img src={Load} alt="this slowpoke moves" width="80" />
          </div>
     }

     return (
          <div className={styles.body}>
               <Header />
               <div className={styles.section}>
                    <div className={styles.filter}>
                         <p>Filters</p>
                         <div className={styles.filtering}>
                              {/* Level */}
                              <div className={styles.filterOption}>
                                   <p className={styles.filteringTitle}>Level</p>
                                   <div className={styles.checkboxGroup}>

                                        <div className={styles.checkboxTest}>
                                             <input id="B" type="radio" name="Level" onChange={() => setLevel('Beginner')} />
                                             <label htmlFor="B">B</label>
                                        </div>
                                        <div className={styles.checkboxTest}>
                                             <input id="1" type="radio" name="Level" onChange={() => setLevel('1')} />
                                             <label htmlFor="1">1</label>
                                        </div>
                                        <div className={styles.checkboxTest}>
                                             <input id="2" type="radio" name="Level" onChange={() => setLevel('2')} />
                                             <label htmlFor="2">2</label>
                                        </div>
                                        <div className={styles.checkboxTest}>
                                             <input id="3" type="radio" name="Level" onChange={() => setLevel('3')} />
                                             <label htmlFor="3">3</label>
                                        </div>
                                   </div>
                              </div>
                              {/* Second from chat gbt */}
                              <div className={styles.filterOptionPrice}>
                                   <p className={styles.filteringTitle}>Hourly rate</p>
                                   {/* Hourly */}
                                   <div className={styles.checkboxGroupHourly}>
                                        <div className={styles.type}>
                                             <div className={styles.checkboxTest}>
                                                  <input id="MTHourly" type="radio" name="type_hourly" onChange={() => { setPinput('From') }} />
                                                  <label htmlFor="MTHourly"><input type="number" name id className={styles.val}
                                                       placeholder="More than" onChange={(e) => setFrom(e.target.value)} /> $/hr</label>
                                             </div>
                                             <div className={styles.checkboxTest}>
                                                  <input id="FTH" type="radio" name="type_hourly" onChange={() => { setPinput('From_To') }} />
                                                  <label htmlFor="FTH"><input type="number" placeholder="from"
                                                       className={styles.valFrom} onChange={(e) => setFrom(e.target.value)} />$/hr<input type="number" placeholder="to"
                                                            className={styles.valTo} onChange={(e) => setMore(e.target.value)} />$/hr</label>
                                             </div>
                                             <div className={styles.checkboxTest}>
                                                  <input id="LTH" type="radio" name="type_hourly" onChange={() => { setPinput('To') }} />
                                                  <label htmlFor="LTH"><input type="number" name id className={styles.val}
                                                       placeholder="Less than" onChange={(e) => setMore(e.target.value)} /> $/hr</label>
                                             </div>
                                        </div>
                                   </div>
                                   
                              </div>
                         </div>
                    </div>
                    <SearchFeed talents={talents} level={level} Pinput={Pinput} from={from} more={more} />

                    <Profile client={client} image={image} />
                    <Link to='/Homepage/post-job'>
                         <div className={styles.post_job_button}>
                              <p className={styles.post_job_button_paragraph}>post a job</p>
                              <div className={styles.imageContainer}>
                                   <img src={addpost} alt="" srcset="" />
                              </div>
                         </div>
                    </Link>
               </div>
          </div >
     )
}

export default Talents
