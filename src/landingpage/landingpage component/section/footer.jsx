import React from 'react';
import styles from './footer.module.css'
import twitter from '../../../imgs/ph_twitter-logo-fill.svg'
import Instagram  from '../../../imgs/Instagram.png'
import Facebook  from '../../../imgs/facebook.svg'
import logo   from '../../../imgs/HINGE.png'
// import twitter from '../../../imgs/twitter.png'


const Footer = () => {
     return (
          <footer>
               <div className={styles.container}>
                    <div className={styles.row}>
                         <div className={styles['col-xl-8 col-md-12']}>
                              <div className={styles.row}>
                                   <div className={styles['col-md-3 col-6']}>
                                        <div className={styles.footerlinks}>
                                             <h5>Platform</h5>
                                             <a href="#">
                                                  <p>Plans & Pricing</p>
                                             </a>
                                             <a href="#">
                                                  <p>Personal AI Manager</p>
                                             </a>
                                             <a href="#">
                                                  <p>AI Business Writer</p>
                                             </a>
                                             <a href="#">
                                                  <p>AI Data Processing</p>
                                             </a>
                                        </div>
                                   </div>
                                   <div className={styles['col-md-3 col-6']}>
                                        <div className={styles.footerlinks}>
                                             <h5>Company</h5>
                                             <a href="#">
                                                  <p>About Us</p>
                                             </a>
                                             <a href="#">
                                                  <p>Work With Us</p>
                                             </a>
                                             <a href="#">
                                                  <p>Blog & News</p>
                                             </a>
                                        </div>
                                   </div>
                                   <div className={styles['col-md-3 col-6']}>
                                        <div className={styles.footerlinks}>
                                             <h5>Resources</h5>
                                             <a href="#">
                                                  <p>Documentation</p>
                                             </a>
                                             <a href="#">
                                                  <p>Free Demo</p>
                                             </a>
                                             <a href="#">
                                                  <p>Press Conferences</p>
                                             </a>
                                        </div>
                                   </div>
                                   <div className={styles['col-md-3 col-6']}>
                                        <div className={styles.footerlinks}>
                                             <h5>Legal</h5>
                                             <a href="#">
                                                  <p>Terms of Service</p>
                                             </a>
                                             <a href="#">
                                                  <p>Privacy Policy</p>
                                             </a>
                                             <a href="#">
                                                  <p>Cookies Policy</p>
                                             </a>
                                             <a href="#">
                                                  <p>Data Processing</p>
                                             </a>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className={styles['col-xl-4 col-md-12']}>
                              <div className={styles.footercard}>
                                   <div className={styles.footercardtitle}>
                                        <div className={styles.carditems}>
                                             <h3>HINGE</h3>
                                             <p>@HINGE_APP</p>
                                        </div>
                                        <div className={`${styles.carditems} ${styles.carditems1}`}>
                                             <img src={logo} alt="Logo Placeholder" />
                                        </div>
                                        <div className={styles.carditems}>
                                             <img src={twitter} alt="Twitter Placeholder" />
                                        </div>
                                   </div>
                                   <p className={styles.cardtext}>We’re just announced new feature <br />
                                        that would help you increase your experience of using maxwell!</p>
                              </div>
                         </div>
                    </div>
                    <div className={styles.footer2}>
                         <div className={styles.footerlogo}>
                              <img src={logo} alt="Logo Placeholder" />
                              <p>HINGE, 2024</p>
                         </div>
                         <div className={styles.footersocial}>
                              <div className={styles.socialicons}>
                                   <img src={Instagram} alt="Instagram Placeholder" />
                              </div>
                              <div className={styles.socialicons}>
                                   <img src={Facebook} alt="Facebook Placeholder" />
                              </div>
                              <div className={styles.socialicons}>
                                   <img src={twitter} alt="Twitter Placeholder" />
                              </div>
                         </div>
                    </div>
               </div>
          </footer>
     )
}

export default Footer;