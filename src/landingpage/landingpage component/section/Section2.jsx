import React, { useState } from 'react';
import mansitting from '../../../imgs/Object 2.png'
import styles from './section2.module.css';
import pencil from '../../../imgs/pencil.png'
import research from '../../../imgs/research.png'
import ranking from '../../../imgs/ranking.png'

const Section2 = (props) => {

  return (
    <section className={styles.sec}>
     <div className={styles.contenu}>
          <h4>Améliorez votre <span>projet</span> professionnel sans effort</h4>
          <ul>
               <li><img src={pencil}/> Rejoignez HINGE gratuitement pour accéder à un pool diversifié de professionnels qualifiés </li>
               <li><img src={research}/>Simplifiez votre processus de recrutement en publiant une offre d'emploi ou en laissant HINGE trouver la personne idéale pour vous</li>
               <li><img src={ranking}/>Collaborez avec des talents de haut niveau sans grever votre budget, grâce aux options abordables d’HINGE et aux taux de transaction minimaux</li>

          </ul>
     </div>
     <img src={mansitting}/>
    </section>
  );
};

export default Section2;
