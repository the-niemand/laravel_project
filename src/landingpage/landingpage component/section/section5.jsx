import React, { useState } from 'react';
import styles from './section5.module.css';
import imge from '../../../imgs/06 1.svg'
import Buttons from '../header/buttons';
import G14 from '../../../imgs/Group 14.svg';
import G11 from '../../../imgs/Group 11.svg';
import G13 from '../../../imgs/Group 13.png';

const Section5 = (props) => {
     return (
          <div className={styles.sec5}>
               <div className={styles.blk2}>
                    <img src={imge} alt="" srcset="" />
               </div>
               <div className={styles.blk1}>
                    <h4>Trouvez génial tavail</h4>
                    <p>Rencontrez des clients avec lesquels vous avez hâte de travailler et de prendre
                         votre carrière ou votre entreprise vers de nouveaux sommets</p>
                    {/* <img src={threethinks} alt="" /> */}
                    <div className={styles.findworktextbox}>
                         <div className={styles.findworkbox}>

                              <img src={G14} alt="" srcset="" />
                              <h6 className={styles.fone}>Trouvez des opportunités pour chaque étape de votre carrière freelance</h6>
                         </div>
                         <div className={styles.findworkbox}>
                              <img src={G11} alt="" srcset="" />
                              <h6 className={styles.sone}>Contrôlez où, quand et comment vous travaillez</h6>
                         </div>
                         <div className={styles.findworkbox}>
                              <img src={G13} alt="" srcset="" />
                              <h6 className={styles.Tone}>Découvrez différentes manières de gagner</h6>
                         </div>
                    </div>
                    <button>
                         trouver des opportunités
                    </button>
               </div>
          </div>
     )
};

export default Section5;
