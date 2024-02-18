import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { next, add } from './reducer';
import styles from '../css/finalone.module.css';
import video1 from '../imgs/hands_video.mp4';
import succeded from '../imgs/LFYS2sjFQG.gif'

const Finalone = () => {
     const client = useSelector((state) => state.client);
     console.log(JSON.parse(window.localStorage.getItem("client")));

     const elms = (
          <div className={styles.ctn}>
               <div className={styles.greeting}>
                    <h1>
                         très Bien <span>{client.first_name}</span>, votre profil est prêt
                    </h1>
               </div>

               <img src={succeded} alt="" srcset="" />

               <div className={styles.btns}>
                    <Link to='/Profile'>
                         <button className={styles.btn1}>voir mon profil</button>
                    </Link>
                    {client.type === 'Freelancer' ? (
                         <Link to='/Homepage/find-works'>
                              <button className={styles.btn2}>Parcourir les offres d'emploi</button>
                         </Link>
                    ) : (
                         <Link to='/Homepage/find-talents'>
                              <button className={styles.btn2}>Parcourir les offres de service</button>
                         </Link>
                    )}

               </div>
          </div >
     );

     return elms;
};

export default Finalone;
