import React, { useState, useEffect } from 'react';
import { next, add , Login} from './reducer';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../css/inp3.module.css';
import arrow from '../imgs/arrow-down-sign-to-navigate.png';
import Dropdown from './dropdown/dropdown';
import { Link } from "react-router-dom";
// ... (previous imports)

const Inp3 = () => {
  const [selectedL, setSelectedL] = useState('Choisissez une langue');
  const [selectedT, setSelectedT] = useState('Choisissez une niveau');
  const dispatch = useDispatch();
  const client = useSelector((state) => state.client);

  const role = (e) => {
    dispatch(add('role', e.target.value));
  };

  const Experience = (e) => {
    dispatch(add('Experience', e.target.value));
  };

  const Skills = (e) => {

    const outputArray = e.target.value.split(',').map(item => item.trim());
    dispatch(add('Skills', outputArray));
  };

  useEffect(() => {
    dispatch(add('languages', [{ language: selectedL, type: selectedT }]));
  }, [dispatch, selectedL, selectedT]);


  const elms = (
    <div className={styles.ctn2}>
      <div className={styles.div1}>
        {/* language */}
        <div className={styles.language}>
          <label htmlFor="language">Language</label>
          <div className={styles.dropdown1}>
            <Dropdown selected={selectedL} setSelected={setSelectedL} options={[' English', 'French', 'Arabic', 'Spanish']} />
          </div>
        </div>

        {/* #language type# */}
        <div className={styles.languageType}>
          <label htmlFor="languageType">Language Proficiency</label>
          <div className={styles.dropdown2}>
            <Dropdown selected={selectedT} setSelected={setSelectedT} options={['Basique', 'Intermédiaire', 'Avancé', 'couramment']} />
          </div>
        </div>
      </div>

      <div className={styles.div2}>

        <div className={styles.div2_2} id="div2_2">
          {/* # role # */}
          <div className={styles.role} id="Role">
            <label htmlFor="professionalRole">Professional Role</label>
            <input className={styles.input2} type="text" id="professionalRole" name="professionalRole" onChange={role} placeholder="Front-End Developer | Designer" />
          </div>
          {/* #skills# */}
          <div className={styles.skills}>
            <label htmlFor="skills">Skills</label>
            <textarea className={styles.input2} type="text" id="skills" name="skills" rows={4} onChange={Skills} />
          </div>
        </div>

        {/* #experience# */}
        <div className={styles.Exp}>
          <label htmlFor="experience">Experience</label>
          <textarea className={styles.input2} name="experience" id="experience" cols="30" rows={10} onChange={Experience}></textarea>
        </div>
      </div>

      {/* #button# */}
      <div className={styles.btn}>
        <button onClick={() => { dispatch(next()); }}>Continue</button>
        <p>Vous avez déjà un compte ? <a  className={styles.link}><Link to="/Authentication/Login">log in</Link></a></p>
      </div>
    </div>
  );

  return elms;
};

export default Inp3;

