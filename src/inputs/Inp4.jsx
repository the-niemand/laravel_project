import React, { useState } from 'react'
import { next, add } from './reducer'
import { useDispatch } from 'react-redux';
import styles from '../css/inp4.module.css'
import { Link } from "react-router-dom";
const Inp4 = () => {

     const [hourlyRate, setHourlyRate] = useState(0)
     const dispatch = useDispatch()
     const bio = (e) => {
          dispatch(add('bio', e.target.value));
     };
     const hourly_rate = (e) => {
          dispatch(add('hourly_rate', e.target.value));
          setHourlyRate(e.target.value)
     };


     const elms = (
          <div className={styles.ctn3}>
               <div className={styles.bio}>
                    <label htmlFor="bio">Votre Bio</label>
                    <textarea id="bio" name="bio" onChange={bio} cols="80" rows={10}></textarea>
               </div>

               <div className={styles.hourly}>
                    <label htmlFor="hourlyRate">définissez votre taux horaire</label>
                    <div className={styles.div}>

                         {/* #small div 1# */}
                         <div className={styles.smalldiv1}>
                              <p className={styles.firstp}>Taux horaire</p>
                              <div className={styles.calcul}>
                                   <p className={styles.dollar}>$</p>
                                   <input type="number" id="hourlyRate" name="hourlyRate" onChange={hourly_rate} />
                                   <p className={styles.perhour}>/hr</p>
                              </div>
                              <p className={styles.secondp}>le montant total que le client verra</p>
                         </div>
                         {/* #small div 2# */}
                         <div className={styles.smalldiv2}>
                              <p className={styles.firstp}>5% HINGE</p>
                              <div className={styles.calcul}>
                                   <p className={styles.dollar}>$</p>
                                   <input type="number" id="hourlyRate" name="hourlyRate" value={0.05 * hourlyRate} onChange={hourly_rate} disabled />
                                   <p className={styles.perhour}>/hr</p>
                              </div>
                              <p className={styles.secondp}>cela nous aide à gérer la plateforme</p>
                         </div>
                         {/* #small div 3# */}
                         <div className={styles.smalldiv3}>
                              <p className={styles.firstp}>vous obtiendrez</p>
                              <div className={styles.calcul}>
                                   <p className={styles.dollar}>$</p>
                                   <input type="number" id="hourlyRate" name="hourlyRate" value={hourlyRate - (0.05 * hourlyRate)} onChange={hourly_rate} disabled />
                                   <p className={styles.perhour}>/hr</p>
                              </div>
                              <p className={styles.secondp}>le montant estimé que vous recevrez</p>
                         </div>
                    </div>
               </div>

               <div className={styles.last}>
                    <div className={styles.btn}>
                         <button className={styles.nextBtn} onClick={() => { dispatch(next()); }}>Continue</button>
                         <p>Vous avez déjà un compte ? <a  className={styles.link}><Link to="/Authentication/Login">log in</Link></a></p>
                    </div>
               </div>
          </div>
     );

     return elms;
}


export default Inp4