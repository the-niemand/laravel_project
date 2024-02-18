import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './section.module.css';
import under_shape_person from '../../../imgs/Frame 165.png';
import shape_person from '../../../imgs/Ikbal 5.png';
import shape1 from '../../../imgs/Other 07.png'
import shape2 from '../../../imgs/Other 15.png'
import shape3 from '../../../imgs/Other 20.png'
import shape4 from '../../../imgs/Other 13.png'
import arrow from '../../../imgs/down-arrow.png'
import { useNavigate } from 'react-router-dom';
import close from '../../../imgs/close - Copy.png';
import search from '../../../imgs/26aee85832fe07b1f3761b48a8ab07f6.png';

const Section = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [is_searchfull, setIs_searchfull] = useState(false);
  const [searchValue, setSearchValue] = useState('')
  const [selection, setSelection] = useState('Talents');
  const list = ["Talents", 'Jobs'];

  const jobsList = [
    // Creative & Design
    "2D Animation",
    "3D Animation",
    "Actor",
    "Art Direction",
    "Audio Editing/Post-Production",
    "Audio Editing",
    "Audio Production",
    "Brand Identity Design",
    "Brand Strategy",
    "Cartoonist",
    "Creative Direction",
    "Editorial Design",
    "Exhibit Design",
    "Fashion Design",
    "Graphic Design",
    "Illustration",
    "Image Editing/Retouching",
    "Motion Graphics",
    "Musician",
    "Music Composition",
    "Music Production",

    // Data Entry & Research
    "Data Entry",
    "Online Research",
    "Order Processing",
    "Project Management",
    "Transcription",
    "Virtual Assistance",

    // Data Science & Analytics
    "A/B Testing",
    "Bandits",
    "Data Analytics",
    "Data Engineering",
    "Data Extraction",
    "Data Mining",
    "Data Processing",
    "Data Visualization",
    "Deep Learning",
    "Experimentation & Testing",
    "Knowledge Representation",
    "Machine Learning",
    "Photography",
    "Presentation Design",
    "Scriptwriting",
    "Store Design",
    "Videographer",
    "Video Editing/Post-Production",
    "Video Production",
    "Vocalist",
    "Voice Talent",
    "VR & AR Design",

    // Engineering & Development
    "Engineering and Architecture",
    "IT & Networking",
    "Legal",
    "Sales and Marketing",
    "Translation",
    "Web, Mobile, & Software Development",
    "Writing",

    // Business & Finance
    "Accounting & Bookkeeping",
    "Financial Planning",
    "Human Resources",
    "Management Consulting and Analysis",
    "Financial Management/CFO",
    "HR Administration",
    "Instructional Design",
    "Management Consulting",
    "Recruiting",
    "Tax Preparation",
    "Training & Development"
  ];


  const handlingsearch = (e) => {
    if (e.target.value.length > 0) {
      setSearchValue(e.target.value)
      setIs_searchfull(true);

    } else {
      setIs_searchfull(false);
    }
  };

  const searchhandling = () => {
    var getValue = document.getElementById("searchInput").value;
    if (selection == "Talents") {
      navigate(`/Homepage/find-talents/${getValue}`)
    } else {
      navigate(`/Homepage/find-works/${getValue}`)
    }
  };





  const handleDeleteIcon = () => {
    var getValue = document.getElementById("searchInput");
    if (getValue.value != "") {
      getValue.value = "";
      setIs_searchfull(false)
    }
  };


  return (
    <section className={styles.this_is_lpsection}>
      <div className={styles.b1}>
        <h1 className={styles.sectionTitle}>
          Ici, vous pouvez  trouver des <div className={styles.span}>experts</div> avec qui vous voulez travailler
        </h1>
        <p className={styles.sectionPara}>
          Notre mission, qui consiste à créer des opportunités économiques afin que les gens aient une vie meilleure,
          nous a amené bien plus loin
        </p>

        <div className={styles.div_options}>
          <div className={styles.search}>
            <img src={search} className={styles.searchIcon} alt="" onClick={searchhandling} />
            <input type="text" className={styles.searchInput} id='searchInput' placeholder="Search" onChange={handlingsearch} onKeyDown={(e) => { if (e.key === 'Enter') { searchhandling() } }} />
            <img src={close} className={styles.closeIcon} alt="" onClick={handleDeleteIcon} />

            <div className={styles.dropdownBtn} onClick={() => {
              setIsActive(!isActive);
            }}>{selection} <img src={arrow} /></div>
          </div>

          <div className={styles.BothDrop}>
            {is_searchfull && (
              <div className={styles.dropdownContent2}>
                {jobsList
                  .filter((elm) =>
                    elm.toLowerCase().startsWith(searchValue.toLowerCase())
                  )
                  .length > 0 ? (
                  jobsList
                    .filter((elm) =>
                      elm.toLowerCase().startsWith(searchValue.toLowerCase())
                    )
                    .map((elm) => (

                      <div key={elm} className={styles.dropdownItem} onClick={() => {
                        var getValue = document.getElementById("searchInput");
                        getValue.value = elm;
                        setIs_searchfull(false)

                      }}>
                        {elm}
                      </div>

                    ))
                ) : (
                  <p style={{ color: 'red', cursor: 'auto' }}>
                    category not found
                  </p>
                )}
              </div>
            )}

            {isActive && (
              <div className={styles.dropdownContent}>
                {list.map(option => (
                  <div key={option} className={styles.dropdownItem} onClick={() => {
                    setSelection(option);
                    setIsActive(false);
                  }}>
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
      <div className={styles.b2}>
        <div>
          <img src={under_shape_person} className={styles.under_shape_person} alt="" srcset="" />
          <img src={shape_person} className={styles.shape_person} alt="" srcset="" />

        </div>
        <img src={shape1} className={styles.shape1} alt="" />
        <img src={shape2} className={styles.shape2} alt="" />
        <img src={shape3} className={styles.shape3} alt="" />
        <img src={shape4} className={styles.shape4} alt="" />
      </div>
    </section>
  );
};

export default Section;
