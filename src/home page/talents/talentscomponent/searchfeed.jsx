import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { storage } from '../../../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import style from './searchfeed.module.css';
import close from '../../imgs/close.png';
import search from '../../imgs/26aee85832fe07b1f3761b48a8ab07f6.png';
import verification from '../../imgs/f0de90a95c6cb4f5c44300943963fbf8.png';
import stars from '../../imgs/7a237c162633dd29976f409d53e2c8c3.png';
import Load from '../../../imgs/Double Ring-1.8s-200px.gif';
import location from '../../imgs/2072c440184fd842003e45ab24bfc7e4.png';
import no_result from '../../../imgs/9318688.jpg'



const SearchFeed = (props) => {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchjobvalue, setSearchjobvalue] = useState(null)
  const [talents, setTalents] = useState(props.talents)


  const handleDivClick = (index) => {
    navigate(`/Homepage/find-talents/${index}`)
  };


  const searchhandling = async () => {
    const searchKeywords = searchjobvalue.split(/\W+/).filter(word => word.length > 0);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/Gettalentsbyuserskills`, {
        params: {
          skills: searchKeywords
        }
      });
      setTalents(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.error('Error fetching jobs:', error);

    }
  }

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        if (talents) {
          const urls = await Promise.all(
            talents.map(async (elm) => {
              const imageRef = ref(storage, `image/${elm.profile_photo}`);
              return await getDownloadURL(imageRef);
            })
          );

          setImageUrls(urls);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error retrieving images:', error);
        setLoading(false);
      }
    };

    fetchImageUrls();
  }, [talents]);









  const handletalents = () => {
    if (!talents) {
      return (
        <div className={style.nojobs}>
          <h1>No talents found for you, try to search on a niche</h1>
          <img src={no_result} alt="" />
        </div>
      );
    } else {
      let filteredtalents = talents;

      // Apply level filter
      if (props.level !== null) {
        filteredtalents = filteredtalents.filter(div => div.level === props.level);
      }


      if (props.Pinput === 'From') {
        filteredtalents = filteredtalents.filter(div => div.hourly_rate > props.from);
      } else if (props.Pinput === 'To') {
        filteredtalents = filteredtalents.filter(div => div.hourly_rate < props.more);
      } else if (props.Pinput === 'From_To') {
        filteredtalents = filteredtalents.filter(div => div.hourly_rate >= props.from && div.hourly_rate <= props.more);
      }


      if (filteredtalents.length > 0) {
        return filteredtalents.map((elm, index) => (
          <div className={style.feedTalents} key={elm.id} onClick={()=>{handleDivClick(elm.user_id)}}>
            <div className={style.photoData}>
              <div className={style.talentedPhoto}>
                <img src={imageUrls[index]} alt="" srcset="" />
              </div>
              <div className={style.talentedData}>
                <p className={style.talentedName}>{`${elm.first_name} ${elm.last_name}`}</p>
                <p className={style.talentedRole}>{elm.role} </p>
              </div>
            </div>
            <div className={style.skillsJobtitle2Paragraph}>
              <p className={style.jobTitle2}>{elm.bio}</p>
              <p className={style.skillsNeeded}>skills: {JSON.parse(elm.skills).map((skill) => skill)}</p>
            </div>
          </div>
        ));
      } else {
        return (
          <div className={style.nojobs}>
            <h1>No talents found for you, try to search on a niche</h1>
            <img src={no_result} alt="" />
          </div>
        );
      }
    }
  };

















  if (loading) {
    return (
      <div className={style.bodyforload}>
        <img src={Load} alt="Loading" width="80" />
      </div>
    );
  }


  return (
    <div className={style.searchFeed}>
      <div className={style.search}>
        <input type="text" className={style.searchInput} placeholder="Search" onChange={(e) => { setSearchjobvalue(e.target.value) }} />
        <div className={style.icons}>
          <img src={close} className={style.closeIcon} alt="" />
          <img src={search} className={style.searchIcon} onClick={searchhandling} />
        </div>
      </div>
      <div className={style.feed}>
        <p>talents for you</p>
        {handletalents()}
      </div>
    </div>
  );
}

export default SearchFeed;
