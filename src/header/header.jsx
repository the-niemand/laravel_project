import React, { useState, useEffect } from 'react';
import bell from './imgs/bell (2).png';
import styles from './header.module.css';
import logout from './imgs/logout.png';
import avatar from './imgs/avatar.png';
import setting from './imgs/setting.png';
import { Link } from 'react-router-dom';
import { storage } from '../firebase';
import { ref, getDownloadURL } from "firebase/storage";

function Header() {
     const [image, setImage] = useState(null);
     const [User, setUser] = useState(JSON.parse(window.localStorage.getItem("client")));


     useEffect(() => {
          const clientData = JSON.parse(window.localStorage.getItem("client"));
          // setUser(clientData)
          const imageRef = ref(storage, `image/${clientData.profile_photo}`);
          getDownloadURL(imageRef)
               .then((url) => {
                    setImage(url);
               })
               .catch((error) => {
                    console.error("Error retrieving image:", error);
               });
     }, []); // Empty dependency array ensures this effect runs only once after mounting

     const skillslist = ['Graphics & Design', 'Programming & Tech', 'Digital Marketing', 'Video & Animation', 'Writing & Translation', 'Music & Audio', 'Business', 'Data', 'Photography', 'AI Services'];

     const links_for_freelancer = <div className={styles.links}>
          <Link to='/Homepage/find-works'>
               <p>Find work</p>
          </Link>
          <Link to='/Homepage/find-works/proposals'>
               <p>My Proposals</p>
          </Link>

     </div>;

     const links_for_hirer = <div className={styles.links}>
          <Link to='/Homepage/find-talents/'>
               <p>Find talented</p>
          </Link>
          <Link to='/Homepage/find-talents/posted-jobs'>
               <p>My posted jobs</p>
          </Link>

     </div>





     return (
          <div className={styles.both}>
               {/* Header */}
               <header>
                    <div className={styles.header_block1}>

                         {User.Ftype == 'Freelancer' ? (
                              <Link to='/Homepage/find-works'>
                                   <h1>HINGER</h1>
                              </Link>
                         ) : (
                              <Link to='/Homepage/find-talents'>
                                   <h1>HINGER</h1>
                              </Link>

                         )}
                         {User.Ftype == 'Freelancer' ? (
                              links_for_freelancer
                         ) : (
                              links_for_hirer
                         )}
                    </div>
                    <div className={styles.header_block2}>
                         <div className={styles.ring}>
                              <img src={bell} alt="" />
                              <div className={styles.notification}></div>
                         </div>
                         <div className={styles.profile}>
                              <div className={styles.photo}>
                                   <img src={image || avatar} className={styles.head_Profile} alt="" />
                              </div>
                              <div className={styles.online}></div>
                              <div className={styles.dropdownprofile}>
                                   <Link to='/Profile'>
                                        <div className={styles.dropdownprofileitem}>
                                             <img src={avatar} alt="" />
                                             Profile
                                        </div>
                                   </Link>
                                   <div className={styles.dropdownprofileitem}>
                                        <img src={setting} alt="" />
                                        Settings
                                   </div>
                                   <Link to='/Authentication/Login'>
                                        <div className={styles.dropdownprofileitem}>
                                             <img src={logout} alt="" />
                                             Log out
                                        </div>
                                   </Link>
                              </div>
                         </div>
                    </div>
               </header>

               {/* Header2 */}
               <div className={styles.header2}>
                    {skillslist.map((elm, index) => {
                         return <p key={index}>{elm}</p>;
                    })}
               </div>
          </div>
     );
}

export default Header;
