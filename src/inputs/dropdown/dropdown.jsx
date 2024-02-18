import React from 'react'
import { useState } from 'react'
import styles from './dropd.module.css'

const Dropdown = (props) => {
     const [isActive, setIsActive] = useState(false)
     return (
          <>
               <div className={styles.dropdownBtn} onClick={() => {
                    setIsActive(!isActive)
               }}>{props.selected}</div>
               {isActive && (
                    <div className={styles.dropdownContent}>

                         {props.options.map(option => (
                              <div className={styles.dropdownItem} onClick={() => {
                                   props.setSelected(option)
                                   setIsActive(false)
                              }}>
                                   {option}
                              </div>
                         ))}
                    </div>
               )
               }

          </>
     )
}

export default Dropdown
