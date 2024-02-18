import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Lpheader.module.css'
import Buttons from './buttons'



const Lpheader = (props) => {
  return (
    <header style={{backgroundColor : `${props.color}`}}>
      <div className={styles.header_block1} >
        <Link to='/'>
          <h1>HINGER</h1>
        </Link>
        <div className={styles.links}>
          <p>Find Talent</p>
          <p>Find Work</p>
          <p>Why hinge</p>
          <p>Enterprise</p>
        </div>
      </div>
      <div className={styles.header_block2} >
        <Buttons texture="Login" link='/Authentication/Login'/>
        <Buttons texture="Signup" link='/Authentication/Signup'/>
      </div>
    </header>

  )
}

export default Lpheader