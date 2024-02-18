import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../header/header';
import styles from './post_job.module.css';
import { useNavigate } from 'react-router-dom';
import Load from '../../imgs/Double Ring-1.8s-200px.gif'
import close from '../../imgs/close.png';
import succeded from '../../imgs/LFYS2sjFQG.gif'


const Postjobs = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState(JSON.parse(window.localStorage.getItem("client")));
  const [pay, setPay] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);
  const [Jtype, setJtype] = useState('Perhour');
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState('No duration');
  const [price, setPrice] = useState();
  const [level, setLevel] = useState();
  const [job_time, setJob_time] = useState('');
  const list = ['< 1 month', '1 to 3 months', '> 3 months', 'No duration'];
  const [skills, setSkills] = useState([])
  const [issucceded, setIssucceded] = useState(false);

  const handleCheckboxChange = (e) => {
    setLevel(e.target.value);
  };

  const sendDataToAPI = async () => {

    try {
      const dataToSend = {
        title: title,
        description: description,
        target_country: pay,
        Jtype: Jtype,
        Duration: duration,
        price: price,
        level: level,
        skills_required: JSON.stringify(skills),
        Hirer_id: client.user_id,
        Job_time: job_time,
      };


      const response = await axios.post('http://127.0.0.1:8000/api/Jobposting', dataToSend);

      console.log('Data sent successfully:', response.data, dataToSend);
      setIssucceded(true)

    } catch (error) {
      console.error('Error sending data:', error);
    }
  };


  const deleteskill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handlenewskill = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      const newSkill = e.target.value.trim();
      setSkills([...skills, newSkill]);
      e.target.value = '';
    }
  }

  useEffect(() => {
    if (!client) {
      navigate('/Authentication/Login');
    } else {
      setLoading(false)
    }
  }, []);


  const country = (e) => {
    setPay(e.target.value);
    setShow(true);

  };
  const handleCountryClick = (e) => {
    setPay(e.target.textContent);
    setShow(false);
  };


  const countryList = [
    "Afghanistan",
    "Åland Islands",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan (Province of China)",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ];

  if (loading) {
    return <div className={styles.bodyforload}>
      <img src={Load} alt="this slowpoke moves" width="80" />
    </div>
  }

  return (
    client && (
      <div className={styles.body}>
        <Header />
        <section>
          <div className={styles.jobcontainer}>
            {!issucceded ?
              <>
                <div className={styles.li1}>
                  <label>Title</label>
                  <input type="text" placeholder="Job post title" className={styles.input_for_jobpost} onChange={(e) => { setTitle(e.target.value) }} />
                </div>
                <div className={styles.li1}>
                  <label>Talentes contry</label>
                  <input
                    className={styles.inputcountry}
                    type="text"
                    id="country"
                    name="country"
                    onChange={country}
                    placeholder="Country"
                    value={pay}
                  />

                  {pay.length > 0 && show && (
                    <div className={styles.countryDropdown}>
                      {countryList
                        .filter((elm) =>
                          elm.toLowerCase().startsWith(pay.toLowerCase())
                        )
                        .length > 0 ? (
                        countryList
                          .filter((elm) =>
                            elm.toLowerCase().startsWith(pay.toLowerCase())
                          )
                          .map((elm) => (
                            <p key={elm} onClick={handleCountryClick}>
                              {elm}
                            </p>
                          ))
                      ) : (
                        <>
                          <p>
                            World wide
                          </p>
                          <p style={{ color: 'red', cursor: 'auto' }}>
                            Pays not found
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.li1}>
                  <label>Talentes level</label>
                  <div className={styles.radios}>
                    <div className={styles.option}>
                      <input onChange={handleCheckboxChange} type="radio" name="level" value="all" />
                      <p>All</p>
                    </div>
                    <div className={styles.option}>
                      <input onChange={handleCheckboxChange} type="radio" name="level" value="B" />
                      <p>Beginner</p>
                    </div>
                    <div className={styles.option}>
                      <input onChange={handleCheckboxChange} type="radio" name="level" value="1" />
                      <p>Level 1</p>
                    </div>
                    <div className={styles.option}>
                      <input onChange={handleCheckboxChange} type="radio" name="level" value="2" />
                      <p>Level 2</p>
                    </div>
                    <div className={styles.option}>
                      <input onChange={handleCheckboxChange} type="radio" name="level" value="3" />
                      <p>Level 3</p>
                    </div>

                  </div>
                </div>


                <div className={styles.li1}>
                  <label>Job description</label>
                  <textarea name="" id="" cols="30" rows="15" className={styles.proposal_input} placeholder='Job description' onChange={(e) => { setDescription(e.target.value) }}>
                  </textarea>
                </div>

                <div className={styles.li1}>
                  <div className={styles.blk1}>
                    <label>Job Type</label>
                    <div>
                      <div className={styles.fixpayment} style={{ backgroundColor: Jtype === 'Fix' ? '#796ACD' : '#796acd7c' }} onClick={() => { setJtype('Fix') }}>Fix</div>
                      <div className={styles.hourlypayment} style={{ backgroundColor: Jtype === 'Perhour' ? '#796ACD' : '#796acd7c' }} onClick={() => { setJtype('Perhour') }}>hourly</div>
                    </div>
                  </div>
                  <div className={styles.blk2}>
                    <div className={styles.duration}>
                      <label>Duration</label>
                      <div className={styles.dropdownBtn} onClick={() => { setIsActive(!isActive) }}>{duration}</div>
                      {isActive && (
                        <div className={styles.dropdownContent}>
                          {list.map((option, index) => (
                            <div key={option} className={styles.dropdownItem} onClick={() => {
                              setDuration(option);
                              setIsActive(false);
                            }}>
                              <p key={index}>{option}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {Jtype === 'Perhour' ? (
                      <>
                        <div className={styles.JTD}>
                          <label> Job time</label>
                          <div className={styles.JTD_input}>
                            <input type="number" placeholder='hours per week' onChange={(e) => { setJob_time(e.target.value) }} /><span>hr(s)/week</span>
                          </div>
                        </div>
                        <div className={styles.Price}>
                          <label> Job Price</label>
                          <div className={styles.Price_input}>
                            <input type="number" placeholder='dollar(s) per hour' onChange={(e) => { setPrice(e.target.value) }} /><span>$/hr</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className={styles.Price}>
                        <label> Job Price</label>
                        <div className={styles.Price_input}>
                          <input type="number" placeholder='dollar(s)' onChange={(e) => { setPrice(e.target.value) }} /><span>$</span>
                        </div>
                      </div>
                    )}
                  </div>



                </div>

                <div className={styles.li1}>
                  <div className={styles.blk1}>
                    <label>Job skills needed</label>
                  </div>
                  <div className={styles.blk_skills}>
                    {skills.map((elm, index) => {
                      return (
                        <div key={index} className={styles.skillsitem}>{elm}<img src={close} alt="" onClick={() => { deleteskill(index) }} /></div>
                      )
                    })}
                    <input type="text" placeholder='Add skill' onKeyDown={handlenewskill} />
                  </div>
                </div>

                <div className={styles.lbtn}>
                  <button className={styles.post} onClick={sendDataToAPI}>Post Job</button>
                </div>

              </>
              :
              <img src={succeded} alt="" srcset="" />
            }
          </div>
        </section>
      </div>
    )
  );
};

export default Postjobs;
