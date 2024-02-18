import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styles from '../css/loging.module.css';
import google from '../imgs/search.png'
import fcb from '../imgs/facebook.png'
import x from '../imgs/twitter.png'
import { reset } from './reducer';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const LOGIN = () => {

     const [email, setemail] = useState('')
     const [password, setpassword] = useState('')
     const [email_error, setemail_error] = useState('');
     const [passwd_error, setpasswd_error] = useState('');

     const dispatch = useDispatch();
     const navigate = useNavigate()
     const Reset = () => {
          dispatch(reset());
     };

     const validation_emptiness = () => {
          if (email.length === 0) {
               setemail_error('email filed is empty')
          }
          if (password.length === 0) {
               setpasswd_error('password filed is empty')
          }
     }

     const handleLogin = async () => {

          setemail_error('')
          setpasswd_error('')

          validation_emptiness()

          try {
               const dataToSend = {
                    email: email,
                    password: password,
               };

               const response = await axios.post('http://127.0.0.1:8000/api/Login', dataToSend);
               window.localStorage.setItem("client", JSON.stringify(response.data));
               if (response.data.Ftype == 'Freelancer') {
                    navigate('/Homepage/find-works')
               } else {
                    navigate('/Homepage/find-talents')
               }

          } catch (error) {
               setemail_error('email or password are incorrect')
               setpasswd_error('email or password are incorrect')
          }
     };


     useEffect(() => {
          localStorage.clear();
     },)


     const elms = (
          <div className={styles.ctn}>
               <h1>LOG IN</h1>

               <div className={styles.other}>
                    <div>
                         <input className={styles.input_login_email} type="email" id="email" name="email" onChange={(e) => { setemail(e.target.value) }} placeholder='Email' />
                         <p style={{ color: 'red', cursor: 'auto', margin: '0px' }}>{email_error}</p>
                    </div>
                    <div>
                         <input className={styles.input_login_password} type="password" id="password" name="password" onChange={(e) => { setpassword(e.target.value) }} placeholder='Password' />
                         <p style={{ color: 'red', cursor: 'auto', margin: '0px' }}>{passwd_error}</p>
                    </div>
               </div>
               <button onClick={handleLogin}>log in</button>

               <div className={styles.or}>
                    <hr />
                    <p>or</p>
                    <hr />
               </div>
               <div className={styles.otr}>
                    <div className={styles.google}>
                         <img src={google} alt="" />
                         <p>Log in with Google</p>
                    </div>
                    <div className={styles.facebook}>
                         <img src={fcb} alt="" />
                         <p>Log in with Facebook</p>
                    </div>
                    <div className={styles.x}>
                         <img src={x} alt="" />
                         <p>Log in with X</p>
                    </div>
               </div>
               <p>vous n'avez pas de compte ? <a className={styles.link} onClick={Reset}><Link to="/Authentication/Signup">Sign up</Link></a></p>
          </div>
     );

     return elms;
}


export default LOGIN