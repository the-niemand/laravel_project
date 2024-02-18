import React from 'react';
import style from './searchfeed.module.css';
import close from '../../imgs/close.png'
import search from '../../imgs/26aee85832fe07b1f3761b48a8ab07f6.png'
import verification  from '../../imgs/f0de90a95c6cb4f5c44300943963fbf8.png'
import stars from '../../imgs/7a237c162633dd29976f409d53e2c8c3.png'
import location from '../../imgs/2072c440184fd842003e45ab24bfc7e4.png'



const SearchFeed = (props) => {

  return (
    <div className={style.searchFeed}>
      <div className={style.search}>
        <input type="text" className={style.searchInput} placeholder="Search" />
        <div className={style.icons}>
          <img src={close} className={style.closeIcon} alt="" />
          <img src={search} className={style.searchIcon} alt="" />
        </div>
      </div>
      <div className={style.feed}>
        <p>Jobs for you</p>
        <div className={style.feedJob1} onClick={() => props.handleshow(true)}>
          <div className={style.publishJobTitleBudget}>
            <p className={style.publishedDate}>posted 30 minutes ago</p>
            <p className={style.jobTitle}>Need a world-class Figma Designer</p>
            <p className={style.budget}>Fixed price-Est. Budget: $600</p>
          </div>
          <div className={style.skillsJobTitle2Paragraph}>
            <p className={style.jobTitle2}>Job title: Advanced Figma Website Designer
              Deadline: 48 hours Pay: $600 for 3 landing pages ($200 per page)
              Responsibilities: - Design from scratch extremely professional,
              well designed, advanced figma website designs for a course I am
              launching - Communicate closely with me and my business partner
              - Execute and complete revisions quickly and efficiently - Use the
              provided... more</p>
            <p className={style.skillsNeeded}>skills : Web Design Figma</p>
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
                <p>United Kingdom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFeed;
