import React, { useEffect } from 'react';
import style from './profile.module.css';
import verification from '../../imgs/f0de90a95c6cb4f5c44300943963fbf8.png';
import { useNavigate } from 'react-router-dom';

const Profile = (props) => {

     return (
          <div className={style.profileData}>
               <div className={style.firstData}>
               <div className={style.containPhoto} >
                    <img src={props.image} alt="" srcset="" />
               </div>
                    <div className={style.containData}>
                         <div className={style.nameRole}>
                              <p className={style.name}>{props.client.first_name}</p>
                              <p className={style.role}>{props.client.role}</p>
                         </div>
                         <div className={style.levelPrice}>
                              <p className={style.level}>{props.client.level}</p>
                              <p className={style.price}>{props.client.hourly_rate}$/hr</p>
                         </div>

                         <div className={style.levelLine}>
                              <div className={style.levelBar}>
                                   <div className={style.levelFill}></div>
                              </div>
                              <p>47%</p>
                         </div>
                    </div>
               </div>
               <div className={style.secondData}>
                    <div className={style.lines}>
                         <div className={style.orderLine}>
                              <p>Order completion</p>
                              <div className={style.orderBar}>
                                   <div className={style.orderFill}></div>
                              </div>
                              <p>65%</p>
                         </div>

                         <div className={style.earningLine}>
                              <p>Earnings</p>
                              <div className={style.earningBar}>
                                   <div className={style.earningFill}></div>
                              </div>
                              <p>8,3%</p>
                         </div>

                         <div className={style.ratingLine}>
                              <p>Rating</p>
                              <div className={style.ratingBar}>
                                   <div className={style.ratingFill}></div>
                              </div>
                              <p>85%</p>
                         </div>

                         <div className={style.deliveryLine}>
                              <div>
                                   <p>On-time delivery</p>
                                   <img src={verification} alt="" />
                              </div>
                              <div className={style.deliveryBar}>
                                   <div className={style.deliveryFill}></div>
                              </div>
                              <p>100%</p>
                         </div>

                         <div className={style.projectLine}>
                              <p>Projects</p>
                              <div className={style.projectBar}>
                                   <div className={style.projectFill}></div>
                              </div>
                              <p>5</p>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default Profile;
