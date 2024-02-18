import React, { useState } from 'react';
import mansitting from '../../../imgs/Object 2.png'
import styles from './section3.module.css';
import star from '../../../imgs/star (1).png'

const Section3 = (props) => {
     const skillslist = [
          {skill: "Graphics & Design", rate: 4.7, talents: 2584},
          {skill: "Programming & Tech", rate: 4.3, talents: 3847},
          {skill: "Digital Marketing", rate: 4.9, talents: 3965},
          {skill: "Video & Animation", rate: 4.5, talents: 4321},
          {skill: "Writing & Translation", rate: 4.8, talents: 3142},
          {skill: "Music & Audio", rate: 4.2, talents: 2756},
          {skill: "Business", rate: 4.6, talents: 4873},
          {skill: "Data", rate: 4.1, talents: 3410},
          {skill: "Photography", rate: 4.4, talents: 2198},
          {skill: "AI Services", rate: 4.0, talents: 1932}
        ]
        



     return (
          <section className={styles.sec3}>
               <h4>Rechercher des <span>talents</span> par catégorie</h4>
               <div className={styles.skills}>
                    {skillslist.map((elm) => {
                         return (

                              <div className={styles.skill}>
                                   <h6>{elm.skill}</h6>
                                   <div>
                                        <p><img src={star} alt="" /> {elm.rate}/5</p>
                                        <p>{elm.talents} skills</p>
                                   </div>
                              </div>

                         )
                    })}
               </div>
          </section>
     );
};

export default Section3;
