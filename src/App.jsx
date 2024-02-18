import React from 'react'
import Authentication from './inputs/authentification';

import { Provider } from 'react-redux';
import { store } from './inputs/reducer';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import Profilepage from './profilepage/profilepage';
import Talents from './home page/talents/talents';
import Jobs from './home page/jobs.jsx/jobs';
import Postjobs from './home page/talents/post_job';
import Landingpage from './landingpage/landingpage';
import Applytojob from './home page/jobs.jsx/applytojob/applytojob'
import Postedjobs from './home page/talents/posted_jobs/posted_jobs'
import Postedjob from './home page/talents/posted_jobs/post_precise'
import Talented from './home page/talents/talented/talented'

import Proposals from './home page/jobs.jsx/proposals/proposal'
// import Proposal from './home page/talents/posted_jobs/post_precise'


const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Landingpage />} />
          <Route path='/Authentication/*' element={<Authentication />} />
          <Route path='/Profile' element={<Profilepage />} />
          
          <Route path='/Homepage/find-talents' element={<Talents />} />

          <Route path='/Homepage/find-works'exact element={<Jobs />} />
          <Route path='/Homepage/find-works/:parms'exact element={<Jobs />} />
          <Route path='/Homepage/find-works/index/:index'exact element={<Applytojob />} />


          <Route path='/Homepage/find-works/proposals'exact element={<Proposals />} />


          <Route path='/Homepage/post-job' element={<Postjobs />} />

          
          <Route path='/Homepage/find-talents/posted-jobs' element={<Postedjobs />} />
          <Route path='/Homepage/find-talents/posted-jobs/:index' element={<Postedjob />} />
          <Route path='/Homepage/find-talents/:params' element={<Talented />} />



        </Routes>
      </Router>
    </Provider>
  )
}

export default App