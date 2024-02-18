import React, { useState, useEffect } from 'react';
import styles from './filter.module.css';

function Filter() {

     return (
          <div className={styles.filter}>
               <p>Filters</p>
               <div className={styles.filtering}>

                    {/* Preference */}
                    <div className={styles.filterOption}>
                         <p className={styles.filteringTitle}>Preference</p>
                         <div className={styles.checkboxGroup}>

                              <div className={styles.checkboxTest}>
                                   <input id="Best matches" type="radio" name="os" />
                                   <label htmlFor="Best matches">Best matches</label>
                              </div>

                              <div className={styles.checkboxTest}>
                                   <input id="Most recent" type="radio" name="os" />
                                   <label htmlFor="Most recent">Most recent</label>
                              </div>
                         </div>
                    </div>

                    {/* Level */}
                    <div className={styles.filterOption}>
                         <p className={styles.filteringTitle}>Level</p>
                         <div className={styles.checkboxGroup}>
                              <div className={styles.checkboxTest}>
                                   <input id="B" type="radio" name="Level" />
                                   <label htmlFor="B">B</label>
                              </div>
                              <div className={styles.checkboxTest}>
                                   <input id="1" type="radio" name="Level" />
                                   <label htmlFor="1">1</label>
                              </div>
                              <div className={styles.checkboxTest}>
                                   <input id="2" type="radio" name="Level" />
                                   <label htmlFor="2">2</label>
                              </div>
                              <div className={styles.checkboxTest}>
                                   <input id="3" type="radio" name="Level" />
                                   <label htmlFor="3">3</label>
                              </div>
                         </div>
                    </div>


                    {/* Skills */}
                    <div className={styles.filterOption}>
                         <p className={styles.filteringTitle}>Skills</p>
                         <div className={styles.checkboxGroup}>
                              <div className={styles.checkboxTest}>
                                   <input id="B" type="radio" name="Level" />
                                   <label htmlFor="B">Figma</label>
                              </div>
                         </div>
                    </div>


                    {/* languages */}
                    <div className={styles.filterOption}>
                         <p className={styles.filteringTitle}>Languages</p>
                         <div className={styles.checkboxGroup}>
                              <select>
                                   <option value="">English</option>
                                   <option value="">French</option>
                                   <option value="">spanish</option>
                                   <option value="">Arabic</option>
                              </select>
                         </div>
                    </div>


                    {/* Level */}
                    <div className={styles.filterOption}>
                         <p className={styles.filteringTitle}>Level</p>
                         <div className={styles.checkboxGroup}>
                              <div className={styles.checkboxTest}>
                                   <input id="B" type="radio" name="Level" />
                                   <label htmlFor="B">B</label>
                              </div>
                              <div className={styles.checkboxTest}>
                                   <input id="1" type="radio" name="Level" />
                                   <label htmlFor="1">1</label>
                              </div>
                              <div className={styles.checkboxTest}>
                                   <input id="2" type="radio" name="Level" />
                                   <label htmlFor="2">2</label>
                              </div>
                              <div className={styles.checkboxTest}>
                                   <input id="3" type="radio" name="Level" />
                                   <label htmlFor="3">3</label>
                              </div>
                         </div>
                    </div>
                    
                    {/* languages */}
                    <div className={styles.filterOption}>
                         <p className={styles.filteringTitle}>Languages</p>
                         <div className={styles.checkboxGroup}>
                              <select>
                                   <option value="">English</option>
                                   <option value="">French</option>
                                   <option value="">spanish</option>
                                   <option value="">Arabic</option>
                              </select>
                         </div>
                    </div>
               </div>
          </div >

     );
}

export default Filter;
