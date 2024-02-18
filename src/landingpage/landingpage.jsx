import React from 'react'
import Lpheader from './landingpage component/header/Lpheader'
import styles from './landingpage.module.css'
import Section from './landingpage component/section/section'
import Section2 from './landingpage component/section/Section2'
import Section3 from './landingpage component/section/section3'
import Section4 from './landingpage component/section/section4'
import Section5 from './landingpage component/section/section5'
import aproved from '../imgs/Frame 29.png'
import Footer from './landingpage component/section/footer'



const Landingpage = () => {
  return (
    <div className={styles.body}>
      <Lpheader color={'white'} />
      <Section />
      <div className={styles.Approved}>
        <h4>Approuvé par</h4>
        <img src={aproved} alt="" srcset="" />
      </div>
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Footer/>
    </div>
  )
}

export default Landingpage