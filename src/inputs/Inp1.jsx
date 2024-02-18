import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { next, add } from './reducer';
import styles from '../css/inp1.module.css';
import freelancer from '../imgs/Group 15.png';
import entre from '../imgs/02june22_megaphone_icon_02.png';
import { Link } from "react-router-dom";



const Inp1 = () => {
  const dispatch = useDispatch();
  const [userType, setUserType] = useState('Hirer');
  const [freelancerStyles, setFreelancerStyles] = useState({
    container: {},
    img: {},
    text: {},
  });
  const [hirerStyles, setHirerStyles] = useState({
    container: {
      background: 'rgba(121, 106, 205, 1)',
      border: '2px solid rgba(121, 106, 205, 1)',
    },
    img: {
      width: 'auto',
      height: '95px',
      opacity: '1',
      marginBottom: '-10px',
    },
    text: {
      color: 'rgba(255, 255, 255, 1)',
      fontWeight: '550',
    },
  });

  const handleFreelancer = () => {
    setUserType('Freelancer');
    setHirerStyles({ container: {}, img: {}, text: {} });
    setFreelancerStyles({
      container: {
        background: 'rgba(121, 106, 205, 1)',
        border: '2px solid rgba(121, 106, 205, 1)',
      },
      img: {
        width: 'auto',
        height: '95px',
        opacity: '1',
        marginBottom: '-10px',
      },
      text: {
        color: 'rgba(255, 255, 255, 1)',
        fontWeight: '550',
      },
    });
  };

  const handleHirer = () => {
    setUserType('Hirer');
    setFreelancerStyles({ container: {}, img: {}, text: {} });
    setHirerStyles({
      container: {
        background: 'rgba(121, 106, 205, 1)',
        border: '2px solid rgba(121, 106, 205, 1)',
      },
      img: {
        width: 'auto',
        height: '95px',
        opacity: '1',
        marginBottom: '-10px',
      },
      text: {
        color: 'rgba(255, 255, 255, 1)',
        fontWeight: '550',
      },
    });
  };



  const handlenext = () => {
    dispatch(add('type', userType))
    dispatch(next())
  }

  const elms = (
    <div className={styles.ctn1}>
      <div className={styles.selections}>
        <div className={styles.div} id="Freelancer" onClick={handleFreelancer} style={freelancerStyles.container}>
          <img src={freelancer} alt="" style={freelancerStyles.img} />
          <p style={freelancerStyles.text}>je cherche du travail</p>
        </div>
        <div className={styles.div} id="Hirer" onClick={handleHirer} style={hirerStyles.container}>
          <img src={entre} alt="" style={hirerStyles.img} />
          <p style={hirerStyles.text}>je cherche des freelancers</p>
        </div>
      </div>

      <div className={styles.btn}>
        <button onClick={handlenext}>créer un compte</button>
        <p>Vous avez déjà un compte ? <a ><Link to="/Authentication/Login">log in</Link></a></p>
      </div>
    </div>
  );

  return elms;
};

export default Inp1;