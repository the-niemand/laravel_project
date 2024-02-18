import React, { useState } from 'react';
import styles from './filter.module.css';
import { useEffect } from 'react';

function Filter(props) {
     const [preference, setPreference] = useState(null);
     const [level, setLevel] = useState(null);
     const [Ptype, setPricetype] = useState(null);
     const [Pinput, setPinput] = useState(null);
     const [from, setFrom] = useState(null);
     const [more, setMore] = useState(null);


     useEffect(() => {
          var object = {};

          // Check each state value and add it to the object if it's not null
          if (preference !== null) {
               object.preference = preference;
          }
          if (level !== null) {
               object.level = level;
          }
          if (Ptype !== null) {
               object.Ptype = Ptype;
          }
          if (Pinput !== null) {
               object.Pinput = Pinput;
          }
          if (from !== null) {
               object.from = from;
          }
          if (more !== null) {
               object.more = more;
          }
          props.handlefilter(object);

     }, [preference, level, Ptype, Pinput, from, more]); // Removed extra comma


     return (
          <div className={styles.filter}>
               <p>Filters</p>
               <div className={styles.filtering}>

                    {/* Preference */}
                    <div className={styles.filterOption}>
                         <p className={styles.filteringTitle}>Preference</p>
                         <div className={styles.checkboxGroup}>

                              <div className={styles.checkboxTest}>
                                   <input id="Best matches" type="radio" name="os" onChange={() => setPreference('Best matches')} />
                                   <label htmlFor="Best matches">Best matches</label>
                              </div>

                              <div className={styles.checkboxTest}>
                                   <input id="Most recent" type="radio" name="os" onChange={() => setPreference('Most recent')} />
                                   <label htmlFor="Most recent">Most recent</label>
                              </div>
                         </div>
                    </div>

                    {/* Level */}
                    <div className={styles.filterOption}>
                         <p className={styles.filteringTitle}>Level</p>
                         <div className={styles.checkboxGroup}>
                              <div className={styles.checkboxTest}>
                                   <input id="All" type="radio" name="Level" onChange={() => setLevel('All')} />
                                   <label htmlFor="All">All</label>
                              </div>
                              <div className={styles.checkboxTest}>
                                   <input id="B" type="radio" name="Level" onChange={() => setLevel('B')} />
                                   <label htmlFor="B">B</label>
                              </div>
                              <div className={styles.checkboxTest}>
                                   <input id="1" type="radio" name="Level" onChange={() => setLevel('1')} />
                                   <label htmlFor="1">1</label>
                              </div>
                              <div className={styles.checkboxTest}>
                                   <input id="2" type="radio" name="Level" onChange={() => setLevel('2')} />
                                   <label htmlFor="2">2</label>
                              </div>
                              <div className={styles.checkboxTest}>
                                   <input id="3" type="radio" name="Level" onChange={() => setLevel('3')} />
                                   <label htmlFor="3">3</label>
                              </div>
                         </div>
                    </div>

                    {/* Second from chat gbt */}
                    <div className={styles.filterOptionPrice}>
                         <p className={styles.filteringTitle}>Price</p>

                         {/* Hourly */}
                         <div className={styles.checkboxGroupHourly}>
                              <div className={styles.checkboxTest}>
                                   <input id="Hourly" type="radio" name="PriceType" onChange={() => setPricetype('Perhour')} />
                                   <label htmlFor="Hourly">Hourly</label>
                              </div>

                              <div className={styles.type}>
                                   <div className={styles.checkboxTest}>
                                        <input id="MTHourly" type="radio" name="type_hourly" onChange={() => { setPricetype('Perhour'); setPinput('From') }} />
                                        <label htmlFor="MTHourly"><input type="number" name id className={styles.val}
                                             placeholder="More than" onChange={(e) => setFrom(e.target.value)} /> $/hr</label>
                                   </div>
                                   <div className={styles.checkboxTest}>
                                        <input id="FTH" type="radio" name="type_hourly" onChange={() => { setPricetype('Perhour'); setPinput('From_To') }} />
                                        <label htmlFor="FTH"><input type="number" placeholder="from"
                                             className={styles.valFrom} onChange={(e) => setFrom(e.target.value)} />$/hr<input type="number" placeholder="to"
                                                  className={styles.valTo} onChange={(e) => setMore(e.target.value)} />$/hr</label>
                                   </div>
                                   <div className={styles.checkboxTest}>
                                        <input id="LTH" type="radio" name="type_hourly" onChange={() => { setPricetype('Perhour'); setPinput('To') }} />
                                        <label htmlFor="LTH"><input type="number" name id className={styles.val}
                                             placeholder="Less than" onChange={(e) => setMore(e.target.value)} /> $/hr</label>
                                   </div>
                              </div>
                         </div>

                         {/* Fixed */}
                         <div className={styles.checkboxGroupFix}>
                              <div className={styles.checkboxTest}>
                                   <input id="Fix" type="radio" name="PriceType" onChange={() => setPricetype('Fix')} />
                                   <label htmlFor="Fix">Fix</label>
                              </div>

                              <div className={styles.type}>
                                   <div className={styles.checkboxTest}>
                                        <input id="MTFix" type="radio" name="type_fix" onChange={() => { setPricetype('Fix'); setPinput('From') }} />
                                        <label htmlFor="MTFix"><input type="number" name id className={styles.val}
                                             placeholder="More than" onChange={(e) => setFrom(e.target.value)} /> $</label>
                                   </div>
                                   <div className={styles.checkboxTest}>
                                        <input id="FTF" type="radio" name="type_fix" onChange={() => { setPricetype('Fix'); setPinput('From_To') }} />
                                        <label htmlFor="FTF">
                                             <input type="number" placeholder="from"
                                                  className={styles.valFrom} onChange={(e) => setFrom(e.target.value)} />$<input type="number" placeholder="to"
                                                       className={styles.valTo} onChange={(e) => setMore(e.target.value)} />$</label>
                                   </div>
                                   <div className={styles.checkboxTest}>
                                        <input id="LTF" type="radio" name="type_fix" onChange={() => { setPricetype('Fix'); setPinput('To') }} />
                                        <label htmlFor="LTF"><input type="number" name id className={styles.val}
                                             placeholder="Less than" onChange={(e) => setMore(e.target.value)} /> $</label>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default Filter;
