import React, { useState } from 'react';
import styles from './disinput.module.css';

const Disinput = (props) => {
  const [inputValue, setInputValue] = useState(props.value || '');

  const labelStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#333',
    border: 'none',
    outline: 'none',
    padding: '5px',
    marginBottom: '10px',
    width: '300px',
    backgroundColor: 'rgba(255, 255, 255, 0)',
  };

  const inpstyle = {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    letterSpacing: '0.54px',
    border: props.isEnable ? '1px solid #0000003a' : 'none', 
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0)',
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.inpus}>
      {props.label ? (
        <>
          <label style={labelStyle}>{props.label}</label>
          <input
            type={props.type}
            value={inputValue}
            onChange={handleChange}
            readOnly={!props.isEnable}
            style={inpstyle}
          />
        </>
      ) : (
        <input
          type={props.type}
          value={inputValue}
          onChange={handleChange}
          readOnly={!props.isEnable}
          style={labelStyle}
        />
      )}
    </div>
  );
};

export default Disinput;
