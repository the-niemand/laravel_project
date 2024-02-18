import React, { useState } from 'react';
import mansitting from '../../../imgs/Object 2.png'
import styles from './section4.module.css';
import bg1 from '../../../imgs/Vector 1.png'
import bg2 from '../../../imgs/Vector 2.png'
import arrow from '../../../imgs/Arrow 1.png'
import miami from '../../../imgs/Marni 1.png'

const Section2 = (props) => {
     return (
          <div className={styles.sec4}>
               <div className={styles.blk1}>
                    <h4>Trouver des talents Ta façon</h4>
                    <p>Travaillez avec le plus grand réseau de professionnels indépendants et faites avancer les choses, depuis des délais d'exécution rapides jusqu'à de grandes transformations</p>
                    <div className={styles.features_blocks}>


                         <div className={styles.f_blk}>
                              <p>Publiez une offre d'emploi engagez un pro</p>
                              <svg width="18" height="16" viewBox="0 0 18 16" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                   <path
                                        d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9L1 7ZM17.7071 8.70711C18.0976 8.31658 18.0976 7.68342 17.7071 7.29289L11.3431 0.928932C10.9526 0.538408 10.3195 0.538408 9.92893 0.928932C9.53841 1.31946 9.53841 1.95262 9.92893 2.34315L15.5858 8L9.92893 13.6569C9.53841 14.0474 9.53841 14.6805 9.92893 15.0711C10.3195 15.4616 10.9526 15.4616 11.3431 15.0711L17.7071 8.70711ZM1 9L17 9V7L1 7L1 9Z"
                                        fill="black" />
                              </svg>
                         </div>
                         <div className={styles.f_blk}>
                              <p>Naviger et acheter un projet</p>
                              <svg width="18" height="16" viewBox="0 0 18 16" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                   <path
                                        d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9L1 7ZM17.7071 8.70711C18.0976 8.31658 18.0976 7.68342 17.7071 7.29289L11.3431 0.928932C10.9526 0.538408 10.3195 0.538408 9.92893 0.928932C9.53841 1.31946 9.53841 1.95262 9.92893 2.34315L15.5858 8L9.92893 13.6569C9.53841 14.0474 9.53841 14.6805 9.92893 15.0711C10.3195 15.4616 10.9526 15.4616 11.3431 15.0711L17.7071 8.70711ZM1 9L17 9V7L1 7L1 9Z"
                                        fill="black" />
                              </svg>
                         </div>
                         <div className={styles.f_blk}>
                              <p>obtenir les conseils d'un expert du secteur</p>
                              <svg width="18" height="16" viewBox="0 0 18 16" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                   <path
                                        d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9L1 7ZM17.7071 8.70711C18.0976 8.31658 18.0976 7.68342 17.7071 7.29289L11.3431 0.928932C10.9526 0.538408 10.3195 0.538408 9.92893 0.928932C9.53841 1.31946 9.53841 1.95262 9.92893 2.34315L15.5858 8L9.92893 13.6569C9.53841 14.0474 9.53841 14.6805 9.92893 15.0711C10.3195 15.4616 10.9526 15.4616 11.3431 15.0711L17.7071 8.70711ZM1 9L17 9V7L1 7L1 9Z"
                                        fill="black" />
                              </svg>
                         </div>

                    </div>
               </div>
               <div className={styles.blk2}>
                    <img src={miami} alt="" />
               </div>
          </div>
     )
};

export default Section2;
