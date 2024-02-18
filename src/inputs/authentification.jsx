import React from 'react';
import { useSelector } from 'react-redux';
import Inp1 from './Inp1';
import Inp2 from './Inp2';
import Inp3 from './Inp3';
import Inp4 from './Inp4';
import LOGIN from './loging';
import Image from './image';
import { Provider } from 'react-redux';
import { initialState, next, reducer, store } from './reducer';
import { BrowserRouter as Router, Link, Routes, Route, Outlet } from 'react-router-dom'
import styles from '../css/App.module.css'
import logo from '../imgs/HINGE.png'
import Preview from './preview';
import Finalone from './finalone';



const Authentication = () => {

     const inp = useSelector((state) => state.inp);
     const Client = useSelector((state) => state.client);
     store.subscribe(() => console.log(Client))


     let Signupsteps;
     switch (inp) {
          case 1:
               Signupsteps = <Inp1 />;
               break;
          case 2:
               Signupsteps = <Inp2 />;
               break;
          case 3:
               Signupsteps = <Inp3 />;
               break;
          case 4:
               Signupsteps = <Inp4 />;
               break;
          case 5:
               Signupsteps = <Image />;
               break;
          case 6:
               Signupsteps = <Preview />;
               break;
          case 7:
               Signupsteps = <Finalone />;
               break;
          default:
               Signupsteps = <Inp1 />;
               break;
     }

     return (
          <Provider store={store}>
               <div className={styles.body}>
                    <h1>HINGER</h1>
                    <div className={styles.inputs}>
                         <Routes>
                              <Route path='Signup' element={Signupsteps} />
                              <Route path='Login' element={<LOGIN />} />
                         </Routes>

                    </div>
               </div>
          </Provider>
     );
};

export default Authentication;

