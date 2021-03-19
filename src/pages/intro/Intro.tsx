import React from 'react';
import 'pages/intro/Intro.scss'
import EntireFlow from 'assets/images/icons/entire-flow.png';

/**
 * Stateless component responsible for rendering a simple SSI introduction screen.
 * */
const IntroPage = () => {
  return (
    <div className='intro page-form page-form--large'>
      <div className='intro__heading-block'>
        <h1 className='intro__heading'>
          StartUp A - Driving License Issuer
        </h1>
        <h5 className='intro__subheading'>A simple use case by Affinidi</h5>
      </div>
      <div className='intro__text-block'>
        <h4>Scenario</h4>
        <p>Alex, a frequent traveller, is planning for a road trip in Santa Monica, California and is looking to rent a camper van. </p>
        <p>As he approaches the rental store, the receptionist struggles to verify that his driving license is legitimate as different countries may have different templates of their driving licenses.</p>
        <p>Instead, Alex could provide his verified credentials which contains his driving license information to the receptionist and is also able to use the same credentials if he wants to rent a vehicle in another country for a separate road trip.</p>
        <h4>Roles in this scenario</h4>
        <p>There are 3 roles in SSI cycle: <strong>ISSUER</strong>, <strong>VERIFIER</strong>, and <strong>HOLDER</strong>. Each of them is explained in the example below.</p>
      </div>
      <div className='intro__example'>
        <img className='flow-size' src={EntireFlow} alt='entire-flow'/>
      </div>
      <div className='intro__roles-description'>
        <div className='intro__roles-description-role'>
          <h3>Issuer</h3>
          <p>StartUp A is able to issue a digitalised verified credentials which has information that a standard driving license has.</p>
        </div>
        <div className='intro__roles-description-role'>
          <h3>Holder</h3>
          <p>A frequent travellers who would like to have this verified credentials with him/her so he/she do not have to present their physical driving license during a car rental event.</p>
        </div>
        <div className='intro__roles-description-role'>
          <h3>Verifier</h3>
          <p>A car rental store would be able to verify the verfied credentials and not to worry about the legitimacy of the driving license as it may be difficult to verify different countries driving licenses. This is to also ensure that their cars are rented to individuals who are licensed drivers.</p>
        </div>
      </div>

      <p>For more information and well documented tutorials, please visit <a href='https://www.affinidi.com/api' target='_blank' rel='noreferrer'>https://www.affinidi.com/api</a>.</p>
    </div>
  )
}

export default IntroPage
