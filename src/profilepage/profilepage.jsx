import React, { useEffect, useState } from 'react'
import Header from '../header/header'
import style from './profilepage.module.css'
import portfolioimg from './imgs/Desktodp - 1.png'
import delt from './imgs/close.png'
import { Edit, Add, Del } from './profilepage components/editAndAdd'
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase';
import { ref, getDownloadURL } from "firebase/storage";
import Load from '../imgs/Double Ring-1.8s-200px.gif'
import prf from '../imgs/Group 27.png'

const Profilepage = () => {
     const navigate = useNavigate()
     const [image, setImage] = useState(null || prf);
     const [client, setClient] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const clientData = JSON.parse(window.localStorage.getItem("client"));
          if (!clientData) {
               navigate('/Authentication/Login');
          } else {
               setClient(clientData);
               const imageRef = ref(storage, `image/${clientData.profile_photo}`);
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

     }, []);


     // Render loading state if data is being fetched
     if (loading) {
          return <div className={style.bodyforload}>
               <img src={Load} alt="this slowpoke moves" width="80" />
          </div>
     }

     const handlingskills = () => {
          if (typeof client.skills === 'string') {
               console.log(client.skills);
               return JSON.parse(client.skills).map((skill, index) => (
                    <div className={style.skillsElm} key={index}>
                         {skill} <img src={delt} />
                    </div>
               ));
          } else {
               console.log(client.skills);
               return client.skills.map((skill, index) => (
                    <div className={style.skillsElm} key={index}>
                         {skill} <img src={delt} />
                    </div>
               ));
          }
     };


     return (
          <div className={style.body}>

               <Header />

               <div className={style.section}>
                    {/* <!-- profile_data --> */}
                    <div className={style.profileData}>
                         <div className={style.firstData}>
                              <img
                                   src={image}
                                   alt=""
                              />
                         </div>
                         <div className={style.secondData}>
                              <div className={style.data}>
                                   <div>
                                        <p className={style.key}>First name</p>
                                        <div>
                                             <p className={style.value}>{client.first_name}</p>
                                             <Edit top={'0.1em'} right={'0.1em'} />
                                        </div>
                                   </div>
                                   <div>
                                        <p className={style.key}>last name</p>
                                        <div>
                                             <p className={style.value}>{client.last_name}</p>
                                             <Edit top={'0.1em'} right={'0.1em'} />
                                        </div>
                                   </div>
                                   <div>
                                        <p className={style.key}>Country</p>
                                        <div><p className={style.value}>{client.country}</p>
                                             <Edit top={'0.1em'} right={'0.1em'} /></div>
                                   </div>
                                   <div>
                                        <p className={style.key}>Level</p>
                                        <div>
                                             <p className={style.value}>{client.level}</p>
                                             <Edit top={'0.1em'} right={'0.1em'} />
                                        </div>
                                   </div>
                                   <div>
                                        <p className={style.key}>Hours</p>
                                        <div>
                                             <p className={style.value}>50hrs/week</p>
                                             <Edit top={'0.1em'} right={'0.1em'} />
                                        </div>
                                   </div>

                              </div>
                         </div>
                    </div>

                    {/* <!-- search_feed --> */}
                    <div className={style.workData}>
                         {/* <!-- button --> */}
                         <div className={style.editButton}>
                              <button>Save and edit</button>
                         </div>

                         {/* <!-- role and bio --> */}
                         <div className={style.roleBio}>
                              <div className={style.rolePaid}>
                                   <div><p className={style.role}>Designer </p><Edit top={'0.1em'} right={'0.1em'} pos='absolute' /></div>
                                   <div><p className={style.paid}>50$/hr</p><Edit top={'0.1em'} right={'0.1em'} pos='absolute' /></div>
                              </div>
                              <div className={style.bio}>
                                   <p >
                                        {client.bio}
                                   </p>
                                   <Edit top={'0.1em'} right={'0.1em'} pos='absolute' />
                              </div>
                         </div>
                         {/* <!-- skills --> */}
                         <div className={style.skills}>
                              <p>skills</p>
                              <div className={style.skillsData}>
                                   {handlingskills()}
                                   <Add />

                              </div>
                         </div>
                         {/* <!-- experience --> */}
                         <div className={style.experience}>
                              <p>experience</p>
                              <div>
                                   <p className={style.expData}>
                                        {client.experience}
                                   </p><Edit top={'0.1em'} right={'0.1em'} pos='absolute' />
                              </div>
                         </div>
                         {/* <!-- portfolio --> */}
                         <div className={style.portfolio}>
                              <p>portfolio</p>
                              <div className={style.portfolioData}>
                                   <div className={style.portElm1}>
                                        <div className={style.image}>
                                             <img src={portfolioimg} className={style.img1} alt="" />
                                             <Del top={'0.3em'} right={'0.3em'} />
                                        </div>
                                        <div className={style.description}>Royal Air Morocco booking airway tickets</div>
                                        <div></div>
                                   </div>
                                   <div className={style.addingPortfolio}>
                                        <Add />
                                   </div>
                              </div>
                         </div>
                    </div>

               </div>
          </div>
     )
}

export default Profilepage