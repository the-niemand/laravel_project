import React from 'react';
import style from './editAndAdd.module.css';

const Edit = (props) => {
  return (
    <div className={style.EditButton} style={{ top: props.top, right: props.right , position:props.pos}}>

    </div>
  );
}

const Add = (props) => {
  return (
    <div className={style.addingButton} style={{ top: props.top, right: props.right }}>

    </div>
  );
}

const Del = (props) => {
  return (
    <div className={style.delButton} style={{ top: props.top, right: props.right }}>

    </div>
  );
}


export { Edit, Add  ,Del};
