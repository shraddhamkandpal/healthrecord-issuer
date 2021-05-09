import React from 'react';
import 'pages/intro/Intro.scss'
import Intro from 'assets/images/icons/intro.jpeg';
import {routes} from 'constants/routes';

/**
 * Stateless component responsible for rendering a simple SSI introduction screen.
 * */
const IntroPage = () => {
  return (
    <div className='intro page-form page-form--large'>
      <div className='intro__text-block'>
        <h4>Don't delay your care at Hope Clinic</h4>
        <p>Schedule your appointment now for safe in-person care.</p>
      </div>
      <div className='intro__example'>
        <img className='flow-size' src={Intro} alt='entire-flow'/>
      </div>
    </div>
  )
}

export default IntroPage
