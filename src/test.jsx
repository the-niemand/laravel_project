import React, { useState , useEffect} from 'react';
import { storage } from './firebase';
import { ref , uploadBytes , listAll , getDownloadURL} from "firebase/storage";
import {v4} from 'uuid'

const Test = () => {

     const [image , setImage] = useState(null)
     const [bringimage , setbringimage] = useState([])

     const handlefile = (e) =>{
          setImage(e.target.files[0])
     }


     const imagebringRef = ref(storage , `image/`)
    const uploadimage = () =>{
     if(image===null ) return;
     const imageRef = ref(storage , `image/${image.name + v4()}`)
     uploadBytes(imageRef , image).then((snaphshot)=>{
          getDownloadURL(snaphshot.ref).then((url)=>{
               setbringimage((prev)=>[...prev , url])
          })
     })
    }

    useEffect(()=>{
     listAll(imagebringRef).then((res)=>{
         res.items.forEach((item)=>{
          getDownloadURL(item).then((url)=>{
               setbringimage((prev)=>[...prev , url])
          })

         })
     })
    },[])

    return (
        <div>
            <input type="file" name="" id="" onChange={handlefile} />
            <button onClick={uploadimage}>upload</button>
            {bringimage.map((url)=>{
               return <img src={url} />
            })}
        </div>
    );
};

export default Test;
