import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../header/header';
import Lpheader from '../../landingpage/landingpage component/header/Lpheader';
import style from '../css/jobs.module.css';
import Filter from './jobscomponent/filter';
import SearchFeed from './jobscomponent/searchfeed';
import Profile from './jobscomponent/profile';
import { storage } from '../../firebase';
import { ref, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import Load from '../../imgs/Double Ring-1.8s-200px.gif'
import close from '../../imgs/close.png'
import search from '../imgs/26aee85832fe07b1f3761b48a8ab07f6.png'
import verification from '../imgs/f0de90a95c6cb4f5c44300943963fbf8.png'
import stars from '../imgs/7a237c162633dd29976f409d53e2c8c3.png'
import location from '../imgs/2072c440184fd842003e45ab24bfc7e4.png'
import no_result from '../../imgs/9318688.jpg'

const Jobs = () => {
  const navigate = useNavigate();
  const { parms } = useParams();
  const [image, setImage] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState(null);
  const [searchjobvalue, setSearchjobvalue] = useState(null);

  const [level, setLevel] = useState(null);
  const [Ptype, setPricetype] = useState(null);
  const [Pinput, setPinput] = useState(null);
  const [from, setFrom] = useState(null);
  const [more, setMore] = useState(null);

  const handleDivClick = (index) => {
    navigate(`/Homepage/find-works/index/${index}`)
  };

  const searchhandling = async () => {
    const searchKeywords = searchjobvalue.split(/\W+/).filter(word => word.length > 0);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/Getjobsbysearch`, {
        params: {
          searchkeywords: searchKeywords
        }
      });
      console.log(response.data);
      setJobs(response.data[0]);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }

  useEffect(() => {
    console.log(parms);
    const clientData = JSON.parse(window.localStorage.getItem("client"));

    if (clientData) {
      setClient(clientData);
      const imageRef = ref(storage, `image/${clientData.profile_photo}`);
      getDownloadURL(imageRef)
        .then((url) => {
          setImage(url);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error retrieving image:", error);
          setLoading(false);
        });

      if (clientData.skills) {
        axios.get('http://127.0.0.1:8000/api/Getjobsbyuserskills', {
          params: {
            skills: JSON.parse(clientData.skills)
          }
        }).then((response) => {
          setJobs(response.data[0]);
          setLoading(false);
        }).catch((error) => {
          console.error("Error fetching jobs:", error);
          setLoading(false);
        });
      } else {
        console.warn("Client skills not found.");
        setLoading(false);
      }
    } else {
      if (parms) {
        const datasend = [];
        datasend.push(parms)

        axios.get('http://127.0.0.1:8000/api/Getjobsbyuserskills', {
          params: {
            skills: datasend
          }
        }).then((response) => {
          setJobs(response.data[0]);
          console.log(response.data[0]);
          console.log(response.data);
          setLoading(false);
        }).catch((error) => {
          console.error("Error fetching jobs:", error);
        });

        setLoading(false)
      }
    }
  }, []);

  const getTimeDifference = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const timeDiff = now - postTime;

    // Convert milliseconds to minutes
    const minutes = Math.floor(timeDiff / (1000 * 60));

    if (minutes < 1) {
      return "just now";
    } else if (minutes === 1) {
      return "1 minute ago";
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days} days ago`;
    }
  }












  const handlejobs = () => {
    if (!jobs) {
      return (
        <div className={style.nojobs}>
          <h1>No jobs found for you, try to search on a niche</h1>
          <img src={no_result} alt="" />
        </div>
      );
    } else {
      let filteredJobs = jobs;

      // Apply level filter
      if (level !== null) {
        filteredJobs = filteredJobs.filter(div => div.level === level);
      }

      // Apply Ptype filter
      if (Ptype === 'Perhour') {
        if (Pinput === 'From') {
          filteredJobs = filteredJobs.filter(div => div.hourly_rate > from);
        } else if (Pinput === 'To') {
          filteredJobs = filteredJobs.filter(div => div.hourly_rate < more);
        } else if (Pinput === 'From_To') {
          filteredJobs = filteredJobs.filter(div => div.hourly_rate >= from && div.hourly_rate <= more);
        }
      } else if (Ptype === 'Fix') {
        if (Pinput === 'From') {
          filteredJobs = filteredJobs.filter(div => div.price > from);
        } else if (Pinput === 'To') {
          filteredJobs = filteredJobs.filter(div => div.price < more);
        } else if (Pinput === 'From_To') {
          filteredJobs = filteredJobs.filter(div => div.price >= from && div.price <= more);
        }
      }

      if (filteredJobs.length > 0) {
        return filteredJobs.map((div, index) => (
          <div className={style.feedJob1} key={index} onClick={() => handleDivClick(div.job_post_id)}>

            <div className={style.publishJobTitleBudget}>
              <p className={style.publishedDate}>posted {getTimeDifference(div.updated_at)}</p>
              <p className={style.jobTitle}>{div.title}</p>
              <p className={style.budget}>Fixed price-Est. Budget: {div.price}</p>
            </div>
            <div className={style.skillsJobTitle2Paragraph}>
              <p className={style.jobTitle2}>{div.description}</p>
              <p className={style.skillsNeeded}>skills : {div.skills_required}</p>
              <div className={style.lastParagraph}>
                <div className={style.verification}>
                  <img src={verification} alt="" />
                  <p>Payment verified</p>
                </div>
                <div className={style.rating}>
                  <div className={style.stars}>
                    <img src={stars} alt="" />
                    <img src={stars} alt="" />
                    <img src={stars} alt="" />
                    <img src={stars} alt="" />
                    <img src={stars} alt="" />
                  </div>
                  <p>$50K + spent</p>
                </div>
                <div className={style.location}>
                  <img src={location} alt="" />
                  <p>{div.target_country}</p>
                </div>
              </div>
            </div>
          </div>

        ));
      } else {
        return (
          <div className={style.nojobs}>
            <h1>No jobs found for you, try to search on a niche</h1>
            <img src={no_result} alt="" />
          </div>
        );
      }
    }
  };







  if (loading) {
    return <div className={style.bodyforload}>
      <img src={Load} alt="this slowpoke moves" width="80" />
    </div>
  }

  return (
    <div className={style.body}>
      {client ? <Header /> : <Lpheader />}
      <div className={style.section}>
        <div className={style.filter}>
          <p>Filters</p>
          <div className={style.filtering}>
            {/* Level */}
            <div className={style.filterOption}>
              <p className={style.filteringTitle}>Level</p>
              <div className={style.checkboxGroup}>
                <div className={style.checkboxTest}>
                  <input id="All" type="radio" name="Level" onChange={() => setLevel('all')} />
                  <label htmlFor="All">All</label>
                </div>
                <div className={style.checkboxTest}>
                  <input id="B" type="radio" name="Level" onChange={() => setLevel('B')} />
                  <label htmlFor="B">B</label>
                </div>
                <div className={style.checkboxTest}>
                  <input id="1" type="radio" name="Level" onChange={() => setLevel('1')} />
                  <label htmlFor="1">1</label>
                </div>
                <div className={style.checkboxTest}>
                  <input id="2" type="radio" name="Level" onChange={() => setLevel('2')} />
                  <label htmlFor="2">2</label>
                </div>
                <div className={style.checkboxTest}>
                  <input id="3" type="radio" name="Level" onChange={() => setLevel('3')} />
                  <label htmlFor="3">3</label>
                </div>
              </div>
            </div>
            {/* Second from chat gbt */}
            <div className={style.filterOptionPrice}>
              <p className={style.filteringTitle}>Price</p>
              {/* Hourly */}
              <div className={style.checkboxGroupHourly}>
                <div className={style.checkboxTest}>
                  <input id="Hourly" type="radio" name="PriceType" onChange={() => setPricetype('Perhour')} />
                  <label htmlFor="Hourly">Hourly</label>
                </div>
                <div className={style.type}>
                  <div className={style.checkboxTest}>
                    <input id="MTHourly" type="radio" name="type_hourly" onChange={() => { setPricetype('Perhour'); setPinput('From') }} />
                    <label htmlFor="MTHourly"><input type="number" name id className={style.val}
                      placeholder="More than" onChange={(e) => setFrom(e.target.value)} /> $/hr</label>
                  </div>
                  <div className={style.checkboxTest}>
                    <input id="FTH" type="radio" name="type_hourly" onChange={() => { setPricetype('Perhour'); setPinput('From_To') }} />
                    <label htmlFor="FTH"><input type="number" placeholder="from"
                      className={style.valFrom} onChange={(e) => setFrom(e.target.value)} />$/hr<input type="number" placeholder="to"
                        className={style.valTo} onChange={(e) => setMore(e.target.value)} />$/hr</label>
                  </div>
                  <div className={style.checkboxTest}>
                    <input id="LTH" type="radio" name="type_hourly" onChange={() => { setPricetype('Perhour'); setPinput('To') }} />
                    <label htmlFor="LTH"><input type="number" name id className={style.val}
                      placeholder="Less than" onChange={(e) => setMore(e.target.value)} /> $/hr</label>
                  </div>
                </div>
              </div>
              {/* Fixed */}
              <div className={style.checkboxGroupFix}>
                <div className={style.checkboxTest}>
                  <input id="Fix" type="radio" name="PriceType" onChange={() => setPricetype('Fix')} />
                  <label htmlFor="Fix">Fix</label>
                </div>
                <div className={style.type}>
                  <div className={style.checkboxTest}>
                    <input id="MTFix" type="radio" name="type_fix" onChange={() => { setPricetype('Fix'); setPinput('From') }} />
                    <label htmlFor="MTFix"><input type="number" name id className={style.val}
                      placeholder="More than" onChange={(e) => setFrom(e.target.value)} /> $</label>
                  </div>
                  <div className={style.checkboxTest}>
                    <input id="FTF" type="radio" name="type_fix" onChange={() => { setPricetype('Fix'); setPinput('From_To') }} />
                    <label htmlFor="FTF">
                      <input type="number" placeholder="from"
                        className={style.valFrom} onChange={(e) => setFrom(e.target.value)} />$<input type="number" placeholder="to"
                          className={style.valTo} onChange={(e) => setMore(e.target.value)} />$</label>
                  </div>
                  <div className={style.checkboxTest}>
                    <input id="LTF" type="radio" name="type_fix" onChange={() => { setPricetype('Fix'); setPinput('To') }} />
                    <label htmlFor="LTF"><input type="number" name id className={style.val}
                      placeholder="Less than" onChange={(e) => setMore(e.target.value)} /> $</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ################################################ feed ######################################## */}
        <div className={style.searchFeed}>
          <div className={style.search}>
            <input type="text" className={style.searchInput} placeholder="Search" onChange={(e) => { setSearchjobvalue(e.target.value) }} />
            <div className={style.icons}>
              <img src={close} className={style.closeIcon} alt="" />
              <img src={search} className={style.searchIcon} alt="" onClick={searchhandling} />
            </div>
          </div>
          <div className={style.feed}>
            <p>Jobs for you</p>
            {handlejobs()}
          </div>
        </div>
        {client && <Profile client={client} image={image} />}
      </div>
    </div>
  );
};

export default Jobs;
