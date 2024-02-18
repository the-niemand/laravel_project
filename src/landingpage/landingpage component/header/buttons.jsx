import React from 'react'
import { Link } from 'react-router-dom'
import styles from './buttons.module.css'

const Buttons = (props) => {
     return (
          <>
               <Link to={props.link}>
                    <div className={styles.buton}>
                         <div className={styles.circle}></div>
                         <p className={styles.buttonText}>{props.texture}</p>
                    </div>
               </Link>
          </>
     )
}

export default Buttons
